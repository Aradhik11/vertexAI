import { useEffect, useState } from 'react';
import { useFeedStore, FeedItem } from '../stores/feedStore';
import { useCredits } from './useCredits';
import { toast } from 'react-hot-toast';

// Mock data for feed items until backend is connected
const mockTwitterData: FeedItem[] = [
  {
    id: 't1',
    source: 'twitter',
    content: 'Just launched our newest product! Check it out at our website #innovation #tech',
    author: '@techcompany',
    timestamp: Date.now() - 3600000, // 1 hour ago
    url: 'https://twitter.com/techcompany/status/123456789',
    imageUrl: 'https://images.pexels.com/photos/13861/IMG_3496bfree.jpg?auto=compress&cs=tinysrgb&w=1260&h=750',
    likes: 125,
    comments: 18
  },
  {
    id: 't2',
    source: 'twitter',
    content: 'The future of AI is here. We\'re excited to announce our latest research paper on advanced neural networks.',
    author: '@airesearcher',
    timestamp: Date.now() - 7200000, // 2 hours ago
    url: 'https://twitter.com/airesearcher/status/123456790',
    likes: 432,
    comments: 56
  },
  {
    id: 't3',
    source: 'twitter',
    content: 'Just hiked to the top of Mount Rainier. The view is absolutely breathtaking! #adventure #hiking',
    author: '@natureenthusiast',
    timestamp: Date.now() - 18000000, // 5 hours ago
    url: 'https://twitter.com/natureenthusiast/status/123456791',
    imageUrl: 'https://images.pexels.com/photos/2335126/pexels-photo-2335126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    likes: 876,
    comments: 93
  }
];

const mockRedditData: FeedItem[] = [
  {
    id: 'r1',
    source: 'reddit',
    title: 'I built a web app that helps creators track their content performance',
    content: 'After months of work, I finally launched my project that aggregates all your content metrics across platforms into one dashboard. Let me know what you think!',
    author: 'u/webdevpro',
    timestamp: Date.now() - 10800000, // 3 hours ago
    url: 'https://reddit.com/r/webdev/comments/abc123',
    imageUrl: 'https://images.pexels.com/photos/935756/pexels-photo-935756.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    likes: 342,
    comments: 47
  },
  {
    id: 'r2',
    source: 'reddit',
    title: 'What tech stack would you recommend for a creator dashboard?',
    content: 'I\'m building a dashboard for content creators and trying to decide on the best tech stack. Currently considering MERN vs PERN. Any recommendations?',
    author: 'u/createrdeveloper',
    timestamp: Date.now() - 36000000, // 10 hours ago
    url: 'https://reddit.com/r/webdev/comments/abc124',
    likes: 68,
    comments: 32
  },
  {
    id: 'r3',
    source: 'reddit',
    title: 'Show Reddit: My new creator analytics platform',
    content: 'I built an analytics platform specifically for content creators that shows engagement trends and suggests optimal posting times. It\'s free for now while in beta!',
    author: 'u/analyticsguru',
    timestamp: Date.now() - 86400000, // 1 day ago
    url: 'https://reddit.com/r/SideProject/comments/abc125',
    imageUrl: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    likes: 129,
    comments: 23
  }
];

export const useFeed = () => {
  const { items, savedItems, reportedItems, loading, saveItem, unsaveItem, reportItem, setItems } = useFeedStore();
  const { addInteractionCredit } = useCredits();
  const [activeSource, setActiveSource] = useState<'all' | 'twitter' | 'reddit'>('all');
  
  // Fetch feed data on component mount
  useEffect(() => {
    // In a real app, this would be an API call
    // For demo purposes, we're using mock data
    const fetchFeedData = async () => {
      try {
        // Simulate API latency
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Combine mock data
        const combinedData = [...mockTwitterData, ...mockRedditData];
        
        // Sort by timestamp (newest first)
        combinedData.sort((a, b) => b.timestamp - a.timestamp);
        
        setItems(combinedData);
      } catch (error) {
        console.error('Error fetching feed data:', error);
      }
    };
    
    fetchFeedData();
  }, [setItems]);
  
  const filteredItems = activeSource === 'all' 
    ? items 
    : items.filter(item => item.source === activeSource);
  
  const handleSaveItem = (id: string) => {
    if (!savedItems.includes(id)) {
      saveItem(id);
      addInteractionCredit('Saved content to collection');
      toast.success('Item saved to your collection');
    }
  };
  
  const handleUnsaveItem = (id: string) => {
    unsaveItem(id);
    toast.success('Item removed from your collection');
  };
  
  const handleReportItem = (id: string) => {
    if (!reportedItems.includes(id)) {
      reportItem(id);
      toast.success('Thank you for your report. We\'ll review this content.');
    }
  };
  
  const handleShareItem = (item: FeedItem) => {
    // In a real app, this would open a share dialog or copy to clipboard
    navigator.clipboard.writeText(item.url);
    addInteractionCredit('Shared content with others');
    toast.success('Link copied to clipboard!');
  };
  
  return {
    items: filteredItems,
    savedItems,
    reportedItems,
    loading,
    activeSource,
    setActiveSource,
    handleSaveItem,
    handleUnsaveItem,
    handleReportItem,
    handleShareItem,
    isSaved: (id: string) => savedItems.includes(id),
    isReported: (id: string) => reportedItems.includes(id),
  };
};