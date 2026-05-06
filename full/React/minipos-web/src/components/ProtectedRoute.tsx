
import {Navigate} from "react-router-dom";
import {getUser} from "../hooks/auth";

export default function ProtectedRoute({ children, roles }: any) {
  const user = getUser();

  if (!user) return <Navigate to="/login" />;

  if (!roles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}