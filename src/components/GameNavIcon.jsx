// // components/GameNavIcon.js
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// const GameNavIcon = () => {
//   // const [activeCategory, setActiveCategory] = useState(0);

//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [active, setActive] = useState(data[0]?.category);
//   const [activeIndex, setActiveIndex] = useState(
//     data[0]?.category.uniqueProviders
//   );

//   const referralCode = localStorage.getItem("referralCode");
//   console.log(localStorage.getItem("referralCode"));
//   console.log(referralCode);

//   useEffect(() => {
//     if (data.length > 0) {
//       setActive(data[0]?.category);
//       setActiveIndex(0); // Reset index when data changes
//     }
//   }, [data]);
//   console.log(data[0]?.category.uniqueProviders);
//   console.log("active", active);
//   const handleItemClick = (index, item) => {
//     setActiveIndex(index);
//     setActive(item ? item : data[0]?.category?.uniqueProviders);
//     console.log(item);
//   };

//   const [isFixed, setIsFixed] = useState(false);

//   const [scrollStopped, setScrollStopped] = useState(false);
//   let scrollTimeout;

//   useEffect(() => {
//     setLoading(true);
//     const url = "https://api.png71.live/api/v1/New-table-categories";
//     const response = fetch(url, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       mood: "no-cors",
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setLoading(false);
//         setData(data);
//         console.log(data);
//       });
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsFixed(window.scrollY >= 150);

//       // Clear the previous timeout
//       clearTimeout(scrollTimeout);

//       // Reset `scrollStopped` and debounce logic
//       setScrollStopped(false);
//       scrollTimeout = setTimeout(() => {
//         setScrollStopped(true);
//       }, 200); // Adjust debounce delay as needed
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       clearTimeout(scrollTimeout);
//     };
//   }, []);
//   // const navigate = useNavigate();

//   return (
//     <div>
//       <div
//         className={`${
//           scrollStopped ? "scroll-stopped " : ""
//         } nav nav-category ${isFixed ? "active" : ""}nav-auto`}
//       >
//         {data.map((item, index) => (
//           <div
//             className={`btn ${index === activeIndex ? "selected" : ""}`}
//             key={index}
//             onClick={() => handleItemClick(index, item?.category)}
//           >
//             {/* {console.log(item.category)} */}
//             <div className="icon">
//               <span
//                 className="item-icon"
//                 style={{
//                   backgroundImage: `url(${item?.category?.image})`,
//                 }}
//               >
//                 {/* <img src={item.icon} alt="" /> */}
//               </span>
//               <p>{item?.category?.name}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="nav-wrap ">
//         <div className="content-title">
//           <h2>
//             <span>{active?.name}</span>
//           </h2>
//         </div>
//         <div className="nav-content-wrap">
//           <div className="nav-content-inner">
//             <div className="content-box">
//               <div className="layout-brand">
//                 <div className="card1">
//                   <ul>
//                     {active?.uniqueProviders?.map((item, index) => {
//                       // যদি প্রথম ২ ক্যাটাগরি হয়, তাহলে লিঙ্ক না দিয়ে সরাসরি গেম প্লে কল দিন
//                       if (activeIndex < 2) {
//                         // প্রথম ২ ক্যাটাগরি
//                         return (
//                           <li key={index}>
//                             <Link>
//                               <img src={item.image_url} alt={item.company} />
//                               <p>{item.company}</p>
//                             </Link>
//                           </li>
//                         );
//                       } else {
//                         // বাকি ক্যাটাগরি লিঙ্ক সহ
//                         return (
//                           <li key={index}>
//                             {/* {console.log(active)} */}
//                             <Link
//                             // to={`/gamesProvidersPageWithCategory/${encodeURIComponent(
//                             //   active.name
//                             // )}/${encodeURIComponent(item.providercode)}`}
//                             >
//                               <img src={item.image_url} alt={item.company} />
//                               <p>{item.company}</p>
//                             </Link>
//                           </li>
//                         );
//                       }
//                     })}
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GameNavIcon;


