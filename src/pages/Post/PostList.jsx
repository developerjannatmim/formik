import React, { useState, useEffect } from 'react';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/posts?', {
      headers: {
        Accept: 'application/json',
      },
      method: 'GET',
    })
      .then((response) => response.json())
      .then((response) => {
        if (response?.status === 200) {
          console.log(response);
          setPosts(response?.data);
        } else {
          setPosts(null);
          setLoading(false);
        }
      });
  }, [loading]);

  return (
    <div>
      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Navbar
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/dashboard">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/posts">
                    Post
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <section className="ftco-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center mb-5">
              <h2 className="heading-section">Post Table</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="table-wrap">
                <table className="table table-bordered table-dark table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Picture</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts?.map((postItem, index) => {
                      return (
                        <tr key={index}>
                          <td>{postItem?.id}</td>
                          <td>{postItem?.title}</td>
                          <td>{postItem?.description}</td>
                          <td>
                            <img
                              src={`http://127.0.0.1:8000/post-images/${postItem?.image}`}
                              width="50"
                              height="50"
                              alt="post-image"
                              style={{ borderRadius: '150px' }}
                            />
                          </td>
                          <td>
                            <a
                              className="btn btn-warning mx-2 btn-sm"
                              type="button"
                              href="/post-create"
                            >
                              Create
                            </a>
                            <a
                              className="btn btn-secondary mx-2 btn-sm"
                              type="button"
                            >
                              View
                            </a>
                            <a
                              className="btn btn-primary mx-2 btn-sm"
                              type="button"
                            >
                              Edit
                            </a>
                            <a
                              className="btn btn-danger mx-2 btn-sm"
                              type="button"
                            >
                              Delete
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PostList;
