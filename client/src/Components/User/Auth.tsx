import { useGlobalContext } from "../../Context/GlobalContext";
import AuthLinks from "./AuthLinks";
import UserInfo from "./UserInfo";

export default function Auth() {
  const { user } = useGlobalContext();
  return <>{user && user.username ? <UserInfo /> : <AuthLinks />}</>;
}
