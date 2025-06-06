import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { FavoriteItem } from "../utils/favoritesUtils";
import { getFavorites, toggleFavorite } from "../utils/favoritesUtils";
import { addToCart } from "../utils/cartUtils"; // <-- bien importé
import "./Home.css";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

const PRODUCTS_PER_PAGE = 6;

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(console.error);

    setFavorites(getFavorites());
  }, []);

  const onToggleFavorite = (product: FavoriteItem) => {
    toggleFavorite(product);
    setFavorites(getFavorites());
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
    alert("Produit ajouté au panier !");
  };

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Liste des Produits</h1>
        <div className="header-buttons">
          <button onClick={() => navigate("/")}>🏠 Accueil</button>
          <button onClick={() => navigate("/cart")}>🛒 Panier</button>
          <button onClick={() => navigate("/favorites")}>❤️ Favoris</button>
        </div>
      </header>

      <div className="products-grid">
        {paginatedProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.price} €</p>
            <div className="card-actions">
              <Link to={`/product/${product.id}`}>Voir détails</Link>
              <button
                onClick={() => onToggleFavorite(product)}
                className={favorites.some(fav => fav.id === product.id) ? "heart active" : "heart"}
                title="Ajouter ou retirer des favoris"
              >
                ♡
              </button>
              <button
                onClick={() => handleAddToCart(product)}
                className="add-to-cart"
                title="Ajouter au panier"
              >
                🛒
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
