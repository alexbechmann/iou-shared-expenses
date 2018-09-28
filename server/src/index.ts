import express from 'express';
import graphqlHTTP from 'express-graphql';
import Schema from './schema.graphql';
import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';

const app = express();

const typeDefs = [Schema];
const resolvers = merge({
  Query: {
    getAllTransactions: () => []
  }
});

export const graphqlSchema = makeExecutableSchema({
  typeDefs,
  resolvers
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    graphiql: true
  })
);

const port = process.env.PORT || 3004;

app.listen(port, () => {
  console.log(`Api listening on port: ${port}.`);
});
