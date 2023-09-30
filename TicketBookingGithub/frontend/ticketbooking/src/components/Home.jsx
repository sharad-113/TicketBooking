import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div
        className="cover-container  w-100 h-100 p-3 mx-auto  vh-100"
        id="home"
      >
        <div className="container d-flex flex-column mb-3 justify-content-center align-items-center mt-5 pt-5 text-white">
          <h1 className="text-success">TicketBooking</h1>
          <p className="lead">
            Welcome to TicketBooking! Jump right in and explore our available
            tickets to book. <br />
            Feel free to book some of your own and suggest to others!
          </p>
          <Link
            to="/ticketbooking"
            className="btn btn-lg btn-secondary font-weight-bold border-white bg-primary"
          >
            TicketBooking
          </Link>
        </div>
      </div>
    </>
  );
};
export default Home;
