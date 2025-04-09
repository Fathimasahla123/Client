import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CardFeature from "./CardFeature";
import FilterProduct from "./filterProduct";

// const AllProduct = ({ heading }) => {
//   const productData = useSelector((state) => state.product.productList);
//   const categoryList = [...new Set(productData.map((el) => el.category))];

//   //filter data display
//   const [filterby, setFilterBy] = useState("");
//   const [dataFilter, setDataFilter] = useState([]);

//   useEffect(() => {
//     setDataFilter(productData);
//   }, [productData]);

//   const handleFilterProduct = (category) => {
//     setFilterBy(category);
//     const filter = productData.filter(
//       (el) => el.category.toLowerCase() === category.toLowerCase()
//     );
//     setDataFilter(() => {
//       return [...filter];
//     });
//   };

//   const loadingArrayFeature = new Array(10).fill(null);

//   return (
//     <div className="my-5">
//       <h2 className="font-bold text-2xl text-slate-800 mb-4">{heading}</h2>

//       <div className="flex gap-4 justify-center overflow-scroll scrollbar-none">
//         {categoryList[0] ? (
//           categoryList.map((el) => {
//             return (
//               <FilterProduct
//                 category={el}
//                 key={el}
//                 isActive={el.toLowerCase() === filterby.toLowerCase()}
//                 onClick={() => handleFilterProduct(el)}
//               />
//             );
//           })
//         ) : (
//           <div className="min-h-[150px] flex justify-center items-center">
//             <p>Loading...</p>
//           </div>
//         )}
//       </div>

//       <div className="flex flex-wrap justify-center gap-4 my-4">
//         {dataFilter[0]
//           ? dataFilter.map((el) => {
//               return (
//                 <CardFeature
//                   key={el._id}
//                   id={el._id}
//                   image={el.image}
//                   name={el.name}
//                   category={el.category}
//                   price={el.price}
//                 />
//               );
//             })
//           : loadingArrayFeature.map((el, index) => (
//               <CardFeature loading="Loading..." key={index + "allProduct"} />
//             ))}
//       </div>
//     </div>
//   );
// };

// export default AllProduct;

const AllProduct = ({ heading }) => {
  const productData = useSelector((state) => state.product.productList);
  const categoryList = [...new Set(productData.map((el) => el.category))];

  const [filterby, setFilterBy] = useState("");
  const [dataFilter, setDataFilter] = useState([]);

  useEffect(() => {
    setDataFilter(productData);
  }, [productData]);

  const handleFilterProduct = (category) => {
    setFilterBy(category);
    const filter = productData.filter(
      (el) => el.category.toLowerCase() === category.toLowerCase()
    );
    setDataFilter(() => {
      return [...filter];
    });
  };

  const loadingArrayFeature = new Array(10).fill(null);

  return React.createElement(
    "div",
    { className: "my-5" },
    [
      React.createElement(
        "h2",
        { className: "font-bold text-2xl text-slate-800 mb-4", key: "heading" },
        heading
      ),
      React.createElement(
        "div",
        {
          className: "flex gap-4 justify-center overflow-scroll scrollbar-none",
          key: "filter-container",
        },
        categoryList[0]
          ? categoryList.map((el) => {
              return React.createElement(FilterProduct, {
                category: el,
                key: el,
                isActive: el.toLowerCase() === filterby.toLowerCase(),
                onClick: () => handleFilterProduct(el),
              });
            })
          : React.createElement(
              "div",
              {
                className:
                  "min-h-[150px] flex justify-center items-center",
                key: "loading",
              },
              React.createElement("p", null, "Loading...")
            )
      ),
      React.createElement(
        "div",
        {
          className: "flex flex-wrap justify-center gap-4 my-4",
          key: "product-container",
        },
        dataFilter[0]
          ? dataFilter.map((el) => {
              return React.createElement(CardFeature, {
                key: el._id,
                id: el._id,
                image: el.image,
                name: el.name,
                category: el.category,
                price: el.price,
              });
            })
          : loadingArrayFeature.map((el, index) =>
              React.createElement(CardFeature, {
                loading: "Loading...",
                key: index + "allProduct",
              })
            )
      ),
    ]
  );
};

export default AllProduct;