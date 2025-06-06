import { Link } from "react-router-dom";

type ProductProps = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export default function ProductCard({ id, title, price, image }: ProductProps) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", margin: "0.5rem" }}>
      <img src={image} alt={title} width="100" />
      <h3>{title}</h3>
      <p>{price} €</p>
      <Link to={`/product/${id}`}>Voir</Link>
    </div>
  );
}
