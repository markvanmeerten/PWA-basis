# Gebruik een officiële PHP-image met alle Laravel-vereisten
FROM php:8.2-cli

# Installeer benodigde extensies
RUN apt-get update && apt-get install -y \
    git curl zip unzip libonig-dev libxml2-dev libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql mbstring

# Installeer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Zet werkdirectory
WORKDIR /var/www

# Kopieer Laravel-bestanden
COPY . .

# Installeer PHP-dependencies
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Zet juiste rechten voor cache/storage (optioneel, handig bij foutmeldingen)
RUN chown -R www-data:www-data storage bootstrap/cache

# Open poort
EXPOSE 8000

# Laravel migraties uitvoeren én starten
CMD php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=8000
