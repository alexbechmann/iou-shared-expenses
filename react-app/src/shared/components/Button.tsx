import * as React from 'react';
import { CircularProgress, Button as MaterialUIButton } from "material-ui";
import { ButtonProps } from "material-ui/Button";

interface Props extends ButtonProps {
  loading: boolean;
}

export const Button = (props: Props) => {
  const subProps = Object.assign({}, props);
  subProps.disabled = props.loading;
  return (
    <MaterialUIButton variant="raised" {...subProps} >
      {!props.loading ? (
        props.children
      ) : (
        <CircularProgress size={24} />
      )}
    </MaterialUIButton>
  );
};
