import React, { useEffect, useState } from "react";
import "./Blog.css";
import { Link } from "react-router-dom";
import axios from "axios";

const BlogCard = () => {
  const [blogs, setBlogs] = useState([]);
  // const API_BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {

    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          `https://strapi-backend-f2jr.onrender.com/api/blogs?populate=*`,
          {
            headers: {
              Authorization: `Bearer cc9ae51c0a62b1e5f0088f2c313517fd0185226b3fb53738e9038a6c971154225adf50e8bb31e8c34cf027affb988a111edcfd596818d7e1498224676dbf0ef85dac0d07733f42f333a5c11a39486f963c9fdeee936f429cfc8592cdf052ef4f687f682d4129f2a5d4b43e182ddd620cdf8b4f23460948d396d6b012d91ba923`, // Replace YOUR_API_KEY with the actual API key
            },
          }
        );
        console.log("Token used:", process.env.REACT_APP_API_TOKEN);
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
