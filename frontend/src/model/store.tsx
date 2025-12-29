import { create } from 'zustand';

type Role = {
  role: string | null;
  userId: string | null;
  setUser: (id: string, role: string) => void;
  logoutUser: () => void;
};

export const useGetRole = create<Role>()((set) => ({
  role: null,
  userId: null,

  setUser: (id, role) => {
    set({ role: role, userId: id });
  },

  logoutUser: () => {
    set({ role: null, userId: null });
  },
}));
