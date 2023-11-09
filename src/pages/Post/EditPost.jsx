import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const initialValues = {
  title: '',
  description: '',
  image: '',
};

const editPostSchema = Yup.object({
  title: Yup.string().max(100).required(),
  description: Yup.string().max(1000).required(),
  image: Yup.mixed()
    .nullable()
    .test(
      'FILE_SIZE',
      'Upload File is too big',
      (value) => !value || (value && value.size <= 1048 * 2048)
    )
    .required(),
});

const EditPost = () => {
  const navigate = useNavigate();
  const [postItem, setPostItem] = useState(null);
  const { id } = useParams();

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
    validationSchema: editPostSchema,
    onSubmit: (values, action) => {
      const formData = new FormData();
      formData.append('_method', 'PUT');
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('image', values.image);
      console.log(formData);

      fetch(`http://127.0.0.1:8000/api/posts/${id}`, {
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
            navigate(`/post-edit/${id}`);
          }
        });
      //action.resetForm();
    },
  });

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/posts/${id}`, {
      headers: {
        Accept: 'application/json',
      },
      method: 'GET',
    })
      .then((response) => response.json())
      .then((response) => {
        console.info(response);
        if (response?.status === 200) {
          console.info(response);
          setPostItem(response?.data);
        } else {
          setPostItem(null);
        }
      });
  }, [id]);

  return (
    <>
      <div className="d-flex">
        <div className="col overflow-hidden">
          <div className="container-fluid px-4">
            <form onSubmit={handleSubmit}>
              <div className="card mt-4">
                <div className="card-header">
                  <h4>
                    Post Edit
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
                          onChange={handleChange}
                          value={values?.title || ''}
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
                          onChange={handleChange}
                          value={values?.description || ''}
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

export default EditPost;
