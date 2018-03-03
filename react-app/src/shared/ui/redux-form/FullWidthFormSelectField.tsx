import * as React from 'react';
import { Select } from 'redux-form-material-ui';

export const FullWidthFormSelectField = props => (
  <Select {...props} fullWidth={true}>
    {props.children}
  </Select>
);
