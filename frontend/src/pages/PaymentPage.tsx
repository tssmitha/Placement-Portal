// import React, { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const PaymentPage = () => {
//   const { transactionId } = useParams(); // Capture transaction ID from URL

//   const handlePayment = async () => {
//     try {
//       const response = await axios.post("/api/create-order", { transactionId });

//       const options = {
//         key: "rzp_test_dummyKey", // Razorpay test key
//         amount: response.data.amount,
//         currency: "INR",
//         name: "College Registration Fee",
//         description: "Payment for onboarding",
//         handler: async (paymentResponse) => {
//           // Update backend with payment details
//           const verifyResponse = await axios.post("/api/verify-payment", {
//             transactionId,
//             paymentDetails: paymentResponse,
//           });

//           if (verifyResponse.data.success) {
//             alert("Payment successful!");
//             window.location.href = `/receipt/${transactionId}`;
//           } else {
//             alert("Payment verification failed. Please contact support.");
//           }
//         },
//         prefill: { name: "Student", email: "student@example.com", contact: "9876543210" },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error("Error initiating payment:", error);
//     }
//   };

//   useEffect(() => {
//     handlePayment();
//   }, []);

//   return <div>Processing Payment...</div>;
// };

// export default PaymentPage;
