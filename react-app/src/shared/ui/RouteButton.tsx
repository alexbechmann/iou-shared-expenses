import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { ButtonProps } from '@material-ui/core/Button';

interface Props extends ButtonProps {
  to: string;
}

export const RouteButton = (props: Props) => {
  const RouteLink = (p: any) => <Link {...p} />;
  return (
    <Button {...props} component={RouteLink}>
      {props.children}
    </Button>
  );
};
