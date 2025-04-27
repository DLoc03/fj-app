import React from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import SpinningLoader from "../common/SpinningLoading";

const PayPal = ({ amount, onSuccess }) => {
  const [{ isPending, isResolved }] = usePayPalScriptReducer();

  if (isPending || !isResolved) {
    return <SpinningLoader />;
  }

  return (
    <PayPalButtons
      style={{
        layout: "vertical",
        height: 45,
      }}
      forceReRender={[amount]}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: amount.toString(),
              },
            },
          ],
        });
      }}
      onApprove={(data, actions) => {
        return actions.order.capture().then((details) => {
          console.log(
            "Transaction completed by " + details.payer.name.given_name
          );
          onSuccess(details);
        });
      }}
      onError={(err) => {
        console.error("Paypal Checkout Error:", err);
      }}
    />
  );
};

export default PayPal;
