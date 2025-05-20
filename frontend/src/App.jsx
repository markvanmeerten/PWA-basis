import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
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
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>

        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React + PWA</h1>

      <div className="card">
        <button onClick={handleClickCount} disabled={loading}>
          {loading ? "⏳ Laden..." : `Count: ${count}`}
        </button>
      </div>

      {showInstallButton && (
        <div className="card">
          <button onClick={handleInstallClick}>📲 Installeer deze app</button>
        </div>
      )}
    </>
  );
}

export default App;
