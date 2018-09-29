import express from 'express';
import graphqlHTTP from 'express-graphql';
import Schema from './schema.graphql';
import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';
import { transactionCollection, purchaseCollection, initMongoDb } from './db';
import cors from 'cors';
import { currencyHelper } from './currencies/currency-helper';

const app = express();

app.use(cors());

const transactionResolvers = {
  Query: {
    getTransactions: () =>
      transactionCollection()
        .find()
        .limit(30)
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
    purchase: ({ purchaseTransactionLinkUUID }) => purchaseCollection().find({ purchaseTransactionLinkUUID }),
    transactionDate: transaction => ({
      iso: transaction.transactionDate.toISOString(),
      timestamp: transaction.transactionDate
    }),
    amount: ({ amount }) => parseInt(amount, 10),
    currency: ({ currencyId }) => currencyHelper.buildCurrency(currencyId),
    formattedAmount: ({ amount, currencyId }) => currencyHelper.formatAmount(parseInt(amount, 10), currencyId)
  }
};

const purchaseResolvers = {
  Query: {
    getPurchases: () =>
      purchaseCollection()
        .find()
        .limit(10)
        .toArray()
  },
  Purchase: {
    _id: purchase => `${purchase._id}`,
    transactions: ({ purchaseTransactionLinkUUID }) =>
      transactionCollection()
        .find({ purchaseTransactionLinkUUID })
        .toArray()
  }
};

const typeDefs = [Schema];
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
