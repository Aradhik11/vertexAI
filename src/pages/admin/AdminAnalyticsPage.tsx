import { useState } from 'react';
import { 
  Bar, 
  Line, 
  Doughnut 
} from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  ArcElement, 
  Title, 
  Tooltip, 
  Legend, 
  Filler 
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  ArcElement, 
  Title, 
  Tooltip, 
  Legend, 
  Filler
);

const AdminAnalyticsPage = () => {
  const [timeFrame, setTimeFrame] = useState<'week' | 'month'>('week');
  
  // Mock data for charts
  const weekLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const monthLabels = Array.from({ length: 30 }, (_, i) => (i + 1).toString());
  
  const labels = timeFrame === 'week' ? weekLabels : monthLabels;
  
  // User activity data
  const userActivityData = {
    labels,
    datasets: [
      {
        label: 'Active Users',
        data: timeFrame === 'week' 
          ? [65, 78, 82, 75, 90, 55, 40] 
          : Array.from({ length: 30 }, () => Math.floor(Math.random() * 50) + 50),
        borderColor: '#2563EB',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        tension: 0.3,
        fill: true,
      },
    ],
  };
  
  // Content interaction data
  const contentInteractionData = {
    labels,
    datasets: [
      {
        label: 'Saved',
        data: timeFrame === 'week' 
          ? [28, 35, 40, 32, 45, 30, 22] 
          : Array.from({ length: 30 }, () => Math.floor(Math.random() * 30) + 20),
        backgroundColor: 'rgba(37, 99, 235, 0.8)',
      },
      {
        label: 'Shared',
        data: timeFrame === 'week' 
          ? [18, 25, 30, 22, 35, 20, 12] 
          : Array.from({ length: 30 }, () => Math.floor(Math.random() * 20) + 10),
        backgroundColor: 'rgba(14, 165, 233, 0.8)',
      },
      {
        label: 'Reported',
        data: timeFrame === 'week' 
          ? [5, 8, 4, 6, 9, 3, 2] 
          : Array.from({ length: 30 }, () => Math.floor(Math.random() * 5) + 1),
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
      },
    ],
  };
  
  // Content sources data
  const contentSourcesData = {
    labels: ['Twitter', 'Reddit'],
    datasets: [
      {
        data: [65, 35],
        backgroundColor: ['rgba(29, 161, 242, 0.8)', 'rgba(255, 69, 0, 0.8)'],
        borderWidth: 1,
      },
    ],
  };
  
  // Credit distribution data
  const creditDistributionData = {
    labels: ['Login', 'Profile', 'Interaction', 'Admin'],
    datasets: [
      {
        data: [30, 25, 35, 10],
        backgroundColor: [
          'rgba(37, 99, 235, 0.8)',
          'rgba(20, 184, 166, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(236, 72, 153, 0.8)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
        
        <div className="bg-white rounded-full shadow-sm border border-gray-200 p-1 flex space-x-1 text-sm mt-3 sm:mt-0">
          <button 
            className={`px-3 py-1 rounded-full ${timeFrame === 'week' ? 'bg-primary-100 text-primary-800' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setTimeFrame('week')}
          >
            Week
          </button>
          <button 
            className={`px-3 py-1 rounded-full ${timeFrame === 'month' ? 'bg-primary-100 text-primary-800' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setTimeFrame('month')}
          >
            Month
          </button>
        </div>
      </div>
      
      {/* Activity Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">User Activity</h2>
          <div className="h-64">
            <Line
              data={userActivityData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                  tooltip: {
                    mode: 'index',
                    intersect: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                    },
                  },
                  y: {
                    beginAtZero: true,
                    grid: {
                      borderDash: [2],
                      color: 'rgba(0, 0, 0, 0.06)',
                    },
                  },
                },
                elements: {
                  point: {
                    radius: 2,
                    hoverRadius: 4,
                  },
                },
              }}
            />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Content Interaction</h2>
          <div className="h-64">
            <Bar
              data={contentInteractionData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  tooltip: {
                    mode: 'index',
                    intersect: false,
                  },
                },
                scales: {
                  x: {
                    stacked: true,
                    grid: {
                      display: false,
                    },
                  },
                  y: {
                    stacked: true,
                    beginAtZero: true,
                    grid: {
                      borderDash: [2],
                      color: 'rgba(0, 0, 0, 0.06)',
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Distribution Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Content Sources</h2>
          <div className="h-64 flex items-center justify-center">
            <div className="w-3/4 h-3/4">
              <Doughnut
                data={contentSourcesData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom' as const,
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Credit Distribution</h2>
          <div className="h-64 flex items-center justify-center">
            <div className="w-3/4 h-3/4">
              <Doughnut
                data={creditDistributionData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom' as const,
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Key Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">254</p>
            <p className="text-xs text-success-700 mt-2">+12% from last month</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Active Users</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">187</p>
            <p className="text-xs text-success-700 mt-2">+8% from last month</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Content Interactions</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">3,428</p>
            <p className="text-xs text-success-700 mt-2">+15% from last month</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Credits Awarded</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">12,845</p>
            <p className="text-xs text-success-700 mt-2">+10% from last month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalyticsPage;