// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { Card } from "react-bootstrap";
// // import { Bar } from "react-chartjs-2";
// // import 'chart.js/auto';

// // const BookCharts = () => {
// //     const [chartData, setChartData] = useState({});

// //     useEffect(() => {
// //         fetchChartData();
// //     }, []);

// //     const fetchChartData = async () => {
// //         try {
// //             const res = await axios.get("http://localhost:8000/api/dashboard/metrics", {
// //                 headers: {
// //                     Authorization: `Bearer ${localStorage.getItem("token")}`,
// //                 },
// //             });

// //             const labels = res.data.issueChart.map(entry => entry.date);
// //             const data = res.data.issueChart.map(entry => entry.count);
// //             const returnedData = res.data.issueChart.map(entry => entry.count);
// //             const overdueData = res.data.overdueChart
// //                 ? res.data.overdueChart.map(entry => entry.count)
// //                 : [];

// //             setChartData({
// //                 labels,
// //                 datasets: [
// //                     {
// //                         label: "Books Issued",
// //                         data: data,
// //                         backgroundColor: "rgba(54, 162, 235, 0.6)",
// //                         borderColor: "rgba(54, 162, 235, 1)",
// //                         borderWidth: 1,
// //                     },
// //                     {
// //                         label: "Books Returned",
// //                         data: returnedData,
// //                         backgroundColor: "rgba(75, 192, 192, 0.6)",
// //                         borderColor: "rgba(75, 192, 192, 1)",
// //                         borderWidth: 1,
// //                     },
// //                     {
// //                         label: "Overdue Books",
// //                         data: overdueData,
// //                         backgroundColor: "red", // red-ish
// //                         borderColor: "rgba(255, 99, 132, 1)",
// //                         borderWidth: 1,
// //                     },
// //                 ],
// //             });
// //         } catch (err) {
// //             console.error("Failed to load chart data", err);
// //         }
// //     };

// //     return (
// //         <Card className="my-4">
// //             <Card.Header>Books Issued This Week</Card.Header>
// //             <Card.Body>
// //                 {chartData.labels ? (
// //                     <Bar data={chartData} />
// //                 ) : (
// //                     <p>Loading chart...</p>
// //                 )}
// //             </Card.Body>
// //         </Card>
// //     );
// // };

// // export default BookCharts;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Card, Row, Col } from "react-bootstrap";
// import { Bar, Pie, Line } from "react-chartjs-2";
// import 'chart.js/auto';

// const BookCharts = () => {
//   const [pieData, setPieData] = useState({});
//   const [lineData, setLineData] = useState({});
//   const [barData, setBarData] = useState({});

//   useEffect(() => {
//     fetchChartData();
//   }, []);

//   const fetchChartData = async () => {
//     try {
//       const res = await axios.get("http://localhost:8000/api/dashboard/metrics", {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });

//       // Pie Chart: Books Issued
//       const issueLabels = res.data.issueChart.map(entry => entry.date);
//       const issueCounts = res.data.issueChart.map(entry => entry.count);
//       setPieData({
//         labels: issueLabels,
//         datasets: [
//           {
//             label: "Books Issued",
//             data: issueCounts,
//             backgroundColor: [
//               "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40",
//             ],
//           },
//         ],
//       });

//       // Line Chart: Books Returned
//       const returnLabels = res.data.returnChart.map(entry => entry.date);
//       const returnCounts = res.data.returnChart.map(entry => entry.count);
//       setLineData({
//         labels: returnLabels,
//         datasets: [
//           {
//             label: "Books Returned",
//             data: returnCounts,
//             borderColor: "rgba(75, 192, 192, 1)",
//             tension: 0.2,
//             fill: false,
//           },
//         ],
//       });

//       // Bar Chart: Overdue Books
//       const overdueLabels = res.data.overdueChart.map(entry => entry.date);
//       const overdueCounts = res.data.overdueChart.map(entry => entry.count);
//       setBarData({
//         labels: overdueLabels,
//         datasets: [
//           {
//             label: "Overdue Books",
//             data: overdueCounts,
//             backgroundColor: "rgba(255, 99, 132, 0.6)",
//             borderColor: "rgba(255, 99, 132, 1)",
//             borderWidth: 1,
//           },
//         ],
//       });

//     } catch (err) {
//       console.error("Failed to load chart data", err);
//     }
//   };

//   return (
//     <div>
//       <Row>
//         <Col md={12} lg={6}>
//           <Card className="my-3">
//             <Card.Header>Books Issued (Pie Chart)</Card.Header>
//             <Card.Body>
//               {pieData.labels ? <Pie data={pieData} /> : <p>Loading pie chart...</p>}
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col md={12} lg={6}>
//           <Card className="my-3">
//             <Card.Header>Books Returned (Line Chart)</Card.Header>
//             <Card.Body>
//               {lineData.labels ? <Line data={lineData} /> : <p>Loading line chart...</p>}
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       <Row>
//         <Col md={12}>
//           <Card className="my-3">
//             <Card.Header>Overdue Books (Bar Chart)</Card.Header>
//             <Card.Body>
//               {barData.labels ? <Bar data={barData} /> : <p>Loading bar chart...</p>}
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default BookCharts;

