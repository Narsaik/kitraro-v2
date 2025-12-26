import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <Loader2 size={48} className="animate-spin text-[#0a2e0a] mx-auto mb-4" />
        <p className="text-gray-500 font-medium">Carregando...</p>
      </div>
    </div>
  );
}
