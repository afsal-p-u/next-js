import { create } from "zustand";

export interface ModelStoreInterface {
    movieId?: string;
    isOpen: boolean; 
    openModel: (movieId: string) => void;
    closeModel: () => void;
}

const useInfoModelStore = create<ModelStoreInterface>((set) => ({
    movieId: undefined,
    isOpen: false,
    openModel: (movieId: string) => set({ isOpen: true, movieId }),
    closeModel: () => set({ isOpen: false, movieId: undefined })
}));

export default useInfoModelStore;