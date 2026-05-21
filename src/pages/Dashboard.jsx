import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Dashboard = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h1>Dashboard</h1>

      <p>{user?.username}</p>
      <p>{user?.email}</p>
      <p>{user?.role}</p>
    </div>
  );
};

export default Dashboard;