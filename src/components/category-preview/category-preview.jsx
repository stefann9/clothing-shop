import "./category-preview.scss";
import ProductCard from "../product-card/product-card.component";
const CategoryPreview = ({ title, products }) => {
  return (
    <div className="category-preview-container">
      <h1>
        <span>{title.toUpperCase()}</span>
      </h1>
      <div className="preview">
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};
export default CategoryPreview;
