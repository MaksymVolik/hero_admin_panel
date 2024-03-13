// import { v4 as uuidv4 } from 'uuid';
import { Formik, Form, Field, ErrorMessage } from "formik";

const LoginForm = ({ title, initialValues, validationSchema, handleClick }) => {
  const isLogin = title === "login";

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        handleClick(values);
        resetForm();
      }}
    >
      <Form className="form-floating border p-4 shadow-lg rounded mx-auto login">
        {isLogin ? null : (
          <div className="form-floating mb-3">
            <Field
              id="username"
              name="username"
              type="text"
              className="form-control"
              placeholder="Name"
              autoComplete="on"
            />
            <label htmlFor="username" className="form-label">
              Name
            </label>
            <ErrorMessage className="error" name="username" component="div" />
          </div>
        )}

        <div className="form-floating mb-3">
          <Field
            id="email"
            name="email"
            type="email"
            className="form-control"
            placeholder="Email"
            autoComplete="on"
          />
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <ErrorMessage className="error" name="email" component="div" />
        </div>

        <div className="form-floating mb-3">
          <Field
            id="password"
            name="password"
            type="password"
            className="form-control"
            placeholder="Password"
          />
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <ErrorMessage className="error" name="password" component="div" />
        </div>
        <div className="d-grid mt-4">
          <button type="submit" className="btn btn-primary">
            {isLogin ? "Log in" : "Create account"}
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default LoginForm;
