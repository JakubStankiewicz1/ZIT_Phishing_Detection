import pandas as pd
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import re
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import classification_report
import pickle
import time

# Wczytaj dane
print("Wczytywanie danych...")
data = pd.read_csv('CEAS_08.csv')
print("Dane zostały wczytane. Liczba wierszy:", data.shape[0])

# Sprawdź pierwsze kilka wierszy
print(data.info())

# Pobierz stopwords
print("Pobieranie zasobów NLTK...")
nltk.download('punkt')
nltk.download('stopwords')
print("Zasoby NLTK zostały pobrane.")

# Funkcja do przetwarzania tekstu
def preprocess_text(text):
    tokens = word_tokenize(text.lower())  # Tokenizacja i konwersja na małe litery
    tokens = [word for word in tokens if word.isalnum()]  # Usunięcie znaków specjalnych
    tokens = [word for word in tokens if word not in stopwords.words('english')]  # Usunięcie stopwords
    return ' '.join(tokens)  # Zwróć przetworzony tekst jako pojedynczy string

# Użyj całego zbioru danych
data_subset = data.head(50).copy()  # Użyj .copy() aby uniknąć ostrzeżeń

# Przetwarzanie treści wiadomości
start_time = time.time()
print("Przetwarzanie treści wiadomości (wszystkie wiersze)...")
data_subset.loc[:, 'processed_body'] = data_subset['body'].apply(preprocess_text)
print("Treść wiadomości została przetworzona w czasie:", time.time() - start_time, "sekund.")

# Funkcja do wykrywania linków
def detect_links(text):
    return bool(re.search(r'http[s]?://', text))

# Dodaj kolumnę z informacją o linkach
print("Wykrywanie linków w wiadomościach...")
data_subset.loc[:, 'contains_link'] = data_subset['body'].apply(detect_links)
print("Wykrywanie linków zakończone.")

# Podział danych
print("Podział danych na zestawy treningowe i testowe...")
X = data_subset['processed_body']  # Użyj przetworzonej treści
y = data_subset['label']  # Etykieta
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)  # Użyj stratification, aby zrównoważyć klasy
print("Podział danych zakończony. Liczba danych treningowych:", len(X_train), "Liczba danych testowych:", len(X_test))

# Wektoryzacja tekstu
print("Wektoryzacja tekstu...")
vectorizer = CountVectorizer()
X_train_vectorized = vectorizer.fit_transform(X_train)
X_test_vectorized = vectorizer.transform(X_test)
print("Wektoryzacja zakończona.")

 # Trenowanie modelu
print("Trenowanie modelu Naive Bayes...")
model = MultinomialNB()
model.fit(X_train_vectorized, y_train)
print("Model został wytrenowany.")

# Zapisz model do pliku
with open('phishing_model.pkl', 'wb') as model_file:
    pickle.dump(model, model_file)
print("Model został zapisany do pliku phishing_model.pkl.")

# Zapisz wektoryzator do pliku
with open('vectorizer.pkl', 'wb') as vectorizer_file:
    pickle.dump(vectorizer, vectorizer_file)
print("Wektoryzator został zapisany do pliku vectorizer.pkl.")

# Predykcja
print("Dokonywanie predykcji na danych testowych...")
y_pred = model.predict(X_test_vectorized)

# Raport klasyfikacji
print("Generowanie raportu klasyfikacji...")
print(classification_report(y_test, y_pred))
print("Zakończono proces.")