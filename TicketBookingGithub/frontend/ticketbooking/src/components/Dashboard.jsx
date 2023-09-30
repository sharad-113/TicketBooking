import img1 from "../assets/user.png";
import { useGlobalContext } from "../hooks/Context";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const { user: userData } = useGlobalContext();
  const navigate = useNavigate();
  if (!userData) {
    navigate("/login");
  }
  const { user } = userData;
  console.log(user);
  return (
    <>
      {userData && user && (
        <div className="container">
          {user?.tickets?.length === 0 && <h2>No Tickets Avaliable</h2>}
          {user?.tickets?.length > 0 && <h2>All Tickets Avaliable</h2>}
          {user?.tickets?.map((ticket) => {
            return (
              <div key={ticket._id} className="card mb-3">
                <div className="row">
                  <div className="col-md-4">
                    <img className="card-img-top img-fluid" alt="" src={img1} />
                  </div>
                  <div className="col-md-8  ">
                    <div className="card-body">
                      <h5 className="card-title">
                        Bus Number {ticket?.busId?.busNumber}
                      </h5>
                      <p className="card-text">
                        Customer Name : <strong>{user.username}</strong>
                      </p>
                      <p className="card-text">Ticket price {ticket?.price}</p>
                      <p className="card-text">
                        Total Seats in Bus {ticket?.busId?.totalSeats}
                      </p>
                      <p className="card-text">
                        Total Seats Left in Bus{" "}
                        {console.log(
                          Number(ticket?.busId?.totalSeats),
                          ticket?.busId?.seatBooked
                        )}
                        {Number(ticket?.busId?.totalSeats) -
                          Number(ticket?.busId?.seatBooked?.length)}
                      </p>
                      <p className="card-text">
                        <small className="text-muted">
                          {" "}
                          Creation Date is {ticket?.date} and time is{" "}
                          {ticket?.time}
                        </small>
                      </p>
                      <p className="card-text">
                        Description {ticket?.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
export default Dashboard;
