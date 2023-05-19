FROM php:7.4-apache
# Copie des fichiers de l'application
COPY ./index.php /var/www/html
# Installation des dépendances de l'application
RUN apt-get update && apt-get install -y \
libpq-dev \
&& docker-php-ext-install pdo_mysql pdo_pgsql
# Configuration de PHP et Apache
RUN a2enmod rewrite
COPY apache-config.conf /etc/apache2/sites-available/000-default.conf


# Création d'un utilisateur non privilégié
RUN groupadd -g 1000 appuser && useradd -r -u 1000 -g appuser appuser

USER appuser
# Exposition du port utilisé par Apache
EXPOSE 80
CMD ["apache2-foreground"]
