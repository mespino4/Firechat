import { signInWithPopup, signInAnonymously } from "firebase/auth";
import { auth, provider } from "../firebase-config";
import { updateProfile } from "firebase/auth";
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

  const signInAsGuest = async () => {
    try {
      // Sign in anonymously
      const result = await signInAnonymously(auth);

      // Set a screen name for the user
      const screenName = "Guest-" + Math.floor(Math.random() * 1000);

      // Set the display name for the anonymous user
      await updateProfile(result.user, { displayName: screenName });

      // Store the guests user's refresh token in cookies
      cookies.set("auth-token", result.user.refreshToken);

      // Set isAuthenticated to true
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

      <button onClick={signInAsGuest} className="guest-btn">
        Sign In as a Guest
      </button>
    </div>
  );
};
