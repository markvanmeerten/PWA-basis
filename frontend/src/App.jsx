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

      <ul>
        <li>
          <a href="https://www.docker.com/">Docker</a>
        </li>
        <li>
          <a href="https://react.dev/">React</a> &{" "}
          <a href="https://vite.dev/">Vite</a>
        </li>
        <li>
          <a href="https://laravel.com/">Laravel</a>
        </li>
        <li>
          <a href="https://www.postgresql.org/">PostgreSQL</a>
        </li>
        <li>
          <a href="https://vite-pwa-org.netlify.app/">PWA plugin Vite</a>
        </li>
      </ul>
    
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
    </>
  );
}

export default App;
