"use client";

import { useEffect } from "react";
import useUserStore from "@/lib/store/userStore";
import useCartStore from "@/lib/store/cartStore";

export default function StoreHydration() {
  useEffect(() => {
    useUserStore.getState().init();
    useCartStore.persist.rehydrate();
  }, []);

  return null;
}
