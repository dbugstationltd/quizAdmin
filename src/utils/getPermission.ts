import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/hooks";

const GetPermission = (name: string) => {
  const user = useAppSelector(selectCurrentUser);
  const permissions = user?.adminType.roles.find((item) => item.name === name);
  return permissions;
};

export default GetPermission;
