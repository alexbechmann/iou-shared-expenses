import { MongoClient, Db } from 'mongodb';
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const dbName = 'iou';
let db: Db;

export const initMongoDb = () =>
  new Promise((resolve, reject) => {
    MongoClient.connect(
      url,
      (err, client) => {
        assert.equal(null, err);
        console.log('Connected successfully to server');
        db = client.db(dbName);
        resolve(db);
        //client.close();
      }
    );
  });

export const transactionCollection = () => db!.collection('transactions');
export const purchaseCollection = () => db!.collection('purchases');
