import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error("Identifiants incorrects");
      }

      const data = await res.json();
      sessionStorage.setItem("userToken", data.token);
      sessionStorage.setItem("username", username);

      setSuccess(true);

      // Après 2 secondes, redirection vers home
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "300px", margin: "auto" }}>
      <h2>Connexion Utilisateur</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {success && (
        <p style={{ color: "green" }}>
          Hello, <strong>{username}</strong>! Connexion réussie, redirection en cours...
        </p>
      )}

      <input
        type="text"
        placeholder="Nom d'utilisateur"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        disabled={success}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        disabled={success}
      />
      <button type="submit" disabled={success}>
        Se connecter
      </button>
    </form>
  );
}
