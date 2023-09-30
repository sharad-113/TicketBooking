import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { useGlobalContext } from "../hooks/Context";
const CreateBus = () => {
  const { user, setBuses } = useGlobalContext();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const getInfo = async (busData) => {
    console.log(busData);
    if (!user) return navigate("/login");
    busData.createdBy = user.user._id;
    try {
      await axios.post(
        `http://localhost:8080/api/v1/users/${user.user._id}/buses`,
        busData,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      toast.success("New Bus created");
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/users/${user.user._id}/buses`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      console.log(data);
      const { buses } = data;
      console.log(buses);
      setBuses(buses);
      return navigate("/ticketbooking");
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
                <div className="row">
                  <h3 className=" text-center">Create Bus</h3>
                </div>
                <form onSubmit={handleSubmit(getInfo)}>
                  <div className="mb-4">
                    <label className="form-label" htmlFor="busNumber">
                      Bus Number
                    </label>
                    <input
                      type="text"
                      id="busNumber"
                      className="form-control form-control-lg"
                      placeholder="11432-Lucknow to Ayodhya"
                      required
                      {...register("busNumber", { required: true })}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label" htmlFor="ticketPrice">
                      TicketPrice
                    </label>
                    <input
                      type="text"
                      id="ticketPrice"
                      className="form-control form-control-lg"
                      placeholder="200(in rupees)"
                      required
                      {...register("ticketPrice", { required: true })}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label" htmlFor="totalSeats">
                      Total Seats
                    </label>
                    <input
                      type="number"
                      id="totalSeats"
                      className="form-control form-control-lg"
                      placeholder="55"
                      required
                      {...register("totalSeats", { required: true })}
                    />
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
export default CreateBus;
