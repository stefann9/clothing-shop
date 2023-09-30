import SHOP_DATA from "../../shop-data.json";
const Shop = () => {
  return (
    <div>
      {SHOP_DATA.map(({ id, name }) => (
        <div>
          <h1 key={id}>{name}</h1>
        </div>
      ))}
    </div>
  );
};
export default Shop;
