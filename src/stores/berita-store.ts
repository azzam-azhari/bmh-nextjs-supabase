import { create } from 'zustand';
import { Berita } from '@/types/berita';

type BeritaState = {
    currentBerita: Berita | null;
    setCurrentBerita: (berita: Berita | null) => void;
};

export const useBeritaStore = create<BeritaState>((set) => ({
    currentBerita: null,
    setCurrentBerita: (berita) => set({ currentBerita: berita }),
}));
