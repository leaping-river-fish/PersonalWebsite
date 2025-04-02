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
  const [chats, setChats] = useState([]);
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

  const chat = async (e, message) => {
    e.preventDefault();

    if (!message) return;
    setIsTyping(true);

    let msgs = chats;
    msgs.push({ role: "user", content: message });
    setChats(msgs);
    scrollTo(0, 1e10);

    setMessage("");

    fetch("http://localhost:5000/", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chats
      })
    }).then((response) => response.json())
      .then((data) => {
        msgs.push(data.output);
        setChats(msgs);
        setIsTyping(false);
        scrollTo(0, 1e10);
      })
      .catch(error => console.log(error));
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
                <p key={index} className={chat.role === "user" ? "user_msg" : ""}>
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

          <form action="" onSubmit={(e) => chat(e, message)}>
            <input
              type="text"
              name="message"
              value={message}
              placeholder="Ask a question..."
              onChange={(e) => setMessage(e.target.value)}
            />
          </form>

        </div>
      </div>
    </div>
  );
}

export default About;
