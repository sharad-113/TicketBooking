import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import axios from "axios";
import { useGlobalContext } from "../hooks/Context";
const Register = () => {
  const { setUser, setBuses } = useGlobalContext();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
  };

  const getInfo = async (userdata) => {
    console.log(userdata);
    try {
      const { data: userData } = await axios.post(
        "http://localhost:8080/api/v1/user/registration",
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
      toast.success("User is registered");
      reset();
    } catch (error) {
      console.log(error.response);
      toast.error(`${error.response.data.error}`);
    }
  };

  return (
    <section className="gradient-custom">
      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          {/* <div className="col-12 col-md-8 col-lg-6 col-xl-5"> */}
          <div className="col-12 col-lg-9 col-xl-6">
            <div className="card shadow-2-strong card-registration">
              <div className="card-body p-4 p-md-5">
                <div className="row">
                  <h3 className=" text-center">Registration Form</h3>
                </div>
                <div className=" d-flex flex-row-reverse ">
                  <NavLink to="/login" className="p-2">
                    Already a user?Login
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
                  <div className="mb-4">
                    <label className="form-label" htmlFor="emailAddress">
                      Email
                    </label>
                    <input
                      type="email"
                      id="emailAddress"
                      className="form-control form-control-lg"
                      placeholder="abc@gmail.com"
                      {...register("email", { required: true })}
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
                  <div className="mb-4 ">
                    <div className="form-outline position-relative">
                      <label className="form-label" htmlFor="confirmPassword">
                        ConfirmPassword
                      </label>
                      <input
                        id="confirmPassword"
                        placeholder="************"
                        type={showConfirmPassword ? "text" : "password"}
                        className="form-control form-control-lg"
                        required
                        {...register("confirmPassword", {
                          required: true,
                          validate: (val) => {
                            if (watch("password") != val) {
                              return "Your password does not match";
                            }
                          },
                        })}
                      />
                      {errors.confirmPassword?.type === "validate" && (
                        <span>Password do not match</span>
                      )}
                      <button
                        type="button"
                        className="btn position-absolute  end-0 top-50 left-50 right-20 translate-middle-yz"
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        <FontAwesomeIcon
                          icon={showConfirmPassword ? faEyeSlash : faEye}
                        />
                      </button>
                    </div>
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
export default Register;
