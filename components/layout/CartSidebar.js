"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";
import useCartStore from "@/lib/store/cartStore";

export default function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateHours, total } =
    useCartStore();

  const cartTotal = items.reduce((s, i) => s + i.pricePerHour * i.hours, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between px-8 py-6 border-b border-black/10">
              <span className="font-display text-2xl font-light tracking-wide">
                Your Cart
              </span>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-black/5 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 px-8">
                <ShoppingBag
                  size={48}
                  strokeWidth={1}
                  className="text-black/20"
                />
                <p className="text-sm text-black/40 tracking-widest uppercase">
                  Your cart is empty
                </p>
                <Link
                  href="/services"
                  onClick={closeCart}
                  className="mt-2 text-sm underline underline-offset-4 hover:text-black/60 transition-colors"
                >
                  Explore Services
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="border-b border-black/10 pb-6"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <Link
                            href={`/service/${item.id}`}
                            onClick={closeCart}
                            className="font-medium text-sm tracking-wide hover:text-black/75 transition-colors"
                          >
                            {item.serviceName}
                          </Link>
                          <p className="text-xs text-black/40 mt-0.5">
                            €{item.pricePerHour}/hr
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 hover:text-red-500 transition-colors text-black/30"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-black/20">
                          <button
                            onClick={() => updateHours(item.id, item.hours - 1)}
                            className="px-3 py-1.5 hover:bg-black/5 transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-4 py-1.5 text-sm font-medium min-w-[40px] text-center">
                            {item.hours}h
                          </span>
                          <button
                            onClick={() => updateHours(item.id, item.hours + 1)}
                            className="px-3 py-1.5 hover:bg-black/5 transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="text-sm font-medium">
                          €{(item.pricePerHour * item.hours).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-8 py-6 border-t border-black/10">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-sm text-black/50 tracking-widest uppercase">
                      Total
                    </span>
                    <span className="font-display text-2xl font-light">
                      €{cartTotal.toLocaleString()}
                    </span>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="block w-full bg-black text-white text-center py-4 text-sm tracking-widest uppercase hover:bg-black/80 transition-colors"
                  >
                    Proceed to Checkout
                  </Link>
                  <button
                    onClick={closeCart}
                    className="w-full text-center mt-3 text-xs text-black/40 hover:text-black/70 transition-colors tracking-widest uppercase py-2"
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
