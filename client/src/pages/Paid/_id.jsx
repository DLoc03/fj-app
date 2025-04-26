import React from "react";
import PayPal from "../../components/ui/PayPal";

const CheckoutPage = () => {
  const handleSuccess = (details) => {
    console.log("Thanh toán thành công:", details);
  };

  return (
    <div>
      <h1>Thanh toán</h1>
      <PayPal amount={100} onSuccess={handleSuccess} />
    </div>
  );
};

export default CheckoutPage;
