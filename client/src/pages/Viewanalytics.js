import React, { useEffect, useState } from "react";
import {
  Pie,
  Bar,
  Doughnut,
  Line,
  Radar,
  PolarArea,
  Scatter,
  Bubble,
} from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import "./Viewanalytics.css";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  Tooltip,
  Legend
);

const Viewanalytics = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Analytics Dashboard - AI Job Portal";
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  // 1️⃣ Job Category Distribution (Pie)
  const jobCategoryData = {
    labels: ["Tech", "Finance", "Healthcare", "Education", "Marketing", "Others"],
    datasets: [
      {
        label: "Jobs Posted",
        data: [120, 80, 65, 40, 55, 30],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
      },
    ],
  };

  // 2️⃣ AI Match Accuracy (Line)
  const aiRecommendationAccuracy = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "AI Match Accuracy (%)",
        data: [85, 87, 83, 90, 92, 88],
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // 3️⃣ Job Alerts Performance (Doughnut)
  const jobAlertStats = {
    labels: ["Alerts Sent", "Alerts Opened", "Applications from Alerts"],
    datasets: [
      {
        label: "Performance",
        data: [500, 350, 200],
        backgroundColor: ["#FF6384", "#36A2EB", "#4BC0C0"],
      },
    ],
  };

  // 4️⃣ Skill Demand (Radar)
  const skillDemandRadar = {
    labels: ["Python", "JavaScript", "Data Science", "UI/UX", "Cloud", "Cybersecurity"],
    datasets: [
      {
        label: "Demand Score",
        data: [85, 90, 75, 60, 88, 70],
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "#9966FF",
      },
    ],
  };

  // 5️⃣ Application Funnel (Bar)
  const applicationFunnel = {
    labels: ["Applied", "Shortlisted", "Interviewed", "Hired"],
    datasets: [
      {
        label: "Candidates",
        data: [500, 370, 230, 160],
        backgroundColor: ["#FFCE56", "#36A2EB", "#4BC0C0", "#FF6384"],
      },
    ],
  };

  // 6️⃣ Recruiter Response Time (Polar Area)
  const recruiterResponseTime = {
    labels: ["< 1 Day", "1-3 Days", "3-7 Days", "> 7 Days"],
    datasets: [
      {
        label: "Response Distribution",
        data: [120, 80, 40, 15],
        backgroundColor: ["#36A2EB", "#4BC0C0", "#FFCE56", "#FF6384"],
      },
    ],
  };

  // 7️⃣ Job Posting Trend by Month (Bar)
  const jobPostingTrend = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Jobs Posted",
        data: [50, 70, 65, 80, 95, 100],
        backgroundColor: "#36A2EB",
      },
    ],
  };

  // 8️⃣ Candidate Experience Scores (Scatter)
  const candidateExperience = {
    datasets: [
      {
        label: "Experience Ratings",
        data: [
          { x: 1, y: 80 },
          { x: 2, y: 85 },
          { x: 3, y: 78 },
          { x: 4, y: 90 },
          { x: 5, y: 88 },
        ],
        backgroundColor: "#FF6384",
      },
    ],
  };

  // 9️⃣ Salary Range Distribution (Bubble)
  const salaryDistribution = {
    datasets: [
      {
        label: "Salary Ranges",
        data: [
          { x: 2, y: 40, r: 15 },
          { x: 4, y: 55, r: 20 },
          { x: 6, y: 70, r: 25 },
          { x: 8, y: 90, r: 30 },
        ],
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  // 🔟 AI Screening Effectiveness (Line)
  const aiScreeningEffectiveness = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "AI Screening Pass Rate (%)",
        data: [70, 75, 80, 78],
        borderColor: "#4BC0C0",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "top" } },
  };

  if (isLoading) {
    return (
      <div className="analytics-container">
        <p>Loading AI-powered analytics...</p>
      </div>
    );
  }

  return (
    <div className="analytics-container">
      <h3>📊 AI-Powered Job Portal Analytics</h3>
      <div className="charts-grid">

        {/* Original 5 Charts */}
       
        <div className="chart-card"><h4>AI Job Recommendation Accuracy</h4><div className="chart-wrapper"><Line data={aiRecommendationAccuracy} options={chartOptions} /></div></div>
        <div className="chart-card"><h4>Job Alerts Performance</h4><div className="chart-wrapper"><Doughnut data={jobAlertStats} options={chartOptions} /></div></div>
        <div className="chart-card"><h4>Skill Demand Analysis</h4><div className="chart-wrapper"><Radar data={skillDemandRadar} options={chartOptions} /></div></div>
        <div className="chart-card"><h4>Application Funnel</h4><div className="chart-wrapper"><Bar data={applicationFunnel} options={chartOptions} /></div></div>

        {/* New 5 Advanced Charts */}
        <div className="chart-card"><h4>Recruiter Response Time</h4><div className="chart-wrapper"><PolarArea data={recruiterResponseTime} options={chartOptions} /></div></div>
        <div className="chart-card"><h4>Job Posting Trend</h4><div className="chart-wrapper"><Bar data={jobPostingTrend} options={chartOptions} /></div></div>
        <div className="chart-card"><h4>Candidate Experience Ratings</h4><div className="chart-wrapper"><Scatter data={candidateExperience} options={chartOptions} /></div></div>
         <div className="chart-card"><h4>Job Category Distribution</h4><div className="chart-wrapper"><Pie data={jobCategoryData} options={chartOptions} /></div></div>
       {/* <div className="chart-card"><h4>Salary Range Distribution</h4><div className="chart-wrapper"><Bubble data={salaryDistribution} options={chartOptions} /></div></div>*/}
        <div className="chart-card"><h4>AI Screening Effectiveness</h4><div className="chart-wrapper"><Line data={aiScreeningEffectiveness} options={chartOptions} /></div></div>
      </div>
    </div>
  );
};

export default Viewanalytics;
