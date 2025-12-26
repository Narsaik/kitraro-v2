"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Heart, MessageCircle } from "lucide-react";

// Instagram feed for @kitraro416
// BAPE, Supreme, and streetwear focused images
const instagramPosts = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1578681994506-b8f463449011?w=600",
    likes: 1247,
    comments: 89,
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600",
    likes: 2341,
    comments: 156,
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600",
    likes: 1893,
    comments: 102,
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600",
    likes: 3215,
    comments: 234,
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600",
    likes: 987,
    comments: 67,
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=600",
    likes: 1567,
    comments: 98,
  },
];

export function InstagramFeed() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Instagram size={28} className="text-[#d4af37]" />
            <span className="text-lg font-medium text-gray-600">@kitraro416</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Siga-nos no Instagram
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            Acompanhe os ultimos lancamentos, bastidores e inspiracoes de streetwear
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
          {instagramPosts.map((post, index) => (
            <motion.a
              key={post.id}
              href="https://instagram.com/kitraro416"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-square overflow-hidden rounded-xl"
            >
              <Image
                src={post.image}
                alt="Instagram post"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex items-center gap-4 text-white">
                  <div className="flex items-center gap-1">
                    <Heart size={18} className="fill-white" />
                    <span className="text-sm font-medium">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle size={18} />
                    <span className="text-sm font-medium">{post.comments}</span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <a
            href="https://instagram.com/kitraro"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-bold rounded-full hover:shadow-lg transition-shadow"
          >
            <Instagram size={20} />
            Seguir no Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
}
