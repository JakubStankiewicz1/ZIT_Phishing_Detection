import React from "react";
import "./howItWorks.css";

const HowItWorks = () => {
  return (
    <div className="howItWorks" id="howItWorks">
      <h2>Jak to działa? 🤔</h2>
      <p>
        Nasza aplikacja do wykrywania phishingu wykorzystuje zaawansowane techniki uczenia maszynowego, aby analizować treść wiadomości e-mail i
        identyfikować potencjalne próby oszustwa.
        <br />
        Oto szczegółowy opis każdego kroku:
      </p>

      <ol className="steps">
        <li>
          <strong className="stepsTitle">1. Wprowadzenie treści e-maila:</strong>
          <br />
          Użytkownik dostarcza treść wiadomości e-mail, która ma zostać przeanalizowana, poprzez prosty formularz w aplikacji. Treść ta może być
          skopiowana i wklejona z oryginalnej wiadomości.
          <span className="emoji">✍️</span>
        </li>

        <li>
          <strong className="stepsTitle">2. Przetwarzanie tekstu:</strong>
          <br />
          Po otrzymaniu treści, aplikacja przekształca tekst wiadomości na format numeryczny zrozumiały dla modelu uczenia maszynowego. Do tego celu
          wykorzystywany jest wektoryzator TF-IDF (Term Frequency-Inverse Document Frequency), który nadaje słowom w tekście wagi w oparciu o ich
          częstość występowania w treści oraz w całym zbiorze danych.
          <br />
          <br />
          <pre className="code-block">
            <code className="codeBlockElement">
                <p>
                  vectorizer = TfidfVectorizer(max_features=5000)
                  <br />
                  email_vectorized = vectorizer.transform([email_text])
                </p>
            </code>
          </pre>
          <br />
          <br />
          Ten krok pozwala przekształcić nieustrukturyzowany tekst w macierz numeryczną, gdzie każda kolumna reprezentuje unikalny termin w zbiorze
          danych, a wartości odpowiadają znaczeniu danego terminu w wiadomości e-mail.
        </li>

        <li>
          <strong className="stepsTitle">3. Predykcja:</strong>
          <br />
          Wektoryzowane dane są przekazywane do wytrenowanego modelu klasyfikacji (w naszym przypadku SVM - Support Vector Machine). Model ten
          decyduje, czy wiadomość jest phishingowa, czy bezpieczna.
          <br />
          <br />
          <pre className="code-block">
            <code className="codeBlockElement">
              {`prediction = model.predict(email_vectorized)
result = 'Phishing' if prediction[0] == 1 else 'Bezpieczna'`}
            </code>
          </pre>
          <br />
          <br />
          Model wykorzystuje swoje zrozumienie wzorców w danych treningowych, aby podjąć decyzję na podstawie dostarczonych cech wektoryzowanej
          wiadomości.
        </li>

        <li>
          <strong className="stepsTitle">4. Analiza prawdopodobieństwa:</strong>
          <br />
          Model zwraca także prawdopodobieństwo, z jakim klasyfikuje wiadomość jako phishingową lub bezpieczną. Te dane są prezentowane użytkownikowi
          jako dodatkowe wskaźniki zaufania dla decyzji modelu.
          <br />
          <br />
          <pre className="code-block">
            <code className="codeBlockElement">
              {`prediction_proba = model.predict_proba(email_vectorized)[0]
result = {
  'result': 'Phishing' if prediction[0] == 1 else 'Bezpieczna',
  'probability': {
    'Phishing': prediction_proba[1],
    'Bezpieczna': prediction_proba[0]
  }
}`}
            </code>
          </pre>
        </li>

        <li>
          <strong className="stepsTitle">5. Wynik:</strong>
          <br />
          Wynik analizy jest zwracany użytkownikowi w czytelnej formie. Informacja o tym, czy wiadomość jest bezpieczna czy phishingowa, jest
          wyświetlana razem z prawdopodobieństwami, co umożliwia użytkownikowi podjęcie świadomej decyzji.
        </li>
      </ol>
    </div>
  );
};

export default HowItWorks;
