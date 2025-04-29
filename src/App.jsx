import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Blog from "./components/Blog/Blog";
import BlogContent from "./components/BlogContent/BlogContent";
import HomePage from "./components/HomePage/HomePage";
import { useEffect, useState } from "react";
import axios from "axios";
import "./global.css";

function App() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          `https://strapi-backend-f2jr.onrender.com/api/blogs?populate=*`,
          {
            headers: {
              Authorization: `Bearer ${process.env.API_TOKEN}`,
            },
          }
        );
        const formattedBlogs = res.data.data.map((item) => ({
          id: item.id,
          link: item.attributes.BlogLink,
        }));
        setBlogs(formattedBlogs);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Static Routes First */}
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<Blog blogs={blogs} />} />

          {/* Dynamic Blog Route (Must be last to avoid conflict) */}
          <Route path="/:blogLink" element={<BlogContent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
