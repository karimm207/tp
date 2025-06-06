export type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

// Récupérer le panier depuis localStorage
export function getCart(): CartItem[] {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

// Sauvegarder le panier dans localStorage
export function saveCart(cart: CartItem[]) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Ajouter un produit au panier (ou incrémenter la quantité si déjà présent)
export function addToCart(item: Omit<CartItem, "quantity">) {
  const cart = getCart();
  const existing = cart.find(p => p.id === item.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  saveCart(cart);
}

// Supprimer un produit du panier par son id
export function removeFromCart(id: number) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== id);
  saveCart(cart);
}

// Mettre à jour la quantité d’un produit dans le panier
export function updateQuantity(id: number, quantity: number) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity = quantity > 0 ? quantity : 1;
    saveCart(cart);
  }
}

// Calculer le total HT et TTC (avec TVA configurable)
export function getCartTotal(tvaPercent = 20): { totalHT: number; totalTTC: number } {
  const cart = getCart();
  const totalHT = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalTTC = totalHT * (1 + tvaPercent / 100);
  return { totalHT, totalTTC };
}
