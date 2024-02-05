import { Route, Routes } from "react-router-dom";

import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { fetchCategoriesStart } from "../../store/categories/categories.action.js";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import "./shop.style.scss";
const Shop = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // fetchCategoriesAsync(dispatch);
    dispatch(fetchCategoriesStart())
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};
export default Shop;
