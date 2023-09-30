import { useState } from "react";
import { useForm } from "react-hook-form";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../hooks/Context";

const Login = () => {
  const { setUser, setBuses } = useGlobalContext();
  const { register, handleSubmit, reset } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const getInfo = async (userdata) => {
    console.log(userdata);
    try {
      const { data: userData } = await axios.post(
        "http://localhost:8080/api/v1/user/login",
        userdata
      );
      console.log(userData);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      const { data } = await axios.get(
        `http://localhost:8080/api/v1/users/${userData.user._id}/buses`,
        { headers: { Authorization: `Bearer ${userData.token}` } }
      );
      console.log(data);
      const { buses } = data;
      console.log(buses);
      setBuses(buses);
      toast.success("User is Logged In ");
      reset();
    } catch (error) {
      console.log(error.response);
      toast.error(`${error.response.data.error}`);
    }
  };

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          {/* <div className="col-12 col-md-8 col-lg-6 col-xl-5"> */}
          <div className="col-12 col-lg-9 col-xl-6">
            <div className="card shadow-2-strong card-registration">
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Login Form</h3>
                <div className=" d-flex flex-row-reverse ">
                  <NavLink to="/register" className="p-2">
                    Not a user?Register
                  </NavLink>
                </div>
                <form onSubmit={handleSubmit(getInfo)}>
                  <div className="mb-4">
                    <label className="form-label" htmlFor="username">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="form-control form-control-lg"
                      placeholder="Name"
                      required
                      {...register("username", { required: true })}
                    />
                  </div>
                  <div className="mb-4 position-relative">
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                    <input
                      placeholder="***********"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="form-control form-control-lg"
                      required
                      {...register("password", { required: true })}
                    />
                    <button
                      type="button"
                      className="btn position-absolute  end-0 top-50 left-50 right-20 translate-middle-yz"
                      onClick={togglePasswordVisibility}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                      />
                    </button>
                  </div>
                  <div className="d-flex flex-column flex-md-row justify-content-between">
                    <div className="mb-3 mb-md-0">
                      <input
                        className="button btn btn-primary btn-lg"
                        type="submit"
                        value="Submit"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;
