import express from 'express';
import graphqlHTTP from 'express-graphql';
import Schema from './schema.graphql';
import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';
import { transactions, purchases } from './test-data';
import { transactionCollection, purchaseCollection, initMongoDb } from './db';

const app = express();

const typeDefs = [Schema];

const transactionResolvers = {
  Query: {
    getTransactions: () =>
      transactionCollection()
        .find()
        .toArray()
  },

  Mutation: {
    createTransaction: async (_, { transaction }, context) => {
      const insertedResult = await transactionCollection().insertOne(transaction);
      return await transactionCollection().findOne({ _id: insertedResult.insertedId });
    }
  },

  Transaction: {
    _id: transaction => `${transaction._id}`,
    purchase: transaction => purchases.find(purchase => purchase._id === transaction.purchaseId)
  }
};

const purchaseResolvers = {
  Query: {
    getPurchases: () =>
      purchaseCollection()
        .find()
        .toArray()
  },
  Purchase: {
    _id: purchase => `${purchase._id}`,
    transactions: purchase => transactions.filter(transaction => transaction.purchaseId === purchase._id)
  }
};

const resolvers = merge(transactionResolvers, purchaseResolvers);

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

initMongoDb().then(() => {
  app.listen(port, () => {
    console.log(`Api listening on port: ${port}.`);
  });
});
