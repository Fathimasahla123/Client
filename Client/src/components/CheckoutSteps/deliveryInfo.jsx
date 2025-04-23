const DeliveryInfo = ({ formData, handleChange, nextStep, prevStep, orderType }) => {
    const isValid = orderType === "pickup" || 
      (formData.address && formData.city && formData.state && formData.zip);
  
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {orderType === "delivery" ? "Delivery Address" : "Pickup Information"}
        </h2>
  
        {orderType === "delivery" ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                required
              />
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                <input
                  type="text"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Instructions (Optional)
              </label>
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                placeholder="Apartment number, gate code, landmarks, etc."
              />
            </div>
          </div>
        ) : (
          <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
            <h3 className="font-medium text-amber-800">Pickup Location</h3>
            <p className="mt-2 text-amber-700">123 Restaurant Row, Foodie City, FC 12345</p>
            <p className="mt-1 text-sm text-amber-600">Please bring your order confirmation when picking up.</p>
          </div>
        )}
  
        <div className="mt-8 flex justify-between">
          <button
            onClick={prevStep}
            className="px-6 py-3 rounded-md font-medium text-gray-700 hover:bg-gray-100"
          >
            ← Back
          </button>
          <button
            onClick={nextStep}
            disabled={!isValid}
            className={`px-6 py-3 rounded-md font-medium ${
              isValid 
                ? "bg-amber-500 hover:bg-amber-600 text-white" 
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Continue to Payment
          </button>
        </div>
      </div>
    );
  };

  export default DeliveryInfo;
