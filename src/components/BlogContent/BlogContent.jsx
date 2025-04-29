import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./BlogContent.css";
import Markdown from "react-markdown";

const BlogContent = () => {
  // Extract the 'blogLink' from the URL parameters
  const { "*": blogLink } = useParams();

  // State to hold the blog data and a flag for 'not found' status
  const [blog, setBlog] = useState(null);
  const [notFound, setNotFound] = useState(false);
  // const API_BASE_URL = process.env.REACT_APP_API_URL;

  // Fetch blog data from the API when the component mounts or when blogLink changes
  useEffect(() => {

    const fetchBlog = async () => {
      try {
        // Make a GET request to fetch the blog by blogLink
        const res = await axios.get(
          `https://strapi-backend-f2jr.onrender.com/api/blogs?filters[BlogLink][$eq]=${blogLink}&populate=*`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`, // Replace YOUR_API_KEY with the actual API key
            },
          }
        );

        const data = res.data.data; // Get the data array

        if (data && data.length > 0) {
          setBlog(data[0]); // If blog is found, set the blog data
        } else {
          setNotFound(true); // If no blog is found, set 'notFound' to true
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
        setNotFound(true); // If there is an error, set 'notFound' to true
      }
    };

    fetchBlog();
  }, [blogLink]); // Re-run the effect when the blogLink changes

  // Show loading state while the blog data is being fetched
  if (!blog && !notFound) return <p>Loading...</p>;

  // Show a "Blog not found" message if the blog is not found
  // if (notFound) return <p>Blog not found.</p>;

  // Destructure the blog data to get the title, image, and content
  const { BlogTitle, BlogImg, BlogContent } = blog;

  // Get the image URL from BlogImg, if it exists
  const imgUrl = BlogImg?.url
    ? `https://strapi-backend-f2jr.onrender.com${BlogImg.url}`
    : null;

  return (
    <div className="blogContent-container">
      {/* Display the blog image if it exists */}
      <div className="blogContent-imgContainer">
        {imgUrl && <img src={imgUrl} alt={BlogTitle} />}
      </div>

      {/* Display the blog title */}
      <h1>{BlogTitle}</h1>

      <div className="blogContent-wrapper">
        <Markdown>{BlogContent}</Markdown>
      </div>
    </div>
  );
};

export default BlogContent;
