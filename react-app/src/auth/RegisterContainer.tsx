import { reduxForm } from "redux-form";
import { Register, RegisterDispatchProps } from "./Register";
import { connect } from "react-redux";
import { register } from "./auth.actions";

const mapDispatchToProps: RegisterDispatchProps = { register };

export const RegisterContainer = reduxForm({ form: 'authform', destroyOnUnmount: false })(
  connect(null, mapDispatchToProps)(Register)
);
