"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";

export default function AccountPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-md mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-8"
        >
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logo.png"
                alt="Kit Raro"
                width={140}
                height={45}
                className="h-12 w-auto object-contain mx-auto invert"
              />
            </Link>
            <h2 className="text-2xl font-bold">
              {isLogin ? "Entrar na conta" : "Criar conta"}
            </h2>
            <p className="text-gray-500 mt-2">
              {isLogin
                ? "Bem-vindo de volta! Entre para continuar."
                : "Crie sua conta para comecar a comprar."}
            </p>
          </div>

          <form className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Nome completo
                </label>
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    id="name"
                    type="text"
                    placeholder="Seu nome"
                    className="w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                E-mail
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  className="w-full pl-12 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <button type="button" className="text-sm text-gray-500 hover:text-black">
                  Esqueceu a senha?
                </button>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-colors"
            >
              {isLogin ? "Entrar" : "Criar conta"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500">
              {isLogin ? "Nao tem uma conta?" : "Ja tem uma conta?"}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="font-medium text-black hover:underline"
              >
                {isLogin ? "Criar conta" : "Entrar"}
              </button>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t text-center text-xs text-gray-400">
            Ao continuar, voce concorda com nossos{" "}
            <Link href="/termos" className="underline hover:text-black">
              Termos de Uso
            </Link>{" "}
            e{" "}
            <Link href="/politica-privacidade" className="underline hover:text-black">
              Politica de Privacidade
            </Link>
            .
          </div>
        </motion.div>
      </div>
    </div>
  );
}
