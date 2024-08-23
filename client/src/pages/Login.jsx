import LoginForm from "../components/core/Auth/LoginForm";
import { useSelector } from "react-redux";

function Login() {
  const { loading } = useSelector((state) => state.auth);

  return (
    <div className="flex  justify-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="mx-auto flex w-11/12 max-w-maxContent justify-center gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12 my-10">
          <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
            <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
              Welcome Back !
            </h1>
            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
              <span className="text-richblack-100">
                Build skills for today, tomorrow, and beyond.
              </span>
              <span className="font-edu-sa font-bold italic text-blue-100">
                Education to future-proof your career
              </span>
            </p>
            <LoginForm />
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
