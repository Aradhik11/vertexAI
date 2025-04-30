import { useState, useEffect } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { useCredits } from '../../hooks/useCredits';
import { Check, X, Save } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ProfileFormData {
  username: string;
  email: string;
  bio: string;
  twitter: string;
  reddit: string;
  website: string;
  notifications: boolean;
}

const ProfilePage = () => {
  const { user, updateUser } = useAuthStore();
  const { addProfileCredit } = useCredits();
  
  const [formData, setFormData] = useState<ProfileFormData>({
    username: user?.username || '',
    email: user?.email || '',
    bio: '',
    twitter: '',
    reddit: '',
    website: '',
    notifications: true
  });
  
  const [saving, setSaving] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update user profile
      updateUser({ 
        username: formData.username,
        profileCompleted: true 
      });
      
      // If profile wasn't already completed, add credits
      if (!user?.profileCompleted) {
        addProfileCredit();
      }
      
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };
  
  // Calculate profile completion percentage
  const calculateCompletion = () => {
    const fields = [
      formData.username,
      formData.email,
      formData.bio,
      formData.twitter,
      formData.reddit,
      formData.website
    ];
    
    const filledFields = fields.filter(field => field && field.trim() !== '').length;
    return Math.round((filledFields / fields.length) * 100);
  };
  
  const completionPercentage = calculateCompletion();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
        
        <div className="mt-3 sm:mt-0 flex items-center">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-primary-600 h-2.5 rounded-full" 
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <span className="ml-2 text-sm font-medium text-gray-700">{completionPercentage}%</span>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Update your account profile information.
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      value={formData.username}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                  </div>
                </div>
                
                <div className="sm:col-span-3">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      disabled
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Email cannot be changed</p>
                </div>
                
                <div className="sm:col-span-6">
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                    Bio
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="bio"
                      name="bio"
                      rows={3}
                      value={formData.bio}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      placeholder="Tell us a little about yourself"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-6 border-t border-gray-200">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Social Profiles</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Connect your social media accounts to enhance your profile.
                </p>
              </div>
              
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">
                    Twitter
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                      @
                    </span>
                    <input
                      type="text"
                      name="twitter"
                      id="twitter"
                      value={formData.twitter}
                      onChange={handleChange}
                      className="block w-full rounded-none rounded-r-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      placeholder="username"
                    />
                  </div>
                </div>
                
                <div className="sm:col-span-3">
                  <label htmlFor="reddit" className="block text-sm font-medium text-gray-700">
                    Reddit
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                      u/
                    </span>
                    <input
                      type="text"
                      name="reddit"
                      id="reddit"
                      value={formData.reddit}
                      onChange={handleChange}
                      className="block w-full rounded-none rounded-r-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      placeholder="username"
                    />
                  </div>
                </div>
                
                <div className="sm:col-span-6">
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                    Website
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                      https://
                    </span>
                    <input
                      type="text"
                      name="website"
                      id="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="block w-full rounded-none rounded-r-md border-gray-300 focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                      placeholder="www.example.com"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-6 border-t border-gray-200">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Customize how you receive notifications.
                </p>
              </div>
              
              <div className="mt-6">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="notifications"
                      name="notifications"
                      type="checkbox"
                      checked={formData.notifications}
                      onChange={handleToggleChange}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="notifications" className="font-medium text-gray-700">
                      Email notifications
                    </label>
                    <p className="text-gray-500">Receive email updates about your account activity.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-6 border-t border-gray-200">
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  disabled={saving}
                >
                  {saving ? (
                    <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                  ) : (
                    <Save className="h-4 w-4 mr-1.5" />
                  )}
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5">
        <h3 className="text-lg font-medium text-gray-900">Profile Completion Checklist</h3>
        <p className="mt-1 text-sm text-gray-500">
          Complete your profile to earn 50 credits!
        </p>
        
        <div className="mt-4 space-y-3">
          <div className="flex items-center">
            {formData.username ? (
              <Check className="h-5 w-5 text-success-500" />
            ) : (
              <X className="h-5 w-5 text-gray-400" />
            )}
            <span className={`ml-2 text-sm ${formData.username ? 'text-success-700' : 'text-gray-500'}`}>
              Set your username
            </span>
          </div>
          
          <div className="flex items-center">
            {formData.bio ? (
              <Check className="h-5 w-5 text-success-500" />
            ) : (
              <X className="h-5 w-5 text-gray-400" />
            )}
            <span className={`ml-2 text-sm ${formData.bio ? 'text-success-700' : 'text-gray-500'}`}>
              Add a bio
            </span>
          </div>
          
          <div className="flex items-center">
            {formData.twitter || formData.reddit ? (
              <Check className="h-5 w-5 text-success-500" />
            ) : (
              <X className="h-5 w-5 text-gray-400" />
            )}
            <span className={`ml-2 text-sm ${formData.twitter || formData.reddit ? 'text-success-700' : 'text-gray-500'}`}>
              Connect at least one social profile
            </span>
          </div>
          
          <div className="flex items-center">
            {formData.website ? (
              <Check className="h-5 w-5 text-success-500" />
            ) : (
              <X className="h-5 w-5 text-gray-400" />
            )}
            <span className={`ml-2 text-sm ${formData.website ? 'text-success-700' : 'text-gray-500'}`}>
              Add your website
            </span>
          </div>
        </div>
        
        {user?.profileCompleted ? (
          <div className="mt-4 bg-success-50 text-success-700 p-3 rounded-md text-sm">
            Profile complete! You've earned 50 credits.
          </div>
        ) : (
          <div className="mt-4 bg-primary-50 text-primary-700 p-3 rounded-md text-sm">
            Complete your profile to earn 50 credits!
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;