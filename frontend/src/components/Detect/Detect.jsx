import React, { useState } from "react";
import "./detect.css";
import scan from "../../assets/scan.webp";
import axios from "axios";
import ok from "../../assets/check.png";
import bad from "../../assets/delete.png";

const Detect = () => {
  const [emailText, setEmailText] = useState("");
  const [result, setResult] = useState("");
  const [isPhishing, setIsPhishing] = useState(null); // Nowy stan do przechowywania informacji o phishingu

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        email_text: emailText,
      });
      setResult(response.data.result);
      setIsPhishing(response.data.result === 'Phishing'); // Ustawienie stanu na podstawie wyniku
    } catch (error) {
      console.error("Error during prediction:", error);
    }
  };

  return (
    <div className="detect">
      <div className="detectTop">
        <h1 className="detectTopPartTitle">PhishGuard</h1>
        <p className="detectTopHeader">Wprowadź wiadomość e-mail poniżej, a my sprawdzimy, czy jest to próba phishingu. Twoje bezpieczeństwo jest dla nas ważne!</p>
        <img src={scan} alt="" className="detectImgScan" />
      </div>

      <p className="detectTextElement">
        By submitting data above, you are agreeing to our Terms of Service and Privacy Notice. Please do not submit any personal information; we are not responsible for the contents of your submission. Learn more.
      </p>

      <form onSubmit={handleSubmit}>
        <textarea
          value={emailText}
          onChange={(e) => setEmailText(e.target.value)}
          rows="15"
          cols="70"
          placeholder="Wprowadź treść wiadomości e-mail..."
        />
        <br />
        <button type="submit">Sprawdź</button>
      </form>

      {result && (
        <div className={`resultMessage ${isPhishing ? 'phishing' : 'safe'}`}>
          {isPhishing ? (
            <>
                <img src={bad} alt="" className="detectResultIcon" />
              <span>This message seems to be phising</span>
            </>
          ) : (
            <>
                <img src={ok} alt="" className="detectResultIcon" />
              <span>Message got flagged as safe</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Detect;