import React from 'react';
import { toast } from 'react-toastify';
import './letsTalk.css';

const LetsTalk = () => {
  const onSubmit = async (event) => {
    event.preventDefault();
    toast.info("Sending....");

    const formData = new FormData(event.target);
    const name = formData.get("name");
    const surname = formData.get("surname");
    const email = formData.get("email");
    const message = formData.get("message");

    const formattedMessage = `
      Imię: ${name}
      Nazwisko: ${surname}
      Email: ${email}
      
      Wiadomość:
      ${message}
    `;

    formData.append("access_key", "e2ac1a11-bdf9-48b8-a7ce-9d92f185f03a");
    formData.append("message", formattedMessage);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      toast.success("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      toast.error(data.message);
    }
  };

  return (
    <div className="letsTalk" id="letsTalk">
      <div className="text-section">
        <h2>Skontaktuj się z nami! 📞</h2>
        <p>
          Masz pytania lub potrzebujesz więcej informacji? Skontaktuj się z nami, a my z przyjemnością pomożemy. Nasz zespół odpowie najszybciej, jak to możliwe.
        </p>
      </div>
      <div className="form-section">
        <form onSubmit={onSubmit} className="contact-form">
          <input type="text" name="name" placeholder="Imię" required />
          <input type="text" name="surname" placeholder="Nazwisko" required />
          <input type="email" name="email" placeholder="Email" required />
          <textarea name="message" placeholder="Wiadomość" required></textarea>
          <button type="submit">Wyślij</button>
        </form>
      </div>
    </div>
  );
};

export default LetsTalk;
