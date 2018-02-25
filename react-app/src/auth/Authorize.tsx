import * as React from 'react';
import { Tabs, Tab, Paper, TextField } from 'material-ui';
import { Field, InjectedFormProps } from 'redux-form';
import { Login } from "./Login";

interface State {
  activeTab: number;
}

interface Props extends InjectedFormProps { }

export class Authorize extends React.Component<Props, State> {
  state: State = {
    activeTab: 0
  };

  render() {
    return (
      <div>
        <Paper>
          <Tabs
            value={this.state.activeTab}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>
        </Paper>
        <Login />
        {this.renderLoginForm()}
      </div>
    );
  }

  renderLoginForm() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <Field
              name="firstName"
              component={(props: any) => (
                <TextField
                  autoFocus={true}
                  label="First Name"
                  fullWidth={true}
                  error={props.meta.touched && props.meta.error}
                />
              )}
            />
          </div>
        </div>
        <div>
          <button type="submit" disabled={pristine || submitting}>Submit</button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
        </div>
      </form>
    );
  }

  handleTabChange = (event, value) => {
    this.setState({
      activeTab: value
    });
  }
}
