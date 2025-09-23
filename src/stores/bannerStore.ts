import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BannerState {
  showBanner: boolean;
  toggleBanner: () => void;
}

export const useBannerStore = create<BannerState>()(
  persist(
    (set) => ({
      showBanner: true,
      toggleBanner: () => set((state) => ({ showBanner: !state.showBanner })),
    }),
    {
      name: 'banner-storage',
    }
  )
);