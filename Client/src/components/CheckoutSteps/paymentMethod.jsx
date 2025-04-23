const PaymentMethod = ({ formData, handleChange, nextStep, prevStep }) => {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>
  
        <div className="space-y-4">
          <div>
            <label className="flex items-center space-x-3 p-4 border rounded-md cursor-pointer hover:border-amber-500">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={formData.paymentMethod === "card"}
                onChange={handleChange}
                className="h-5 w-5 text-amber-500 focus:ring-amber-500"
              />
              <span className="block">
                <span className="font-medium">Credit/Debit Card</span>
                <span className="block text-sm text-gray-500 mt-1">Pay securely with your card</span>
              </span>
            </label>
          </div>
  
          <div>
            <label className="flex items-center space-x-3 p-4 border rounded-md cursor-pointer hover:border-amber-500">
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={formData.paymentMethod === "cash"}
                onChange={handleChange}
                className="h-5 w-5 text-amber-500 focus:ring-amber-500"
              />
              <span className="block">
                <span className="font-medium">Cash on {formData.orderType === "delivery" ? "Delivery" : "Pickup"}</span>
                <span className="block text-sm text-gray-500 mt-1">Pay when you receive your order</span>
              </span>
            </label>
          </div>
  
          {formData.paymentMethod === "card" && (
            <div className="mt-6 p-6 bg-gray-50 rounded-md">
              <h3 className="font-medium text-gray-900 mb-4">Card Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
  
        <div className="mt-8 flex justify-between">
          <button
            onClick={prevStep}
            className="px-6 py-3 rounded-md font-medium text-gray-700 hover:bg-gray-100"
          >
            ← Back
          </button>
          <button
            onClick={nextStep}
            className="px-6 py-3 rounded-md font-medium bg-amber-500 hover:bg-amber-600 text-white"
          >
            Review Order
          </button>
        </div>
      </div>
    );
  };

  export default PaymentMethod;