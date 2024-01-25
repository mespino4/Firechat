import { auth } from "../firebase-config.ts";
import { signOut } from "firebase/auth";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const AppWrapper = ({ children, isAuth, setIsAuth, setIsInChat }: any) => {
  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setIsInChat(false);
  };

  return (
    <div className="App">
      <div className="app-header">
        <h1>Firechat 🔥</h1>
      </div>

      <div className="app-container">{children}</div>
      {isAuth && (
        <div className="sign-out">
          <button onClick={signUserOut}>Sign Out</button>
        </div>
      )}
    </div>
  );
};
