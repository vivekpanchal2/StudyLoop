import { useState, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

const SearchCoursesPage = () => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");

  const popularTopics = [
    { name: "MERN Stack", path: "/catalog/mern" },
    { name: "AI & Machine Learning", path: "/catalog/ai" },
    { name: "Cloud Computing", path: "/catalog/cloud" },
    { name: "Data Science", path: "/catalog/data-science" },
    { name: "Cybersecurity", path: "/catalog/cybersecurity" },
    { name: "DevOps", path: "/catalog/devops" },
    { name: "Mobile Development", path: "/catalog/mobile" },
    { name: "Web3 & Blockchain", path: "/catalog/web3" },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search submitted:", searchQuery);
  };

  return (
    <div className="min-h-screen bg-richblack-900 flex flex-col items-center justify-start pt-20 px-4">
      {/* Animated Search Container */}
      <div
        className={`w-full max-w-2xl transition-all duration-500 ${
          isFocused ? "scale-110 -translate-y-12" : ""
        }`}
      >
        <form onSubmit={handleSearchSubmit} className="relative">
          <div
            className={`absolute inset-0 bg-richblack-800 blur-lg opacity-30 transition-opacity ${
              isFocused ? "opacity-50" : ""
            }`}
          ></div>
          <div className="relative">
            <FiSearch
              className={`absolute left-4 top-1/2 -translate-y-1/2 text-2xl ${
                isFocused ? "text-blue-200" : "text-richblack-400"
              } transition-all duration-300`}
            />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search courses, technologies, or topics..."
              className="w-full py-6 pl-14 pr-6 text-lg bg-richblack-800/70 backdrop-blur-sm rounded-2xl border-2 border-richblack-700 focus:border-blue-300 focus:outline-none text-richblack-100 placeholder-richblack-400 transition-all duration-300"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
      </div>

      {/* Popular Topics Grid */}
      <div className="mt-16 w-full max-w-4xl">
        <h3 className="text-richblack-300 text-center mb-8 text-xl font-medium">
          Popular Learning Paths
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {popularTopics.map((topic) => (
            <Link
              to={topic.path}
              key={topic.name}
              className="group relative p-4 bg-richblack-800 rounded-xl hover:bg-richblack-700 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
              <span className="text-richblack-100 group-hover:text-blue-300 transition-colors duration-300 font-medium">
                {topic.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-richblack-600 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 5}s infinite`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SearchCoursesPage;
