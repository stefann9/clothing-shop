import { useParams } from "react-router-dom";

import {/* useContext,*/ useEffect, useState } from "react";
// import { CategoriesContext } from "../../contexts/categories.context";
import { useSelector } from "react-redux";
import { selectorCategoriesMap } from "../../store/categories/categories.selector";

import ProductCard from "../../components/product-card/product-card.component";

import { Title, CategoryContainer } from "./category.style";

const Category = () => {
  const { category } = useParams();
  // const { categoriesMap } = useContext(CategoriesContext);
  const categoriesMap = useSelector(selectorCategoriesMap);

  const [products, setProducts] = useState(categoriesMap[category]);
  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);
  
  return (
    <>
      <Title>{category.toUpperCase()}</Title>
      <CategoryContainer>
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </CategoryContainer>
    </>
  );
};
export default Category;
