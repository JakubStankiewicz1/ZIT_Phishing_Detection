import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split  # Add this
from sklearn.svm import SVC
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os


# Tworzenie aplikacji Flask
app = Flask(__name__)
CORS(app)

# Ścieżki do plików modelu i wektoryzatora
MODEL_PATH = 'phishing_model.pkl'
VECTORIZER_PATH = 'vectorizer.pkl'

# Sprawdzenie, czy model i wektoryzator istnieją
if os.path.exists(MODEL_PATH) and os.path.exists(VECTORIZER_PATH):
    model = joblib.load(MODEL_PATH)
    vectorizer = joblib.load(VECTORIZER_PATH)
else:
    # Wczytanie danych
    df = pd.read_csv("phishing_emails.csv")

    # Usunięcie brakujących wartości i duplikatów
    df = df.dropna()
    df = df.drop_duplicates()

    # Przygotowanie próbki danych
    phishing_emails = df[df["label"] == 1]
    non_phishing_emails = df[df["label"] == 0]
    phishing_sample = phishing_emails.sample(n=1000, random_state=42)
    non_phishing_sample = non_phishing_emails.sample(n=1000, random_state=42)
    df_sample = pd.concat([phishing_sample, non_phishing_sample]).reset_index(drop=True)
    df_sample = df_sample.sample(frac=1, random_state=42).reset_index(drop=True)

    # Podział danych na zbiór treningowy i testowy
    X = df_sample["body"]
    y = df_sample["label"]
    
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.3, random_state=42, stratify=y
    )

    # Utworzenie macierzy TF-IDF
    vectorizer = TfidfVectorizer(max_features=5000)
    X_train_tfidf = vectorizer.fit_transform(X_train)
    
    # Utworzenie i trenowanie modelu
    model = SVC(kernel="linear", probability=True, random_state=42)
    model.fit(X_train_tfidf, y_train)

    # Zapisanie modelu i wektoryzatora
    joblib.dump(model, MODEL_PATH)
    joblib.dump(vectorizer, VECTORIZER_PATH)

@app.route('/predict', methods=['POST'])
def predict():
    email_text = request.json['email_text']
    email_vectorized = vectorizer.transform([email_text])
    prediction = model.predict(email_vectorized)
    prediction_proba = model.predict_proba(email_vectorized)[0]
    result = {
        'result': 'Phishing' if prediction[0] == 1 else 'Bezpieczna',
        'probability': {
            'Phishing': prediction_proba[1],
            'Bezpieczna': prediction_proba[0]
        }
    }
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
