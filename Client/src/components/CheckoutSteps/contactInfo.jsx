// const ContactInfo = ({ formData, handleChange, nextStep, orderType, setOrderType }) => {
//     const isValid = formData.name && formData.email && formData.phone;
  
//     return (
//       <div>
//         <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
        
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
//               required
//             />
//           </div>
  
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
//               required
//             />
//           </div>
  
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//             <input
//               type="tel"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
//               required
//             />
//           </div>
  
//           <div className="pt-4">
//             <h3 className="text-lg font-medium text-gray-900 mb-3">Order Type</h3>
//             <div className="flex space-x-4">
//               <button
//                 type="button"
//                 onClick={() => setOrderType("delivery")}
//                 className={`px-4 py-2 rounded-md border ${
//                   orderType === "delivery" 
//                     ? "bg-amber-100 border-amber-500 text-amber-700" 
//                     : "border-gray-300"
//                 }`}
//               >
//                 Delivery
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setOrderType("pickup")}
//                 className={`px-4 py-2 rounded-md border ${
//                   orderType === "pickup" 
//                     ? "bg-amber-100 border-amber-500 text-amber-700" 
//                     : "border-gray-300"
//                 }`}
//               >
//                 Take Away
//               </button>
//             </div>
//           </div>
//         </div>
  
//         <div className="mt-8 flex justify-end">
//           <button
//             onClick={nextStep}
//             disabled={!isValid}
//             className={`px-6 py-3 rounded-md font-medium ${
//               isValid 
//                 ? "bg-amber-500 hover:bg-amber-600 text-white" 
//                 : "bg-gray-300 text-gray-500 cursor-not-allowed"
//             }`}
//           >
//             Continue to {orderType === "delivery" ? "Delivery" : "Pickup"}
//           </button>
//         </div>
//       </div>
//     );
//   };

//   export default ContactInfo ;

import { useEffect, useState } from 'react';
import axios from 'axios';

const ContactInfo = ({ 
  formData, 
  handleChange, 
  nextStep, 
  orderType, 
  setOrderType,
  selectedStaff,
  setSelectedStaff
}) => {
  const [staffList, setStaffList] = useState([]);
  const [loadingStaff, setLoadingStaff] = useState(false);
  const isValid = formData.name && formData.email && formData.phone;

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        setLoadingStaff(true);
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5001";
        const token = localStorage.getItem('token');
        
        const response = await axios.get(`${apiUrl}/api/customer/list-staffs`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setStaffList(response.data.data || []);
      } catch (error) {
        console.error("Error fetching staff:", error);
      } finally {
        setLoadingStaff(false);
      }
    };

    fetchStaff();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
            required
          />
        </div>

       
        <div className="pt-4">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Assign Staff</h3>
          {loadingStaff ? (
            <p>Loading staff list...</p>
          ) : (
            <select
              value={selectedStaff?._id || ""}
              onChange={(e) => {
                const staff = staffList.find(s => s._id === e.target.value);
                setSelectedStaff(staff);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
              required
            >
              <option value="">Select a staff member</option>
              {staffList.map(staff => (
                <option key={staff._id} value={staff._id}>
                  {staff.name} - {staff.role}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="pt-4">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Order Type</h3>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setOrderType("delivery")}
              className={`px-4 py-2 rounded-md border ${
                orderType === "delivery" 
                  ? "bg-amber-100 border-amber-500 text-amber-700" 
                  : "border-gray-300"
              }`}
            >
              Delivery
            </button>
            <button
              type="button"
              onClick={() => setOrderType("pickup")}
              className={`px-4 py-2 rounded-md border ${
                orderType === "pickup" 
                  ? "bg-amber-100 border-amber-500 text-amber-700" 
                  : "border-gray-300"
              }`}
            >
              Take Away
            </button>
          </div>
        </div>
        </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={nextStep}
          disabled={!isValid || !selectedStaff}
          className={`px-6 py-3 rounded-md font-medium ${
            isValid && selectedStaff
              ? "bg-amber-500 hover:bg-amber-600 text-white" 
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue to {orderType === "delivery" ? "Delivery" : "Pickup"}
        </button>
      </div>
    </div>
  );
};

export default ContactInfo;