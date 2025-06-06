// export default function AdminLogin() {
//   return <h1>Connexion Admin</h1>;
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const adminCredentials = {
  username: "admin",
  password: "admin123",
};

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (username === adminCredentials.username && password === adminCredentials.password) {
      // Stockage en sessionStorage
      sessionStorage.setItem("adminUser", JSON.stringify({ username }));
      navigate("/admin"); // Rediriger vers la page d'accueil ou admin
    } else {
      setError("Identifiants admin incorrects");
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "300px", margin: "auto" }}>
      <h2>Connexion Administrateur</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="Nom d'utilisateur"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Se connecter</button>
    </form>
  );
}
