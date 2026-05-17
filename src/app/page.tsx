"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Instagram,
  ChevronDown,
  Star,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  Phone,
  MapPin,
  Mail,
} from "lucide-react";

const WHATSAPP_NUMBER = "2348039666787";
const INSTAGRAM_HANDLE = "poshpavilion";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  tag?: string;
  rating: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Rosé Elegance Strappy Sandal",
    price: 3499,
    originalPrice: 4999,
    image: "/products/sandal-1.png",
    tag: "Bestseller",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Golden Hour Block Heel",
    price: 4299,
    image: "/products/sandal-2.png",
    tag: "New Arrival",
    rating: 4.9,
  },
  {
    id: 3,
    name: "Blossom Flat Sandal",
    price: 2799,
    originalPrice: 3499,
    image: "/products/sandal-3.png",
    tag: "Sale",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Nude Luxe Block Heel",
    price: 4599,
    image: "/products/sandal-4.png",
    rating: 4.8,
  },
  {
    id: 5,
    name: "Metallic Dream Sandal",
    price: 3899,
    originalPrice: 5299,
    image: "/products/sandal-5.png",
    tag: "Limited Edition",
    rating: 5.0,
  },
  {
    id: 6,
    name: "Blush Wedge Comfort",
    price: 3199,
    image: "/products/sandal-6.png",
    tag: "Trending",
    rating: 4.6,
  },
];

function getWhatsAppLink(productName: string) {
  const message = encodeURIComponent(
    `Hi, I want to order this sandal from Poshpavilion: ${productName}`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set());

  const toggleLike = (id: number) => {
    setLikedProducts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-blush/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-gold to-warm-gold flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-xl md:text-2xl font-bold tracking-tight text-deep-rose">
                Posh<span className="text-warm-gold">pavilion</span>
              </span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#home"
                className="text-sm font-medium text-foreground/70 hover:text-deep-rose transition-colors"
              >
                Home
              </a>
              <a
                href="#products"
                className="text-sm font-medium text-foreground/70 hover:text-deep-rose transition-colors"
              >
                Collection
              </a>
              <a
                href="#about"
                className="text-sm font-medium text-foreground/70 hover:text-deep-rose transition-colors"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-sm font-medium text-foreground/70 hover:text-deep-rose transition-colors"
              >
                Contact
              </a>
              <Button
                asChild
                className="bg-deep-rose hover:bg-deep-rose/90 text-white rounded-full px-6"
              >
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    "Hi, I'd like to know more about Poshpavilion sandals!"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Shop Now
                </a>
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-soft-pink/50 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-deep-rose" />
              ) : (
                <Menu className="w-6 h-6 text-deep-rose" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 backdrop-blur-md border-t border-blush/20 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-3">
                {[
                  { href: "#home", label: "Home" },
                  { href: "#products", label: "Collection" },
                  { href: "#about", label: "About" },
                  { href: "#contact", label: "Contact" },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 px-4 rounded-lg text-foreground/80 hover:bg-soft-pink/30 hover:text-deep-rose font-medium transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
                <Button
                  asChild
                  className="w-full bg-deep-rose hover:bg-deep-rose/90 text-white rounded-full"
                >
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      "Hi, I'd like to know more about Poshpavilion sandals!"
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Shop on WhatsApp
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-1">
        {/* Hero Section */}
        <section
          id="home"
          className="relative overflow-hidden bg-gradient-to-br from-soft-pink via-cream to-champagne"
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-blush/20 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-champagne/30 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-soft-pink/10 blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left content */}
              <motion.div
                className="text-center lg:text-left"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Badge className="mb-4 bg-warm-gold/10 text-warm-gold border-warm-gold/20 px-4 py-1.5 text-sm font-medium">
                    <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                    New Summer Collection 2025
                  </Badge>
                </motion.div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                  <span className="text-deep-rose">Stylish</span> &{" "}
                  <span className="text-deep-rose">Comfortable</span>
                  <br />
                  <span className="bg-gradient-to-r from-rose-gold to-warm-gold bg-clip-text text-transparent">
                    Women Sandals
                  </span>
                </h1>

                <p className="mt-6 text-base sm:text-lg text-foreground/60 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                  Step into elegance with Poshpavilion — where every pair is
                  designed to blend contemporary fashion with all-day comfort.
                  Discover sandals that make you feel confident, beautiful, and
                  effortlessly chic.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                  <Button
                    asChild
                    size="lg"
                    className="bg-deep-rose hover:bg-deep-rose/90 text-white rounded-full px-8 h-12 text-base shadow-lg shadow-deep-rose/20"
                  >
                    <a href="#products">
                      <ShoppingBag className="w-5 h-5 mr-2" />
                      Explore Collection
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="rounded-full px-8 h-12 text-base border-rose-gold/30 text-deep-rose hover:bg-soft-pink/50"
                  >
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                        "Hi, I'd like to know more about Poshpavilion sandals!"
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Order on WhatsApp
                    </a>
                  </Button>
                </div>

                {/* Trust badges */}
                <div className="mt-10 flex items-center gap-6 justify-center lg:justify-start text-sm text-foreground/50">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-warm-gold fill-warm-gold" />
                    <span>4.9 Rating</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-rose-gold fill-rose-gold" />
                    <span>2000+ Happy Customers</span>
                  </div>
                </div>
              </motion.div>

              {/* Right - Hero Image */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blush/40">
                  <img
                    src="/hero-banner.png"
                    alt="Poshpavilion Collection — Elegant women sandals"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-rose/10 to-transparent" />
                </div>

                {/* Floating badge */}
                <motion.div
                  className="absolute -bottom-4 -left-4 sm:bottom-4 sm:left-4 bg-white rounded-2xl p-3 shadow-xl border border-blush/20"
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "easeInOut",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">
                        Order via WhatsApp
                      </p>
                      <p className="text-xs text-foreground/50">Quick & Easy</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ChevronDown className="w-6 h-6 text-deep-rose/40" />
            </motion.div>
          </div>
        </section>

        {/* Features Strip */}
        <section className="bg-white border-y border-blush/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                {
                  icon: "🚚",
                  title: "Free Delivery",
                  desc: "On all orders",
                },
                {
                  icon: "✨",
                  title: "Premium Quality",
                  desc: "Genuine materials",
                },
                {
                  icon: "💬",
                  title: "WhatsApp Support",
                  desc: "Quick responses",
                },
                {
                  icon: "🔄",
                  title: "Easy Returns",
                  desc: "7-day policy",
                },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col items-center gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <span className="text-2xl">{feature.icon}</span>
                  <h3 className="font-semibold text-sm text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="py-16 md:py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <motion.div
              className="text-center mb-12"
              {...fadeInUp}
              viewport={{ once: true }}
              whileInView="animate"
              initial="initial"
            >
              <Badge
                variant="secondary"
                className="mb-4 bg-warm-gold/10 text-warm-gold border-warm-gold/20"
              >
                Our Collection
              </Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-deep-rose">
                Curated for <span className="text-warm-gold">You</span>
              </h2>
              <p className="mt-4 text-foreground/50 max-w-2xl mx-auto text-base md:text-lg">
                Each pair is thoughtfully designed to bring together fashion and
                comfort, so you never have to choose between the two.
              </p>
            </motion.div>

            {/* Product Grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
            >
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  variants={fadeInUp}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="group overflow-hidden border-blush/20 bg-white hover:shadow-xl hover:shadow-blush/20 transition-all duration-500 rounded-2xl py-0 gap-0">
                    {/* Product Image */}
                    <div className="relative aspect-square overflow-hidden bg-soft-pink/30">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />

                      {/* Tag */}
                      {product.tag && (
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-deep-rose text-white border-0 text-xs font-medium px-3 py-1 shadow-md">
                            {product.tag}
                          </Badge>
                        </div>
                      )}

                      {/* Like button */}
                      <button
                        onClick={() => toggleLike(product.id)}
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                        aria-label={`Like ${product.name}`}
                      >
                        <Heart
                          className={`w-4.5 h-4.5 transition-colors ${
                            likedProducts.has(product.id)
                              ? "text-rose-500 fill-rose-500"
                              : "text-foreground/30"
                          }`}
                        />
                      </button>

                      {/* Quick order overlay on hover */}
                      <div className="absolute inset-0 bg-deep-rose/0 group-hover:bg-deep-rose/5 transition-colors duration-500" />
                    </div>

                    <CardContent className="p-4 md:p-5 space-y-3">
                      {/* Rating */}
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < Math.floor(product.rating)
                                ? "text-warm-gold fill-warm-gold"
                                : "text-gray-200"
                            }`}
                          />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">
                          ({product.rating})
                        </span>
                      </div>

                      {/* Name */}
                      <h3 className="font-semibold text-foreground text-sm md:text-base leading-snug line-clamp-2">
                        {product.name}
                      </h3>

                      {/* Price */}
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-deep-rose">
                          Rs. {product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            Rs. {product.originalPrice.toLocaleString()}
                          </span>
                        )}
                        {product.originalPrice && (
                          <Badge
                            variant="secondary"
                            className="bg-green-50 text-green-600 border-green-100 text-xs"
                          >
                            {Math.round(
                              ((product.originalPrice - product.price) /
                                product.originalPrice) *
                                100
                            )}
                            % OFF
                          </Badge>
                        )}
                      </div>

                      {/* WhatsApp Order Button */}
                      <Button
                        asChild
                        className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl h-11 text-sm font-semibold shadow-md shadow-green-600/20 transition-all hover:shadow-lg hover:shadow-green-600/30"
                      >
                        <a
                          href={getWhatsAppLink(product.name)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Order on WhatsApp
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* View More CTA */}
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-8 border-deep-rose/20 text-deep-rose hover:bg-deep-rose hover:text-white transition-all"
              >
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    "Hi! I'd love to see more sandals from Poshpavilion's collection."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Full Collection
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 md:py-24 bg-white relative overflow-hidden">
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-soft-pink/20 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-champagne/20 blur-3xl pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Image side */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="relative rounded-3xl overflow-hidden shadow-xl">
                  <img
                    src="/products/sandal-5.png"
                    alt="Poshpavilion — Craftsmanship and style"
                    className="w-full aspect-[4/5] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-rose/20 to-transparent" />
                </div>

                {/* Stats card */}
                <motion.div
                  className="absolute -bottom-6 -right-4 sm:right-6 bg-white rounded-2xl p-4 shadow-xl border border-blush/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-warm-gold/10 flex items-center justify-center">
                      <Heart className="w-6 h-6 text-warm-gold" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-deep-rose">2000+</p>
                      <p className="text-xs text-muted-foreground">
                        Happy Customers
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Content side */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="space-y-6"
              >
                <Badge
                  variant="secondary"
                  className="bg-warm-gold/10 text-warm-gold border-warm-gold/20"
                >
                  Our Story
                </Badge>

                <h2 className="text-3xl md:text-4xl font-bold text-deep-rose leading-tight">
                  Where Fashion Meets{" "}
                  <span className="text-warm-gold">Comfort</span>
                </h2>

                <div className="space-y-4 text-foreground/60 leading-relaxed">
                  <p>
                    Poshpavilion was born from a simple belief — that women
                    should never have to choose between looking stylish and
                    feeling comfortable. Founded with a passion for modern
                    fashion and an unwavering commitment to quality, we craft
                    sandals that empower women to step confidently through every
                    moment of their day.
                  </p>
                  <p>
                    Every pair in our collection is thoughtfully designed using
                    premium materials, ensuring a perfect blend of elegance and
                    ease. From delicate strappy flats to statement block heels,
                    our sandals are made for the woman who values both aesthetics
                    and comfort — because she deserves nothing less.
                  </p>
                  <p>
                    Based in Pakistan, we are proud to bring you fashion-forward
                    footwear that celebrates femininity, supports local
                    craftsmanship, and delivers an experience that is as
                    delightful as our sandals feel on your feet.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4">
                  {[
                    { value: "50+", label: "Styles" },
                    { value: "100%", label: "Genuine Leather" },
                    { value: "4.9", label: "Avg. Rating" },
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <p className="text-2xl font-bold text-deep-rose">
                        {stat.value}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-soft-pink/30 to-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Badge
                variant="secondary"
                className="mb-4 bg-warm-gold/10 text-warm-gold border-warm-gold/20"
              >
                Love Letters
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-deep-rose">
                What Our Customers Say
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Ayesha K.",
                  text: "Absolutely love my Poshpavilion sandals! The comfort is unmatched and I get compliments every time I wear them. Ordering via WhatsApp was so easy!",
                  rating: 5,
                },
                {
                  name: "Sara M.",
                  text: "Best sandals I have ever owned. The quality is premium and they look even better in person. Already planning to order two more pairs!",
                  rating: 5,
                },
                {
                  name: "Fatima R.",
                  text: "I was skeptical about ordering online, but the team was so helpful on WhatsApp. The sandals arrived quickly and fit perfectly. Highly recommend!",
                  rating: 5,
                },
              ].map((review, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                >
                  <Card className="bg-white border-blush/20 rounded-2xl p-6 h-full">
                    <div className="flex gap-0.5 mb-4">
                      {[...Array(review.rating)].map((_, j) => (
                        <Star
                          key={j}
                          className="w-4 h-4 text-warm-gold fill-warm-gold"
                        />
                      ))}
                    </div>
                    <p className="text-foreground/60 text-sm leading-relaxed mb-4">
                      &ldquo;{review.text}&rdquo;
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-gold to-warm-gold flex items-center justify-center text-white font-semibold text-sm">
                        {review.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-foreground">
                          {review.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Verified Customer
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-24 bg-white relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-soft-pink/10 blur-3xl" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Badge
                variant="secondary"
                className="mb-4 bg-warm-gold/10 text-warm-gold border-warm-gold/20"
              >
                Get in Touch
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-deep-rose">
                We&apos;d Love to Hear from You
              </h2>
              <p className="mt-4 text-foreground/50 max-w-2xl mx-auto">
                Have a question about our collection, need help with sizing, or
                just want to say hello? Reach out to us anytime!
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* WhatsApp Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200/50 rounded-2xl p-6 text-center h-full">
                  <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/20">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Chat on WhatsApp
                  </h3>
                  <p className="text-foreground/50 text-sm mb-6 leading-relaxed">
                    Quick responses, easy ordering, and personal styling advice.
                    We are just a message away!
                  </p>
                  <Button
                    asChild
                    className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 shadow-lg shadow-green-600/20"
                  >
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                        "Hi Poshpavilion! I'd like to know more about your sandals."
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Open WhatsApp
                    </a>
                  </Button>
                </Card>
              </motion.div>

              {/* Instagram Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200/50 rounded-2xl p-6 text-center h-full">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-pink-500/20">
                    <Instagram className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Follow on Instagram
                  </h3>
                  <p className="text-foreground/50 text-sm mb-6 leading-relaxed">
                    Stay updated with our latest arrivals, styling tips, and
                    behind-the-scenes moments. Join our growing community!
                  </p>
                  <Button
                    asChild
                    className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:opacity-90 text-white rounded-full px-8 shadow-lg shadow-pink-500/20"
                  >
                    <a
                      href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram className="w-4 h-4 mr-2" />
                      Follow @poshpavilion
                    </a>
                  </Button>
                </Card>
              </motion.div>
            </div>

            {/* Additional contact info */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-foreground/40">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+234 803 966 6787</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>hello@poshpavilion.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Lahore, Pakistan</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-deep-rose to-rose-gold relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Ready to Find Your Perfect Pair?
              </h2>
              <p className="mt-4 text-white/70 text-base md:text-lg max-w-2xl mx-auto">
                Browse our collection and order directly on WhatsApp. It is fast,
                easy, and personal — just the way shopping should be.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-deep-rose hover:bg-white/90 rounded-full px-8 h-12 shadow-lg"
                >
                  <a href="#products">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Shop Now
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 rounded-full px-8 h-12"
                >
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      "Hi Poshpavilion! I want to place an order."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp Us
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-deep-rose text-white/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-gold to-warm-gold flex items-center justify-center">
                  <span className="text-white font-bold text-xs">P</span>
                </div>
                <span className="text-lg font-bold text-white">
                  Posh<span className="text-warm-gold">pavilion</span>
                </span>
              </div>
              <p className="text-sm leading-relaxed">
                Stylish & comfortable women sandals crafted with love. Where
                fashion meets comfort, every step feels like a dream.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                Quick Links
              </h4>
              <div className="space-y-2">
                {[
                  { href: "#home", label: "Home" },
                  { href: "#products", label: "Collection" },
                  { href: "#about", label: "About Us" },
                  { href: "#contact", label: "Contact" },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                Connect
              </h4>
              <div className="space-y-3">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
                <a
                  href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-white transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                </a>
                <a
                  href="mailto:hello@poshpavilion.com"
                  className="flex items-center gap-2 text-sm hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  hello@poshpavilion.com
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs">
              &copy; {new Date().getFullYear()} Poshpavilion. All rights
              reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
