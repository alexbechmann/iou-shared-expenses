import * as React from 'react';
import { TextField } from 'redux-form-material-ui';

export const FullWidthFormTextField = props => (
  <TextField {...props} fullWidth={true}>
    {props.children}
  </TextField>
);
