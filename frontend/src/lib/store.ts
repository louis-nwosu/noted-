import { create } from "zustand";

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
}

export interface Note {
  _id: string;
  userId: string;
  title: string;
  content: any;
  plainTextPreview: string;
  coverImage: string | null;
  tags: string[];
  isPrivate: boolean;
  shareToken: string | null;
  shareMode: "view" | "comment" | null;
  wordCount: number;
  readingTime: number;
  pinnedAt: string | null;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  logout: () => {
    localStorage.removeItem("accessToken");
    set({ user: null, isAuthenticated: false });
  },
}));

interface NotesState {
  notes: Note[];
  selectedNote: Note | null;
  filter: "all" | "private" | "shared" | "pinned" | "trash";
  searchQuery: string;
  sidebarOpen: boolean;
  sidebarWidth: number;
  setNotes: (notes: Note[]) => void;
  setSelectedNote: (note: Note | null) => void;
  setFilter: (filter: "all" | "private" | "shared" | "pinned" | "trash") => void;
  setSearchQuery: (query: string) => void;
  toggleSidebar: () => void;
  setSidebarWidth: (w: number) => void;
}

export const useNotesStore = create<NotesState>((set) => ({
  notes: [],
  selectedNote: null,
  filter: "all",
  searchQuery: "",
  sidebarOpen: true,
  sidebarWidth: 388,
  setNotes: (notes) => set({ notes }),
  setSelectedNote: (note) => set({ selectedNote: note }),
  setFilter: (filter: "all" | "private" | "shared" | "pinned" | "trash") => set({ filter }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarWidth: (w) =>
    set({ sidebarWidth: Math.max(200, Math.min(480, w)) }),
}));
