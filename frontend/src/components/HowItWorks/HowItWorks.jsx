import React from "react";
import "./howItWorks.css";

const HowItWorks = () => {
  return (
    <div className="howItWorks" id="howItWorks">
      <h2>Jak to działa? 🤔</h2>
      <p>
        Nasza aplikacja do wykrywania phishingu to jak superbohater w Twojej
        skrzynce odbiorczej! 🦸‍♂️ Wykorzystuje zaawansowane algorytmy uczenia
        maszynowego, aby analizować treść wiadomości e-mail i identyfikować
        potencjalne próby oszustwa. Oto jak to działa:
      </p>
      <ol className="steps">
        <li>
          <strong>1. Wprowadzenie treści e-maila:</strong> Użytkownik wprowadza
          treść wiadomości e-mail w formularzu.
          <span className="emoji">✍️</span>
        </li>
        <li>
          <strong>2. Przetwarzanie tekstu:</strong> Treść e-maila jest
          przetwarzana za pomocą wektoryzatora, który konwertuje tekst na format
          numeryczny, zrozumiały dla modelu.
          <pre className="code-block">
            <code>
              {`vectorizer = CountVectorizer()
email_vectorized = vectorizer.transform([email_text])`}
            </code>
          </pre>
        </li>
        <li>
          <strong>3. Predykcja:</strong> Wektoryzowane dane są przekazywane do
          modelu, który przewiduje, czy wiadomość jest phishingowa, czy nie.
          <pre className="code-block">
            <code>
              {`prediction = model.predict(email_vectorized)
result = 'Phishing' if prediction[0] == 1 else 'Bezpieczna'`}
            </code>
          </pre>
        </li>
        <li>
          <strong>4. Wynik:</strong> Aplikacja zwraca wynik analizy, informując
          użytkownika, czy wiadomość jest bezpieczna, czy stanowi zagrożenie.
          <span className="emoji">✅</span>
        </li>
      </ol>
      <h3>Jakie technologie są używane? 🛠️</h3>
      <ul>
        <li>
          <strong>Python:</strong> Język programowania używany do budowy
          backendu aplikacji.
        </li>
        <li>
          <strong>Flask:</strong> Lekki framework webowy do tworzenia API.
        </li>
        <li>
          <strong>Scikit-learn:</strong> Biblioteka do uczenia maszynowego,
          używana do trenowania modelu.
        </li>
        <li>
          <strong>Pandas:</strong> Biblioteka do analizy danych, używana do
          przetwarzania zbioru danych e-maili.
        </li>
        <li>
          <strong>React:</strong> Biblioteka JavaScript do budowy interfejsu
          użytkownika.
        </li>
      </ul>
    </div>
  );
};

export default HowItWorks;
