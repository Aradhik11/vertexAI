import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { useCreditStore } from '../../stores/creditStore';
import { useFeedStore } from '../../stores/feedStore';
import { useAuthStore } from '../../stores/authStore';
import { CreditCard, TrendingUp, CalendarClock, Bookmark, Award, Share2, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const DashboardPage = () => {
  const { credits, history } = useCreditStore();
  const { savedItems } = useFeedStore();
  const { user } = useAuthStore();
  const [timeFrame, setTimeFrame] = useState<'week' | 'month'>('week');
  
  // Generate credit history data for chart
  const generateChartData = () => {
    const now = new Date();
    const days = timeFrame === 'week' ? 7 : 30;
    const labels = [];
    const data = [];
    
    // Generate dates for the selected timeframe
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(now.getDate() - i);
      labels.push(format(date, 'MMM d'));
      
      // Initialize with 0 credits
      data.push(0);
    }
    
    // Filter history items within the timeframe
    history.forEach(item => {
      const itemDate = new Date(item.timestamp);
      const diffTime = Math.abs(now.getTime() - itemDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays <= days) {
        // Find the corresponding index in our data array
        const dateString = format(itemDate, 'MMM d');
        const index = labels.indexOf(dateString);
        if (index !== -1) {
          data[index] += item.amount;
        }
      }
    });
    
    return { labels, data };
  };
  
  const chartData = generateChartData();
  
  // Get recent activity from credit history
  const recentActivity = history
    .slice(0, 5)
    .map(item => ({
      ...item,
      formattedDate: format(new Date(item.timestamp), 'MMM d, yyyy')
    }));
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
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
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Credits</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{credits}</p>
            </div>
            <div className="bg-primary-100 p-3 rounded-full">
              <CreditCard className="h-6 w-6 text-primary-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-xs text-success-700">
            <TrendingUp className="h-3 w-3 mr-1" />
            <span>
              {history.length > 0 ? `+${history[0].amount} from last activity` : 'No recent activity'}
            </span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Login Streak</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {useCreditStore.getState().getHistoryByType('login').length}
              </p>
            </div>
            <div className="bg-accent-100 p-3 rounded-full">
              <CalendarClock className="h-6 w-6 text-accent-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-xs text-gray-500">
            <span>Keep logging in daily for more credits!</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Saved Content</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {savedItems.length}
              </p>
            </div>
            <div className="bg-secondary-100 p-3 rounded-full">
              <Bookmark className="h-6 w-6 text-secondary-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-xs text-gray-500">
            <span>Browse your saved content in the Saved section</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Profile Status</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {user?.profileCompleted ? 'Complete' : 'Incomplete'}
              </p>
            </div>
            <div className="bg-primary-100 p-3 rounded-full">
              <Award className="h-6 w-6 text-primary-600" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-xs text-warning-700">
            {!user?.profileCompleted && (
              <span>Complete your profile to earn 50 credits!</span>
            )}
            {user?.profileCompleted && (
              <span className="text-success-700">Profile completed! +50 credits earned.</span>
            )}
          </div>
        </div>
      </div>
      
      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Credit Activity</h2>
          <div className="h-64">
            <Line
              data={{
                labels: chartData.labels,
                datasets: [
                  {
                    label: 'Credits Earned',
                    data: chartData.data,
                    borderColor: '#2563EB',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    tension: 0.3,
                    fill: true,
                  },
                ],
              }}
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
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    {activity.type === 'login' && (
                      <div className="bg-accent-100 p-1.5 rounded-full">
                        <CalendarClock className="h-4 w-4 text-accent-600" />
                      </div>
                    )}
                    {activity.type === 'profile' && (
                      <div className="bg-primary-100 p-1.5 rounded-full">
                        <Award className="h-4 w-4 text-primary-600" />
                      </div>
                    )}
                    {activity.type === 'interaction' && (
                      <div className="bg-secondary-100 p-1.5 rounded-full">
                        <Share2 className="h-4 w-4 text-secondary-600" />
                      </div>
                    )}
                    {activity.type === 'admin' && (
                      <div className="bg-warning-100 p-1.5 rounded-full">
                        <AlertCircle className="h-4 w-4 text-warning-600" />
                      </div>
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                      <span className="text-sm text-green-600 font-medium">+{activity.amount}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{activity.formattedDate}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-4">No recent activity</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;