import { Route, Routes } from "react-router-dom";

import { useEffect } from "react";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils.js";
import { setCategories } from "../../store/categories/categories.action.js";

import { useDispatch } from "react-redux";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import "./shop.style.scss";
const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesArray = await getCategoriesAndDocuments();
      // console.log(categoriesArray)
      dispatch(setCategories(categoriesArray));
    };
    getCategoriesMap();
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};
export default Shop;
