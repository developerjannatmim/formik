import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './../../assets/css/style.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const signUpSchema = Yup.object({
  name: Yup.string().min(2).max(25).required('please enter your name'),
  email: Yup.string().email().required('please enter your email'),
  password: Yup.string().min(6).required('please enter your password'),
});

const Registration = () => {
  const navigate = useNavigate();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values, action) => {
        console.log(values);
        fetch('http://127.0.0.1:8000/api/register', {
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
            if (response?.status === 200) {
              localStorage.setItem('auth_token', response.token);
              localStorage.setItem('auth_name', response.user_name);
              console.log(response);
              action.resetForm();
              Swal.fire('Success', response.message, 'success');
              navigate('/dashboard');
            } else {
              Swal.fire('Warning', response.errors, 'warning');
              navigate('/register');
            }
          });
        //action.resetForm();
      },
    });
  console.log(errors);
  return (
    <div className="wrapper">
      <div className="header">
        <h1>Register</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <label htmlFor="name" className="input-label">
            Name
          </label>
          <input
            type="name"
            autoComplete="off"
            name="name"
            id="name"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errors.name && touched.name ? (
          <p className="form-error">{errors.name}</p>
        ) : null}
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
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
