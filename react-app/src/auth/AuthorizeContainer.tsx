import { reduxForm } from "redux-form";
import { Authorize } from "./Authorize";

export const AuthorizeContainer = reduxForm({ form: 'authform' })(Authorize);
