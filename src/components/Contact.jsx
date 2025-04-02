import React from "react";
import "./css/contact.css"


function Contact() {

    return (
      <div className="page-container">
          <div>
            <div className="out-container">
              <section className="contact-container">
                <h1>Contact Me</h1>
                <p className="contact-greeting">I’d love to hear from you! Fill out the form below and I'll get back to you shortly.</p>
        
                <div className="contact-content">
                  <form className="contact-form">
                    <input type="text" name="name" placeholder="Your Name" required />
                    <input type="email" name="email" placeholder="Your Email" required />
                    <input type="text" name="subject" placeholder="Subject" required />
                    <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
                    <button type="submit" className="submit-btn">Send Message</button>
                  </form>
        
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

