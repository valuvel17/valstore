"use client";

import Link from "next/link";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // 👈 esto evita que se recargue la página
    console.log("Form submitted!", formData);
    setSubmitted(true);
    // podés resetear o hacer un fetch a un backend acá
  };

  return (
    <section className="contact-page">
      <h2>Contact Me</h2>
      <h5>Feel free to reach out! 💌</h5>

      {submitted ? (
        <><p>Thanks! I&apos;ll get back to you soon.</p><Link href={'/'}>
          <button>Home</button>
        </Link></>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Message:
            <textarea
              name="message"
              placeholder="Your message here..."
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </label>
        <div className="contact-button-container">
          <button type="submit">Send</button>
        </div>
        </form>
      )}
    </section>
  );
}
