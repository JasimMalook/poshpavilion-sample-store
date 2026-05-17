"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Instagram,
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
  Crown,
  Eye,
  ChevronRight,
  Quote,
  Send,
  Gem,
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
  tagColor?: string;
  rating: number;
  reviews: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Rosé Elegance Strappy Sandal",
    price: 3499,
    originalPrice: 4999,
    image: "/products/sandal-1.png",
    tag: "BESTSELLER",
    tagColor: "from-amber-500 to-yellow-600",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: "Golden Hour Block Heel",
    price: 4299,
    image: "/products/sandal-2.png",
    tag: "NEW",
    tagColor: "from-rose-500 to-pink-600",
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 3,
    name: "Blossom Flat Sandal",
    price: 2799,
    originalPrice: 3499,
    image: "/products/sandal-3.png",
    tag: "SALE",
    tagColor: "from-red-500 to-rose-600",
    rating: 4.7,
    reviews: 156,
  },
  {
    id: 4,
    name: "Nude Luxe Block Heel",
    price: 4599,
    image: "/products/sandal-4.png",
    tag: "PREMIUM",
    tagColor: "from-purple-500 to-indigo-600",
    rating: 4.8,
    reviews: 67,
  },
  {
    id: 5,
    name: "Metallic Dream Sandal",
    price: 3899,
    originalPrice: 5299,
    image: "/products/sandal-5.png",
    tag: "LIMITED",
    tagColor: "from-yellow-500 to-amber-600",
    rating: 5.0,
    reviews: 203,
  },
  {
    id: 6,
    name: "Blush Wedge Comfort",
    price: 3199,
    image: "/products/sandal-6.png",
    tag: "TRENDING",
    tagColor: "from-emerald-500 to-teal-600",
    rating: 4.6,
    reviews: 98,
  },
];

function getWhatsAppLink(productName: string) {
  const message = encodeURIComponent(
    `Hi, I want to order this sandal from Poshpavilion: ${productName}`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

// ===== Animated Counter Component =====
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 2000;
          const startTime = performance.now();

          function animate(currentTime: number) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            start = Math.floor(eased * target);
            setCount(start);
            if (progress < 1) requestAnimationFrame(animate);
          }
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ===== Marquee Component =====
function Marquee() {
  const items = [
    "FREE DELIVERY",
    "✦",
    "PREMIUM QUALITY",
    "✦",
    "WHATSAPP ORDERING",
    "✦",
    "EASY RETURNS",
    "✦",
    "HANDCRAFTED",
    "✦",
    "GENUINE LEATHER",
    "✦",
    "STYLISH & COMFORTABLE",
    "✦",
  ];

  return (
    <div className="overflow-hidden bg-luxury-dark py-3.5 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-luxury-dark via-transparent to-luxury-dark z-10 pointer-events-none" />
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className={`mx-6 text-sm tracking-[0.3em] ${
              item === "✦" ? "text-warm-gold" : "text-white/40 font-light"
            }`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ===== Product Card Component =====
function ProductCard({
  product,
  isLiked,
  onLike,
}: {
  product: Product;
  isLiked: boolean;
  onLike: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="group relative bg-white rounded-2xl overflow-hidden border border-blush/10 shadow-sm hover:shadow-2xl hover:shadow-rose-gold/10 transition-all duration-700"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-b from-soft-pink/20 to-cream/30">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Tag */}
          {product.tag && (
            <div className="absolute top-3 left-3 z-10">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wider text-white bg-gradient-to-r ${product.tagColor} shadow-lg`}
              >
                {product.tag}
              </span>
            </div>
          )}

          {/* Like Button */}
          <button
            onClick={onLike}
            className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full glass flex items-center justify-center hover:scale-110 transition-all duration-300 group/like"
            aria-label={`Like ${product.name}`}
          >
            <Heart
              className={`w-4.5 h-4.5 transition-all duration-300 ${
                isLiked
                  ? "text-red-500 fill-red-500 scale-110"
                  : "text-white/70 group-hover/like:text-white"
              }`}
            />
          </button>

          {/* Quick View - appears on hover */}
          <motion.div
            className="absolute bottom-4 left-4 right-4 z-10"
            initial={false}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Button
              asChild
              className="w-full bg-green-500/90 hover:bg-green-600 backdrop-blur-md text-white rounded-xl h-11 text-sm font-semibold shadow-xl border border-white/10"
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
          </motion.div>

          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute bottom-3 left-3 z-10 group-hover:opacity-0 transition-opacity">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-500 text-white shadow-lg">
                -{discount}%
              </span>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="p-4 md:p-5 space-y-2.5">
          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? "text-warm-gold fill-warm-gold"
                      : "text-gray-200 fill-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] text-muted-foreground font-medium">
              {product.rating} ({product.reviews})
            </span>
          </div>

          {/* Name */}
          <h3 className="font-semibold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-deep-rose transition-colors">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-xl font-bold bg-gradient-to-r from-deep-rose to-rose-gold bg-clip-text text-transparent">
              ₦{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground/60 line-through">
                ₦{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* WhatsApp Button (always visible on mobile) */}
          <Button
            asChild
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl h-10 text-xs font-bold tracking-wide shadow-md shadow-green-600/15 transition-all hover:shadow-lg hover:shadow-green-600/25 md:hidden mt-2"
          >
            <a
              href={getWhatsAppLink(product.name)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
              Order on WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// ===== Main Page =====
export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [likedProducts, setLikedProducts] = useState<Set<number>>(new Set());
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      {/* ===== Navigation ===== */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass shadow-lg shadow-black/5 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-warm-gold via-rose-gold to-deep-rose flex items-center justify-center shadow-lg shadow-rose-gold/20 group-hover:shadow-rose-gold/40 transition-shadow animate-pulse-glow">
                <Crown className="w-4.5 h-4.5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-bold tracking-tight leading-none">
                  <span className="text-gradient-rose">Posh</span>
                  <span className="text-gradient-gold">pavilion</span>
                </span>
                <span className="text-[8px] tracking-[0.35em] text-warm-gold/70 uppercase font-medium">
                  Luxury Footwear
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {[
                { href: "#home", label: "Home" },
                { href: "#products", label: "Collection" },
                { href: "#about", label: "About" },
                { href: "#contact", label: "Contact" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="relative px-4 py-2 text-sm font-medium text-foreground/60 hover:text-deep-rose transition-colors group/nav"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-rose-gold to-warm-gold group-hover/nav:w-full transition-all duration-300" />
                </a>
              ))}
              <div className="ml-3 pl-3 border-l border-blush/30">
                <Button
                  asChild
                  className="bg-gradient-to-r from-deep-rose to-rose-gold hover:opacity-90 text-white rounded-full px-6 shadow-lg shadow-deep-rose/20 hover:shadow-deep-rose/40 transition-all btn-glow"
                >
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      "Hi, I'd like to know more about Poshpavilion sandals!"
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="flex items-center gap-1.5">
                      <MessageCircle className="w-4 h-4" />
                      Shop Now
                    </span>
                  </a>
                </Button>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden w-10 h-10 rounded-full glass flex items-center justify-center"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-deep-rose" />
              ) : (
                <Menu className="w-5 h-5 text-deep-rose" />
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
              className="md:hidden glass border-t border-white/10 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-1">
                {[
                  { href: "#home", label: "Home" },
                  { href: "#products", label: "Collection" },
                  { href: "#about", label: "About" },
                  { href: "#contact", label: "Contact" },
                ].map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-3 px-4 rounded-xl text-foreground/70 hover:bg-soft-pink/30 hover:text-deep-rose font-medium transition-all"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <div className="pt-3">
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-deep-rose to-rose-gold text-white rounded-xl h-12 shadow-lg"
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="flex-1">
        {/* ===== Hero Section ===== */}
        <section
          id="home"
          ref={heroRef}
          className="relative min-h-screen flex items-center overflow-hidden"
        >
          {/* Background */}
          <motion.div
            className="absolute inset-0"
            style={{ y: heroY }}
          >
            <img
              src="/hero-banner.png"
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-luxury-dark/90 via-luxury-dark/70 to-luxury-dark/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark via-transparent to-luxury-dark/30" />
          </motion.div>

          {/* Decorative Orbs */}
          <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-rose-gold/5 blur-3xl animate-float-slow pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-warm-gold/5 blur-3xl animate-float-slower pointer-events-none" />

          {/* Rotating Ring Decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] pointer-events-none opacity-[0.04]">
            <div className="w-full h-full rounded-full border-2 border-warm-gold animate-spin-slow" />
          </div>

          {/* Content */}
          <motion.div
            className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-0"
            style={{ opacity: heroOpacity }}
          >
            <div className="max-w-3xl">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass text-xs font-semibold tracking-[0.2em] text-warm-gold uppercase mb-8">
                  <Sparkles className="w-3.5 h-3.5" />
                  Summer Collection 2025
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-tight"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <span className="text-white">Stylish</span>
                <br />
                <span className="text-white/80">&</span>{" "}
                <span className="text-gradient-gold">Comfortable</span>
                <br />
                <span className="text-white/60 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide">
                  Women Sandals
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="mt-8 text-base md:text-lg text-white/40 max-w-lg leading-relaxed font-light"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                Step into elegance with Poshpavilion — where every pair blends
                contemporary fashion with all-day comfort.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="mt-10 flex flex-col sm:flex-row items-start gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-warm-gold to-rose-gold hover:opacity-90 text-luxury-dark rounded-full px-10 h-14 text-sm font-bold tracking-wider shadow-2xl shadow-warm-gold/20 hover:shadow-warm-gold/40 transition-all btn-glow"
                >
                  <a href="#products">
                    <span className="flex items-center gap-2">
                      <ShoppingBag className="w-4.5 h-4.5" />
                      EXPLORE COLLECTION
                    </span>
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="rounded-full px-8 h-14 border-white/15 text-white/80 hover:bg-white/10 hover:text-white backdrop-blur-sm transition-all"
                  variant="outline"
                >
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      "Hi, I'd like to know more about Poshpavilion sandals!"
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-4.5 h-4.5 mr-2" />
                    Order on WhatsApp
                  </a>
                </Button>
              </motion.div>

              {/* Stats Row */}
              <motion.div
                className="mt-14 flex items-center gap-8 md:gap-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
              >
                {[
                  { value: 2000, suffix: "+", label: "Happy Customers" },
                  { value: 50, suffix: "+", label: "Unique Styles" },
                  { value: 49, suffix: "", label: "Avg Rating /5" },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <p className="text-2xl md:text-3xl font-bold text-white">
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="text-[10px] tracking-[0.2em] text-white/30 uppercase mt-1 font-medium">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
              <motion.div
                className="w-1 h-2.5 rounded-full bg-warm-gold"
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </div>
          </motion.div>
        </section>

        {/* ===== Marquee Strip ===== */}
        <Marquee />

        {/* ===== Products Section ===== */}
        <section id="products" className="py-20 md:py-32 bg-cream relative overflow-hidden noise-overlay">
          {/* Decorative */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-soft-pink/30 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-champagne/30 blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-warm-gold/10 text-warm-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">
                <Gem className="w-3.5 h-3.5" />
                Our Collection
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gradient-rose">Curated</span>{" "}
                <span className="text-foreground/80">for</span>{" "}
                <span className="text-gradient-gold">You</span>
              </h2>
              <p className="mt-5 text-foreground/40 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed">
                Each pair is thoughtfully designed to bring together fashion and
                comfort, so you never have to choose between the two.
              </p>

              {/* Decorative Line */}
              <div className="mt-8 flex items-center justify-center gap-3">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-warm-gold/50" />
                <div className="w-2 h-2 rounded-full bg-warm-gold/50" />
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-warm-gold/50" />
              </div>
            </motion.div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {products.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProductCard
                    product={product}
                    isLiked={likedProducts.has(product.id)}
                    onLike={() => toggleLike(product.id)}
                  />
                </motion.div>
              ))}
            </div>

            {/* View All CTA */}
            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-10 h-12 border-deep-rose/15 text-deep-rose hover:bg-deep-rose hover:text-white hover:border-deep-rose transition-all group"
              >
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    "Hi! I'd love to see more sandals from Poshpavilion's collection."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Full Collection
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* ===== About Section ===== */}
        <section id="about" className="relative py-20 md:py-32 overflow-hidden">
          {/* Dark luxurious background */}
          <div className="absolute inset-0 bg-gradient-to-br from-luxury-dark via-luxury-plum to-luxury-dark" />
          <div className="absolute inset-0 noise-overlay" />

          {/* Decorative Orbs */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-rose-gold/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-warm-gold/5 blur-[120px] pointer-events-none" />

          {/* Rotating ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none opacity-[0.03]">
            <div className="w-full h-full rounded-full border border-warm-gold animate-spin-slow" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Image Side */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative">
                  {/* Main Image */}
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/30 animate-border-dance border border-warm-gold/20">
                    <img
                      src="/products/sandal-5.png"
                      alt="Poshpavilion — Craftsmanship and style"
                      className="w-full aspect-[4/5] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-dark/40 to-transparent" />
                  </div>

                  {/* Floating Stats Card */}
                  <motion.div
                    className="absolute -bottom-6 -right-4 md:right-6 glass-dark rounded-2xl p-5 shadow-2xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, type: "spring" }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-warm-gold to-rose-gold flex items-center justify-center">
                        <Heart className="w-5 h-5 text-white fill-white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white">
                          <AnimatedCounter target={2000} suffix="+" />
                        </p>
                        <p className="text-[10px] tracking-[0.15em] text-white/40 uppercase">
                          Happy Customers
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Small floating image */}
                  <motion.div
                    className="absolute -top-4 -left-4 md:left-6 w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden shadow-xl border-2 border-warm-gold/20"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  >
                    <img
                      src="/products/sandal-2.png"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Content Side */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-warm-gold/10 text-warm-gold text-xs font-semibold tracking-[0.2em] uppercase">
                  <Crown className="w-3.5 h-3.5" />
                  Our Story
                </span>

                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  <span className="text-white">Where Fashion</span>
                  <br />
                  <span className="text-white">Meets </span>
                  <span className="text-gradient-gold">Comfort</span>
                </h2>

                <div className="space-y-5 text-white/40 leading-relaxed font-light">
                  <p>
                    Poshpavilion was born from a simple belief — that women should
                    never have to choose between looking stylish and feeling
                    comfortable. Founded with a passion for modern fashion and an
                    unwavering commitment to quality, we craft sandals that empower
                    women to step confidently through every moment of their day.
                  </p>
                  <p>
                    Every pair in our collection is thoughtfully designed using
                    premium materials, ensuring a perfect blend of elegance and ease.
                    From delicate strappy flats to statement block heels, our sandals
                    are made for the woman who values both aesthetics and comfort —
                    because she deserves nothing less.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4">
                  {[
                    { value: "50+", label: "Styles" },
                    { value: "100%", label: "Genuine Leather" },
                    { value: "4.9", label: "Avg. Rating" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="text-center p-4 rounded-2xl glass-dark"
                    >
                      <p className="text-xl md:text-2xl font-bold text-gradient-gold">
                        {stat.value}
                      </p>
                      <p className="text-[9px] tracking-[0.15em] text-white/30 uppercase mt-1.5 font-medium">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== Testimonials ===== */}
        <section className="py-20 md:py-32 bg-cream relative overflow-hidden noise-overlay">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-soft-pink/30 blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-warm-gold/10 text-warm-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">
                <Quote className="w-3.5 h-3.5" />
                Love Letters
              </span>
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="text-gradient-rose">What Our</span>{" "}
                <span className="text-foreground/80">Customers Say</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  name: "Ayesha K.",
                  location: "Lagos",
                  text: "Absolutely love my Poshpavilion sandals! The comfort is unmatched and I get compliments every time I wear them. Ordering via WhatsApp was so easy!",
                  rating: 5,
                },
                {
                  name: "Sara M.",
                  location: "Abuja",
                  text: "Best sandals I have ever owned. The quality is premium and they look even better in person. Already planning to order two more pairs!",
                  rating: 5,
                },
                {
                  name: "Fatima R.",
                  location: "Port Harcourt",
                  text: "I was skeptical about ordering online, but the team was so helpful on WhatsApp. The sandals arrived quickly and fit perfectly. Highly recommend!",
                  rating: 5,
                },
              ].map((review, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                >
                  <div className="relative bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-xl hover:shadow-rose-gold/5 transition-all duration-500 border border-blush/10 h-full group">
                    {/* Quote Icon */}
                    <div className="absolute top-6 right-6 text-blush/40 group-hover:text-warm-gold/20 transition-colors">
                      <Quote className="w-10 h-10" />
                    </div>

                    {/* Stars */}
                    <div className="flex gap-1 mb-5">
                      {[...Array(review.rating)].map((_, j) => (
                        <Star
                          key={j}
                          className="w-4 h-4 text-warm-gold fill-warm-gold"
                        />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-foreground/50 text-sm leading-relaxed mb-6 font-light">
                      &ldquo;{review.text}&rdquo;
                    </p>

                    {/* Reviewer */}
                    <div className="flex items-center gap-3 pt-4 border-t border-blush/10">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-rose-gold to-warm-gold flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-rose-gold/20">
                        {review.name[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-foreground">
                          {review.name}
                        </p>
                        <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {review.location}
                        </p>
                      </div>
                      <Badge
                        variant="secondary"
                        className="ml-auto bg-green-50 text-green-600 border-green-100 text-[10px] font-semibold"
                      >
                        Verified
                      </Badge>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Contact Section ===== */}
        <section id="contact" className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-cream via-soft-pink/20 to-cream" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-champagne/20 blur-[120px] pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-warm-gold/10 text-warm-gold text-xs font-semibold tracking-[0.2em] uppercase mb-6">
                <Send className="w-3.5 h-3.5" />
                Get in Touch
              </span>
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="text-gradient-rose">We&apos;d Love</span>{" "}
                <span className="text-foreground/80">to Hear from You</span>
              </h2>
              <p className="mt-5 text-foreground/40 max-w-2xl mx-auto font-light">
                Have a question about our collection, need help with sizing, or
                just want to say hello? Reach out to us anytime!
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* WhatsApp Card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative bg-gradient-to-br from-green-50/80 to-emerald-50/50 rounded-3xl p-8 md:p-10 text-center h-full border border-green-100/50 overflow-hidden group hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500">
                  {/* Background decoration */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-green-400/10 blur-3xl group-hover:bg-green-400/20 transition-colors pointer-events-none" />

                  <div className="relative z-10">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/25 group-hover:scale-110 transition-transform duration-500">
                      <MessageCircle className="w-9 h-9 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      Chat on WhatsApp
                    </h3>
                    <p className="text-foreground/40 text-sm mb-8 leading-relaxed font-light">
                      Quick responses, easy ordering, and personal styling advice.
                      We are just a message away!
                    </p>
                    <Button
                      asChild
                      className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 h-12 shadow-lg shadow-green-600/20 hover:shadow-green-600/40 transition-all"
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
                  </div>
                </div>
              </motion.div>

              {/* Instagram Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative bg-gradient-to-br from-pink-50/80 to-purple-50/50 rounded-3xl p-8 md:p-10 text-center h-full border border-pink-100/50 overflow-hidden group hover:shadow-2xl hover:shadow-pink-500/10 transition-all duration-500">
                  {/* Background decoration */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-pink-400/10 blur-3xl group-hover:bg-pink-400/20 transition-colors pointer-events-none" />

                  <div className="relative z-10">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-pink-500/25 group-hover:scale-110 transition-transform duration-500">
                      <Instagram className="w-9 h-9 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      Follow on Instagram
                    </h3>
                    <p className="text-foreground/40 text-sm mb-8 leading-relaxed font-light">
                      Stay updated with our latest arrivals, styling tips, and
                      behind-the-scenes moments. Join our growing community!
                    </p>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:opacity-90 text-white rounded-full px-8 h-12 shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 transition-all"
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
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Contact Info */}
            <div className="mt-14 flex flex-wrap items-center justify-center gap-6 md:gap-10">
              {[
                { icon: Phone, text: "+234 803 966 6787" },
                { icon: Mail, text: "hello@poshpavilion.com" },
                { icon: MapPin, text: "Lagos, Nigeria" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2.5 text-sm text-foreground/30 hover:text-foreground/50 transition-colors"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA Banner ===== */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-deep-rose via-rose-gold to-warm-gold animate-gradient-shift" />
          <div className="absolute inset-0 noise-overlay" />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Ready to Find Your
                <br />
                <span className="text-shimmer">Perfect Pair?</span>
              </h2>
              <p className="mt-6 text-white/50 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
                Browse our collection and order directly on WhatsApp. It is fast,
                easy, and personal — just the way shopping should be.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-deep-rose hover:bg-white/90 rounded-full px-10 h-14 shadow-2xl shadow-black/10 font-bold tracking-wide"
                >
                  <a href="#products">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    SHOP NOW
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/25 text-white hover:bg-white/10 rounded-full px-8 h-14 backdrop-blur-sm"
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

      {/* ===== Footer ===== */}
      <footer className="relative bg-luxury-dark text-white/40 overflow-hidden">
        <div className="absolute inset-0 noise-overlay" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-warm-gold/3 blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer */}
          <div className="py-16 grid md:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="md:col-span-2 space-y-5">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-warm-gold via-rose-gold to-deep-rose flex items-center justify-center shadow-lg shadow-warm-gold/10">
                  <Crown className="w-4.5 h-4.5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold leading-none text-white">
                    Posh<span className="text-warm-gold">pavilion</span>
                  </span>
                  <span className="text-[8px] tracking-[0.35em] text-warm-gold/40 uppercase">
                    Luxury Footwear
                  </span>
                </div>
              </div>
              <p className="text-sm leading-relaxed max-w-sm font-light">
                Stylish & comfortable women sandals crafted with love. Where
                fashion meets comfort, every step feels like a dream.
              </p>
              {/* Social Icons */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-green-500/20 flex items-center justify-center transition-all group"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 text-white/40 group-hover:text-green-400 transition-colors" />
                </a>
                <a
                  href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-pink-500/20 flex items-center justify-center transition-all group"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 text-white/40 group-hover:text-pink-400 transition-colors" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-white text-xs uppercase tracking-[0.2em] mb-5">
                Quick Links
              </h4>
              <div className="space-y-3">
                {[
                  { href: "#home", label: "Home" },
                  { href: "#products", label: "Collection" },
                  { href: "#about", label: "About Us" },
                  { href: "#contact", label: "Contact" },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block text-sm hover:text-warm-gold transition-colors font-light"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white text-xs uppercase tracking-[0.2em] mb-5">
                Contact
              </h4>
              <div className="space-y-3">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm hover:text-warm-gold transition-colors font-light"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp
                </a>
                <a
                  href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm hover:text-warm-gold transition-colors font-light"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  Instagram
                </a>
                <a
                  href="mailto:hello@poshpavilion.com"
                  className="flex items-center gap-2.5 text-sm hover:text-warm-gold transition-colors font-light"
                >
                  <Mail className="w-3.5 h-3.5" />
                  hello@poshpavilion.com
                </a>
                <div className="flex items-center gap-2.5 text-sm font-light">
                  <Phone className="w-3.5 h-3.5" />
                  +234 803 966 6787
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-white/20 font-light">
              &copy; {new Date().getFullYear()} Poshpavilion. All rights reserved.
            </p>
            <p className="text-[11px] text-white/20 font-light">
              Designed with love for the modern woman
            </p>
          </div>
        </div>
      </footer>

      {/* ===== Floating WhatsApp Button ===== */}
      <motion.a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          "Hi Poshpavilion! I want to place an order."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 transition-all group"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring" }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 text-white" />
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-green-500/50 animate-ping" />
      </motion.a>
    </div>
  );
}
