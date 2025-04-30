import { useFeedStore } from '../../stores/feedStore';
import { useFeed } from '../../hooks/useFeed';
import { Twitter, Edit as Reddit, Bookmark, Share2, AlertTriangle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const SavedPage = () => {
  const { getSavedItems } = useFeedStore();
  const { handleUnsaveItem, handleShareItem, handleReportItem, isReported } = useFeed();
  
  const savedItems = getSavedItems();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Saved Content</h1>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {savedItems.length > 0 ? (
          savedItems.map((item) => (
            <div 
              key={item.id} 
              className={`bg-white rounded-lg shadow-sm border border-gray-100 p-5 ${
                isReported(item.id) ? 'opacity-50' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className={`p-1.5 rounded-full ${
                    item.source === 'twitter' ? 'bg-blue-100' : 'bg-orange-100'
                  }`}>
                    {item.source === 'twitter' ? (
                      <Twitter className="h-4 w-4 text-blue-600" />
                    ) : (
                      <Reddit className="h-4 w-4 text-orange-600" />
                    )}
                  </div>
                  <div className="ml-2">
                    <p className="text-sm font-medium text-gray-900">{item.author}</p>
                    <p className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleUnsaveItem(item.id)}
                    className="p-1.5 rounded-full hover:bg-gray-100"
                    title="Remove from saved"
                  >
                    <Bookmark className="h-4 w-4 text-primary-600" />
                  </button>
                  
                  <button 
                    onClick={() => handleShareItem(item)}
                    className="p-1.5 rounded-full hover:bg-gray-100"
                    title="Share"
                  >
                    <Share2 className="h-4 w-4 text-gray-600" />
                  </button>
                  
                  <button 
                    onClick={() => handleReportItem(item.id)}
                    className={`p-1.5 rounded-full hover:bg-gray-100 ${
                      isReported(item.id) ? 'text-error-600' : 'text-gray-600'
                    }`}
                    title="Report"
                    disabled={isReported(item.id)}
                  >
                    <AlertTriangle className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="mt-3">
                {item.title && (
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                )}
                <p className="text-gray-700">{item.content}</p>
                
                {item.imageUrl && (
                  <div className="mt-3 rounded-lg overflow-hidden">
                    <img 
                      src={item.imageUrl} 
                      alt="Post content" 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}
              </div>
              
              <div className="mt-4 flex items-center text-sm text-gray-500 space-x-4">
                {item.likes !== undefined && (
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700 mr-1">{item.likes}</span>
                    <span>likes</span>
                  </div>
                )}
                
                {item.comments !== undefined && (
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700 mr-1">{item.comments}</span>
                    <span>comments</span>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No saved content yet</h3>
            <p className="text-gray-500">
              Start browsing the feed and save content you find interesting.
            </p>
            <button 
              onClick={() => window.location.href = '/feed'}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Browse Feed
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedPage;