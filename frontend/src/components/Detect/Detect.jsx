import React, { useState } from "react";
import "./detect.css";
import scan from "../../assets/scan.webp";
import axios from "axios";
import ok from "../../assets/check.png";
import bad from "../../assets/delete.png";
import logo from "../../assets/logoIcon.png";

const Detect = () => {
  const [emailText, setEmailText] = useState("");
  const [result, setResult] = useState("");
  const [isPhishing, setIsPhishing] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        email_text: emailText,
      });
      setResult(response.data.result);
      setIsPhishing(response.data.result === "Phishing");
    } catch (error) {
      console.error("Error during prediction:", error);
    }
  };

  return (
    <div className="detect" id="detect">
      <div className="detectTop">
        <h1 className="detectTopPartTitle">
          <img src={logo} alt="" className="detectTopImg" />
          PhishGuard
        </h1>
        <p className="detectTopHeader">
          Wprowadź wiadomość e-mail poniżej, a my sprawdzimy, czy jest to próba
          phishingu. Twoje bezpieczeństwo jest dla nas ważne!
        </p>
        <img src={scan} alt="" className="detectImgScan" />
      </div>

      <p className="detectTextElement">
        By submitting data above, you are agreeing to our Terms of Service and
        Privacy Notice. Please do not submit any personal information; we are
        not responsible for the contents of your submission.{" "}
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

        <button type="submit" class="btn-76">
          Sprawdź
          <span class="top"></span>
          <span class="right"></span>
          <span class="bottom"></span>
          <span class="left"></span>
        </button>

      </form>

      {result && (
        <div className={`resultMessage ${isPhishing ? "phishing" : "safe"}`}>
          {isPhishing ? (
            <>
              <img src={bad} alt="" className="detectResultIcon" />
              <span>This message seems to be phishing</span>
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
