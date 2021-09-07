import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectSearchInput, setBlogData } from "../features/userSlice";
import { useDispatch } from "react-redux";
import "../styling/blogs.css"

const Blogs = () => {
  const searchInput = useSelector(selectSearchInput);
  const blog_url = `https://gnews.io/api/v4/search?q=${searchInput}&token=079bd3b5c2e86ed2b9a0761f84cfe846`;
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(blog_url)
      .then((response) => {
        dispatch(setBlogData(response?.data));
        setBlogs(response?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchInput]);
  return (
    <div className="blog__page">
      <h1 className="blog__page__header">Blogs</h1>
      {loading ? <h1 className="loading">Loading ...</h1> : ""}
      <div className="blogs">
        {blogs?.articles?.map((blog) => (
          <a className="blog" target="_blank" href={blog.url}>
            <img src={blog.image} />
            <div>
              <h3 className="sourceName">
                <span>{blog.source.name}</span>
                <p>{blog.publishedAt}</p>
              </h3>
              <h1>{blog.title}</h1>
              <p>{blog.description}</p>
            </div>
          </a>
        ))}

        {blogs?.totalArticles == 0 && (
          <h1 className="no__blogs">
            No blogs available 😞. Search something else to read blogs on the
            greatest platform.
          </h1>
        )}
      </div>
    </div>
  );
};

export default Blogs;
