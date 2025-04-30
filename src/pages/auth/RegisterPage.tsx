import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { Eye, EyeOff, Check, X } from 'lucide-react';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { register, loading, error, clearError } = useAuthStore();
  
  // Password validation
  const validations = [
    { id: 1, text: 'At least 8 characters', valid: password.length >= 8 },
    { id: 2, text: 'At least one uppercase letter', valid: /[A-Z]/.test(password) },
    { id: 3, text: 'At least one number', valid: /[0-9]/.test(password) },
    { id: 4, text: 'Passwords match', valid: password === confirmPassword && password.length > 0 }
  ];
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all validations pass
    if (validations.every(v => v.valid)) {
      await register(username, email, password);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Create an account</h1>
        <p className="text-gray-500">Sign up to start your creator journey</p>
      </div>
      
      {error && (
        <div className="bg-error-100 text-error-700 p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4" onClick={clearError}>
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="johndoe"
            required
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="you@example.com"
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="••••••••"
            required
          />
        </div>
        
        <div className="space-y-2">
          {validations.map((validation) => (
            <div key={validation.id} className="flex items-center text-sm">
              {validation.valid ? (
                <Check size={16} className="text-success-500 mr-2" />
              ) : (
                <X size={16} className="text-gray-400 mr-2" />
              )}
              <span className={validation.valid ? 'text-success-700' : 'text-gray-500'}>
                {validation.text}
              </span>
            </div>
          ))}
        </div>
        
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 flex justify-center items-center"
          disabled={loading || !validations.every(v => v.valid)}
        >
          {loading ? (
            <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
          ) : null}
          Create account
        </button>
      </form>
      
      <div className="flex items-center justify-center">
        <span className="text-sm text-gray-500">Already have an account?</span>
        <Link to="/login" className="ml-1 text-sm font-medium text-primary-600 hover:text-primary-700">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;