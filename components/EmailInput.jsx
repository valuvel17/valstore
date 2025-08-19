'use client'

import { useState } from "react";

export default function EmailInput() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  async function handleAddSubscriber() {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('El correo electrónico no es válido');
        return;
      }
      setError('');
      //Here you would typically send the email to your backend or a service

      setEmail('');
    } catch (err) {
      setError('Ocurrió un error al agregar el suscriptor');
      console.error("Error adding subscriber:", err.message);
    }
  }

  return (
    <div className="sign-up">
      <div>
        <input
          placeholder="Email address..."
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError('');
          }}
        />
        <button onClick={handleAddSubscriber} className="button-card">Sign Up</button>
      </div>
      <div>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
}
