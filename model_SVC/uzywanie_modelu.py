from email import policy
from email.parser import BytesParser

import joblib


# Ścieżka do pliku z modelem
MODEL_PATH = "phishing_model.pkl"
# Ścieżka do pliku z wektoryzatorem
VECTORIZER_PATH = "vectorizer.pkl"
# Ścieżka do pliku z danymi testowymi
EMAIL_PATH = "email.eml"


# Pobranie tekstu wiadomośći z pliku
def get_email_content(email_path):
    with open(email_path, "rb") as f:
        msg = BytesParser(policy=policy.default).parse(f)
    return msg.get_body(preferencelist=("plain")).get_content()


email_content = get_email_content(EMAIL_PATH)

# Przekształcenie treści wiadomości na listę, ponieważ model oczekuje listy
email_content = [email_content]

# Wczytanie modelu i wektoryzatora
model = joblib.load(MODEL_PATH)
vectorizer = joblib.load(VECTORIZER_PATH)

# Przetworzenie tekstu wiadomości
email_content_processed = vectorizer.transform(email_content)

# Dokonanie predykcji
prediction = model.predict(email_content_processed)
prediction_proba = model.predict_proba(email_content_processed)

# Wyświetlenie wyników
print("Predykcja:", prediction)
print("Prawdopodobieństwo:", prediction_proba)
