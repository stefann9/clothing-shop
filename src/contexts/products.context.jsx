import { createContext, useEffect, useState } from "react";
// import SHOP_DATA from "../shop-data.js";
import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils.js";
export const ProductsContext = createContext({
  products: [],
});

export const ProductsProvider = ({ children }) => {
  const [products] = useState([]);
  const value = { products };
  
  // useEffect(() => {
  // // use it to create collection "categories" and add SHOP_DATA as docs
  //   addCollectionAndDocuments("categories", SHOP_DATA);
  // }, []);
  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};
