"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAdminStore from "@/lib/store/adminStore";

export default function AdminPage() {
  const router = useRouter();
  const { isAuthenticated } = useAdminStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/admin/orders");
    } else {
      router.replace("/admin/login");
    }
  }, [isAuthenticated, router]);

  return null;
}
