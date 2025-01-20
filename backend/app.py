import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os

# Tworzenie aplikacji Flask
app = Flask(__name__)
CORS(app)

# Sprawdzenie, czy model i wektoryzator istnieją
model_file = 'phishing_model.pkl'
vectorizer_file = 'vectorizer.pkl'

if os.path.exists(model_file) and os.path.exists(vectorizer_file):
    model = joblib.load(model_file)
    vectorizer = joblib.load(vectorizer_file)
else:
    data = pd.read_csv('emails.csv').head(10000)

    # Sprawdzenie brakujących danych
    data = data.dropna(subset=['Email Text', 'Email Type'])

    # Przygotowanie danych
    data['label'] = data['Email Type'].apply(lambda x: 1 if 'Phishing' in x else 0)  # 1 dla phishingu, 0 dla bezpiecznych
    X = data['Email Text']
    y = data['label']

    # Podział danych na zestawy treningowe i testowe
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Przetwarzanie tekstu
    vectorizer = CountVectorizer()
    X_train_vectorized = vectorizer.fit_transform(X_train)

    # Trenowanie modelu
    model = LogisticRegression()
    model.fit(X_train_vectorized, y_train)

    # Zapisz model i wektoryzator
    joblib.dump(model, model_file)
    joblib.dump(vectorizer, vectorizer_file)

    # Testowanie modelu
    y_pred = model.predict(vectorizer.transform(X_test))
    print(f'Accuracy: {accuracy_score(y_test, y_pred)}')

@app.route('/predict', methods=['POST'])
def predict():
    email_text = request.json['email_text']
    email_vectorized = vectorizer.transform([email_text])
    prediction = model.predict(email_vectorized)
    result = 'Phishing' if prediction[0] == 1 else 'Bezpieczna'
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)