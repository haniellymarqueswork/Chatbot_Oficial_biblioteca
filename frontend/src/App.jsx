import { useState } from "react";
import Start from "./pages/Start/Start";
import Chatbot from "./pages/Chatbot/Chatbot";

export default function App() {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <>
      {showChatbot ? (
        <Chatbot />
      ) : (
        <Start onStart={() => setShowChatbot(true)} />
      )}
    </>
  );
}
