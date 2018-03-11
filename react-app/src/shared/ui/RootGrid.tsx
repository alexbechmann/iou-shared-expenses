import * as React from 'react';
import { Grid } from 'material-ui';

export const RootGrid = props => (
  <Grid container={true} spacing={24} className="root container" justify="center">
    <Grid item={true} xs={12} sm={7} md={6} lg={4}>
      {props.children}
    </Grid>
  </Grid>
);
