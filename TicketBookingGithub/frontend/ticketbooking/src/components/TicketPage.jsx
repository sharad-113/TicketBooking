import { useLocation, useNavigate } from "react-router-dom";
import img1 from "../assets/Bus.jpg";
import { useGlobalContext } from "../hooks/Context";
import { toast } from "react-toastify";
import axios from "axios";
const TicketPage = () => {
  const { user, setUser, setBuses } = useGlobalContext();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { bus } = state;
  if (!user) {
    toast.error("No user present");
    return;
  }

  const handleClick = async () => {
    let today = new Date();
    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();
    today = mm + "/" + dd + "/" + yyyy;
    const ticketData = {
      date: today,
      description: `This ticket has been booked by ${user.user.username} having EmailId ${user.user.email} for price ${bus.ticketPrice} on the date ${today}`,
      price: `${bus.ticketPrice}`,
      time: time,
    };
    console.log(ticketData);
    console.log(user.token);
    try {
      const { data: userData } = await axios.post(
        `http://localhost:8080/api/v1/users/${user.user._id}/buses/${bus._id}/tickets`,
        ticketData,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setUser(userData);
      const { data: busesData } = await axios.get(
        `http://localhost:8080/api/v1/users/${user.user._id}/buses`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      const { buses } = busesData;
      setBuses(buses);
      toast.success("Ticket has been successfully created");
      return navigate("/dashboard");
    } catch (error) {
      console.log(error.response);
      toast.error(`${error.response.data.error}`);
    }
  };

  if (!bus || !user) return navigate("/login");

  return (
    <>
      {user && bus && (
        <>
          <h2>Bus Ticket Details</h2>
          <div className="container">
            <div className="card mb-3 border-dark mt-3">
              <div className="row">
                <div className="col-md-4">
                  <img className="card-img-top img-fluid" alt="" src={img1} />
                </div>
                <div className="col-md-8 ">
                  <div className="card-body">
                    <h5 className="card-title">Bus Number : {bus.busNumber}</h5>
                    <p className="card-text">Ticket price:{bus.ticketPrice}</p>
                    <p className="card-text">UserName:{user.user.username} </p>
                    <p className="card-text">EmailId:{user.user.email}</p>
                    <button className="btn btn-primary" onClick={handleClick}>
                      Book
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default TicketPage;
