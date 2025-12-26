"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Ruler, Info } from "lucide-react";

const sneakerSizes = [
  { br: "34", us: "3", uk: "2.5", eu: "35", cm: "22" },
  { br: "35", us: "3.5", uk: "3", eu: "36", cm: "22.5" },
  { br: "36", us: "4", uk: "3.5", eu: "36.5", cm: "23" },
  { br: "37", us: "5", uk: "4.5", eu: "37.5", cm: "23.5" },
  { br: "38", us: "6", uk: "5.5", eu: "38.5", cm: "24" },
  { br: "39", us: "7", uk: "6", eu: "40", cm: "25" },
  { br: "40", us: "8", uk: "7", eu: "41", cm: "26" },
  { br: "41", us: "9", uk: "8", eu: "42", cm: "27" },
  { br: "42", us: "10", uk: "9", eu: "43", cm: "27.5" },
  { br: "43", us: "11", uk: "10", eu: "44", cm: "28" },
  { br: "44", us: "12", uk: "11", eu: "45", cm: "29" },
  { br: "45", us: "13", uk: "12", eu: "46", cm: "30" },
];

const clothingSizes = [
  { size: "P", chest: "88-96", waist: "72-80", hips: "88-96" },
  { size: "M", chest: "96-104", waist: "80-88", hips: "96-104" },
  { size: "G", chest: "104-112", waist: "88-96", hips: "104-112" },
  { size: "GG", chest: "112-120", waist: "96-104", hips: "112-120" },
  { size: "XG", chest: "120-128", waist: "104-112", hips: "120-128" },
];

const hatSizes = [
  { size: "7", cm: "55.8" },
  { size: "7 1/8", cm: "56.8" },
  { size: "7 1/4", cm: "57.7" },
  { size: "7 3/8", cm: "58.7" },
  { size: "7 1/2", cm: "59.6" },
  { size: "7 5/8", cm: "60.6" },
  { size: "7 3/4", cm: "61.5" },
  { size: "8", cm: "63.5" },
];

export default function SizeGuidePage() {
  const [activeTab, setActiveTab] = useState<"sneakers" | "clothing" | "hats">("sneakers");

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
              <Ruler size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Guia de Tamanhos</h1>
            <p className="text-gray-400">
              Encontre o tamanho perfeito para voce
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 p-1 bg-gray-100 rounded-full w-fit mx-auto">
          {[
            { id: "sneakers", label: "Tenis" },
            { id: "clothing", label: "Roupas" },
            { id: "hats", label: "Bones" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-black text-white"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Sneakers Size Chart */}
        {activeTab === "sneakers" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Tabela de Tamanhos - Tenis</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-black text-white">
                    <th className="px-4 py-3 text-left font-bold">BR</th>
                    <th className="px-4 py-3 text-left font-bold">US</th>
                    <th className="px-4 py-3 text-left font-bold">UK</th>
                    <th className="px-4 py-3 text-left font-bold">EU</th>
                    <th className="px-4 py-3 text-left font-bold">CM</th>
                  </tr>
                </thead>
                <tbody>
                  {sneakerSizes.map((size, index) => (
                    <tr
                      key={size.br}
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } border-b border-gray-100`}
                    >
                      <td className="px-4 py-3 font-medium">{size.br}</td>
                      <td className="px-4 py-3 text-gray-600">{size.us}</td>
                      <td className="px-4 py-3 text-gray-600">{size.uk}</td>
                      <td className="px-4 py-3 text-gray-600">{size.eu}</td>
                      <td className="px-4 py-3 text-gray-600">{size.cm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* How to Measure */}
            <div className="mt-8 bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Info size={20} />
                Como Medir seu Pe
              </h3>
              <ol className="space-y-3 text-gray-600">
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <span>Coloque uma folha de papel no chao, encostada na parede.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <span>Fique em pe sobre o papel com o calcanhar encostado na parede.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <span>Marque a ponta do seu dedo mais longo no papel.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                  <span>Meca a distancia da parede ate a marca em centimetros.</span>
                </li>
              </ol>
            </div>
          </motion.div>
        )}

        {/* Clothing Size Chart */}
        {activeTab === "clothing" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Tabela de Tamanhos - Roupas</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-black text-white">
                    <th className="px-4 py-3 text-left font-bold">Tamanho</th>
                    <th className="px-4 py-3 text-left font-bold">Peito (cm)</th>
                    <th className="px-4 py-3 text-left font-bold">Cintura (cm)</th>
                    <th className="px-4 py-3 text-left font-bold">Quadril (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  {clothingSizes.map((size, index) => (
                    <tr
                      key={size.size}
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } border-b border-gray-100`}
                    >
                      <td className="px-4 py-3 font-medium">{size.size}</td>
                      <td className="px-4 py-3 text-gray-600">{size.chest}</td>
                      <td className="px-4 py-3 text-gray-600">{size.waist}</td>
                      <td className="px-4 py-3 text-gray-600">{size.hips}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* How to Measure */}
            <div className="mt-8 bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Info size={20} />
                Como Tirar suas Medidas
              </h3>
              <div className="grid gap-4 text-gray-600">
                <div>
                  <span className="font-medium text-black">Peito:</span> Meca ao redor da parte mais larga do peito, mantendo a fita reta nas costas.
                </div>
                <div>
                  <span className="font-medium text-black">Cintura:</span> Meca ao redor da parte mais fina da cintura, geralmente acima do umbigo.
                </div>
                <div>
                  <span className="font-medium text-black">Quadril:</span> Meca ao redor da parte mais larga do quadril.
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Hat Size Chart */}
        {activeTab === "hats" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Tabela de Tamanhos - Bones</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-black text-white">
                    <th className="px-4 py-3 text-left font-bold">Tamanho (US)</th>
                    <th className="px-4 py-3 text-left font-bold">Circunferencia (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  {hatSizes.map((size, index) => (
                    <tr
                      key={size.size}
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } border-b border-gray-100`}
                    >
                      <td className="px-4 py-3 font-medium">{size.size}</td>
                      <td className="px-4 py-3 text-gray-600">{size.cm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* How to Measure */}
            <div className="mt-8 bg-gray-50 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Info size={20} />
                Como Medir sua Cabeca
              </h3>
              <ol className="space-y-3 text-gray-600">
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                  <span>Use uma fita metrica flexivel ou um barbante.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                  <span>Posicione a fita ao redor da cabeca, aproximadamente 1cm acima das sobrancelhas.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                  <span>Mantenha a fita nivelada ao redor de toda a cabeca.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                  <span>Anote a medida em centimetros e consulte a tabela acima.</span>
                </li>
              </ol>
            </div>
          </motion.div>
        )}

        {/* Help Section */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Ainda tem duvidas sobre o tamanho ideal?</p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-colors"
          >
            Fale com nossa equipe
          </Link>
        </div>
      </div>
    </div>
  );
}
