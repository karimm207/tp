import { useParams, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { addToCart } from "../utils/cartUtils";
import "./ProductPage.css";  

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
};

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(console.error);
  }, [id]);

  if (!product) return <p>Chargement...</p>;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
    alert("Produit ajouté au panier !");
  };

  return (
    <div className="product-page" style={{ padding: "1rem" }}>
      <NavLink to="/home" className="btn-return">
        ← Retour à la boutique
      </NavLink>

      <h1>{product.title}</h1>
      <img
        src={product.image}
        alt={product.title}
        style={{ width: "300px", height: "300px", objectFit: "contain" }}
      />
      <p><strong>Catégorie :</strong> {product.category}</p>
      <p>{product.description}</p>
      <h3>{product.price} €</h3>
      <button onClick={handleAddToCart}>Ajouter au panier</button>
    </div>
  );
}
