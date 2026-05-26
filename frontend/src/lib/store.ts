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
  folderId: string | null;
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

export interface Folder {
  _id: string;
  userId: string;
  name: string;
  parentId: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface FolderTreeNode {
  _id: string;
  userId: string;
  name: string;
  parentId: string | null;
  order: number;
  notes: Note[];
  children: FolderTreeNode[];
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

export interface AiResearchData {
  summary: string;
  concepts: { term: string; explanation: string }[];
  relatedTopics: { topic: string; description: string }[];
  references: { title: string; url: string; description: string }[];
}

interface NotesState {
  notes: Note[];
  selectedNote: Note | null;
  filter: "all" | "private" | "shared" | "pinned" | "trash";
  searchQuery: string;
  sidebarOpen: boolean;
  sidebarWidth: number;
  viewMode: "list" | "folders";
  folderTree: FolderTreeNode[];
  unorganizedNotes: Note[];
  expandedFolders: Record<string, boolean>;
  selectedFolderId: string | null;
  researchPanelOpen: boolean;
  researchData: AiResearchData | null;
  researchLoading: boolean;
  setNotes: (notes: Note[]) => void;
  setSelectedNote: (note: Note | null) => void;
  setFilter: (
    filter: "all" | "private" | "shared" | "pinned" | "trash",
  ) => void;
  setSearchQuery: (query: string) => void;
  toggleSidebar: () => void;
  setSidebarWidth: (w: number) => void;
  setViewMode: (mode: "list" | "folders") => void;
  setFolderTree: (folders: FolderTreeNode[], unorganized: Note[]) => void;
  toggleFolder: (id: string) => void;
  setAllExpanded: (expanded: boolean) => void;
  setSelectedFolderId: (id: string | null) => void;
  toggleResearchPanel: () => void;
  setResearchData: (data: AiResearchData | null) => void;
  setResearchLoading: (loading: boolean) => void;
}

export const useNotesStore = create<NotesState>((set) => ({
  notes: [],
  selectedNote: null,
  filter: "all",
  searchQuery: "",
  sidebarOpen: true,
  sidebarWidth: 300,
  viewMode: "folders",
  folderTree: [],
  unorganizedNotes: [],
  expandedFolders: {},
  selectedFolderId: null,
  researchPanelOpen: false,
  researchData: null,
  researchLoading: false,
  setNotes: (notes) => set({ notes }),
  setSelectedNote: (note) => set({ selectedNote: note }),
  setFilter: (filter: "all" | "private" | "shared" | "pinned" | "trash") =>
    set({ filter }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarWidth: (w) =>
    set({ sidebarWidth: Math.max(200, Math.min(480, w)) }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setFolderTree: (folders, unorganized) =>
    set({ folderTree: folders, unorganizedNotes: unorganized }),
  toggleFolder: (id) =>
    set((s) => ({
      expandedFolders: { ...s.expandedFolders, [id]: !s.expandedFolders[id] },
    })),
  setAllExpanded: (expanded) => {
    const collectIds = (nodes: FolderTreeNode[]): string[] => {
      const ids: string[] = [];
      for (const n of nodes) {
        ids.push(n._id);
        ids.push(...collectIds(n.children));
      }
      return ids;
    };
    const allIds = collectIds(useNotesStore.getState().folderTree);
    const map: Record<string, boolean> = {};
    allIds.forEach((id) => {
      map[id] = expanded;
    });
    set({ expandedFolders: map });
  },
  setSelectedFolderId: (id) => set({ selectedFolderId: id }),
  toggleResearchPanel: () =>
    set((s) => ({
      researchPanelOpen: !s.researchPanelOpen,
      researchData: s.researchPanelOpen ? null : s.researchData,
    })),
  setResearchData: (data) => set({ researchData: data }),
  setResearchLoading: (loading) => set({ researchLoading: loading }),
}));
