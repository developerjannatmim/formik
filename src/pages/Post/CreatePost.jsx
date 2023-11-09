import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Navbar from './../../components/Navbar';

const initialValues = {
  title: '',
  description: '',
  image: '',
};

const createPostSchema = Yup.object({
  title: Yup.string().max(100).required('Enter your post title'),
  description: Yup.string().max(1000).required('Enter your post description'),
  image: Yup.mixed()
    .nullable()
    .test(
      'FILE_SIZE',
      'UPLOAD FILE IS TOO BIG',
      (value) => !value || (value && value.size <= 1024 * 2048)
    )
    .required('Enter your post image'),
});

const CreatePost = () => {
  const navigate = useNavigate();
  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: createPostSchema,
    onSubmit: (values, action) => {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('image', values.image);
      console.log(formData);

      fetch('http://127.0.0.1:8000/api/posts', {
        body: formData,
        headers: {
          Accept: 'application/json',
        },
        method: 'POST',
      })
        .then((response) => response.json())
        .then((response) => {
          if (response?.status === 200) {
            console.log(response);
            Swal.fire('Success', response.message, 'success');
            navigate('/posts');
          } else {
            Swal.fire('Warning', response.errors, 'warning');
            navigate('/post-create');
          }
        });
      //action.resetForm();
    },
  });
  console.log(errors);
  return (
    <>
    <div>
      <Navbar/>
    </div>
      <div className="d-flex">
        <div className="col overflow-hidden">
          <div className="container-fluid px-4">
            <form onSubmit={handleSubmit}>
              <div className="card mt-4">
                <div className="card-header">
                  <h4>
                    Post List
                    <a
                      href="/posts"
                      className="btn btn-primary btn-sm float-end"
                    >
                      View Post
                    </a>
                  </h4>
                </div>
                <div className="card-body">
                  <div className="tab-content" id="myTabContent">
                    <div
                      className="tab-pane fade show active card-body border"
                      id="home"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                    >
                      <div className="form-group mb-3">
                        <label>Title</label>
                        <input
                          type="text"
                          autoComplete="off"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.title || ''}
                          name="title"
                          className="form-control"
                        />
                      </div>
                      <small className="text-danger mt-5">
                        {errors.title && touched.title ? (
                          <p className="form-error">{errors.title}</p>
                        ) : null}
                      </small>
                      <div className="form-group mb-3">
                        <label>Description</label>
                        <textarea
                          type="text"
                          autoComplete="off"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.description || ''}
                          name="description"
                          className="form-control"
                        />
                      </div>
                      <small className="text-danger mt-5">
                        {errors.description && touched.description ? (
                          <p className="form-error">{errors.description}</p>
                        ) : null}
                      </small>
                      <div className="form-group mb-3">
                        <label>Image</label>
                        <input
                          type="file"
                          onChange={(event) => {
                            setFieldValue(
                              'image',
                              event.currentTarget.files[0]
                            );
                          }}
                          className="form-control"
                        />
                      </div>
                      <small className="text-danger mt-5">
                        {errors.image && touched.image ? (
                          <p className="form-error">{errors.image}</p>
                        ) : null}
                      </small>
                      <button type="submit" className="btn btn-primary px-4">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
