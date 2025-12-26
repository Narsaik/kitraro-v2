"use client";

interface PaymentIconsProps {
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export function PaymentIcons({ size = "md", showLabel = false, className = "" }: PaymentIconsProps) {
  const sizeClasses = {
    sm: "h-5",
    md: "h-6",
    lg: "h-8",
  };

  const iconSize = sizeClasses[size];

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      {showLabel && (
        <p className="text-xs text-gray-500 uppercase tracking-wider">Formas de Pagamento</p>
      )}
      <div className="flex items-center gap-3 flex-wrap justify-center">
        {/* Visa */}
        <svg className={`${iconSize} w-auto`} viewBox="0 0 50 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="50" height="16" rx="2" fill="#1A1F71"/>
          <path d="M19.5 11.5L21.2 4.5H23.5L21.8 11.5H19.5Z" fill="white"/>
          <path d="M28.8 4.7C28.3 4.5 27.5 4.3 26.5 4.3C24.2 4.3 22.6 5.5 22.6 7.1C22.6 8.3 23.7 9 24.5 9.4C25.4 9.8 25.7 10.1 25.7 10.5C25.7 11.1 25 11.4 24.3 11.4C23.3 11.4 22.8 11.3 22 10.9L21.7 10.8L21.4 12.5C22 12.8 23 13 24.1 13C26.5 13 28.1 11.8 28.1 10.1C28.1 9.1 27.5 8.4 26.3 7.8C25.5 7.4 25.1 7.1 25.1 6.7C25.1 6.3 25.5 5.9 26.5 5.9C27.3 5.9 27.9 6.1 28.3 6.2L28.5 6.3L28.8 4.7Z" fill="white"/>
          <path d="M33.5 4.5C33 4.5 32.6 4.7 32.4 5.2L29 11.5H31.4L31.9 10.1H34.8L35.1 11.5H37.2L35.4 4.5H33.5ZM32.5 8.5C32.7 8 33.5 6 33.5 6C33.5 6 33.7 5.5 33.8 5.2L34 6C34 6 34.5 8.2 34.6 8.5H32.5Z" fill="white"/>
          <path d="M18.5 4.5L16.2 9.3L16 8.3C15.5 6.8 14.1 5.2 12.5 4.5L14.6 11.5H17L20.8 4.5H18.5Z" fill="white"/>
          <path d="M14.5 4.5H11L11 4.7C13.8 5.4 15.7 7.3 16 8.3L15.3 5.2C15.2 4.7 14.8 4.5 14.5 4.5Z" fill="#F9A533"/>
        </svg>

        {/* Mastercard */}
        <svg className={`${iconSize} w-auto`} viewBox="0 0 50 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="50" height="16" rx="2" fill="#000"/>
          <circle cx="20" cy="8" r="5" fill="#EB001B"/>
          <circle cx="30" cy="8" r="5" fill="#F79E1B"/>
          <path d="M25 4.17C26.27 5.17 27.08 6.7 27.08 8.42C27.08 10.14 26.27 11.67 25 12.67C23.73 11.67 22.92 10.14 22.92 8.42C22.92 6.7 23.73 5.17 25 4.17Z" fill="#FF5F00"/>
        </svg>

        {/* PIX */}
        <div className={`${iconSize} px-2 bg-[#32BCAD] rounded flex items-center justify-center`}>
          <svg className="h-4 w-auto" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.87 12.5L12.5 16.87C12.11 17.26 11.47 17.26 11.08 16.87L6.71 12.5C6.32 12.11 6.32 11.47 6.71 11.08L11.08 6.71C11.47 6.32 12.11 6.32 12.5 6.71L16.87 11.08C17.26 11.47 17.26 12.11 16.87 12.5Z"/>
            <path d="M19.5 9.5L14.5 4.5M19.5 14.5L14.5 19.5M4.5 9.5L9.5 4.5M4.5 14.5L9.5 19.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span className="text-white text-xs font-bold ml-1">PIX</span>
        </div>

        {/* Boleto */}
        <div className={`${iconSize} px-2 bg-gray-700 rounded flex items-center justify-center`}>
          <svg className="h-4 w-auto" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="4" width="2" height="16" rx="0.5"/>
            <rect x="6" y="4" width="1" height="16" rx="0.5"/>
            <rect x="8" y="4" width="2" height="16" rx="0.5"/>
            <rect x="11" y="4" width="1" height="16" rx="0.5"/>
            <rect x="13" y="4" width="2" height="16" rx="0.5"/>
            <rect x="16" y="4" width="1" height="16" rx="0.5"/>
            <rect x="18" y="4" width="3" height="16" rx="0.5"/>
          </svg>
          <span className="text-white text-xs font-bold ml-1">Boleto</span>
        </div>

        {/* American Express */}
        <svg className={`${iconSize} w-auto`} viewBox="0 0 50 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="50" height="16" rx="2" fill="#006FCF"/>
          <path d="M8 11L6 5H8L9 8.5L10 5H12L10 11H8Z" fill="white"/>
          <path d="M13 5H17V6.5H15V7.2H17V8.7H15V9.5H17V11H13V5Z" fill="white"/>
          <path d="M18 5H21C22 5 23 5.8 23 7C23 7.8 22.5 8.4 22 8.6L23.5 11H21L19.8 8.8H20V11H18V5ZM20 7.5H20.5C21 7.5 21 7 21 7C21 6.5 20.8 6.5 20.5 6.5H20V7.5Z" fill="white"/>
          <path d="M24 5H26V11H24V5Z" fill="white"/>
          <path d="M27 8C27 6.3 28.3 5 30 5C30.8 5 31.5 5.3 32 5.7L31 7C30.7 6.7 30.4 6.5 30 6.5C29.2 6.5 28.5 7.2 28.5 8C28.5 8.8 29.2 9.5 30 9.5C30.4 9.5 30.7 9.3 31 9L32 10.3C31.5 10.7 30.8 11 30 11C28.3 11 27 9.7 27 8Z" fill="white"/>
          <path d="M36 11L34 5H36L37 8.5L38 5H40L38 11H36Z" fill="white"/>
          <path d="M41 5H43L45 11H43L42.5 9.5H41.5L41 11H39L41 5ZM42 7L41.7 8.2H42.3L42 7Z" fill="white"/>
        </svg>
      </div>
    </div>
  );
}
