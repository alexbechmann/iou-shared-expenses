import * as React from 'react';
import { RouteComponentProps } from 'react-router';

interface RouteParameters {
  id: number;
  type: string;
}

interface Props extends RouteComponentProps<RouteParameters> { }

export class EditTransaction extends React.Component<Props> {
  render() {
    const { type, id } = this.props.match.params;
    return (
      <span>{id} {type}</span>
    );
  }
}
