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
    console.log("Gebruikerkeuze:", outcome);

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
      <div className="card inline">
        <a href="https://www.technovacollege.nl/" target="_blank">
          <img src={technovaLogo} className="logo" alt="Technova logo" />
        </a>

        <h1 style={{ color: "purple" }}>Technova</h1>
      </div>

      <div className="card">
        <h2>Project</h2>
        <p>
          Een project dat je kunt gebruiken voor het Leenplaats project. Het
          maakt gebruik van Docker en combineert:
        </p>

        <ul>
          <li>Backend: Laravel + PostgreSQL</li>
          <li>Frontend: Vite + React</li>
          <li>
            Hosting: <a href="https://render.com/">Render.com</a>
          </li>
        </ul>
      </div>

      <div className="card inline">
        <h2>Buttons:</h2>
        <button onClick={handleClickCount} disabled={loading}>
          {loading ? "⏳ Laden..." : `Count: ${count}`}
        </button>

        {showInstallButton && (
          <button onClick={handleInstallClick}>📲 Installeer deze app</button>
        )}
      </div>
    </>
  );
}

export default App;
