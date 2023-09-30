import Navbar from "./components/Navbar";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import TicketBooking from "./components/TicketBooking";
import { useGlobalContext } from "./hooks/Context";
import CreateBus from "./components/CreateBus";
import TicketPage from "./components/TicketPage";
function App() {
  const { user, buses } = useGlobalContext();

  return (
    <main>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/ticketbooking" /> : <Login />}
        />

        <Route
          path="/register"
          element={user ? <Navigate to="/ticketbooking" /> : <Register />}
        />
        <Route
          path="/ticketbooking"
          element={user ? <TicketBooking /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard"
          element={!user ? <Navigate to="/login" /> : <Dashboard />}
        />
        <Route
          path="/createbus"
          element={!user ? <Navigate to="/login" /> : <CreateBus />}
        />
        <Route
          path="/ticketpage"
          element={!user || !buses ? <Navigate to="/login" /> : <TicketPage />}
        />
      </Routes>
    </main>
  );
}

export default App;
