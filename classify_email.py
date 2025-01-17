import pickle
import email
from email import policy
from email.parser import BytesParser
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from bs4 import BeautifulSoup
import re

# Wczytaj model
with open('phishing_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

# Wczytaj wektoryzator
with open('vectorizer.pkl', 'rb') as vectorizer_file:
    vectorizer = pickle.load(vectorizer_file)

# Funkcja do przetwarzania tekstu
def preprocess_text(text):
    tokens = word_tokenize(text.lower())  # Tokenizacja i konwersja na małe litery
    tokens = [word for word in tokens if word.isalnum()]  # Usunięcie znaków specjalnych
    tokens = [word for word in tokens if word not in stopwords.words('english')]  # Usunięcie stopwords
    return ' '.join(tokens)  # Zwróć przetworzony tekst jako pojedynczy string

# Funkcja do ekstrakcji cech z wiadomości EML
def extract_email_features(file_path):
    with open(file_path, 'rb') as f:
        msg = BytesParser(policy=policy.default).parse(f)

        # Ekstrakcja nadawcy
        sender = msg['From']
        
        # Ekstrakcja odbiorcy
        receiver = msg['To']
        
        # Ekstrakcja daty
        date = msg['Date']
        
        # Ekstrakcja tematu
        subject = msg['Subject']
        
        # Ekstrakcja treści
        body = None
        
        # Spróbuj uzyskać treść w formacie tekstowym
        if msg.is_multipart():
            for part in msg.iter_parts():
                if part.get_content_type() == 'text/plain':
                    body = part.get_content()
                    break
                elif part.get_content_type() == 'text/html':
                    body = part.get_content()
                    break
        else:
            body = msg.get_content()

        # Jeśli body jest w formacie HTML, użyj BeautifulSoup do przetworzenia HTML
        if body is not None and msg.get_content_type() == 'text/html':
            soup = BeautifulSoup(body, 'html.parser')
            body = soup.get_text()  # Ekstrahuje tylko tekst

        # Jeśli body jest None, spróbuj uzyskać treść z wszystkich części
        if body is None:
            for part in msg.iter_parts():
                if part.get_content_type() == 'text/plain':
                    body = part.get_content()
                    break
                elif part.get_content_type() == 'text/html':
                    body = part.get_content()
                    break

        # Jeśli body jest nadal None, zgłoś błąd
        if body is None:
            raise ValueError("Nie znaleziono treści wiadomości w formacie tekstowym ani HTML.")
        
        return {
            'sender': sender,
            'receiver': receiver,
            'date': date,
            'subject': subject,
            'body': body.strip()  # Usunięcie zbędnych białych znaków
        }

# Funkcja do klasyfikacji wiadomości EML
def classify_email(file_path):
    features = extract_email_features(file_path)  # Ekstrakcja cech
    body = features['body']  # Uzyskaj treść wiadomości

    # Przetwarzanie treści wiadomości
    processed_body = preprocess_text(body)
    
    # Wektoryzacja treści
    body_vectorized = vectorizer.transform([processed_body])
    
    # Predykcja
    prediction = model.predict(body_vectorized)
    
    return prediction[0], features  # Zwróć zarówno predykcję, jak i cechy

# Przykład użycia
if __name__ == "__main__":
    email_file = 'sample-10.eml'  # Podaj ścieżkę do pliku EML
    result, features = classify_email(email_file)
    print(f"Wynik klasyfikacji dla {email_file}: {'Phishing' if result == 1 else 'Nie phishing'}")
    print("Ekstrahowane cechy:")
    # print("Nadawca:", features['sender'])
    # print("Odbiorca:", features['receiver'])
    # print("Data:", features['date'])
    # print("Temat:", features['subject'])
    # print("Treść:", features['body'])