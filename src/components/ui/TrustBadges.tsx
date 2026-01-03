"use client";

import { Shield, Truck, RotateCcw, Lock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface TrustBadgesProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const badges = [
  {
    icon: Shield,
    title: "100% Autentico",
    subtitle: "Produtos originais",
  },
  {
    icon: Truck,
    title: "Frete Gratis",
    subtitle: "Acima de R$500",
  },
  {
    icon: RotateCcw,
    title: "Troca Gratis",
    subtitle: "Em 30 dias",
  },
  {
    icon: Lock,
    title: "Pagamento Seguro",
    subtitle: "SSL criptografado",
  },
];

export function TrustBadges({ variant = "light", size = "md", className = "" }: TrustBadgesProps) {
  const sizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const colorClasses = {
    light: {
      bg: "bg-gray-50",
      icon: "text-brand-green",
      title: "text-gray-900",
      subtitle: "text-gray-500",
    },
    dark: {
      bg: "bg-white/5",
      icon: "text-gold",
      title: "text-white",
      subtitle: "text-white/60",
    },
  };

  const colors = colorClasses[variant];

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      {badges.map((badge, index) => (
        <motion.div
          key={badge.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`flex items-center gap-3 p-4 rounded-xl ${colors.bg}`}
        >
          <div className={`${colors.icon}`}>
            <badge.icon size={iconSizes[size]} />
          </div>
          <div>
            <p className={`font-bold ${colors.title} ${sizeClasses[size]}`}>{badge.title}</p>
            <p className={`${colors.subtitle} text-xs`}>{badge.subtitle}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Compact inline version for product pages
export function TrustBadgesInline({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      <div className="flex items-center gap-1.5 text-sm text-gray-600">
        <CheckCircle size={16} className="text-green-500" />
        <span>100% Original</span>
      </div>
      <div className="flex items-center gap-1.5 text-sm text-gray-600">
        <Truck size={16} className="text-brand-green" />
        <span>Frete Gratis +R$500</span>
      </div>
      <div className="flex items-center gap-1.5 text-sm text-gray-600">
        <RotateCcw size={16} className="text-blue-500" />
        <span>Troca Gratis 30 dias</span>
      </div>
      <div className="flex items-center gap-1.5 text-sm text-gray-600">
        <Lock size={16} className="text-gold" />
        <span>Pagamento Seguro</span>
      </div>
    </div>
  );
}
