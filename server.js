const path = require('path');
const express = require('express');

const { ApolloServer } = require('apollo-server-express');

// used to load graphQLfiles 
const { loadFilesSync } = require('@graphql-tools/load-files');

// to process Schema
const { makeExecutableSchema } = require('@graphql-tools/schema');

//basically access to ALL graphQL files anywhere everywhere 
// __dirname = absolute full path to the current location 
const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql'));
// revolver is aka. processor 
const resolversArray = loadFilesSync(path.join(__dirname, '**/*.resolvers.js'));

async function startApolloServer() {
  const app = express();

// group the schema and revolvers togehter in ONe schema here
  const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray,
  });
  // connect to Apollo Server to interact with server 
  const server = new ApolloServer({
    schema
  });

  await server.start();
  // this middleware helps to interact with backend with GUI 
  server.applyMiddleware({ app, path: '/graphql' });

  app.listen(3000, () => {
    console.log('Running GraphQL server...');
  });
}

startApolloServer();
