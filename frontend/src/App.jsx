import { useEffect, useState } from "react";
import technovaLogo from "./assets/technova_logo.png";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [id, setId] = useState(1);
  const [loading, setLoading] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    setLoading(true);

    fetch(`${apiUrl}/increment/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setCount(data.value);
      })
      .catch((error) => {
        console.error("Fout bij ophalen:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;

    console.log(outcome);

    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  const handleClickCount = async () => {
    setLoading(true);

    fetch(`${apiUrl}/increment/${id}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        setCount(data.value);
      })
      .catch((error) => {
        console.error("Fout bij ophalen:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="inline" style={{ width: "50%" }}>
        <a href="https://www.technovacollege.nl/" target="_blank">
          <img src={technovaLogo} className="logo" alt="Technova logo" />
        </a>

        <h1 style={{ color: "purple" }}>PWA basis</h1>
      </div>

      <p>
        Gebruik dit project als basis of als voorbeeld voor een Progressive Web
        App (PWA). Het is zo ingericht dat je zonder problemen kunt samenwerken
        en testen op je laptop + telefoon. Ook kun je dit project automatisch
        deployen en hosten op <a href="https://render.com/">Render.com</a>
      </p>

      <div className="inline">
        <div className="card" style={{ width: "50%" }}>
          <h2>Technieken</h2>

          <ul>
            <li>
              <a href="https://www.docker.com/">Docker</a> <br /> Alle
              onderdelen draaien in geïsoleerde containers (virtuele machines),
              zodat jij en je teamgenoot een identiek dezelfde ontwikkelomgeving
              hebben.
            </li>
            <li>
              <a href="https://react.dev/">React</a> &{" "}
              <a href="https://vite.dev/">Vite</a>
              <br />
              De gebruikersinterface is gebouwd met React, een populaire
              JavaScript-bibliotheek voor interactieve webapps. Vite zorgt voor
              snelle ontwikkeling en build-tijd dankzij moderne bundling.
            </li>
            <li>
              <a href="https://laravel.com/">Laravel</a> <br /> De backend is
              ontwikkeld met Laravel, een krachtig PHP-framework dat het bouwen
              van API’s eenvoudig en overzichtelijk maakt. Laravel verzorgt o.a.
              authenticatie, routing en communicatie met de database.
            </li>
            <li>
              <a href="https://www.postgresql.org/">PostgreSQL</a> <br /> De
              relationele database waar alle gegevens in worden opgeslagen.
              PostgreSQL is robuust, open source, en wordt breed gebruikt in
              professionele omgevingen.
            </li>
            <li>
              <a href="https://vite-pwa-org.netlify.app/">PWA plugin Vite</a>
              <br />
              Deze plugin laat je m.b.v. een configuratiefile een basic manifest
              en service-worker genereren om installatie op mobiele apparaten
              mogelijk te maken. Deze kun je zelf nog uitbreiden met caching en
              offline beschikbaarheid.
            </li>
          </ul>
        </div>
        <div className="card" style={{ width: "50%" }}>
          <h2>Testen</h2>

          <ul>
            <li>
              Simpele counter om te testen of de backend en database werken
              <br />
              <button onClick={handleClickCount} disabled={loading}>
                {loading ? "⏳ Laden..." : `Count: ${count}`}
              </button>
            </li>
            {showInstallButton && (
              <li>
                Installeer de PWA via de adresbalk of door op onderstaande knop
                te drukken
                <br />
                <button onClick={handleInstallClick}>
                  📲 Installeer deze app
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
