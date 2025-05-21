# 📦 PWA Starter – Laravel, React (Vite) & PostgreSQL via Docker

## 📁 Project

Dit project is een basisopzet voor een **Progressive Web App (PWA)** waarbij gebruik wordt gemaakt van **React (met Vite)** als frontend, **Laravel** als backend API en **PostgreSQL** als relationele database. Alles is gecontainerized met **Docker**, zodat je lokaal snel en betrouwbaar kunt werken zonder complexe installatie.

### 🧱 Gebruikte technieken

- [Docker](https://www.docker.com/)  
  Alle onderdelen draaien in geïsoleerde containers (virtuele machines), zodat jij en je teamgenoot een identiek dezelfde ontwikkelomgeving hebben.

- [React](https://react.dev/) & [Vite](https://vite.dev/)  
  De gebruikersinterface is gebouwd met React, een populaire JavaScript-bibliotheek voor interactieve webapps. Vite zorgt voor snelle ontwikkeling en build-tijd dankzij moderne bundling.

- [Laravel](https://laravel.com/)  
  De backend is ontwikkeld met Laravel, een krachtig PHP-framework dat het bouwen van API’s eenvoudig en overzichtelijk maakt. Laravel verzorgt o.a. authenticatie, routing en communicatie met de database.

- [PostgreSQL](https://www.postgresql.org/)  
  De relationele database waar alle gegevens in worden opgeslagen. PostgreSQL is robuust, open source, en wordt breed gebruikt in professionele omgevingen.

- [PWA plugin Vite](https://vite-pwa-org.netlify.app/)  
  Deze plugin laat je m.b.v. een configuratiefile een basic manifest en service-worker genereren om installatie op mobiele apparaten mogelijk te maken. Deze kun je zelf nog uitbreiden met caching en offline beschikbaarheid.

---

## 🚀 Getting Started

### 🐳 Stap 1 – Installeer Docker

Installeer Docker Desktop op je laptop via:  
👉 [https://www.docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop)

Na installatie kun je testen of Docker werkt met:

```bash
docker --version
```

---

### 📥 Stap 2 – Clone de repo & configureer `.env.local`

Clone deze repository naar je lokale machine:

```bash
git clone https://github.com/<jouw-gebruikersnaam>/<projectnaam>.git
```

#### 📄 Voeg een `.env.local` bestand toe in de `frontend/` folder:

```env
VITE_API_URL=http://<jouw-ip-adres>:8000/api
```

🔸 Vervang `<jouw-ip-adres>` door het IP-adres van jouw machine.  
Gebruik `ipconfig` (Windows) of `ip a` (macOS/Linux) om dit op te zoeken.

> 📱 Hiermee kun je de frontend ook testen vanaf andere apparaten in hetzelfde WiFi-netwerk (zoals je telefoon).


---

### 🛠️ Stap 3 – Project builden en starten

Open een terminal in de **root** van het project (waar `docker-compose.yml` staat) en voer het volgende uit:

```bash
docker-compose build
docker-compose up
```

🔁 **Let op:** De code bevat een bug. Bij de allereerste start wordt Laravel al gestart voordat de database klaar is met configureren.  
Oplossing:

1. Stop de containers met `CTRL+C`
2. Start opnieuw met:

```bash
docker-compose up
```

Daarna zal Laravel correct verbinden met de database.

#### Wat gebeurt er?

- De **backend container** start Laravel
- De **frontend container** start React
- De **database container** start PostgreSQL
- Je ziet in de terminal hoe je frontend bereikbaar is (bijv. `http://localhost:5173`)

> ❗️ Let op: IP-adressen zoals `172.18.x.x` uit Docker zijn intern. Gebruik je **eigen** IP-adres van je laptop voor extern testen.

#### 🔬 PWA testen?

Om een build van de frontend te testen als echte PWA:

```bash
docker-compose exec react-frontend npm run pwa
```

Dat combineert `npm run build` en `npm run preview`.

---

### 🧪 Extra: Commands uitvoeren in containers

Wil je artisan-commando’s of database-opdrachten uitvoeren?

Gebruik `docker-compose exec` gevolgd door de service:

```bash
docker-compose exec laravel-backend php artisan migrate
docker-compose exec react-frontend npm install
docker-compose exec db psql -U laravel -d laravel
```

---

### ☁️ Stap 4 – Project deployen op Render (gratis)

#### 1. Vervang in `render.yml`:

Zoek in `render.yml` naar:

```yaml
repo: https://github.com/##<URL van je repo>##
```

en vervang dit met de URL van jouw repository, zoals:

```yaml
repo: https://github.com/markvanmeerten/PWA-basis
```

#### 2. Maak een Render account

- Ga naar [https://render.com](https://render.com)
- Kies **Hobby plan** (gratis)
- Zet **spending limit** op €0

#### 3. Deploy je project

- Ga naar "New → Blueprint"
- Selecteer je GitHub repo
- Render leest automatisch het `render.yml` bestand en maakt:
  - een Laravel backend container
  - een PostgreSQL database
  - een React static frontend site

#### 4. Voeg de frontend environment variable toe:

Ga naar de **`react-frontend`** static site in Render → klik op **Environment** en voeg toe:

```
Key:    VITE_API_URL
Value:  https://<jouw-laravel-backend>.onrender.com/api
```

> Vervang de URL met de echte backend-URL die Render heeft aangemaakt.

---

## ✅ Klaar!

Je hebt nu een werkende, schaalbare PWA ontwikkelomgeving — lokaal én online.  
Veel succes met bouwen! 💡
---
