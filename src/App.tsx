import { useState } from 'react';
import { Auth } from './components/Auth';
import { Chat } from './components/Chat';
import { signOut } from "firebase/auth";
import { auth } from './firebase-config';

import './App.css';

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
    <div className="app">
      <div className="app-header">
        <div className="app-name">
          Firechat
          <img src={'./flame.png'} alt="Fire" 
            style={{ height: '30px' }}
            className="flame-image" />
        </div>
        {isAuth && (
          <div className="sign-out">
            <button onClick={signUserOut}>Sign Out</button>
          </div>
        )}
      </div>
      <div className="app">{children}</div>
    </div>
  );
};

const App = () => {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [isInChat, setIsInChat] = useState(false);
  const [room, setRoom] = useState("");

  if (!isAuth) {
    return (
      <AppWrapper
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        setIsInChat={setIsInChat}
      >
        <Auth setIsAuth={setIsAuth} />
      </AppWrapper>
    );
  }

  const isEnterButtonDisabled = room.trim() === '';

  return (
    <AppWrapper isAuth={isAuth} setIsAuth={setIsAuth} setIsInChat={setIsInChat}>
      {!isInChat ? (
        <div className="app">
          <h2>Enter Chatroom</h2>
          <input
            type="text"
            placeholder="Enter a chatroom name"
            onChange={(e) => setRoom(e.target.value)}
          />
          <button className='enter-btn' onClick={() => setIsInChat(true)} disabled={isEnterButtonDisabled}>
            Enter
          </button>
        </div>
      ) : (
        <Chat room={room} />
      )}
    </AppWrapper>
  );
}

export default App;
