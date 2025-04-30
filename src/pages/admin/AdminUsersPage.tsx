import { useState, useEffect } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { Edit, Trash, Check, X, Search, CreditCard } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  profileCompleted: boolean;
  credits: number;
  createdAt: string;
  lastLogin: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    username: 'johndoe',
    email: 'john@example.com',
    role: 'user',
    profileCompleted: true,
    credits: 235,
    createdAt: '2023-06-15T10:20:30Z',
    lastLogin: '2023-07-01T14:30:45Z',
  },
  {
    id: '2',
    username: 'janedoe',
    email: 'jane@example.com',
    role: 'user',
    profileCompleted: false,
    credits: 120,
    createdAt: '2023-05-10T08:15:20Z',
    lastLogin: '2023-06-28T11:45:30Z',
  },
  {
    id: '3',
    username: 'adminuser',
    email: 'admin@example.com',
    role: 'admin',
    profileCompleted: true,
    credits: 500,
    createdAt: '2023-04-05T09:30:15Z',
    lastLogin: '2023-07-02T16:20:10Z',
  },
  {
    id: '4',
    username: 'testuser',
    email: 'test@example.com',
    role: 'user',
    profileCompleted: true,
    credits: 180,
    createdAt: '2023-06-20T15:40:25Z',
    lastLogin: '2023-06-30T10:15:50Z',
  },
  {
    id: '5',
    username: 'newuser',
    email: 'new@example.com',
    role: 'user',
    profileCompleted: false,
    credits: 50,
    createdAt: '2023-07-01T11:25:40Z',
    lastLogin: '2023-07-01T11:30:20Z',
  },
];

const AdminUsersPage = () => {
  const { user } = useAuthStore();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [creditAmount, setCreditAmount] = useState<number>(0);
  const [showCreditModal, setShowCreditModal] = useState(false);
  
  // Fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setUsers(mockUsers);
      } catch (error) {
        toast.error('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);
  
  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAddCredits = () => {
    if (!selectedUser || creditAmount <= 0) return;
    
    // Update user credits
    setUsers(users.map(user => 
      user.id === selectedUser.id 
        ? { ...user, credits: user.credits + creditAmount } 
        : user
    ));
    
    toast.success(`Added ${creditAmount} credits to ${selectedUser.username}`);
    setShowCreditModal(false);
    setCreditAmount(0);
  };
  
  const openCreditModal = (user: User) => {
    setSelectedUser(user);
    setShowCreditModal(true);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-10 py-2 block w-full border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Search users..."
            />
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    User
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Credits
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Joined
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-semibold">
                          {user.username.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.username}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.profileCompleted ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-success-100 text-success-800">
                          Complete
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Incomplete
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.credits}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.role === 'admin' ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                          Admin
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          User
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => openCreditModal(user)}
                        className="text-primary-600 hover:text-primary-900 mr-3"
                      >
                        <CreditCard className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Credit Modal */}
      {showCreditModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Add Credits to {selectedUser.username}
            </h3>
            <div className="mb-4">
              <label htmlFor="creditAmount" className="block text-sm font-medium text-gray-700 mb-1">
                Credit Amount
              </label>
              <input
                type="number"
                id="creditAmount"
                value={creditAmount}
                onChange={e => setCreditAmount(Number(e.target.value))}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowCreditModal(false)}
                className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCredits}
                className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                disabled={creditAmount <= 0}
              >
                Add Credits
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;