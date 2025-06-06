import { useEffect, useState } from "react";
import type { FavoriteItem } from "../utils/favoritesUtils";

import { getFavorites, toggleFavorite } from "../utils/favoritesUtils";
import { Link, useNavigate } from "react-router-dom";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const removeFavorite = (id: number) => {
    const itemToRemove = favorites.find(fav => fav.id === id);
    if (itemToRemove) {
      toggleFavorite(itemToRemove); 
      setFavorites((prev) => prev.filter(item => item.id !== id));
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      
      <button 
        onClick={() => navigate("/home")} 
        style={{ 
          marginBottom: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        ← Retour à la boutique
      </button>

      <h1>Mes Favoris</h1>
      {favorites.length === 0 && <p>Aucun produit en favori.</p>}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {favorites.map(item => (
          <div key={item.id} style={{ border: "1px solid #ccc", padding: "10px", width: "200px" }}>
            <img src={item.image} alt={item.title} style={{ width: "100%", height: "150px", objectFit: "contain" }} />
            <h3>{item.title}</h3>
            <p>{item.price} €</p>
            <Link to={`/product/${item.id}`}>Voir détails</Link>
            <button onClick={() => removeFavorite(item.id)} style={{ display: "block", marginTop: "0.5rem" }}>
              Retirer des favoris
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
