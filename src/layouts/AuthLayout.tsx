import { Outlet } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Branding */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary-800 to-primary-900 text-white p-10 flex-col justify-between">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-8 w-8 text-accent-400" />
          <span className="text-2xl font-bold">Creator Dashboard</span>
        </div>
        
        <div className="space-y-8">
          <h1 className="text-4xl font-bold">Empower your content creation journey</h1>
          <p className="text-xl text-primary-100 max-w-md">
            Manage your creator profile, earn rewards, and discover trending content, all in one place.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="mt-1 bg-primary-700/50 rounded-full p-1">
                <Sparkles className="h-5 w-5 text-accent-400" />
              </div>
              <div>
                <h3 className="font-medium">Earn Credits</h3>
                <p className="text-primary-200">Get rewarded for daily activity and engagement</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="mt-1 bg-primary-700/50 rounded-full p-1">
                <Sparkles className="h-5 w-5 text-accent-400" />
              </div>
              <div>
                <h3 className="font-medium">Curated Feed</h3>
                <p className="text-primary-200">Discover content from top social platforms</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="mt-1 bg-primary-700/50 rounded-full p-1">
                <Sparkles className="h-5 w-5 text-accent-400" />
              </div>
              <div>
                <h3 className="font-medium">Analytics Dashboard</h3>
                <p className="text-primary-200">Track your growth and engagement metrics</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-sm text-primary-300">
          &copy; {new Date().getFullYear()} Creator Dashboard. All rights reserved.
        </div>
      </div>
      
      {/* Right side - Auth form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-10 bg-background-light">
        <div className="w-full max-w-md">
          <div className="md:hidden flex items-center justify-center mb-8">
            <Sparkles className="h-8 w-8 text-primary-600" />
            <span className="ml-2 text-2xl font-bold text-primary-900">Creator Dashboard</span>
          </div>
          
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;