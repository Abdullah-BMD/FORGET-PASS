const { adminResolvers } = require('./adminResolvers')

const resolvers = {
    Query: {
        hello_world: async (parent: any, args: any, { ctx }: any) => {
            return "Hello World";
        },
        ...adminResolvers.query,

    },
    Mutation: {
        ...adminResolvers.mutations,

    }
}

export {
    resolvers
}