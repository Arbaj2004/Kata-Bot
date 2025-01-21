import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BlogNews = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [featuredBlog, setFeaturedBlog] = useState(null); // Initialize as null
  // const [featuredBlogID, setFeaturedBlogID] = useState(null); // Initialize as null
  const navigate = useNavigate();


  const fetchAllBlogs = async () => {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/blogs`;
    try {
      const response = await axios.get(URL);
      setAllBlogs(response.data.data.blogs);
      console.log("Blogs fetched successfully", response.data.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const fetchFeaturedBlog = async () => {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/blogs/featured-blog`;
    try {
      const response = await axios.get(URL);
      const blog = response.data.data.blogs; // Get the featured blog
      setFeaturedBlog(blog);
      // setFeaturedBlogID(blog._id); // Set the featured blog ID
      console.log("Featured blog fetched successfully", blog.title);
    } catch (error) {
      console.error("Error fetching featured blog:", error);
    }
  };

  useEffect(() => {
    fetchAllBlogs();
    fetchFeaturedBlog();
  }, []); // Empty dependency array to ensure it runs only on mount

  if (!featuredBlog) {
    return <p>Loading...</p>; // Render loading state while fetching
  }
  const handleClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  return (
    <div className="max-w-full h-[115vh] bg--700 mx-auto py-8">
      <h2 className="text-5xl font-bold text-center mb-12 pb-3 bg--800 flex justify-center items-center text-orange-800 shadow-md  sm:text-left">
        Blog and News
      </h2>

      {/* Featured Post */}
      <div className="flex flex-col lg:flex-row lg:space-x-8 mb-8 bg--300 justify-evenly items-start">
        <div className="w-[55%] flex justify-center items-center bg--400">
          <img
            src={featuredBlog.image}
            alt={featuredBlog.title}
            className="rounded-lg mb-4 lg:mb-0 w-[100%] h-[45vh] object-cover"
          />
        </div>
        <div className="lg:w-1/3 w-full flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">{featuredBlog.title}</h3>
            <p className="dark:text-slate-300 text-gray-700 mb-4">{featuredBlog.description}</p>
            <p className="text-gray-500">
              {featuredBlog.date} &bull; {featuredBlog.readTime}
            </p>
          </div>
          <div className="flex justify-end mt-4">
            <a href="/all-blogs" className="text-blue-500 hover:text-blue-700 flex items-center">
              See More
              <span className="ml-2">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Other Posts */}
      <div className="flex justify-around items-center sm:grid-cols-2 lg:grid-cols-3 bg--500 w-[100vw]">
        {allBlogs.slice(1, 4).map((post, index) => (
          <div key={index} className="flex flex-col dark:bg-blue-950 border-white border-2  rounded-lg shadow-lg overflow-hidden w-[28vw]">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover sm:h-56 lg:h-48"
            />
            <div className="p-4 flex flex-col justify-between h-full">
              <h4 className="text-lg font-semibold mb-2 hover:text-blue-700 cursor-pointer" key={post._id}
            onClick={() => handleClick(post._id)}>{post.title}</h4>
              <p className="text-gray-500 text-sm">
                {post.date} &bull; {post.readTime}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogNews;
