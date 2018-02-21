import * as React from 'react';
import { Button, TextField } from "material-ui";
import { connect } from "react-redux";
import { Action } from "redux";
import { loginWithFacebook, loginWithPassword } from "./auth.actions";

interface Props {
  loginWithFacebook: () => Action;
  loginWithPassword: (username: string, password: string) => Action;
}

interface State {
  username: string;
  password: string;
}

class LoginComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: "ioubot",
      password: "password"
    };
  }
  render() {
    return (
      <div>
        <Button variant="raised" color="primary" onClick={this.props.loginWithFacebook}>
          Login with Facebook
        </Button>

        <TextField
          autoFocus={true}
          label="Username"
          value={this.state.username}
          fullWidth={true}
          onChange={(username: React.ChangeEvent<HTMLInputElement>) => this.setState({
            username: username.target.value
          })}
        />
        <TextField
          autoFocus={true}
          label="Password"
          value={this.state.password}
          fullWidth={true}
          onChange={(password: React.ChangeEvent<HTMLInputElement>) => this.setState({
            password: password.target.value
          })}
        />

        <Button variant="raised" color="secondary" onClick={() => this.props.loginWithPassword(this.state.username, this.state.password)}>
          Login
        </Button>
      </div>
    );
  }
}

export const Login = connect(null, { loginWithFacebook, loginWithPassword })(LoginComponent);
