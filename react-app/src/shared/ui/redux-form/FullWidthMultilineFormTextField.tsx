import * as React from 'react';
import { TextField } from 'redux-form-material-ui';
import { MenuItem } from 'material-ui';

interface Props {
  helperText: string;
  options: { label: string; value: string }[];
  [extraProps: string]: any;
}

export const FullWidthMultilineFormTextField = (props: Props & any) => (
  <TextField {...props} select={true} helperText={props.helperText} margin="normal">
    {props.options.map(option => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </TextField>
);
