import { useFormik } from 'formik';
import * as Yup from 'yup';
import './../../assets/css/style.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  email: '',
  password: '',
};

const signInSchema = Yup.object({
  email: Yup.string().email().max(191).required('please enter your email'),
  password: Yup.string().min(6).required('please enter your password'),
});

const Login = () => {
  const navigate = useNavigate();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signInSchema,
      onSubmit: (values, action) => {
        console.log(values);
        fetch("http://127.0.0.1:8000/api/login", {
          body: JSON.stringify({
            ...values,
          }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
        })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          if(response?.status === 200){
            localStorage.setItem('auth_token', response.token);
            localStorage.setItem('auth_name', response.name);
            Swal.fire('Success', response.message, 'success');
            navigate('/dashboard');
            action.resetForm();
          }else{
            Swal.fire('Warning', response.errors, 'warning');
            navigate('/login');
          }
        })
        //action.resetForm();
      },
    });
  console.log(errors);
  return (
    <>
      <div className="wrapper">
        <div className="header">
          <h1>Login</h1>
        </div>
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
    </>
  );
};

export default Login;
