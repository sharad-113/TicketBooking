import { useNavigate } from "react-router-dom";
import img1 from "../assets/Bus.jpg";
import { useGlobalContext } from "../hooks/Context";
import { useEffect } from "react";
import axios from "axios";
const TicketBooking = () => {
  const { buses, user, setBuses } = useGlobalContext();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/users/${user.user._id}/buses`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      console.log(data);
      const { buses } = data;
      console.log(buses);
      setBuses(buses);
    };
    if (!buses) {
      fetchData();
    }
  }, []);

  return (
    <>
      {console.log("in the console log", buses)}
      {buses && (
        <div className="container">
          {buses.map((bus) => {
            return (
              <div key={bus._id} className="card mb-3 border-dark mt-3">
                <div className="row">
                  <div className="col-md-4">
                    <img className="card-img-top img-fluid" alt="" src={img1} />
                  </div>
                  <div className="col-md-8 ">
                    <div className="card-body">
                      <h5 className="card-title">Bus Number {bus.busNumber}</h5>
                      <p className="card-text">
                        Created by {bus?.createdBy?.username}
                      </p>
                      <p className="card-text">
                        EmailId: {bus?.createdBy?.email}
                      </p>
                      <p className="card-text">
                        Total Seats in Bus = {bus?.totalSeats}
                      </p>
                      <p className="card-text">
                        Number of Available Seats ={" "}
                        {Number(bus?.totalSeats) -
                          Number(bus?.seatBooked?.length)}
                      </p>
                      <p className="card-text">
                        Safest bus Available for tourist in India
                      </p>

                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          navigate("/ticketpage", { state: { bus } });
                        }}
                      >
                        BookTicket
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {buses && buses.length === 0 && <h2>No buses Avaliable</h2>}
      <div className="d-flex justify-content-center align-items-center mt-5">
        <button
          className="btn btn-primary text-center "
          type="button"
          onClick={() => {
            return navigate("/createbus");
          }}
        >
          Create New Bus
        </button>
      </div>
    </>
  );
};
export default TicketBooking;
