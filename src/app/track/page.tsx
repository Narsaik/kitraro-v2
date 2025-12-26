"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Package, Search, Truck, CheckCircle, Clock, MapPin, AlertCircle } from "lucide-react";

interface TrackingResult {
  orderNumber: string;
  status: "processing" | "shipped" | "in_transit" | "delivered";
  estimatedDelivery: string;
  events: Array<{
    date: string;
    time: string;
    location: string;
    description: string;
    status: string;
  }>;
}

// Mock tracking data for demonstration
const mockTrackingData: Record<string, TrackingResult> = {
  "KR123456": {
    orderNumber: "KR123456",
    status: "in_transit",
    estimatedDelivery: "25/12/2024",
    events: [
      {
        date: "21/12/2024",
        time: "14:30",
        location: "Sao Paulo, SP",
        description: "Objeto em transito - por favor aguarde",
        status: "in_transit",
      },
      {
        date: "20/12/2024",
        time: "09:15",
        location: "Osasco, SP",
        description: "Objeto postado",
        status: "shipped",
      },
      {
        date: "19/12/2024",
        time: "16:45",
        location: "Kit Raro",
        description: "Pedido em preparacao",
        status: "processing",
      },
    ],
  },
};

const statusConfig = {
  processing: { label: "Preparando", icon: Clock, color: "text-yellow-600", bg: "bg-yellow-100" },
  shipped: { label: "Enviado", icon: Package, color: "text-blue-600", bg: "bg-blue-100" },
  in_transit: { label: "Em Transito", icon: Truck, color: "text-purple-600", bg: "bg-purple-100" },
  delivered: { label: "Entregue", icon: CheckCircle, color: "text-green-600", bg: "bg-green-100" },
};

export default function TrackPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [tracking, setTracking] = useState<TrackingResult | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setTracking(null);
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const result = mockTrackingData[orderNumber.toUpperCase()];
    if (result) {
      setTracking(result);
    } else {
      setError("Pedido nao encontrado. Verifique o numero e tente novamente.");
    }
    setIsLoading(false);
  };

  const StatusIcon = tracking ? statusConfig[tracking.status].icon : Package;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Truck size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Rastrear Pedido</h1>
            <p className="text-gray-400">
              Acompanhe sua encomenda em tempo real
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleTrack}
          className="mb-12"
        >
          <label htmlFor="orderNumber" className="block text-sm font-medium mb-2">
            Numero do Pedido
          </label>
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                id="orderNumber"
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="Ex: KR123456"
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-lg"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Search size={20} />
                  Rastrear
                </>
              )}
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            O numero do pedido foi enviado por e-mail apos a confirmacao da compra.
          </p>
        </motion.form>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-50 border border-red-200 rounded-xl mb-8 flex items-center gap-3"
          >
            <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
            <p className="text-red-700">{error}</p>
          </motion.div>
        )}

        {/* Tracking Result */}
        {tracking && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Status Card */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 ${statusConfig[tracking.status].bg} rounded-full flex items-center justify-center`}>
                  <StatusIcon size={28} className={statusConfig[tracking.status].color} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status do Pedido</p>
                  <p className={`text-xl font-bold ${statusConfig[tracking.status].color}`}>
                    {statusConfig[tracking.status].label}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl">
                  <p className="text-sm text-gray-500">Numero do Pedido</p>
                  <p className="font-bold">{tracking.orderNumber}</p>
                </div>
                <div className="bg-white p-4 rounded-xl">
                  <p className="text-sm text-gray-500">Previsao de Entrega</p>
                  <p className="font-bold">{tracking.estimatedDelivery}</p>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                {Object.entries(statusConfig).map(([key, config], index) => {
                  const statusOrder = ["processing", "shipped", "in_transit", "delivered"];
                  const currentIndex = statusOrder.indexOf(tracking.status);
                  const isActive = index <= currentIndex;
                  const Icon = config.icon;

                  return (
                    <div key={key} className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isActive ? "bg-black text-white" : "bg-gray-200 text-gray-400"
                        }`}
                      >
                        <Icon size={20} />
                      </div>
                      <span className={`text-xs mt-2 ${isActive ? "text-black font-medium" : "text-gray-400"}`}>
                        {config.label}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="h-1 bg-gray-200 rounded-full mt-4">
                <div
                  className="h-full bg-black rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      (["processing", "shipped", "in_transit", "delivered"].indexOf(tracking.status) + 1) * 25
                    }%`,
                  }}
                />
              </div>
            </div>

            {/* Timeline */}
            <div className="border rounded-2xl overflow-hidden">
              <div className="bg-black text-white px-6 py-4">
                <h3 className="font-bold">Historico de Atualizacoes</h3>
              </div>
              <div className="divide-y">
                {tracking.events.map((event, index) => (
                  <div key={index} className="p-6 flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${index === 0 ? "bg-black" : "bg-gray-300"}`} />
                      {index < tracking.events.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-200 mt-2" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <p className="font-medium">{event.description}</p>
                        <span className="text-sm text-gray-500">
                          {event.date} - {event.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <MapPin size={14} />
                        {event.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Help Section */}
        <div className="mt-12 bg-gray-50 rounded-2xl p-8 text-center">
          <h3 className="font-bold text-lg mb-2">Precisa de ajuda?</h3>
          <p className="text-gray-600 mb-6">
            Se tiver problemas com seu pedido, entre em contato conosco.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-6 py-3 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-colors"
            >
              Fale Conosco
            </Link>
            <Link
              href="/faq"
              className="px-6 py-3 bg-white text-black font-bold rounded-full border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              Ver FAQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
