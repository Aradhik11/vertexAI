import { useState } from 'react';
import { useFeed } from '../../hooks/useFeed';
import { useCredits } from '../../hooks/useCredits';
import { Twitter, Edit as Reddit, BookmarkPlus, Bookmark, Share2, AlertTriangle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const FeedPage = () => {
  const { 
    items, 
    activeSource, 
    setActiveSource, 
    handleSaveItem, 
    handleUnsaveItem, 
    handleReportItem, 
    handleShareItem, 
    isSaved, 
    isReported,
    loading 
  } = useFeed();
  
  const { addInteractionCredit } = useCredits();
  
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Content Feed</h1>
        <div className="bg-white rounded-full shadow-sm border border-gray-200 p-1 flex space-x-1 text-sm mt-3 sm:mt-0">
          <button 
            className={`px-3 py-1 rounded-full flex items-center ${activeSource === 'all' ? 'bg-primary-100 text-primary-800' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveSource('all')}
          >
            <span>All</span>
          </button>
          <button 
            className={`px-3 py-1 rounded-full flex items-center ${activeSource === 'twitter' ? 'bg-primary-100 text-primary-800' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveSource('twitter')}
          >
            <Twitter className="h-3.5 w-3.5 mr-1.5" />
            <span>Twitter</span>
          </button>
          <button 
            className={`px-3 py-1 rounded-full flex items-center ${activeSource === 'reddit' ? 'bg-primary-100 text-primary-800' : 'text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setActiveSource('reddit')}
          >
            <Reddit className="h-3.5 w-3.5 mr-1.5" />
            <span>Reddit</span>
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {items.length > 0 ? (
            items.map((item) => (
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
                      onClick={() => {
                        if (isSaved(item.id)) {
                          handleUnsaveItem(item.id);
                        } else {
                          handleSaveItem(item.id);
                        }
                      }}
                      className="p-1.5 rounded-full hover:bg-gray-100"
                      title={isSaved(item.id) ? "Unsave" : "Save"}
                    >
                      {isSaved(item.id) ? (
                        <Bookmark className="h-4 w-4 text-primary-600" />
                      ) : (
                        <BookmarkPlus className="h-4 w-4 text-gray-600" />
                      )}
                    </button>
                    
                    <button 
                      onClick={() => handleShareItem(item)}
                      className="p-1.5 rounded-full hover:bg-gray-100"
                      title="Share"
                    >
                      <Share2 className="h-4 w-4 text-gray-600" />
                    </button>
                    
                    <button 
                      onClick={() => {
                        handleReportItem(item.id);
                        addInteractionCredit('Reported inappropriate content');
                      }}
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">No content found</h3>
              <p className="text-gray-500">
                Try changing your filter selection or check back later for new content.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FeedPage;