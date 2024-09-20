import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "../src/pages/Home";
import Navbar from "./components/common/Navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import VerifyEmail from "../src/pages/VarifyEmail";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Settings from "./components/core/Dashboard/setting";
import Cart from "./components/core/Dashboard/Cart";
import AddCourse from "./components/core/Dashboard/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";
import ForgotPassword from "./pages/ForgotPassword";
import Catalog from "./pages/Catalog";
import Instructor from "./components/core/Dashboard/InstructorDashBoard/Instructor";

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/catalog/:catalogName" element={<Catalog />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route
            path="/dashboard/enrolled-courses"
            element={<EnrolledCourses />}
          />
          <Route path="/dashboard/instructor" element={<Instructor />} />
          <Route path="/dashboard/cart" element={<Cart />} />
          <Route path="/dashboard/add-course" element={<AddCourse />} />
          <Route path="/dashboard/my-courses" element={<MyCourses />} />
          <Route
            path="/dashboard/edit-course/:courseId"
            element={<EditCourse />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
