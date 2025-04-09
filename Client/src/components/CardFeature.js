import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addCartItem, increaseQty } from "../components/redux/productSlide";

// const CardFeature = ({ image, name, price, category, loading, id }) => {
//   const dispatch = useDispatch();

//   const handleAddCartProduct = (e) => {
//     dispatch(
//       addCartItem({
//         _id: id,
//         name: name,
//         price: price,
//         category: category,
//         image: image,
//       })
//     );
//   };

//   return (
//     <div className="w-full min-w-[200px] max-w-[200px] bg-white hover:shadow-lg drop-shadow-lg py-5 px-4 cursor-pointer flex flex-col ">
//       {image ? (
//         <>
//           <Link
//             to={`/menu/${id}`}
//             onClick={() => window.scrollTo({ top: "0", behavior: "smooth" })}
//           >
//             <div className="h-28 flex flex-col justify-center items-center">
//               <img src={image} className="h-full" />
//             </div>
//             <h3 className="font-semibold text-slate-600  capitalize text-lg mt-4 whitespace-nowrap overflow-hidden">
//               {name}
//             </h3>
//             <p className=" text-slate-500  font-medium">{category}</p>
//             <p className=" font-bold">
//               <span className="text-red-500">₹</span>
//               <span>{price}</span>
//             </p>
//           </Link>
//           <button
//             className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 w-full"
//             onClick={handleAddCartProduct}
//           >
//             Add Cart
//           </button>
//         </>
//       ) : (
//         <div className="min-h-[150px] flex justify-center items-center">
//           <p>{loading}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CardFeature;

const CardFeature = ({ image, name, price, category, loading, id }) => {
  const dispatch = useDispatch();

  const handleAddCartProduct = (e) => {
    dispatch(
      addCartItem({
        _id: id,
        name: name,
        price: price,
        category: category,
        image: image,
      })
    );
  };

  return React.createElement(
    "div",
    {
      className:
        "w-full min-w-[200px] max-w-[200px] bg-white hover:shadow-lg drop-shadow-lg py-5 px-4 cursor-pointer flex flex-col",
    },
    image
      ? [
          React.createElement(
            Link,
            {
              to: `/menu/${id}`,
              onClick: () =>
                window.scrollTo({ top: "0", behavior: "smooth" }),
              key: "link",
            },
            [
              React.createElement(
                "div",
                {
                  className:
                    "h-28 flex flex-col justify-center items-center",
                  key: "img-container",
                },
                React.createElement("img", { src: image, className: "h-full" })
              ),
              React.createElement(
                "h3",
                {
                  className:
                    "font-semibold text-slate-600 capitalize text-lg mt-4 whitespace-nowrap overflow-hidden",
                  key: "name",
                },
                name
              ),
              React.createElement(
                "p",
                { className: "text-slate-500 font-medium", key: "category" },
                category
              ),
              React.createElement(
                "p",
                { className: "font-bold", key: "price" },
                [
                  React.createElement(
                    "span",
                    { className: "text-red-500", key: "currency" },
                    "₹"
                  ),
                  React.createElement("span", { key: "price-value" }, price),
                ]
              ),
            ]
          ),
          React.createElement(
            "button",
            {
              className:
                "bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 w-full",
              onClick: handleAddCartProduct,
              key: "button",
            },
            "Add Cart"
          ),
        ]
      : React.createElement(
          "div",
          {
            className: "min-h-[150px] flex justify-center items-center",
            key: "loading",
          },
          React.createElement("p", null, loading)
        )
  );
};

export default CardFeature;