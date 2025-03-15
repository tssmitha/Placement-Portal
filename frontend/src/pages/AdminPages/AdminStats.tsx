import React, { useEffect, useState } from 'react';
import { IonCard, IonCardContent, IonCol, IonRow, IonText, IonContent , IonSelect , IonSelectOption } from '@ionic/react';
import { Bar , Pie , Line} from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale } from 'chart.js';
import './AdminStats.css';
ChartJS.register(Title, Tooltip, Legend, ArcElement, BarElement, CategoryScale, LinearScale);

interface Stats {
  totalPlaced: number;
  totalStudents: number;
  totalStudentsByBranch: { _id: string; count: number }[];
  placedStudentsByBranch: { _id: string; placed: number }[];
  statsByYear: { _id: string; totalPlaced: number; totalStudents: number }[];
  successRateByBranch: { _id: string; totalPlaced: number; totalStudents: number }[];
}

const AdminStats = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedYear, setSelectedYear] = useState<string>('All');

  useEffect(() => {
    // Fetch stats from the API endpoint for the admin
    const fetchStats = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/admin/stats');
        const data = await res.json();
        console.log('Fetched stats:', data); // Log the fetched data
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleYearChange = (e: any) => {
    setSelectedYear(e.target.value);
  };

  const yearWiseData = stats?.statsByYear?.map(item => ({
    year: item._id,
    totalPlaced: item.totalPlaced,
    totalStudents: item.totalStudents,
  }));
  
  const successRateData = stats?.successRateByBranch?.map(item => ({
    branch: item._id,
    successRate: item.totalStudents === 0 ? 0 : (item.totalPlaced / item.totalStudents) * 100, // Prevent division by zero
  }));
  
  // Use a conditional check for when `stats` or `stats.statsByYear` is not yet available.
  const filteredYearData = selectedYear === 'All'
    ? yearWiseData
    : yearWiseData?.filter(item => item.year === selectedYear);
  
  if (loading) {
    return (
      <div>Loading...</div> // You can replace this with a spinner or loader component
    );
  }
  
  // Make sure you have data before rendering
  if (!yearWiseData || yearWiseData.length === 0) {
    return <div>No data available</div>;
  }
  
  // Continue with your rendering logic here
  

  // If stats or studentsByBranch is not available, avoid proceeding
  if (!stats?.totalStudentsByBranch) {
    return (
      <div>Error: Stats data is not available</div> // You can customize this error message
    );
  }

  // Assuming placedStudentsByBranch is not available, we'll calculate placed data using totalPlaced
  const combinedData = stats.totalStudentsByBranch.map((branch) => {
    return {
      branch: branch._id,
      total: branch.count,
      placed: (branch.count / stats.totalStudents) * stats.totalPlaced, // Calculate placed students proportionally
    };
  });

  // Chart data for Total Placed vs Total Students
  const totalStudentsData = {
    labels: ['Placed Students', 'Total Students'],
    datasets: [
      {
        label: 'Student Count',
        data: [stats?.totalPlaced ?? 0, stats?.totalStudents ?? 0],
        backgroundColor: ['#6366f1', '#e5e7eb'],
        borderColor: ['#4f46e5', '#d1d5db'],
        borderWidth: 1,
      },
    ],
  };

  // Rainbow-like chart for students placed by branch
  const branchChartData = {
    labels: stats.totalStudentsByBranch.map((item) => item._id),
    datasets: [
      {
        label: 'Students Placed by Branch',
        data: stats.totalStudentsByBranch.map((item) => item.count),
        backgroundColor: ['#FF5733', '#FF8D1A', '#FFEB33', '#75FF33', '#33D4FF'],
        borderColor: ['#FF5733', '#FF8D1A', '#FFEB33', '#75FF33', '#33D4FF'],
        borderWidth: 1,
      },
    ],
  };

  // Pie chart data for students and total placement statistics
  const pieChartData2 = {
    labels: combinedData.map(item => item.branch),
    datasets: [
      {
        label: 'Students Placed by Branch',
        data: combinedData.map(item => item.placed),
        backgroundColor: combinedData.map(() => `hsl(${Math.random() * 360}, 100%, 60%)`),  // Random colors
        borderColor: combinedData.map(() => '#ffffff'),
        borderWidth: 1,
      },
      {
        label: 'Total Students',
        data: combinedData.map(item => item.total),
        backgroundColor: combinedData.map(() => '#e5e7eb'),
        borderColor: combinedData.map(() => '#d1d5db'),
        borderWidth: 1,
      },
    ],
  };

  const yearChartData = {
    labels: filteredYearData?.map(item => item.year),
    datasets: [
      {
        label: 'Placed Students',
        data: filteredYearData?.map(item => item.totalPlaced),
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderWidth: 1,
      },
      {
        label: 'Total Students',
        data: filteredYearData?.map(item => item.totalStudents),
        borderColor: '#e5e7eb',
        backgroundColor: 'rgba(229, 231, 235, 0.2)',
        borderWidth: 1,
      },
    ],
  };

  // Bar chart for placement success rate by branch
  const successRateChartData = {
    labels: successRateData?.map(item => item.branch),
    datasets: [
      {
        label: 'Success Rate (%)',
        data: successRateData?.map(item => item.successRate),
        backgroundColor: '#6366f1',
        borderColor: '#4f46e5',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div
      style={{
        height: '100vh',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
      }}
    >
      <div className="admin-stats-container" style={{ padding: '1rem', flex: 1, overflowY: 'auto' }}>
        <h2 className="stats-heading">Admin Dashboard - Placement Statistics</h2>

        <IonRow className="ion-padding">
          {/* Total Students Placed */}
          <IonCol size="12" sizeMd="4">
            <IonCard className="stats-card">
              <IonCardContent>
                <IonText className="card-title">Total Students Placed</IonText>
                <IonText className="card-text">{stats?.totalPlaced}</IonText>
              </IonCardContent>
            </IonCard>
          </IonCol>

          {/* Total Placed vs Total Students */}
          <IonCol size="12" sizeMd="4">
            <IonCard className="stats-card">
              <IonCardContent>
                <IonText className="card-title">Total Placed vs Total Students</IonText>
                <div className="bar-chart-container">
                  <Bar data={totalStudentsData} />
                </div>
              </IonCardContent>
            </IonCard>
          </IonCol>

          {/* Students by Branch */}
          <IonCol size="12">
            <IonCard className="stats-card">
              <IonCardContent>
                <IonText className="card-title">Students by Branch</IonText>
                <div className="bar-chart-container">
                  <Bar data={branchChartData} />
                </div>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>

        <IonRow className="ion-padding">
          {/* Rainbow-like Pie Chart */}
          <IonCol size="12">
            <IonCard className="stats-card">
              <IonCardContent>
                <IonText className="card-title">Placement Statistics by Branch</IonText>
                <div className="pie-chart-container">
                  <Pie data={pieChartData2} />
                </div>
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>

        {/* Filter for Year */}
      <IonRow className="ion-padding">
        <IonCol size="12" sizeMd="4">
          <IonCard className="stats-card">
            <IonCardContent>
              <IonText className="card-title">Select Year</IonText>
              <IonSelect value={selectedYear} onIonChange={handleYearChange}>
                <IonSelectOption value="All">All</IonSelectOption>
                {yearWiseData?.map(item => (
                  <IonSelectOption key={item.year} value={item.year}>{item.year}</IonSelectOption>
                ))}
              </IonSelect>
            </IonCardContent>
          </IonCard>
        </IonCol>
      </IonRow>

      {/* Year-wise Placement Stats */}
      <IonRow className="ion-padding">
        <IonCol size="12">
          <IonCard className="stats-card">
            <IonCardContent>
              <IonText className="card-title">Year-wise Placement Stats</IonText>
              <div className="line-chart-container">
                <Line data={yearChartData} />
              </div>
            </IonCardContent>
          </IonCard>
        </IonCol>
      </IonRow>

      {/* Placement Success Rate by Branch */}
      <IonRow className="ion-padding">
        <IonCol size="12">
          <IonCard className="stats-card">
            <IonCardContent>
              <IonText className="card-title">Placement Success Rate by Branch</IonText>
              <div className="bar-chart-container">
                <Bar data={successRateChartData} />
              </div>
            </IonCardContent>
          </IonCard>
        </IonCol>
      </IonRow>


      </div>
    </div>
  );
};

export default AdminStats;
