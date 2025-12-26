"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatPrice, cn } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag size={64} className="mx-auto text-gray-300 mb-6" />
          <h1 className="text-2xl font-bold mb-4">Seu carrinho esta vazio</h1>
          <p className="text-gray-500 mb-8">
            Adicione alguns produtos para comecar a comprar.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-colors"
          >
            Continuar Comprando
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Carrinho</h1>
          <p className="text-gray-400 mt-2">
            {items.length} {items.length === 1 ? "item" : "itens"}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.variant.id}`}
                className="flex gap-6 p-6 bg-gray-50 rounded-2xl"
              >
                <div className="w-32 h-32 relative rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">
                        {item.product.brand}
                      </p>
                      <Link
                        href={`/products/${item.product.handle}`}
                        className="font-bold hover:text-gray-600 transition-colors"
                      >
                        {item.product.title}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">
                        Tamanho: {item.variant.title}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border rounded-full">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                        className="p-2 hover:bg-gray-100 rounded-l-full transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 font-medium">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-2 hover:bg-gray-100 rounded-r-full transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <span className="font-bold">
                      {formatPrice(item.variant.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-sm text-gray-500 hover:text-red-500 transition-colors"
            >
              Limpar carrinho
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Resumo do Pedido</h2>

              <div className="space-y-3 pb-6 border-b">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalPrice())}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Frete</span>
                  <span className={totalPrice() >= 500 ? "text-green-600" : ""}>
                    {totalPrice() >= 500 ? "Gratis" : "Calculado no checkout"}
                  </span>
                </div>
              </div>

              <div className="flex justify-between py-6 text-xl font-bold">
                <span>Total</span>
                <span>{formatPrice(totalPrice())}</span>
              </div>

              <button className="w-full py-4 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-colors">
                Finalizar Compra
              </button>

              <Link
                href="/"
                className="block text-center mt-4 text-sm text-gray-500 hover:text-black transition-colors"
              >
                Continuar Comprando
              </Link>

              {totalPrice() < 500 && (
                <p className="text-sm text-gray-500 mt-6 text-center">
                  Faltam <strong>{formatPrice(500 - totalPrice())}</strong> para frete gratis!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
