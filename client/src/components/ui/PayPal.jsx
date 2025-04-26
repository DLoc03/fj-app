import React from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

const PayPal = ({ amount, onSuccess }) => {
  return (
    <PayPalButtons
      style={{ layout: "vertical" }}
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
