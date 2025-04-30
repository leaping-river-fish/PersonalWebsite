import { React, useState, useEffect } from "react";
import "./css/contact.css";


function Contact() {

  const baseUrl = import.meta.env.VITE_API_URL;

    const [formData, setFormData] = useState({
      name: "",
      email: "",
      subject: "",
      message: ""
    });

    const [status, setStatus] = useState({
      type: '',
      message: ''
    });

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setStatus({ type: "", message: "Sending..." });

      try {
        const response = await fetch(`${baseUrl}/send`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          setStatus({
            type: "success", 
            message: "Message Sent Successfully!"
          });

          setFormData({ name: "", email: "", subject: "", message: "" });

          setTimeout(() => setStatus({ message: "", type: "" }), 5000);
        } else {
          setStatus({ 
            type: "error",
            message: result.error || "Failed to send message"
          });
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setStatus({
          type: "error",
          message: "Error: Could not connect to server."
        });
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

                  {status && (
                    <div className={`popup ${status.type}`}>
                      {status.message}
                    </div>
                  )}
        
                  <div className="contact-info">
                    <h2>Get in Touch</h2>
                    <p className="email">Email: <a href="mailto:nickzheng81@gmail.com">nickzheng81@gmail.com</a></p>
                    <p className="phone">Phone: <a href="tel:+16478658629">+1 (647) 865-8629</a></p>
                    <div className="social-media">
                    <div className="social-media">
                      <div>
                        <a
                          href="https://www.instagram.com/leaping_river_fish/"
                          className="social-link"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Instagram"
                        >
                          <svg
                            className="social-icon"
                            width="24"
                            height="24"
                            viewBox="0 0 23 23"
                            fill="currentColor"
                          >
                            <path d="M7.75 2A5.75 5.75 0 0 0 2 7.75v8.5A5.75 5.75 0 0 0 7.75 22h8.5A5.75 5.75 0 0 0 22 16.25v-8.5A5.75 5.75 0 0 0 16.25 2h-8.5Zm0 1.5h8.5A4.25 4.25 0 0 1 20.5 7.75v8.5a4.25 4.25 0 0 1-4.25 4.25h-8.5a4.25 4.25 0 0 1-4.25-4.25v-8.5A4.25 4.25 0 0 1 7.75 3.5ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 1.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Zm4.75-.75a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
                          </svg>
                        </a>
                      </div>
                      <div>
                        <a 
                          href="https://discord.com/users/567075024897572870" 
                          className="social-link" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          aria-label="Discord"
                      >
                          <svg 
                              className="social-icon" 
                              width="24" 
                              height="24" 
                              viewBox="0 0 640 512" 
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                          >
                              <path d="M524.5 69.8a1.5 1.5 0 0 0 -.8-.7A485.1 485.1 0 0 0 404.1 32a1.8 1.8 0 0 0 -1.9 .9 337.5 337.5 0 0 0 -14.9 30.6 447.8 447.8 0 0 0 -134.4 0 309.5 309.5 0 0 0 -15.1-30.6 1.9 1.9 0 0 0 -1.9-.9A483.7 483.7 0 0 0 116.1 69.1a1.7 1.7 0 0 0 -.8 .7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7A348.2 348.2 0 0 0 208.1 430.4a1.9 1.9 0 0 0 -1-2.6 321.2 321.2 0 0 1 -45.9-21.9 1.9 1.9 0 0 1 -.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9 .2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1 -.2 3.1 301.4 301.4 0 0 1 -45.9 21.8 1.9 1.9 0 0 0 -1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1 .7A486 486 0 0 0 610.7 405.7a1.9 1.9 0 0 0 .8-1.4C623.7 277.6 590.9 167.5 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2S193.1 219.1 222.5 219.1c29.7 0 53.3 26.8 52.8 59.2C275.3 311 251.9 337.6 222.5 337.6zm195.4 0c-29 0-52.8-26.6-52.8-59.2S388.4 219.1 417.9 219.1c29.7 0 53.3 26.8 52.8 59.2C470.7 311 447.5 337.6 417.9 337.6z" />
                          </svg>
                        </a>
                      </div>
                      <div>
                        <a
                          href="https://www.linkedin.com/in/zheng-nick1/"
                          className="social-link"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="LinkedIn"
                        >
                          <svg
                            className="social-icon"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.327-.026-3.036-1.85-3.036-1.851 0-2.134 1.445-2.134 2.939v5.666H9.354V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.368-1.85 3.598 0 4.262 2.368 4.262 5.452v6.289zM5.337 7.433c-1.144 0-2.068-.926-2.068-2.067 0-1.141.924-2.066 2.068-2.066 1.14 0 2.066.925 2.066 2.066 0 1.141-.926 2.067-2.066 2.067zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.225.792 24 1.771 24h20.451C23.2 24 24 23.225 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                          </svg>
                        </a>
                      </div>
                      <div>
                        <a
                          href="https://github.com/leaping-river-fish"
                          className="social-link"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub"
                        >
                          <svg
                            className="social-icon"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 0C5.37 0 0 5.37 0 12a12 12 0 008.21 11.43c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.41-1.34-1.79-1.34-1.79-1.09-.74.08-.73.08-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.91 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.25 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.59-2.8 5.61-5.48 5.9.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.82.58A12.01 12.01 0 0024 12c0-6.63-5.37-12-12-12z"/>
                          </svg>
                        </a>
                      </div>
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

