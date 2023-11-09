import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Navbar from './../../components/Navbar';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

const handlePostDelete = (e, id) => {
  e.preventDefault();
  const Clicked = e.currentTarget;
  Clicked.innerText = 'deleting';

  if(confirm(`Are you sure you want to delete this post id ${id} ?`)){
    fetch(`http://127.0.0.1:8000/api/posts/${id}`, {
      headers: {
        Accept: 'application/json',
      },
      method: 'DELETE',
    })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      Clicked.closest('tr').remove();
    })
    .catch((error) => {
      console.error(error);
      setLoading(false);
    });
  }
};

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
      <Navbar/>
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
                            <Link
                              className="btn btn-warning mx-2 btn-sm"
                              type="button"
                              to="/post-create"
                            >
                              Create
                            </Link>
                            <Link
                              className="btn btn-secondary mx-2 btn-sm"
                              type="button"
                              to={`/post-view/${postItem?.id}`}
                            >
                              View
                            </Link>
                            <Link
                              className="btn btn-primary mx-2 btn-sm"
                              type="button"
                              to={`/post-edit/${postItem?.id}`}
                            >
                              Edit
                            </Link>
                            <Link
                              className="btn btn-danger mx-2 btn-sm"
                              type="button"
                              //to={`/post-delete/${postItem?.id}`}
                              onClick={(e) => handlePostDelete(e, postItem?.id)}
                            >
                              Delete
                            </Link>
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
