import { useFormik } from 'formik';
import * as Yup from 'yup';
import './../../assets/css/style.css';

const initialValues = {
  email: '',
  password: '',
};

const signUpSchema = Yup.object({
  email: Yup.string().email().required('please enter your email'),
  password: Yup.string().min(6).required('please enter your password'),
});

const Login = () => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values, action) => {
        console.log(values);
        action.resetForm();
      },
    });
  console.log(errors);
  return (
    <>
      <div className="wrapper">
        <div className="modal">
          <div className="modal-container">
            <div className="modal-left">
              <h1 className="modal-title">welcome!</h1>
              <p className="modal-desc">
                To the technical website for programmers.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="input-box">
                  <label htmlFor="name" className="input-label">
                    Email
                  </label>
                  <input
                    type="email"
                    autoComplete="off"
                    name="email"
                    id="email"
                    placeholder="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.email && touched.email ? (
                  <p className="form-error">{errors.email}</p>
                ) : null}
                <div className="input-box">
                  <label htmlFor="name" className="input-label">
                    Password
                  </label>
                  <input
                    type="password"
                    autoComplete="off"
                    name="password"
                    id="password"
                    placeholder="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {errors.password && touched.password ? (
                  <p className="form-error">{errors.password}</p>
                ) : null}
                <div className="modal-button">
                  <button className="btn btn-primary" type="submit">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
