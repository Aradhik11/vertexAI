import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface FeedItem {
  id: string;
  source: 'twitter' | 'reddit';
  content: string;
  author: string;
  timestamp: number;
  url: string;
  title?: string;
  imageUrl?: string;
  likes?: number;
  comments?: number;
}

interface FeedState {
  items: FeedItem[];
  savedItems: string[]; // Array of feed item IDs
  reportedItems: string[]; // Array of feed item IDs
  loading: boolean;
  error: string | null;
  saveItem: (id: string) => void;
  unsaveItem: (id: string) => void;
  reportItem: (id: string) => void;
  setItems: (items: FeedItem[]) => void;
  getSavedItems: () => FeedItem[];
}

export const useFeedStore = create<FeedState>()(
  persist(
    (set, get) => ({
      items: [],
      savedItems: [],
      reportedItems: [],
      loading: false,
      error: null,
      
      saveItem: (id: string) => {
        set((state) => ({
          savedItems: state.savedItems.includes(id) 
            ? state.savedItems 
            : [...state.savedItems, id]
        }));
      },
      
      unsaveItem: (id: string) => {
        set((state) => ({
          savedItems: state.savedItems.filter(itemId => itemId !== id)
        }));
      },
      
      reportItem: (id: string) => {
        set((state) => ({
          reportedItems: state.reportedItems.includes(id)
            ? state.reportedItems
            : [...state.reportedItems, id]
        }));
      },
      
      setItems: (items: FeedItem[]) => {
        set({ items, loading: false, error: null });
      },
      
      getSavedItems: () => {
        const { items, savedItems } = get();
        return items.filter(item => savedItems.includes(item.id));
      },
    }),
    {
      name: 'feed-storage',
      partialize: (state) => ({ savedItems: state.savedItems, reportedItems: state.reportedItems }),
    }
  )
);