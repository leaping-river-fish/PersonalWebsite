import React from "react";
import { useState } from "react";
import "./css/contact.css";


function Contact() {

    const [formData, setFormData] = useState({
      name: "",
      email: "",
      subject: "",
      message: ""
    });

    const [status, setStatus] = useState("");

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setStatus("Sending...");

      try {
        const response = await fetch("http://localhost:5001/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          setStatus("Message sent successfully!");
          setFormData({ name: "", email: "", subject: "", message: "" });
        } else {
          setStatus(`Error: ${result.error || "Failed to send message"}`);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setStatus("Error: Could not connect to server.");
      }
    };

    return (
      <div className="page-container">
          <div>
            <div className="out-container">
              <section className="contact-container">
                <h1>Contact Me</h1>
                <p className="contact-greeting">I’d love to hear from you! Fill out the form below and I'll get back to you shortly.</p>
        
                <div className="contact-content">
                  <form className="contact-form" onSubmit={handleSubmit}>
                  <input 
                                type="text" 
                                name="name" 
                                placeholder="Your Name" 
                                required 
                                value={formData.name} 
                                onChange={handleChange} 
                            />
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Your Email" 
                                required 
                                value={formData.email} 
                                onChange={handleChange} 
                            />
                            <input 
                                type="text" 
                                name="subject" 
                                placeholder="Subject" 
                                required 
                                value={formData.subject} 
                                onChange={handleChange} 
                            />
                            <textarea 
                                name="message" 
                                rows="5" 
                                placeholder="Your Message" 
                                required 
                                value={formData.message} 
                                onChange={handleChange} 
                            />
                            <button type="submit" className="submit-btn">Send Message</button>
                  </form>

                  {/* {status && <p className="status-message">{status}</p>} */}
        
                  <div className="contact-info">
                    <h2>Get in Touch</h2>
                    <p className="email">Email: <a href="mailto:nickzheng81@gmail.com">nickzheng81@gmail.com</a></p>
                    <p className="phone">Phone: <a href="tel:+16478658629">+1 (647) 865-8629</a></p>
                    <div className="social-media">
                        <div>
                            <a href="https://www.instagram.com/leaping_river_fish/" className="social-link">
                            Instagram
                            </a>
                        </div>
                        <div>
                            <a href="https://www.linkedin.com/in/zheng-nick1/" className="social-link">
                            LinkedIn
                            </a>
                        </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
          
          <footer className="footer">
          <p className="footer-text">&copy; 2025 Nick Zheng. All Rights Reserved.</p>
          </footer>
        </div>
      );
    };
    
    export default Contact;

