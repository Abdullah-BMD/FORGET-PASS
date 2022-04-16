"use strict";
const koa = require("koa");
const { router } = require("./app/routes/router")
const { connectDB } = require("./app/db/index");

import { execute, subscribe } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { ApolloServer } from "apollo-server-koa";
import { resolvers } from "./app/graphQl/resolvers/index"
import { typeDefs } from "./app/graphQl/typeDefs" 


const startServer = async () => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });
  await connectDB()
  const app = new koa()
  app.use(router.routes()).use(router.allowedMethods())

  const koaServer = app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000/graphql`)
  );

  const subscriptionServer = SubscriptionServer.create(
    {
      schema, execute, subscribe,
      async onConnect(connectionParams: any) {
        return { 'response': 'Ok' }
      }
    },
    { server: koaServer, path: '/graphql' }
  );

  const server = new ApolloServer({
    schema,
    context: ({ ctx }: any) => {
      return {
        ctx,
      }
    },
    plugins: [{
      async serverWillStart() {
        return {
          async drainServer() {
            subscriptionServer.close();
          }
        };
      }
    }],
  });
  await server.start();
  server.applyMiddleware({ app });

}
startServer();
