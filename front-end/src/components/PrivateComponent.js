import { Navigate, Outlet } from "react-router-dom";

const PrivateComponent = () => {
  // Check if the JWT token exists in localStorage
  const auth = localStorage.getItem("token");

  // If the token exists, render the protected routes; otherwise, redirect to signup
  return auth ? <Outlet /> : <Navigate to="/signup" />;
};

export default PrivateComponent;
