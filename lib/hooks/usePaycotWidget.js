"use client";

import { useEffect } from "react";

const PAYCOT_SCRIPT = "https://widget.paycot.com/v.1.0/paywithpaycot.js";

export function usePaycotWidget({ paymentHash, isPaid }) {
  const shouldLoad = !!paymentHash && !isPaid;

  useEffect(() => {
    if (!shouldLoad) return;

    const existing = document.querySelector(`script[src="${PAYCOT_SCRIPT}"]`);
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.src = PAYCOT_SCRIPT;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const el = document.querySelector(`script[src="${PAYCOT_SCRIPT}"]`);
      if (el) el.remove();
    };
  }, [shouldLoad]);
}
