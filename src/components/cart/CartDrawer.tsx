"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Shield, Truck, Lock, Loader2 } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/utils";
import { PaymentIcons } from "@/components/ui/PaymentIcons";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, totalPrice } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const total = totalPrice();
  const freeShippingThreshold = 500;
  const remainingForFreeShipping = freeShippingThreshold - total;

  const handleCheckout = async () => {
    if (items.length === 0 || isCheckingOut) return;

    setIsCheckingOut(true);
    try {
      const lineItems = items.map((item) => ({
        variantId: item.variant.id,
        handle: item.product.handle, // Include handle for lookup
        variantTitle: item.variant.title,
        quantity: 1, // All items are 1of1
      }));

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: lineItems }),
      });

      const data = await response.json();

      if (data.success && data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        console.error('Checkout error:', data.error, data.message);
        alert('Erro ao criar checkout. Tente novamente.');
        setIsCheckingOut(false);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Erro ao criar checkout. Tente novamente.');
      setIsCheckingOut(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <ShoppingBag size={20} />
                Carrinho ({items.length})
              </h2>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Free shipping progress */}
            {items.length > 0 && (
              <div className="px-4 py-3 bg-gray-50 border-b">
                {remainingForFreeShipping > 0 ? (
                  <>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">
                        Faltam <strong className="text-black">{formatPrice(remainingForFreeShipping)}</strong> para frete gratis
                      </span>
                      <Truck size={16} className="text-gray-400" />
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((total / freeShippingThreshold) * 100, 100)}%` }}
                        className="h-full bg-green-500 rounded-full"
                      />
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-2 text-green-600">
                    <Truck size={18} />
                    <span className="font-medium">Parabens! Voce ganhou frete gratis!</span>
                  </div>
                )}
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <ShoppingBag size={48} className="text-gray-300 mb-4" />
                  <p className="text-gray-500 mb-4">Seu carrinho esta vazio</p>
                  <button
                    onClick={closeCart}
                    className="px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                  >
                    Continuar Comprando
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex gap-4 p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden relative flex-shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/products/${item.product.handle}`}
                          onClick={closeCart}
                          className="font-medium text-sm hover:underline line-clamp-2"
                        >
                          {item.product.title}
                        </Link>
                        <p className="text-gray-500 text-sm mt-1">
                          Tam: {item.variant.title}
                        </p>
                        <p className="font-bold mt-1">
                          {formatPrice(item.variant.price * item.quantity)}
                        </p>
                      </div>

                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X size={16} />
                        </button>

                        <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full border">
                          Peça única
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer with trust signals */}
            {items.length > 0 && (
              <div className="border-t bg-white">
                {/* Trust badges */}
                <div className="px-4 py-3 border-b bg-gray-50">
                  <div className="flex justify-center gap-6 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Shield size={14} className="text-green-600" />
                      <span>100% Autentico</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Lock size={14} className="text-green-600" />
                      <span>Compra Segura</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  {/* Subtotal */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-2xl font-bold">{formatPrice(total)}</span>
                  </div>

                  {/* PIX discount */}
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-green-600">5% OFF no PIX</span>
                    <span className="text-green-600 font-medium">{formatPrice(total * 0.95)}</span>
                  </div>

                  <p className="text-xs text-gray-500 text-center">
                    Frete e descontos calculados no checkout
                  </p>

                  {/* Main CTA */}
                  <button
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full py-4 bg-black text-white rounded-full font-bold text-lg hover:bg-gray-800 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isCheckingOut ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Processando...
                      </>
                    ) : (
                      'Finalizar Compra'
                    )}
                  </button>

                  {/* Payment methods */}
                  <PaymentIcons size="sm" showLabel className="pt-2" />

                  <button
                    onClick={closeCart}
                    className="w-full py-3 text-center text-sm text-gray-600 hover:text-black transition-colors"
                  >
                    Continuar Comprando
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
