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
    console.log("chat() called");
    if (!e || typeof e.preventDefault !== "function") {
      console.error("Invalid event:", e);
      return;
    }

    e.preventDefault();

    if (!message) {
      console.warn("Empty message submitted");
      return;
    }

    console.log("Message submitted:", message);

    setIsTyping(true);

    setIsTyping(true);
    let updatedChats = [...chats, { role: "user", content: message }];
    setChats(updatedChats);

    setMessage("");

    const start = Date.now();

    try {
      const backendUrl = 'https://personal-website-backend-54b7.onrender.com' //product
      // const backendUrl = 'http://localhost:5001/chat' //development

      // const backendUrl = process.env.VITE_BACKEND_URL;
      console.log("Using backend URL:", backendUrl); //test

      const response = await fetch(`${backendUrl}/`, {
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
    <div className="about-page">
      <section className="chat-section">
        <h1 className="chat-text">Ask Lumie About Me</h1>
        <h6 className="chat-subtext">Enter a question like: "Who is Nick Zheng?"</h6>
        <div className="chat-wrapper">
          <div className="chat-container">
            {/* AI Chat Section */}
            <div className="chat-container">

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
          </div>
        </div>
        <p className="warning">As the AI is relatively new and not completely trained, some of its answers may not be 100% accurate and/or fabricated</p>
      </section>

      {/*timeline*/}
      <div className="timeline-container">
        <h1 className="timeline-text">Career Timeline</h1>

        <svg className="timeline-line">
          <path id="timeline-path" d="M990,120 H1113 V920 H300 V1200" stroke="#ffffff" strokeWidth="3" fill="transparent" strokeDasharray="5,5"/>
        </svg>

        <section className="rifo-section">
          <h1 className="rifo-title">RIFO Holding Group</h1>
          <div className="rifo-grid">
            <div className="rifo-description">
                <p>
                  During my first internship, I worked as a QA Engineer for RIFO Holding Group as part of the R&D team. I automated test cases for their client, agent, and vendor applications using Python scripts. Throughout the internship, I built strong relationships with my colleagues and developed valuable skills in app testing. I also gained hands-on experience with tools such as Appium and Selenium for automation, as well as Clipchamp and Canva for creating demo videos through video editing.
                </p>
            </div>
            
            <div className="rifo-image-container">
              <a href="https://www.rifo.com/" target="_blank" rel="noopener noreferrer">
                <img src="timeline_imgs/rifo.png" className="rifo-image"></img>
              </a>
            </div>
          </div>
        </section>

        <section>
          <h1 className="tbc">To be continued...</h1>
        </section>
      </div>
    </div>
  );
}

export default About;
