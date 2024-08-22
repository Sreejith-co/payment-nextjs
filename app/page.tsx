"use client"

import React, { useState } from "react";
import Script from "next/script";
import { log } from "console";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PaymentPage = () => {
  const AMOUNT = 100;
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);

    try{
      //create order
      const response = await fetch("/api/create-order", { method: "POST"});
      const data = await response.json();


      //initialize razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: AMOUNT * 100,
        currency: "INR",
        name: "Streben Technik",
        description: " Test transaction ",
        order_id: data.orderId,
        handler: function (response: any) {
            console.log("Payment successful", response);
        },
        prefill: {
          name: "Sreejith S",
          email: "srj@gmail.com",
          contact: "9874562214"
        },
        theme: {
          color: "#3399cc"
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    }
    catch(error) {
      console.log("Payment failed", error)
    } 
    finally {
      setIsProcessing(false);

    }
  }
  return (
  
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100" >

        <Script src = "https://checkout.razorpay.com/v1/checkout.js" />

        <div className="p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Payment Page</h1>
          <p className="mb-4">Amount to Pay: {AMOUNT} INR</p>
          <button 
            onClick={handlePayment}
            disabled={isProcessing}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              {isProcessing? "Processing..." : "Pay Now"}
            </button>
        </div>
      </div>
    
  );
}

export default PaymentPage