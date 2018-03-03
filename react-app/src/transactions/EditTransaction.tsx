import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Action } from 'redux';
import { Transaction } from '@shared/schema';
import { InjectedFormProps, Field } from 'redux-form';
import { Button } from 'material-ui';
import { FullWidthFormTextField, FullWidthMultilineFormTextField } from '@shared/ui/redux-form';
import { nameof } from '@iou/core';

interface RouteParameters {
  id: number;
  type: string;
}

export interface EditTransactionProps {
  friends: Parse.User[];
  gettingFriends: boolean;
}

export interface EditTransactionDispatchProps {
  saveTransaction: (transaction: Transaction) => Action;
}

interface Props
  extends RouteComponentProps<RouteParameters>,
    EditTransactionProps,
    EditTransactionDispatchProps,
    InjectedFormProps {}

export class EditTransaction extends React.Component<Props> {
  render() {
    const { type, id } = this.props.match.params;
    return (
      <span>
        {id} {type}
      </span>
    );
  }

  renderForm() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleOnSubmit)}>
          <Field
            name={nameof<Transaction>('title')}
            component={FullWidthFormTextField}
            type="text"
            placeholder="Title"
            label="Title"
          />

          <Field
            name={nameof<Transaction>('fromUser')}
            component={FullWidthMultilineFormTextField}
            type="text"
            placeholder="Title"
            label="Title"
          />

          <Button variant="raised" color="primary" type="submit" disabled={pristine || submitting}>
            Save
          </Button>
          <Button variant="raised" type="submit" disabled={pristine || submitting} onClick={reset}>
            Clear
          </Button>
        </form>
        {this.renderError()}
      </div>
    );
  }

  handleOnSubmit(transaction: Transaction) {
    console.log(transaction);
  }

  renderError() {
    return <span />;
  }
}
