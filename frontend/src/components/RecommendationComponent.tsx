import { useState } from "react";
import { getRecommendations } from "../services/recommendationService";
import "./RecommendationComponent.css";

export default function RecommendationComponent() {
  const [companyName, setCompanyName] = useState(""); // Store user input
  const [recommendations, setRecommendations] = useState<string[]>([]); // Store recommendations

  const fetchRecommendations = async () => {
    if (!companyName.trim()) {
      alert("Please enter a company name.");
      return;
    }

    const data = await getRecommendations(companyName);
    if (data) {
      setRecommendations(data.recommendations);
    } else {
      setRecommendations([]);
    }
  };

  return (
    <div className="recommendation-container">
  <h2>Company Recommendations</h2>
  <div className="input-container">
    <input
      type="text"
      placeholder="Enter company name"
      value={companyName}
      onChange={(e) => setCompanyName(e.target.value)}
    />
    <button onClick={fetchRecommendations}>Get Recommendations</button>
  </div>
  {recommendations.length > 0 && (
    <div className="recommendation-list">
      <h3>Top 5 Similar Companies:</h3>
      <ul>
        {recommendations.map((comp, index) => (
          <li key={index}>{comp}</li>
        ))}
      </ul>
    </div>
  )}
</div>

  );
}
