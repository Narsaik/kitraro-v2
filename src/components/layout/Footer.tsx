"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { PaymentIcons } from "@/components/ui/PaymentIcons";

const footerLinks = {
  shop: [
    { name: "Novidades", href: "/collections/new-arrivals" },
    { name: "Tênis", href: "/collections/tenis" },
    { name: "Bonés", href: "/collections/bones" },
    { name: "Roupas", href: "/collections/roupas" },
    { name: "Promoção", href: "/collections/promocao" },
  ],
  brands: [
    { name: "Nike", href: "/brands/nike" },
    { name: "BAPE", href: "/brands/bape" },
    { name: "New Era", href: "/brands/new-era" },
    { name: "The North Face", href: "/brands/the-north-face" },
    { name: "Air Jordan", href: "/brands/air-jordan" },
  ],
  help: [
    { name: "Contato", href: "/contact" },
    { name: "FAQ", href: "/faq" },
    { name: "Trocas e Devoluções", href: "/returns" },
    { name: "Rastrear Pedido", href: "/track" },
    { name: "Guia de Tamanhos", href: "/size-guide" },
  ],
  legal: [
    { name: "Termos de Uso", href: "/terms" },
    { name: "Política de Privacidade", href: "/privacy" },
  ],
};

export function Footer() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  return (
    <footer className="bg-[#0a2e0a] text-white">
      {/* Newsletter - Hidden on homepage */}
      {!isHomepage && (
        <div className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-2">Junte-se ao Kit Raro</h3>
              <p className="text-white/70 mb-6">
                Receba novidades, drops exclusivos e 10% off na primeira compra.
              </p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="flex-1 px-4 py-3 bg-white/10 rounded-full text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#d4af37] border border-white/20"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#d4af37] hover:bg-[#b8960c] text-black font-bold rounded-full transition-colors"
                >
                  Inscrever
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold mb-4 text-[#d4af37]">Loja</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-[#d4af37]">Marcas</h4>
            <ul className="space-y-2">
              {footerLinks.brands.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-[#d4af37]">Ajuda</h4>
            <ul className="space-y-2">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-[#d4af37]">Siga-nos</h4>
            <div className="flex gap-4 mb-6">
              <a
                href="https://instagram.com/kitraro416"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#d4af37] rounded-full flex items-center justify-center hover:bg-[#f0d77c] transition-colors text-black"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com/kitraro416"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#d4af37] rounded-full flex items-center justify-center hover:bg-[#f0d77c] transition-colors text-black"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com/kitraro416"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#d4af37] rounded-full flex items-center justify-center hover:bg-[#f0d77c] transition-colors text-black"
              >
                <Twitter size={20} />
              </a>
            </div>
            <div className="text-white/70 text-sm">
              <p>Atendimento:</p>
              <p className="text-[#d4af37]">contato@kitraro.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 bg-[#051a05]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              {/* Kitraro Logo */}
              <Link href="/" className="flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="Kitraro"
                  width={120}
                  height={40}
                  className="h-10 w-auto object-contain brightness-0 invert"
                />
              </Link>
              <span className="text-white/60 text-sm">
                © {new Date().getFullYear()} Kitraro. Todos os direitos reservados.
              </span>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <PaymentIcons size="sm" />
              <div className="flex gap-4 text-sm text-white/60">
                {footerLinks.legal.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
