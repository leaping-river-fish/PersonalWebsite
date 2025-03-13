import React, { useState } from "react";
import './css/about.css';


function About() {
    const [question, setQuestion] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
  
    const askQuestion = async () => {
      if (!question) return;
  
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question }),
        });
  
        const data = await res.json();
        setResponse(data.answer);
      } catch (error) {
        setResponse("Error fetching response. Try again.");
      }
      setLoading(false);
    };

    return (
        <div className="about-wrapper">
          <div className="about-container">
            {/* About Section */}
            <div className="about">
              <div className="about-text">
                <p>Hello,</p>
                <h1>I'm <span>Nick Zheng</span></h1>
                <p>I am a Systems Design Engineering student at the University of Waterloo.</p>
              </div>
            </div>
      
            {/* AI Chat Section */}
            <div className="chat-container">
              <h2>What Would You Like to Know?</h2>
              <div className="chat-box">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Type your question..."
                />
                <button onClick={askQuestion} disabled={loading}>
                  {loading ? "Thinking..." : "Ask"}
                </button>
              </div>
              {response && <p className="response">{response}</p>}
            </div>
          </div>
        </div>
      );
}

export default About;
