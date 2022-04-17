import React from "react";
import ReactDOM from "react-dom";
import App from "App";
import store from "store/store";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";

import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  HttpLink,
  ApolloLink,
  split,
  concat,
} from "@apollo/client";


const httpLink = new HttpLink({ uri:  "http://localhost:4000/graphql" });

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = localStorage.getItem("access_token");

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });

  return forward(operation);
});



const client = new ApolloClient<NormalizedCacheObject>({
  link: concat(authLink , httpLink ),
  cache: new InMemoryCache(),
});

// const client = new ApolloClient({
//   uri: 'http://localhost:4000/graphql',
//   cache: new InMemoryCache(),
// });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
          <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,

  document.getElementById("root")
);

