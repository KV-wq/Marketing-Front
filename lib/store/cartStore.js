import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      addItem(service, hours = 1) {
        const existing = get().items.find((i) => i.id === service.id);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.id === service.id ? { ...i, hours: i.hours + hours } : i
            ),
            isOpen: true,
          });
        } else {
          set({
            items: [
              ...get().items,
              {
                id: service.id,
                serviceName: service.name,
                pricePerHour: service.pricePerHour,
                hours,
              },
            ],
            isOpen: true,
          });
        }
      },

      removeItem(id) {
        set({ items: get().items.filter((i) => i.id !== id) });
      },

      updateHours(id, hours) {
        const h = Math.max(1, parseInt(hours) || 1);
        set({
          items: get().items.map((i) => (i.id === id ? { ...i, hours: h } : i)),
        });
      },

      clearCart() {
        set({ items: [] });
      },

      get total() {
        return get().items.reduce(
          (sum, i) => sum + i.pricePerHour * i.hours,
          0
        );
      },

      get count() {
        return get().items.reduce((sum, i) => sum + i.hours, 0);
      },
    }),
    { name: "forma-cart", skipHydration: true }
  )
);

export default useCartStore;
