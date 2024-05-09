import { useState, useEffect, useRef } from "react";
import Message from "./Message";
import { QuerySnapshot, collection } from "firebase/firestore";

const style = {
  main: `flex flex-col p-[10px] relative`,
};

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();

  useEffect(() => {
    const q = quert(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);
  return (
    <>
      <main className={style.main}>
        <Message />
      </main>
      {/* send message component */}
      <span ref={scroll}></span>
    </>
  );
};

export default Chat;
