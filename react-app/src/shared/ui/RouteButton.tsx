import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'material-ui';
import { ButtonProps } from 'material-ui/Button';

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
