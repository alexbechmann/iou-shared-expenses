import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const query = gql(`
{
  transactions: getTransactions{
    _id,
    title
  }
}
`);

export default () => (
  <Query query={query}>
    {({ loading, error, data }) => {
      if (error) {
        return <p>{`Error! ${error.message}`} </p>;
      } else if (loading) {
        return <div>loading</div>;
      } else {
        return (
          <div>
            {data.transactions.map(transaction => {
              return <p key={transaction._id}>{transaction.title}</p>;
            })}
          </div>
        );
      }
    }}
  </Query>
);
