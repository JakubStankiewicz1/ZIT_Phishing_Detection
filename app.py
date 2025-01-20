import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
from flask import Flask, request, render_template

# Wczytaj dane, ograniczając do pierwszych 100 wierszy
data = pd.read_csv('emails.csv').head(10000)  # Upewnij się, że plik emails.csv jest w tym samym folderze

# Sprawdzenie brakujących danych
print("Brakujące dane w zbiorze:")
print(data.isnull().sum())

# Usunięcie wierszy z brakującymi danymi
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
X_test_vectorized = vectorizer.transform(X_test)

# Trenowanie modelu
model = LogisticRegression()
model.fit(X_train_vectorized, y_train)

# Testowanie modelu
y_pred = model.predict(X_test_vectorized)
print(f'Accuracy: {accuracy_score(y_test, y_pred)}')

# Tworzenie aplikacji Flask
app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    email_text = request.form['email_text']
    email_vectorized = vectorizer.transform([email_text])
    prediction = model.predict(email_vectorized)
    result = 'Phishing' if prediction[0] == 1 else 'Bezpieczna'
    return render_template('result.html', result=result)

if __name__ == '__main__':
    app.run(debug=True)