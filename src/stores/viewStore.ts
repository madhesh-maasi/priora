import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ViewMode = 'list' | 'kanban' | 'calendar' | 'timeline';

interface ViewState {
  currentView: ViewMode;
  sortBy: 'dueDate' | 'priority' | 'createdAt' | 'title';
  filterStatus: string[];
  filterCategory?: string;
  setCurrentView: (view: ViewMode) => void;
  setSortBy: (sort: 'dueDate' | 'priority' | 'createdAt' | 'title') => void;
  setFilterStatus: (statuses: string[]) => void;
  setFilterCategory: (category?: string) => void;
  resetFilters: () => void;
}

export const useViewStore = create<ViewState>()(
  persist(
    (set) => ({
      currentView: 'list',
      sortBy: 'dueDate',
      filterStatus: ['NOT_STARTED', 'IN_PROGRESS'],
      filterCategory: undefined,

      setCurrentView: (view) => set({ currentView: view }),
      setSortBy: (sort) => set({ sortBy: sort }),
      setFilterStatus: (statuses) => set({ filterStatus: statuses }),
      setFilterCategory: (category) => set({ filterCategory: category }),

      resetFilters: () =>
        set({
          sortBy: 'dueDate',
          filterStatus: ['NOT_STARTED', 'IN_PROGRESS'],
          filterCategory: undefined,
        }),
    }),
    {
      name: 'view-storage',
    },
  ),
);
