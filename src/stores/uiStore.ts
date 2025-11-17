import { create } from 'zustand';

interface UIState {
  filterStatus: string | null;
  searchTerm: string;
  dialogOpen: boolean;
  selectedLetterId: string | null;
  setFilterStatus: (status: string | null) => void;
  setSearchTerm: (term: string) => void;
  setDialogOpen: (open: boolean) => void;
  setSelectedLetterId: (id: string | null) => void;
}

export const useUIStore = create<UIState>(set => ({
  filterStatus: null,
  searchTerm: '',
  dialogOpen: false,
  selectedLetterId: null,
  setFilterStatus: status => set({ filterStatus: status }),
  setSearchTerm: term => set({ searchTerm: term }),
  setDialogOpen: open => set({ dialogOpen: open }),
  setSelectedLetterId: id => set({ selectedLetterId: id }),
}));