import AuthLinks from "../Components/User/AuthLinks";
import UserInfo from "../Components/User/UserInfo";
import { useGlobalContext } from "../Context/GlobalContext";

export default function User() {
  const { user } = useGlobalContext();
  return <>{user && user.username ? <UserInfo /> : <AuthLinks />}</>;
}
