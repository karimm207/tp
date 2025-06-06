import { useEffect, useState } from "react";
import type { CartItem } from "../utils/cartUtils";
import { getCart, removeFromCart, updateQuantity, getCartTotal } from "../utils/cartUtils";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";
import { NavLink } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [tva, setTva] = useState(20);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleRemove = (id: number) => {
    removeFromCart(id);
    setCart(getCart());
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity < 1) return;
    updateQuantity(id, quantity);
    setCart(getCart());
  };

  const { totalHT, totalTTC } = getCartTotal(tva);

  return (
    <div className="cart-container">
  <NavLink to="/home" className="return-button">
  ← Retour à la boutique
</NavLink>

      <h1 className="cart-title">Votre Panier</h1>

      {cart.length === 0 && <p className="empty-message">Votre panier est vide.</p>}

      {cart.map(item => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.title} />
          <div className="cart-item-details">
            <h3>{item.title}</h3>
            <p>Prix unitaire : <strong>{item.price} €</strong></p>
            <label className="quantity-label">
              Quantité: 
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={e => handleQuantityChange(item.id, Number(e.target.value))}
                className="quantity-input"
              />
            </label>
          </div>
          <button className="remove-button" onClick={() => handleRemove(item.id)}>
            Supprimer
          </button>
        </div>
      ))}

      {cart.length > 0 && (
        <div className="totals-section">
          <label>
            TVA : 
            <select
              value={tva}
              onChange={e => setTva(Number(e.target.value))}
              className="tva-select"
            >
              <option value={20}>20%</option>
              <option value={5}>5%</option>
            </select>
          </label>
          <p><strong>Total HT :</strong> {totalHT.toFixed(2)} €</p>
          <p><strong>Total TTC :</strong> {totalTTC.toFixed(2)} €</p>
        </div>
      )}
    </div>
  );
}
