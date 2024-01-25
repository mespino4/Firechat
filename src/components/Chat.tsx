import React, { useState, useEffect, useRef, useMemo } from "react";
import { db, auth } from "../firebase-config";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { Message } from "../models/Message";

import "../styles/Chat.css";

export const Chat = ({ room }: any) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const messagesRef = collection(db, "messages");
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const [currentUser, setCurrentUser] = useState(auth.currentUser);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const queryMessages = useMemo(
    () =>
      query(
        messagesRef,
        where("room", "==", room),
        orderBy("createdAt")
      ),
    [messagesRef, room]
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      try {
        let messages: Message[] = [];
        snapshot.forEach((doc) => {
          messages.push({ ...doc.data(), id: doc.id } as Message);
        });
        setMessages(messages);

        if (chatMessagesRef.current) {
          chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
        setError(null);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setError("Error fetching messages. Please try again later.");
      }
    });

    return () => unsubscribe();
  }, [queryMessages]);

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!currentUser) return;

    if (!newMessage) return;

    // Add the new message to Firestore
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: currentUser?.displayName || "Anonymous",
      room,
    }).then(() => {setNewMessage("");})
      .catch((error) => {
        console.error("Error adding message:", error);
        setError("Error sending message. Please try again.");
      });
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>{room.toUpperCase()}</h1>
      </div>

      <div ref={chatMessagesRef} className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <span className="user">{message.user}:</span> {message.text}
          </div>
        ))}
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleFormSubmit} className="new-message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          className="new-message-input"
          placeholder="Type your message here..."/>

        <button
          type="submit"
          className="send-button"
          disabled={!newMessage}>
          Send
        </button>
      </form>
    </div>
  );
};
