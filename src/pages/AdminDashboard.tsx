import { useEffect, useState } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
};

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    category: "",
  });

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  function openModal(product: Product) {
    setCurrentProduct(product);
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
    });
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setCurrentProduct(null);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  }

  function handleUpdate() {
    if (!currentProduct) return;
    // Simulation : mise à jour côté client
    setProducts((prev) =>
      prev.map((p) =>
        p.id === currentProduct.id
          ? { ...p, ...formData }
          : p
      )
    );
    alert("Produit mis à jour (simulation)");
    closeModal();
  }

  function handleDelete() {
    if (!currentProduct) return;
    // Simulation : suppression côté client
    setProducts((prev) => prev.filter((p) => p.id !== currentProduct.id));
    alert("Produit supprimé (simulation)");
    closeModal();
  }

  if (loading) return <p>Chargement...</p>;

  return (
    <div style={{ maxWidth: 900, margin: "2rem auto", fontFamily: "Arial, sans-serif" }}>
      <h1>Tableau de bord Admin</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 20 }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: "1px solid #ddd", borderRadius: 8, padding: 10 }}>
            <img src={product.image} alt={product.title} style={{ width: "100%", height: 150, objectFit: "contain" }} />
            <h3>{product.title}</h3>
            <p><strong>Prix :</strong> {product.price} €</p>
            <p><strong>Catégorie :</strong> {product.category}</p>
            <button
              onClick={() => openModal(product)}
              style={{
                backgroundColor: "#007bff",
                color: "white",
                padding: "0.4rem 1rem",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              Modifier / Supprimer
            </button>
          </div>
        ))}
      </div>

      {modalOpen && currentProduct && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              width: 400,
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
          >
            <h2>Modifier le produit</h2>

            <label>
              Titre
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                style={{ width: "100%", marginBottom: 8 }}
              />
            </label>

            <label>
              Description
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                style={{ width: "100%", marginBottom: 8 }}
              />
            </label>

            <label>
              Prix (€)
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                style={{ width: "100%", marginBottom: 8 }}
              />
            </label>

            <label>
              Catégorie
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={{ width: "100%", marginBottom: 16 }}
              />
            </label>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={handleUpdate}
                style={{ backgroundColor: "#28a745", color: "white", padding: "0.5rem 1rem", border: "none", borderRadius: 6, cursor: "pointer" }}
              >
                Mettre à jour
              </button>

              <button
                onClick={handleDelete}
                style={{ backgroundColor: "#dc3545", color: "white", padding: "0.5rem 1rem", border: "none", borderRadius: 6, cursor: "pointer" }}
              >
                Supprimer
              </button>

              <button onClick={closeModal} style={{ padding: "0.5rem 1rem" }}>
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
