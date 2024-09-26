import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = sessionStorage.getItem('authUser');
    if (!user) {
     
      navigate("/login");
    }
  }, [navigate]);

  return children;
};

export default ProtectedRoute;
