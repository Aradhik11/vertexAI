import { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  LayoutDashboard, 
  Newspaper, 
  Bookmark, 
  User, 
  Users, 
  BarChart, 
  LogOut, 
  Menu, 
  X,
  Bell
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useCreditStore } from '../stores/creditStore';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardLayout = () => {
  const { user, logout } = useAuthStore();
  const { credits } = useCreditStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const [notifications, setNotifications] = useState<Array<{id: string, text: string, read: boolean}>>([
    { id: '1', text: 'Welcome to Creator Dashboard!', read: false },
    { id: '2', text: 'Complete your profile to earn 50 credits', read: false }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  
  // Close sidebar when location changes (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <div className="min-h-screen bg-background-light flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              className="p-2 rounded-md text-gray-600 hover:text-primary-600 focus:outline-none md:hidden"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <NavLink to="/dashboard" className="flex items-center space-x-2 ml-2 md:ml-0">
              <Sparkles className="h-6 w-6 text-primary-600" />
              <span className="font-bold text-lg text-primary-900 hidden sm:inline-block">Creator Dashboard</span>
            </NavLink>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center bg-primary-50 text-primary-800 px-3 py-1 rounded-full">
              <Sparkles className="h-4 w-4 mr-1.5" />
              <span className="text-sm font-semibold">{credits} Credits</span>
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-full text-gray-600 hover:text-primary-600 hover:bg-gray-100 focus:outline-none relative"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 bg-primary-600 rounded-full text-white text-xs flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              
              <AnimatePresence>
                {showNotifications && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 overflow-hidden"
                  >
                    <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                      <h3 className="font-semibold">Notifications</h3>
                      <button 
                        onClick={markAllAsRead}
                        className="text-xs text-primary-600 hover:text-primary-800"
                      >
                        Mark all as read
                      </button>
                    </div>
                    
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map(note => (
                          <div key={note.id} className={`p-3 border-b border-gray-100 hover:bg-gray-50 ${!note.read ? 'bg-blue-50' : ''}`}>
                            <p className="text-sm">{note.text}</p>
                          </div>
                        ))
                      ) : (
                        <div className="p-3 text-center text-gray-500 text-sm">
                          No notifications
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-semibold">
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="ml-2 font-medium text-sm hidden sm:inline-block">{user?.username || 'User'}</span>
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1">
        {/* Sidebar for Mobile */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed inset-0 z-40"
            >
              <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)}></div>
              <nav className="relative w-64 h-full bg-white shadow-xl flex flex-col">
                {/* Same content as desktop sidebar */}
                <div className="flex-1 p-4 space-y-1 overflow-y-auto">
                  <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-4 mb-2">
                    Main
                  </p>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) => 
                      `flex items-center space-x-3 px-3 py-2 rounded-md text-sm ${
                        isActive 
                          ? 'bg-primary-50 text-primary-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`
                    }
                  >
                    <LayoutDashboard size={18} />
                    <span>Dashboard</span>
                  </NavLink>
                  
                  <NavLink
                    to="/feed"
                    className={({ isActive }) => 
                      `flex items-center space-x-3 px-3 py-2 rounded-md text-sm ${
                        isActive 
                          ? 'bg-primary-50 text-primary-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`
                    }
                  >
                    <Newspaper size={18} />
                    <span>Feed</span>
                  </NavLink>
                  
                  <NavLink
                    to="/saved"
                    className={({ isActive }) => 
                      `flex items-center space-x-3 px-3 py-2 rounded-md text-sm ${
                        isActive 
                          ? 'bg-primary-50 text-primary-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`
                    }
                  >
                    <Bookmark size={18} />
                    <span>Saved</span>
                  </NavLink>
                  
                  <NavLink
                    to="/profile"
                    className={({ isActive }) => 
                      `flex items-center space-x-3 px-3 py-2 rounded-md text-sm ${
                        isActive 
                          ? 'bg-primary-50 text-primary-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`
                    }
                  >
                    <User size={18} />
                    <span>Profile</span>
                  </NavLink>
                  
                  {user?.role === 'admin' && (
                    <>
                      <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-6 mb-2">
                        Admin
                      </p>
                      <NavLink
                        to="/admin/users"
                        className={({ isActive }) => 
                          `flex items-center space-x-3 px-3 py-2 rounded-md text-sm ${
                            isActive 
                              ? 'bg-primary-50 text-primary-700' 
                              : 'text-gray-700 hover:bg-gray-100'
                          }`
                        }
                      >
                        <Users size={18} />
                        <span>Users</span>
                      </NavLink>
                      
                      <NavLink
                        to="/admin/analytics"
                        className={({ isActive }) => 
                          `flex items-center space-x-3 px-3 py-2 rounded-md text-sm ${
                            isActive 
                              ? 'bg-primary-50 text-primary-700' 
                              : 'text-gray-700 hover:bg-gray-100'
                          }`
                        }
                      >
                        <BarChart size={18} />
                        <span>Analytics</span>
                      </NavLink>
                    </>
                  )}
                </div>
                
                <div className="p-4 border-t border-gray-200">
                  <button
                    onClick={logout}
                    className="flex items-center space-x-3 px-3 py-2 w-full rounded-md text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Sidebar for Desktop */}
        <nav className="hidden md:flex md:flex-col md:w-64 md:bg-white md:border-r md:border-gray-200">
          <div className="flex-1 p-4 space-y-1 overflow-y-auto">
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-4 mb-2">
              Main
            </p>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => 
                `flex items-center space-x-3 px-3 py-2 rounded-md text-sm ${
                  isActive 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </NavLink>
            
            <NavLink
              to="/feed"
              className={({ isActive }) => 
                `flex items-center space-x-3 px-3 py-2 rounded-md text-sm ${
                  isActive 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <Newspaper size={18} />
              <span>Feed</span>
            </NavLink>
            
            <NavLink
              to="/saved"
              className={({ isActive }) => 
                `flex items-center space-x-3 px-3 py-2 rounded-md text-sm ${
                  isActive 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <Bookmark size={18} />
              <span>Saved</span>
            </NavLink>
            
            <NavLink
              to="/profile"
              className={({ isActive }) => 
                `flex items-center space-x-3 px-3 py-2 rounded-md text-sm ${
                  isActive 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <User size={18} />
              <span>Profile</span>
            </NavLink>
            
            {user?.role === 'admin' && (
              <>
                <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-6 mb-2">
                  Admin
                </p>
                <NavLink
                  to="/admin/users"
                  className={({ isActive }) => 
                    `flex items-center space-x-3 px-3 py-2 rounded-md text-sm ${
                      isActive 
                        ? 'bg-primary-50 text-primary-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  <Users size={18} />
                  <span>Users</span>
                </NavLink>
                
                <NavLink
                  to="/admin/analytics"
                  className={({ isActive }) => 
                    `flex items-center space-x-3 px-3 py-2 rounded-md text-sm ${
                      isActive 
                        ? 'bg-primary-50 text-primary-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  <BarChart size={18} />
                  <span>Analytics</span>
                </NavLink>
              </>
            )}
          </div>
          
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={logout}
              className="flex items-center space-x-3 px-3 py-2 w-full rounded-md text-sm text-gray-700 hover:bg-gray-100"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </nav>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;