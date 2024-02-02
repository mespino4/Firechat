import { auth, provider } from "../firebase-config.ts";
import { signInWithPopup } from "firebase/auth";

import "../styles/Auth.css";

import Cookies from "universal-cookie";

const cookies = new Cookies();

export const Auth = ({ setIsAuth }: any) => {
    const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth">
      <h2>Sign In</h2>
      <button onClick={signInWithGoogle} className="google-btn">
        Sign In With Google
      </button>

      <button className="guest-btn">Sign In as a Guest</button>
    </div>
  );
};
