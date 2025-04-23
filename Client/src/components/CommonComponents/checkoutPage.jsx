// import { useState } from "react";
// import { Link } from "react-router-dom";
// import ContactInfo from "../CheckoutSteps/contactInfo";
// import DeliveryInfo from "../CheckoutSteps/deliveryInfo";
// import PaymentMethod from "../CheckoutSteps/paymentMethod";
// import OrderSummary from "../CheckoutSteps/orderSummery";

// const CheckoutPage = () => {
//   const [step, setStep] = useState(1);
//   const [orderType, setOrderType] = useState("delivery");
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "",
//     zip: "",
//     instructions: "",
//     paymentMethod: "card"
//   });

//   const nextStep = () => setStep(step + 1);
//   const prevStep = () => setStep(step - 1);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen py-12">
//       <div className="max-w-4xl mx-auto px-4">
//         {/* Progress Stepper */}
//         <div className="flex justify-between mb-12 relative">
//           {[1, 2, 3, 4].map((i) => (
//             <div key={i} className="flex flex-col items-center z-10">
//               <div
//                 className={`w-10 h-10 rounded-full flex items-center justify-center ${
//                   step >= i ? "bg-amber-500 text-white" : "bg-gray-200 text-gray-600"
//                 } font-medium`}
//               >
//                 {i}
//               </div>
//               <span className="text-sm mt-2 text-gray-600">
//                 {i === 1 && "Contact"}
//                 {i === 2 && orderType === "delivery" ? "Address" : "Pickup"}
//                 {i === 3 && "Payment"}
//                 {i === 4 && "Review"}
//               </span>
//             </div>
//           ))}
//           <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-1">
//             <div
//               className="h-full bg-amber-500 transition-all duration-300"
//               style={{ width: `${((step - 1) / 3) * 100}%` }}
//             ></div>
//           </div>
//         </div>

//         {/* Form Content */}
//         <div className="bg-white rounded-xl shadow-md overflow-hidden p-8">
//           {step === 1 && (
//             <ContactInfo 
//               formData={formData} 
//               handleChange={handleChange} 
//               nextStep={nextStep}
//               orderType={orderType}
//               setOrderType={setOrderType}
//             />
//           )}
//           {step === 2 && (
//             <DeliveryInfo 
//               formData={formData} 
//               handleChange={handleChange} 
//               nextStep={nextStep}
//               prevStep={prevStep}
//               orderType={orderType}
//             />
//           )}
//           {step === 3 && (
//             <PaymentMethod 
//               formData={formData} 
//               handleChange={handleChange} 
//               nextStep={nextStep}
//               prevStep={prevStep}
//             />
//           )}
//           {step === 4 && <OrderSummary formData={formData} prevStep={prevStep} />}
//         </div>

//         <div className="mt-6 text-center">
//           <Link to="/cart" className="text-amber-600 hover:text-amber-700">
//             ← Return to cart
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;


import { useState } from "react";
import { Link } from "react-router-dom";
import ContactInfo from "../CheckoutSteps/contactInfo";
import DeliveryInfo from "../CheckoutSteps/deliveryInfo";
import PaymentMethod from "../CheckoutSteps/paymentMethod";
import OrderSummary from "../CheckoutSteps/orderSummery";


const CheckoutPage = () => {
  const [step, setStep] = useState(1);
  const [orderType, setOrderType] = useState("delivery");
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    instructions: "",
    paymentMethod: "card"
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Progress Stepper */}
        <div className="flex justify-between mb-12 relative">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex flex-col items-center z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= i ? "bg-amber-500 text-white" : "bg-gray-200 text-gray-600"
                } font-medium`}
              >
                {i}
              </div>
              <span className="text-sm mt-2 text-gray-600">
                {i === 1 && "Contact"}
                {i === 2 && orderType === "delivery" ? "Address" : "Pickup"}
                {i === 3 && "Payment"}
                {i === 4 && "Review"}
              </span>
            </div>
          ))}
          <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-1">
            <div
              className="h-full bg-amber-500 transition-all duration-300"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-8">
          {step === 1 && (
            <ContactInfo 
              formData={formData} 
              handleChange={handleChange} 
              nextStep={nextStep}
              orderType={orderType}
              setOrderType={setOrderType}
              selectedStaff={selectedStaff}
              setSelectedStaff={setSelectedStaff}
            />
          )}
          {step === 2 && (
            <DeliveryInfo 
              formData={formData} 
              handleChange={handleChange} 
              nextStep={nextStep}
              prevStep={prevStep}
              orderType={orderType}
            />
          )}
          {step === 3 && (
            <PaymentMethod 
              formData={formData} 
              handleChange={handleChange} 
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}
          {step === 4 && (
            <OrderSummary 
              formData={formData} 
              prevStep={prevStep}
              selectedStaff={selectedStaff}
            />
          )}
        </div>

        <div className="mt-6 text-center">
          <Link to="/cart" className="text-amber-600 hover:text-amber-700">
            ← Return to cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;