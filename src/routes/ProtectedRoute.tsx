import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "../redux/features/auth/authSlice";
import { useMemo } from "react";
import { toast } from "sonner";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = useAppSelector(selectCurrentToken);
  const user = useAppSelector(selectCurrentUser);
  const { pathname } = useLocation();
  const userPermission = user?.adminType.roles.map(
    ({ name, view }) => view && name
  );

  const isViewable = useMemo(() => {
    if (pathname === "/") return true;
    return userPermission?.includes(pathname.split("/")[1]) ?? false;
  }, [pathname, userPermission]);

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  if (!isViewable) {
    toast.error("You don't have permission");
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
