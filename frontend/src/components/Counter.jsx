import { useEffect, useState } from "react";

function Counter({ apiUrl, id }) {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${apiUrl}/increment/${id}`)
      .then((res) => res.json())
      .then((data) => setCount(data.value))
      .catch((err) => console.error("Fout bij ophalen:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleClick = () => {
    setLoading(true);
    fetch(`${apiUrl}/increment/${id}`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => setCount(data.value))
      .catch((err) => console.error("Fout bij posten:", err))
      .finally(() => setLoading(false));
  };

  return (
    <li>
      Simpele counter om de backend & database verbinding te testen
      <br />
      <button onClick={handleClick} disabled={loading}>
        {loading ? "⏳ Laden..." : `Count: ${count}`}
      </button>
    </li>
  );
}

export default Counter;
