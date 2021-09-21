import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const client = new ApolloClient({
  uri: 'https://kampus-merdeka-km.hasura.app/v1/graphql',
  cache: new InMemoryCache(),
  headers: {
      'x-hasura-admin-secret':'yCBmWygDNcDf1qnGECITACs7YgM33Mtl6fmCwtDjzaUtDm0NZuJVSaLSWAi2y4dz'
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
