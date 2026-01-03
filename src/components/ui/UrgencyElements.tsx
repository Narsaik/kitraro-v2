"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Eye, AlertTriangle, Flame } from "lucide-react";

// Countdown Timer Component
interface CountdownProps {
  endDate?: Date;
  hoursRemaining?: number;
  label?: string;
  variant?: "light" | "dark" | "gold";
  size?: "sm" | "md" | "lg";
}

export function CountdownTimer({
  endDate,
  hoursRemaining = 24,
  label = "Oferta termina em:",
  variant = "dark",
  size = "md"
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = endDate || new Date(Date.now() + hoursRemaining * 60 * 60 * 1000);

    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - Date.now();
      if (difference > 0) {
        return {
          hours: Math.floor(difference / (1000 * 60 * 60)),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return { hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, [endDate, hoursRemaining]);

  const variantClasses = {
    light: "bg-gray-100 text-gray-900",
    dark: "bg-black text-white",
    gold: "bg-gold text-black",
  };

  const sizeClasses = {
    sm: "text-lg px-2 py-1",
    md: "text-2xl px-3 py-2",
    lg: "text-4xl px-4 py-3",
  };

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="flex flex-col items-center gap-2">
      {label && (
        <div className="flex items-center gap-2 text-sm font-medium">
          <Clock size={16} className="text-gold" />
          <span>{label}</span>
        </div>
      )}
      <div className="flex items-center gap-2">
        <motion.div
          key={timeLeft.hours}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          className={`${variantClasses[variant]} ${sizeClasses[size]} rounded-lg font-mono font-bold`}
        >
          {pad(timeLeft.hours)}
        </motion.div>
        <span className="text-xl font-bold">:</span>
        <motion.div
          key={timeLeft.minutes}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          className={`${variantClasses[variant]} ${sizeClasses[size]} rounded-lg font-mono font-bold`}
        >
          {pad(timeLeft.minutes)}
        </motion.div>
        <span className="text-xl font-bold">:</span>
        <motion.div
          key={timeLeft.seconds}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          className={`${variantClasses[variant]} ${sizeClasses[size]} rounded-lg font-mono font-bold`}
        >
          {pad(timeLeft.seconds)}
        </motion.div>
      </div>
    </div>
  );
}

// Low Stock Warning
interface StockWarningProps {
  quantity?: number;
  threshold?: number;
  className?: string;
}

export function StockWarning({ quantity = 3, threshold = 5, className = "" }: StockWarningProps) {
  if (quantity > threshold) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`flex items-center gap-2 text-sm ${className}`}
    >
      <AlertTriangle size={16} className="text-orange-500" />
      <span className="text-orange-600 font-medium">
        {quantity === 1 ? "Ultima unidade!" : `Apenas ${quantity} em estoque!`}
      </span>
    </motion.div>
  );
}

// Live Viewers Counter (simulated for social proof)
interface LiveViewersProps {
  baseCount?: number;
  variance?: number;
  className?: string;
}

export function LiveViewers({ baseCount = 12, variance = 5, className = "" }: LiveViewersProps) {
  const [viewers, setViewers] = useState(baseCount);

  useEffect(() => {
    const interval = setInterval(() => {
      const change = Math.floor(Math.random() * variance) - Math.floor(variance / 2);
      setViewers(prev => Math.max(baseCount - variance, prev + change));
    }, 5000);
    return () => clearInterval(interval);
  }, [baseCount, variance]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex items-center gap-2 text-sm ${className}`}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </span>
      <Eye size={14} className="text-gray-500" />
      <span className="text-gray-600">
        <strong>{viewers}</strong> pessoas visualizando agora
      </span>
    </motion.div>
  );
}

// Hot Product Badge
export function HotBadge({ className = "" }: { className?: string }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`inline-flex items-center gap-1 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full ${className}`}
    >
      <Flame size={12} />
      HOT
    </motion.div>
  );
}

// Selling Fast Badge
export function SellingFastBadge({ soldCount = 47, className = "" }: { soldCount?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-2 text-sm ${className}`}
    >
      <Flame size={16} className="text-orange-500" />
      <span className="text-gray-700">
        <strong className="text-orange-600">{soldCount}</strong> vendidos nas ultimas 24h
      </span>
    </motion.div>
  );
}
