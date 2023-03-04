import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import TwitchConnectButton from "./TwitchConnectButton";

const Login = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const token = Object.fromEntries(
    document.location.hash
      .slice(1)
      .split("&")
      .map((pair) =>
        pair.split("=").map((v) => {
          if (v !== " ") return decodeURIComponent(v);
        })
      )
      .filter((pair) => {
        return pair[0] !== "";
      })
  );

  useEffect(() => {
    if (Object.keys(token).length > 0) {
      setAuth(token);
    }
  }, [token]);

  return <TwitchConnectButton />;
};

export default Login;
