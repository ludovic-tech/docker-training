FROM python:3.9-slim

# Installation des dépendances
RUN pip install flask

# Copie de l'application
COPY app.py /app.py

# Exposition du port 8080
EXPOSE 8080

# Définition de l'utilisateur non privilégié
USER nobody

# Commande par défaut pour lancer l'application
CMD ["python", "/app.py"]

