// // TimerRedirect.js
// import React, { useEffect, useState } from 'react';
// import { Navigate, useNavigate } from 'react-router-dom';

// const TimerRedirect = () => {
//   const [timeLeft, setTimeLeft] = useState(60);
//   const [redirected, setRedirected] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!redirected) {
//       const timer = setInterval(() => {
//         setTimeLeft(prevTimeLeft => {
//           if (prevTimeLeft === 0) {
//             clearInterval(timer);
//             setRedirected(true);
//             return 0; // Return 0 without navigating here
//           } else {
//             console.log("Redirecting in", prevTimeLeft, "seconds");
//             return prevTimeLeft - 1;
//           }
//         });
//       }, 1000);

//       return () => clearInterval(timer);
//     }
//   }, [redirected]);

//   // Move the navigate call here, outside of useEffect
//   useEffect(() => {
//     if (redirected) {
//       navigate('/screen1');
//     }
//   }, [redirected, navigate]);

//   if (redirected) {
//     return <Navigate to="/screen1" />;
//   }

//   return null;
// };

// export default TimerRedirect;
