import React, { useState, useEffect } from "react";
import './css/about.css';


function About() {
  const dotAnimation = [
    "",
    ".",
    "..",
    "..."
  ];

  const [message, setMessage] = useState("");

  const [chats, setChats] = useState(() => {
    const savedChats = sessionStorage.getItem("chatMessages");
    return savedChats ? JSON.parse(savedChats) : [];
  });

  const [isTyping, setIsTyping] = useState(false);
  const [currentPhase, setCurrentPhase] = useState([0]);
  const [index, setIndex] = useState(0);

  useEffect (() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % dotAnimation.length);
    }, 600)

    return () => clearInterval(interval);
  }, []);

  useEffect (() => {
    setCurrentPhase(dotAnimation[index]);
  }, [index]);

  useEffect (() => {
    sessionStorage.setItem("chatMessages", JSON.stringify(chats));
  }, [chats]);

  const chat = async (e, message) => {
    e.preventDefault();

    if (!message) return;

    setIsTyping(true);

    setIsTyping(true);
    let updatedChats = [...chats, { role: "user", content: message }];
    setChats(updatedChats);

    setMessage("");

    const start = Date.now();

    try {
      const response = await fetch("http://localhost:5000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chats: updatedChats }),
      });

      const data = await response.json();
      console.log("AI responded with:", data);

      const elapsed = Date.now() - start;

      const minDelay = 2000; 
      if (elapsed < minDelay) {
        await new Promise((resolve) => setTimeout(resolve, minDelay - elapsed));
      }
      
      setIsTyping(false);

      const newChats = [...updatedChats, data.output];
      setChats(newChats);

    } catch (error) {
      console.log("Error fetching chat response:", error);
      setIsTyping(false);
    }

  };

  const clearChat = () => {
    setChats([]);
    sessionStorage.removeItem("chatMessages");
  };

  return (
    <div className="about-wrapper">
      <div className="about-container">
        {/* AI Chat Section */}
        <div className="chat-container">
          <h1 className="about-text">What Would You Like to Know?</h1>

          <section className="chat-box">
            {chats && chats.length
              ? chats.map((chat, index) => (
                <p key={index} className={chat.role === "user" ? "user_msg" : "assistant_msg"}>
                  <span>{chat.content}</span>
                </p>
              ))
              : ""}
          </section>
          <div className={isTyping ? "" : "hide"}>
            <p className="chat">
              <i>{isTyping ? `Typing${currentPhase}` : ""}</i>
            </p>
          </div>

          <form className="about-form" action="" onSubmit={(e) => chat(e, message)}>
            <input className="about-input"
              type="text"
              name="message"
              value={message}
              placeholder="Ask a question..."
              onChange={(e) => setMessage(e.target.value)}
            />
          </form>
          {chats.length > 0 && (
            <button className="clear-chat-btn" onClick={clearChat}>
              Clear Chat
            </button>
          )}
        </div>
          {/* add a timeline + some text for context*/}
        
      </div>
    </div>
  );
}

export default About;
