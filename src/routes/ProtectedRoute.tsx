import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentToken } from "../redux/features/auth/authSlice";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = useAppSelector(selectCurrentToken);
  // const user =  useAppSelector(selectCurrentUser);

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
