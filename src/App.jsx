import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Blog from "./components/Blog/Blog";
import BlogContent from "./components/BlogContent/BlogContent";
import { useEffect, useState } from "react";
import axios from "axios";
import "./global.css";
import HomePage from "./components/HomePage/HomePage";

function App() {
  const [blogs, setBlogs] = useState([]);
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/blogs?populate=*`
        );
        const formattedBlogs = res.data.data.map((item) => ({
          id: item.id,
          link: item.attributes.BlogLink,
        }));
        setBlogs(formattedBlogs); // Keep using setBlogs
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };

    fetchBlogs();
  }, [API_BASE_URL]);


  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<Blog blogs={blogs} />} />
          <Route path="*" element={<BlogContent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
