"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Heart, MessageCircle } from "lucide-react";

// Instagram feed for @kitraro416
// Using actual product images from the store
const instagramPosts = [
  {
    id: "1",
    image: "https://cdn.shopify.com/s/files/1/0966/5236/2018/files/9FB083E7-B901-4B93-A3CE-FAC32962047C.jpg?v=1759206150",
    likes: 847,
    comments: 42,
    caption: "BAPE AAPE Jacket",
  },
  {
    id: "2",
    image: "https://cdn.shopify.com/s/files/1/0966/5236/2018/files/327D5635-E750-4D54-8017-4D4A2E1A7859.jpg?v=1765828352",
    likes: 1523,
    comments: 98,
    caption: "Jordan 1 Shattered Backboard",
  },
  {
    id: "3",
    image: "https://cdn.shopify.com/s/files/1/0966/5236/2018/files/78B1C56A-8F1E-4870-96B8-CCF83C57CF1C.jpg?v=1765829459",
    likes: 2156,
    comments: 167,
    caption: "Vales Lives Forever Speed Bling",
  },
  {
    id: "4",
    image: "https://cdn.shopify.com/s/files/1/0966/5236/2018/files/AD489DD0-D708-42D9-A2B2-CFD737519886.jpg?v=1759206388",
    likes: 934,
    comments: 51,
    caption: "BAPE Camo Jacket",
  },
  {
    id: "5",
    image: "https://cdn.shopify.com/s/files/1/0966/5236/2018/files/PHOTO-2025-10-04-12-01-11_1.jpg?v=1763667524",
    likes: 1287,
    comments: 73,
    caption: "New Era Yankees Fitted",
  },
  {
    id: "6",
    image: "https://cdn.shopify.com/s/files/1/0966/5236/2018/files/72588632-83A5-4AC1-BE62-55B82D8C5B81.jpg?v=1760712548",
    likes: 1845,
    comments: 112,
    caption: "Nike Dunk Low",
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
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
              href="https://www.instagram.com/kitraro416/"
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
            href="https://www.instagram.com/kitraro416/"
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
