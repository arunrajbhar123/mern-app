import { Navigate } from "react-router-dom";
const ReqAuth = ({ children }) => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token === undefined) {
    return <Navigate to="/login" replace="true" />;
  }
  return children;
};

export default ReqAuth;
