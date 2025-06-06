import { useNavigate } from "react-router-dom";
import "./WelcomePage.css";

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <h1>Bienvenue sur <span className="highlight">MaBoutique</span> !</h1>
      <p>Découvrez une sélection de produits incroyables à petits prix.</p>

      <div className="button-group">
        <button onClick={() => navigate("/login-user")} className="btn btn-user">
          Connexion Utilisateur
        </button>

        <button onClick={() => navigate("/login-admin")} className="btn btn-admin">
          Connexion Admin
        </button>

        <button onClick={() => navigate("/home")} className="btn btn-shop">
          Accéder à la boutique
        </button>
      </div>
    </div>
  );
}
