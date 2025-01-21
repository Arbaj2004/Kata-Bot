import { Webchat, WebchatProvider, Fab, getClient } from "@botpress/webchat";
import { buildTheme } from "@botpress/webchat-generator";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { BsChatRight } from "react-icons/bs";
import Navbar from "./Navbar";
import LoginCard from './LoginCard'; // Import your LoginCard component

const { theme, style } = buildTheme({
  themeName: "prism",
  themeColor: "#3240a8",
});

// Add your Client ID here ⬇️
const clientId = "c5b1f1d4-3093-4146-96d8-5f4d8c42b985";

const config = {
  composerPlaceholder: "Ask Your Query...",
  botName: "KataBot",
  botAvatar: "https://res.cloudinary.com/dgrbwkoxb/raw/upload/v1724247378/chat-app-file/mszwjlx3afqxmjzseq5z.png",
  botDescription: "Welcome to KataBot🤖",
};

export default function Chatbot() {
  const user = useSelector((state) => state.user.user);
  const [login, setLogin] = useState(false);
  const [isWebchatOpen, setIsWebchatOpen] = useState(false);
  
  const checkForUser = () => {
    if (!user) {
      setLogin(true);
    } else {
      // User is logged in, perform your bot logic here
      toggleWebchat()
    }
  };

  const client = getClient({ clientId });

  const toggleWebchat = () => {
    setIsWebchatOpen((prevState) => !prevState);
  };

  return (
    <div>
      {login && (
        <div className='bg-transparent fixed inset-0 flex justify-center items-center'>
          <div className='bg-black bg-opacity-80 absolute inset-0' onClick={() => setLogin(false)} />
          <LoginCard onClose={() => setLogin(false)} />
        </div>
      )}
 
<div
      onClick={checkForUser}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
      }}
      >
        <div className="bg-slate-600 p-4 rounded-3xl cursor-pointer">
          <BsChatRight size={30} color="grey" />
        </div>
      </div>

      {isWebchatOpen && (
        <div className="fixed bottom-4 right-4">
          <style>{style}</style>
          <WebchatProvider
            key={JSON.stringify(config)}
            theme={theme}
            configuration={config}
            client={client}
          >
            <Fab onClick={toggleWebchat} />
            <div
              style={{
                position: "fixed",
                bottom: "80px", // Position the Webchat above the Fab button
                right: "20px",
                zIndex: 1000,
                width: "300px", // Adjust the width of the Webchat container
                height: "400px", // Adjust the height of the Webchat container
                display: isWebchatOpen ? "block" : "none",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)", // Optional: Add shadow for better visibility
                borderRadius: "8px", // Optional: Rounded corners
                overflow: "hidden", // Ensure content does not overflow the container
              }}
            >
              <Webchat />
            </div>
          </WebchatProvider>
        </div>
      )}
    </div>
  );
}
