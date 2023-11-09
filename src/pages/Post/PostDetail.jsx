import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './../../assets/css/postdetails.css';
import Navbar from './../../components/Navbar';

const PostDetail = () => {
  const [postItem, setPostItem] = useState(null);
  const { id } = useParams();
  console.log(id);

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
      <div>
        <Navbar />
      </div>
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h4>
              Post Details
              <a href="/posts" className="btn btn-primary btn-sm float-end">
                View Post
              </a>
            </h4>
          </div>
          <section className="section about-section gray-bg" id="about">
            <div className="container">
              <div
                className="row align-items-center flex-row-reverse"
                style={{ marginTop: '-60px' }}
              >
                <div className="col-lg-8">
                  <div className="about-text go-to">
                    <h3 className="dark-color">Post Details</h3>
                    <h6 className="theme-color lead">{postItem?.title}</h6>
                    <div className="row about-list">
                      <div className="col-md-6">
                        <div className="media">
                          <label>Title</label>
                          <p>{postItem?.title}</p>
                        </div>
                        <div className="media">
                          <label>Description</label>
                          <p>{postItem?.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="about-avatar">
                    <img
                      src={`http://127.0.0.1:8000/post-images/${postItem?.image}`}
                      width="200"
                      height="200"
                      style={{ marginLeft: '30px', borderRadius: '100px' }}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default PostDetail;
