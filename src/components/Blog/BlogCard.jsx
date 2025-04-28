import React, { useEffect, useState } from "react";
import "./Blog.css";
import { Link } from "react-router-dom";
import axios from "axios";

const BlogCard = () => {
  const [blogs, setBlogs] = useState([]);
  // const API_BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const apiToken = process.env.API_TOKEN;

    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          `https://strapi-backend-f2jr.onrender.com/api/blogs?populate=*`,
          {
            headers: {
              Authorization: `Bearer ${apiToken}`, // Replace YOUR_API_KEY with the actual API key
            },
          }
        );
        console.log("Raw Blog Data:", res.data.data); // optional for debugging

        const formattedBlogs = res.data.data.map((item) => ({
          id: item.id,
          title: item.BlogTitle,
          desp: item.BlogDesp,
          img: `https://strapi-backend-f2jr.onrender.com` + item.BlogImg?.url,
          link: item.BlogLink,
        }));

        setBlogs(formattedBlogs);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="blogCard-container">
      {blogs.map((x) => (
        <div className="blogCard-content" key={x.id}>
          <div className="blogCard-imgContainer">
            <img src={x.img} alt={x.title} />
          </div>
          <div className="blogCard-textContent">
            <h3>{x.title}</h3>
            <p>{x.desp}</p>
            <Link to={`/${x.link.replace(/^\//, "")}`}>View More</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogCard;
