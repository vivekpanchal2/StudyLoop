import { useState, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

const SearchCoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

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

  // Dummy autocomplete suggestions based on popular topics
  const allSuggestions = popularTopics.map((topic) => topic.name);
  const filteredSuggestions = allSuggestions.filter((s) =>
    s.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search submitted:", searchQuery);
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-gradient-to-r from-richblack-900 to-blue-900 flex flex-col items-center pt-24 px-6 text-richblack-100 relative">
      {/* Main Content */}
      <div
        className={`${
          isFocused ? "filter blur-sm" : ""
        } transition-all duration-300 w-full max-w-3xl text-center`}
      >
        <h1 className="text-5xl font-extrabold text-blue-400 mb-4 drop-shadow-lg">
          Unlock Your Coding Potential
        </h1>
        <p className="text-lg font-medium text-richblack-300 mb-10">
          Dive into our curated selection of courses and start building the
          future with code.
        </p>
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <div className="relative w-full">
            <FiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl text-richblack-400" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search for courses, technologies..."
              className="w-full py-4 pl-14 pr-6 text-lg bg-richblack-800 rounded-full border border-richblack-700 focus:border-blue-400 focus:outline-none placeholder-richblack-400 transition-all duration-300 shadow-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
            />
          </div>
        </form>
      </div>

      <div
        className={`${
          isFocused ? "filter blur-sm" : ""
        } transition-all duration-300 mt-10 w-full max-w-4xl`}
      >
        <h3 className="text-center text-2xl font-semibold text-richblack-300 mb-4">
          Trending Topics
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          {popularTopics.map((topic) => (
            <Link
              to={topic.path}
              key={topic.name}
              className="relative font-medium text-[18px] tracking-[0.05em] rounded-[0.8em] cursor-pointer border   bg-gradient-to-r from-[#8e2de2] to-[#4a00e0] text-white overflow-hidden active:scale-95 transition-all duration-300 flex items-center justify-center px-6 py-4
                   before:content-[''] before:absolute before:top-0 before:right-[-10%] before:w-[120%] before:h-full before:bg-black before:skew-x-[-30deg] before:transition-transform before:duration-[400ms] before:ease-[cubic-bezier(0.3,1,0.8,1)]
                   hover:before:-translate-x-full hover:text-white"
            >
              <span className="relative z-10">{topic.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Search Overlay for Autocomplete */}
      {isFocused && (
        <div
          className="fixed inset-0 z-20 flex flex-col items-center justify-start pt-24 bg-black bg-opacity-50 backdrop-blur-md"
          onClick={() => setIsFocused(false)}
        >
          <div
            className="w-full max-w-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <div className="relative w-full">
                <FiSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl text-richblack-400" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search for courses, technologies..."
                  className="w-full py-4 pl-14 pr-6 text-lg bg-richblack-800 rounded-full border border-richblack-700 focus:border-blue-400 focus:outline-none placeholder-richblack-400 transition-all duration-300 shadow-xl"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                />
              </div>
            </form>
            {filteredSuggestions.length > 0 && (
              <div className="absolute mt-2 w-full bg-richblack-800 rounded-lg shadow-lg z-30">
                {filteredSuggestions.map((s, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer"
                    onClick={() => {
                      setSearchQuery(s);
                      setIsFocused(false);
                    }}
                  >
                    {s}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchCoursesPage;
