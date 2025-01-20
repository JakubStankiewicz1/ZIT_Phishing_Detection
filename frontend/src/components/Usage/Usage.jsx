import React from 'react';
import "./usage.css";

const Usage = () => {
  return (
    <div className="usage" id="usage">
      <h2>Jak korzystać z PhishGuard? 🚀</h2>
      <p>
        PhishGuard to prosta w użyciu aplikacja, która pozwala na szybkie sprawdzenie, czy wiadomość e-mail jest bezpieczna. Oto jak z niej korzystać:
      </p>
      <ol>
        <li>
          <strong>Krok 1:</strong> Otwórz aplikację PhishGuard.
        </li>
        <li>
          <strong>Krok 2:</strong> Wprowadź treść wiadomości e-mail w polu tekstowym.
        </li>
        <li>
          <strong>Krok 3:</strong> Kliknij przycisk <strong>„Sprawdź”</strong>.
        </li>
        <li>
          <strong>Krok 4:</strong> Otrzymaj wynik analizy, który poinformuje Cię, czy wiadomość jest phishingowa, czy bezpieczna.
        </li>
      </ol>
      <h3>Wskazówki:</h3>
      <ul>
        <li>Upewnij się, że wprowadzasz pełną treść wiadomości e-mail.</li>
        <li>Nie wprowadzaj żadnych danych osobowych.</li>
        <li>W przypadku wątpliwości, zawsze skonsultuj się z ekspertem ds. bezpieczeństwa.</li>
      </ul>
      <h3>Dlaczego warto korzystać z PhishGuard?</h3>
      <p>
        PhishGuard wykorzystuje zaawansowane algorytmy uczenia maszynowego, aby zapewnić Ci bezpieczeństwo w sieci. Dzięki naszej aplikacji możesz szybko i łatwo sprawdzić, czy wiadomość e-mail jest próbą oszustwa.
      </p>
    </div>
  );
};

export default Usage;