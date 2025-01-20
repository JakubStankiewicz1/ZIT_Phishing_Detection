import pandas as pd

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix, roc_auc_score, roc_curve, matthews_corrcoef, log_loss

from sklearn.svm import SVC
import joblib  # Add this import

# Sekcje z komentarzami z "?" są opcjonalne, można usunąć w finalnej wersji albo zostawić.

# Wczytanie danych
df = pd.read_csv("phishing_emails.csv")

# Usunięcie brakujących wartości i duplikatów
df = df.dropna()
df = df.drop_duplicates()

# ? Wyświetlenie nazw kolumn
print(df.columns)

# ? Sprawdzenie liczby maili phishingowych i niephishingowych
print(df["label"].value_counts())
phishing_emails = df[df["label"] == 1]
non_phishing_emails = df[df["label"] == 0]

# Przygotowanie próbki danych - po 1000 próbek losowych każdego rodzaju
phishing_sample = phishing_emails.sample(n=1000, random_state=42)
non_phishing_sample = non_phishing_emails.sample(n=1000, random_state=42)
df_sample = pd.concat([phishing_sample, non_phishing_sample]).reset_index(drop=True)
df_sample = df_sample.sample(frac=1, random_state=42).reset_index(drop=True)


# Podział danych na zbiór treningowy i testowy
X = df_sample["body"]
y = df_sample["label"]

# Użycie modelu train_test_split z pakietu sklearn do podziału danych na zbiór treningowy i testowy
# Stratification - wskazanie wartości na podstawie których dane mają być podzielone
# Random_state - ziarno losowości, aby wyniki były powtarzalne
# Test_size=0.3 - uzyskać 70% danych treningowych i 30% danych testowych
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42, stratify=y)

# Utworzenie macierzy TF-IDF w celu przekształcenia tekstu na liczby, każdy email jest reprezentowany jako wektor
# max_features=5000 - ograniczenie liczby słów do 5000
tfidf = TfidfVectorizer(max_features=5000)
X_train_tfidf = tfidf.fit_transform(X_train)
X_test_tfidf = tfidf.transform(X_test)
print("Shape of training TF-IDF matrix:", X_train_tfidf.shape)
print("Shape of testing TF-IDF matrix:", X_test_tfidf.shape)

# ? Sprawdzenie średniej długości tekstu w phishingowych i niephishingowych mailach
df_sample["text_length"] = df_sample["body"].apply(len)
avg_text_length = df_sample.groupby("label")["text_length"].mean()
for label, length in avg_text_length.items():
    label_name = "Non-Phishing" if label == 0 else "Phishing"
    print(f"Average text length for {label_name} emails: {length:.2f} characters")


# Utworzenie modelu SVC z jądrem liniowym
# random_state=42 - ziarno losowości, aby wyniki były powtarzalne
# probability=True - umożliwia obliczenie prawdopodobieństwa przynależności do danej klasy
svm_model = SVC(kernel="linear", probability=True, random_state=42)
svm_model.fit(X_train_tfidf, y_train)
y_pred_svm = svm_model.predict(X_test_tfidf)
y_pred_proba_svm = svm_model.predict_proba(X_test_tfidf)[:, 1]

# SVM Classification Report
print("\nSVM Classification Report:")
print(classification_report(y_test, y_pred_svm))

# SVM Accuracy and Error Rate
accuracy_svm = accuracy_score(y_test, y_pred_svm)
error_rate_svm = 1 - accuracy_svm
print(f"SVM Accuracy: {accuracy_svm:.2f}")
print(f"SVM Error Rate: {error_rate_svm:.2f}")

# Save the trained model and TF-IDF vectorizer
joblib.dump(svm_model, "phishing_model.pkl")
joblib.dump(tfidf, "vectorizer.pkl")
print("Model and vectorizer saved to disk.")
