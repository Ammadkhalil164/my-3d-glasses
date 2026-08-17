import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, Shield, RefreshCw, Eye, Sparkles, Check, 
  Trash2, X, Plus, Minus, Info, Award, Compass, Heart,
  Instagram, Twitter, Linkedin, Send, Mail, Phone
} from "lucide-react";
import { FRAME_STYLES } from "./data";
import { FrameStyle } from "./types";
import Header from "./components/Header";
import CustomizerDrawer, { CustomizedOrder } from "./components/CustomizerDrawer";
import ThreeDExperience from "./components/ThreeDExperience";

export default function App() {
  const [activeFrame, setActiveFrame] = useState<FrameStyle>(FRAME_STYLES[0]);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<"frame" | "lenses" | "bridge" | null>(null);
  
  // Bicycle component state
  const [isBikeAudioPlaying, setIsBikeAudioPlaying] = useState(false);
  const [activeBikeColor, setActiveBikeColor] = useState<"white" | "black">("white");
  
  // Shopping Cart State
  const [cartItems, setCartItems] = useState<CustomizedOrder[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Force layout recalculation on mount to align 3D waypoints
  React.useEffect(() => {
    const triggerResize = () => {
      window.dispatchEvent(new Event("resize"));
    };
    setTimeout(triggerResize, 100);
    setTimeout(triggerResize, 500);
  }, []);

  // Toggle favorite state
  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Add customized order to cart
  const handleAddToCart = (order: CustomizedOrder) => {
    setCartItems(prev => [...prev, order]);
  };

  const handleRemoveFromCart = (index: number) => {
    setCartItems(prev => prev.filter((_, idx) => idx !== index));
  };

  return (
    <div className="relative md:z-20 bg-transparent min-h-screen w-full text-[#2E2F2E] overflow-x-hidden flex flex-col justify-between">
      {/* <ThreeDExperience /> */}
      {/* Dynamic Navigation Header */}
      <Header 
        onExploreClick={() => setActiveFrame(FRAME_STYLES[0])} 
        onCustomiseClick={() => setIsCustomizerOpen(true)}
        cartCount={cartItems.length}
        openCart={() => setIsCartOpen(true)}
      />

      {/* Hero Body Stage - 100% Matching Reference Casing and Layout */}
      <main className="font-tobiroto flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 pt-36 pb-20 flex flex-col justify-center relative select-none min-h-[calc(100vh-140px)]">
        
        {/* Giant Watermark Background Typography (Symmetric Central Axis Layout as requested) */}
        <div className="hero-title absolute inset-x-0 top-1/2 -translate-y-1/2 w-full flex justify-center items-center z-0 px-4 md:px-12 pointer-events-none select-none overflow-hidden h-[300px] md:h-[450px]">
          <h1 className="font-primary text-[9.5vw] font-light leading-none tracking-tight text-[#2E2F2E] select-none uppercase text-center">
            FUTURE VISION
          </h1>
        </div>

        {/* Central Model Stage Wrapper */}
        <div className="hero-stage-wrapper relative w-full flex-1 flex flex-col md:block items-center justify-center min-h-[500px] md:min-h-[580px] z-10">
          
          {/* Main profile photograph / 3D Model placeholder container - transitions smoothly */}
          <div id="hero-model-placeholder" className="relative w-[340px] h-[340px] md:w-[500px] md:h-[500px] flex items-center justify-center">
            
            {/* Interactive Backdrop glowing halo lines matching Ref */}
            <div className="absolute w-[360px] h-[360px] md:w-[520px] md:h-[520px] rounded-full border border-[#2E2F2E]/5 pointer-events-none animate-pulse" />
            <div className="absolute w-[280px] h-[280px] md:w-[420px] md:h-[420px] rounded-full border border-dashed border-[#2E2F2E]/5 pointer-events-none" />


            
            {/* HOTSPOT 1: Front visor pointer node */}
            <div 
              className="absolute z-20 transition-all duration-300"
              style={{ left: "54%", top: "38%" }}
            >
              <button
                onClick={() => setActiveHotspot(activeHotspot === "lenses" ? null : "lenses")}
                className="relative w-6 h-6 rounded-full flex items-center justify-center focus:outline-none group"
                title="Lenses & Optics Tech"
              >
                <span className="absolute inset-0 rounded-full bg-[#2E2F2E]/30 animate-ping" />
                <span className="w-3 h-3 rounded-full border-2 border-[#F0EADF] bg-[#2E2F2E] transition-transform duration-300 group-hover:scale-125" />
              </button>
            </div>

            {/* HOTSPOT 2: Side band ear chassis pointer node */}
            <div 
              className="absolute z-20 transition-all duration-300"
              style={{ left: "42%", top: "54%" }}
            >
              <button
                onClick={() => setActiveHotspot(activeHotspot === "frame" ? null : "frame")}
                className="relative w-6 h-6 rounded-full flex items-center justify-center focus:outline-none group"
                title="Body Design & Materials"
              >
                <span className="absolute inset-0 rounded-full bg-[#2E2F2E]/30 animate-ping delay-300" />
                <span className="w-3 h-3 rounded-full border-2 border-[#F0EADF] bg-[#2E2F2E] transition-transform duration-300 group-hover:scale-125" />
              </button>
            </div>

            {/* Connecting SVG lines pointing to floating cards */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible hidden md:block">
              {/* Line From Left Card to Hotspot 2 */}
              <motion.path 
                d="M -110, 80 L 100, 110 L 210, 270" 
                fill="none" 
                stroke="#2E2F2E" 
                strokeWidth="1.2" 
                strokeDasharray="4,4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8 }}
                className="opacity-40"
              />
              {/* Line From Hotspot 1 to Right Card */}
              <motion.path 
                d="M 270, 190 L 380, 110 L 590, 80" 
                fill="none" 
                stroke="#2E2F2E" 
                strokeWidth="1.2" 
                strokeDasharray="4,4"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8 }}
                className="opacity-40"
              />
            </svg>

          </div>

          {/* TOP-LEFT FLOATING CARD (ULTRAMODERN SET OF VR CARD) - Repositioned to top-left & symmetrically balanced */}
          <motion.div 
            key={`left-flyer-${activeFrame.id}`}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hero-cards relative md:absolute md:top-[12%] md:left-0 md:xl:left-4 mt-10 md:mt-0 bg-white/40 border border-[#2E2F2E]/15 hover:border-[#2E2F2E]/30 p-4 rounded-3xl flex items-center gap-4 transition-all duration-300 shadow-md backdrop-blur-md w-full max-w-[310px] z-30"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/50 border border-[#2E2F2E]/10 overflow-hidden relative flex-shrink-0 flex items-center justify-center p-1.5 shadow-inner">
              <img 
                src="https://pngimg.com/uploads/glasses/glasses_PNG54261.png" 
                alt="Mini VR visor" 
                className="max-h-full object-contain mix-blend-multiply"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-1">
              <span className="font-tobiroto text-[10px] uppercase font-semibold text-[#2E2F2E]/60 tracking-widest block">
                ULTRAMODERN
              </span>
              <h4 className="font-tobiroto text-xs font-extrabold uppercase text-[#2E2F2E] tracking-tight leading-tight">
                {activeFrame.id === 'aurelia' ? "SET OF VR" : `${activeFrame.name.split(' ')[1] || 'FRAME'} SYSTEM`}
              </h4>
              <p className="font-tobiroto text-[11px] text-[#2E2F2E]/70 leading-relaxed font-light">
                {activeFrame.rightCardDesc}
              </p>
            </div>
          </motion.div>

          {/* TOP-RIGHT FLOATING CARD (PRISM VR HEADSET CONCEPT CARD) - Repositioned to top-right & symmetrically balanced */}
          <motion.div 
            key={`right-flyer-${activeFrame.id}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hero-cards relative md:absolute md:top-[12%] md:right-0 md:xl:right-4 mt-4 md:mt-0 bg-white/40 border border-[#2E2F2E]/15 hover:border-[#2E2F2E]/30 p-4 rounded-3xl flex items-center gap-4 transition-all duration-300 shadow-md backdrop-blur-md w-full max-w-[310px] z-30"
          >
            <div className="space-y-1 text-right">
              <span className="font-tobiroto text-[10px] uppercase font-semibold text-[#2E2F2E]/60 tracking-widest block">
                PRISM VR
              </span>
              <h4 className="font-tobiroto text-xs font-extrabold uppercase text-[#2E2F2E] tracking-tight leading-tight">
                {activeFrame.id === 'aurelia' ? "HEADSET CONCEPT" : `${activeFrame.name.split(' ')[0]} DESIGN`}
              </h4>
              <p className="font-tobiroto text-[11px] text-[#2E2F2E]/70 leading-relaxed font-light text-left md:text-right">
                {activeFrame.leftCardDesc}
              </p>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-white/50 border border-[#2E2F2E]/10 overflow-hidden relative flex-shrink-0 flex items-center justify-center p-1.5 shadow-inner">
              <img 
                src="/aurelia.png" 
                alt="Mini concept headset" 
                className="max-h-full object-contain mix-blend-multiply"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

        </div>

        {/* BOTTOM SECTION: Model Frame Plating selector Dock & Try-On Actions */}
        <div className="hero-dock mt-12 flex flex-col md:flex-row justify-between items-center gap-6 relative z-35 select-none border-t border-[#2E2F2E]/15 pt-8">
          
          {/* Quick Stats or Location detail overlay */}
          <div className="flex items-center gap-4 text-xs font-tobiroto font-semibold text-[#2E2F2E]/70">
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#2E2F2E]" />
              <span>Handcrafted in Turin, Italy</span>
            </div>
            <div className="w-1 h-3 bg-[#2E2F2E]/20" />
            <span>Lifetime Framework Warranty</span>
          </div>

          {/* DOCK SELECTER OF HIGH EDITION GLASSES (Toggling Active State changes Centerpiece) */}
          <div className="flex bg-[#2E2F2E]/5 border border-[#2E2F2E]/15 p-1.5 rounded-full items-center gap-2">
            {FRAME_STYLES.map((style) => (
              <button
                key={style.id}
                onClick={() => {
                  setActiveFrame(style);
                  setActiveHotspot(null); // reset active hotspot
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer font-tobiroto ${
                  activeFrame.id === style.id
                    ? "bg-[#2E2F2E] text-[#F0EADF] shadow-md"
                    : "text-[#2E2F2E]/75 hover:bg-[#2E2F2E]/5 hover:text-[#2E2F2E]"
                }`}
              >
                {/* Micro Color indicator */}
                <span 
                  className="w-3 h-3 rounded-full border border-white/60" 
                  style={{ backgroundColor: style.colorHex }}
                />
                {style.name}
              </button>
            ))}
          </div>

          {/* Favorites & Purchase CTA Button Group */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleFavorite(activeFrame.id)}
              className="p-3 border border-[#2E2F2E]/20 hover:border-[#2E2F2E] rounded-full text-[#2E2F2E] hover:bg-[#2E2F2E] hover:text-[#F0EADF] transition-all duration-300"
              title="Add to Wishlist"
            >
              <Heart className={`w-4 h-4 ${favorites.includes(activeFrame.id) ? "fill-current text-red-500 stroke-red-500" : ""}`} />
            </button>
            <button
              onClick={() => setIsCustomizerOpen(true)}
              className="group h-11 px-7 rounded-full bg-[#2E2F2E] text-[#F0EADF] hover:bg-[#2E2F2E]/90 shadow-md font-primary text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2.5 transition-all duration-300 border border-[#2E2F2E]"
            >
              <span>Personalize Prescription</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

      </main>

      {/* NEW BRAND SHOWCASE SECTION (Ref Image: Rating stars, giant typography with inline capsules, 4 vertical clipped cards, infinite scroll marquee footer) */}
      <section id="product-cards-section" className="w-full bg-[#F0EADF] text-[#2E2F2E] pt-16 pb-24 border-t border-[#2E2F2E]/10 relative z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header metadata/stars */}
          <div className="flex flex-col items-center justify-center space-y-3 mb-6 text-center select-none">
            <span className="font-primary text-[10px] uppercase font-bold tracking-[0.25em] text-[#2E2F2E]/40">[ 2026 Series ]</span>
            <div className="flex gap-1 text-[#2E2F2E]">
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            </div>
          </div>

          {/* Giant core belief headline with inline media capsules to mimic ref style exactly */}
          <div className="max-w-4xl mx-auto text-center mb-10 select-none">
            <h2 className="font-secondary text-2xl md:text-4xl lg:text-[42px] font-medium leading-[1.4] md:leading-[1.5] text-[#2E2F2E] tracking-tight">
              At XLView, we believe
              
              {/* Overlapping small glasses inside pill capsule */}
              <span className="inline-flex items-center gap-1.5 mx-2 px-3 py-1 rounded-full border border-[#2E2F2E]/15 bg-white/50 align-middle shadow-sm">
                <div className="flex -space-x-1.5 animate-pulse">
                  <img src="https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&q=80&w=120" alt="glasses-concept-1" className="w-4 h-4 rounded-full border border-[#2E2F2E]/10 bg-white mix-blend-multiply object-cover" />
                  <img src="https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=120" alt="glasses-concept-2" className="w-4 h-4 rounded-full border border-[#2E2F2E]/10 bg-white mix-blend-multiply object-cover" />
                </div>
                <span className="font-primary text-[9px] font-extrabold tracking-wider text-[#2E2F2E]/80 uppercase">Design</span>
              </span>
              
              fashion is more than just
              
              {/* Product mini frame badge inside pill capsule */}
              <span className="inline-flex items-center gap-1 mx-2 px-3 py-1 rounded-full border border-[#2E2F2E]/15 bg-[#2E2F2E]/5 align-middle shadow-sm">
                <span className="font-primary text-[9px] font-extrabold tracking-wider text-[#2E2F2E] uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  optics
                </span>
              </span>
              
              —it's a living, unfiltered expression of who you are in every single moment.
            </h2>
          </div>

          {/* Learn More Button & metadata row */}
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-[#2E2F2E]/10 pb-12 mb-16 select-none">
            <button 
              onClick={() => setIsCustomizerOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#2E2F2E] bg-transparent text-[#2E2F2E] hover:bg-[#2E2F2E] hover:text-[#F0EADF] font-primary text-[10px] font-extrabold uppercase tracking-widest rounded-full transition-all duration-300 group shadow-sm active:scale-95 cursor-pointer"
            >
              Learn More
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <span className="font-secondary italic text-xs text-[#2E2F2E]/60">[Wear the Moment]</span>
          </div>

          {/* Staggered row of 4 visual columns (asymmetrical clipped corner blocks) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
            
            {/* Card 1: Aurelia concept */}
            <div className="flex flex-col gap-3 group">
              <div className="font-primary text-[10px] font-bold text-[#2E2F2E]/40 uppercase tracking-widest flex items-center gap-1">
                <span>[Aura]</span>
              </div>
              <div className="w-full aspect-[3/4] bg-[#2E2F2E]/5 rounded-tl-[60px] rounded-br-[60px] rounded-tr-[16px] rounded-bl-[16px] overflow-hidden border border-[#2E2F2E]/10 relative group-hover:border-[#2E2F2E]/25 transition-all duration-500">
                <img 
                  src="/aurelia.png" 
                  alt="Aurelia wireframe champagne gold glasses" 
                  className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-700 mix-blend-multiply"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual badge top left */}
                <div className="absolute top-4 left-4 bg-[#F0EADF] text-[#2E2F2E] text-[8px] font-bold tracking-widest px-2 py-0.5 rounded-full uppercase border border-[#2E2F2E]/15">
                  Baseline
                </div>
              </div>
              
              <div className="text-left select-none">
                <span className="font-primary text-xs font-bold text-[#2E2F2E] block">@aura - wire aurelia</span>
                <span className="font-secondary italic text-[11px] text-[#2E2F2E]/60 block mt-0.5">Champagne wiremesh frame</span>
              </div>
            </div>

            {/* Card 2: 3D MODEL PLACEHOLDER CARD - (MISSING image of glass, but containing all content/style as requested) */}
            <div className="flex flex-col gap-3 group transform translate-y-0 sm:translate-y-8 lg:translate-y-12">
              <div className="font-primary text-[10px] font-bold text-[#2E2F2E]/40 uppercase tracking-widest flex items-center gap-1">
                <span>[Spline Canvas]</span>
                <span className="inline-flex w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              </div>
              
              {/* Asymmetrical card with beautiful tech grid structure but NO central glasses image */}
              <div className="w-full aspect-[3/4] bg-[#2E2F2E]/[0.02] hover:bg-[#2E2F2E]/[0.04] border-2 border-dashed border-[#2E2F2E]/20 p-6 rounded-tl-[16px] rounded-br-[16px] rounded-tr-[60px] rounded-bl-[60px] flex flex-col justify-between transition-all duration-500 group-hover:border-[#2E2F2E]/45 relative">
                
                {/* Small indicator label */}
                <div className="absolute top-4 left-4 text-[9px] font-mono text-[#2E2F2E]/30 uppercase tracking-wider">
                  gl_viewport_02
                </div>

                {/* Main empty stage container with circular grid backings - designed for 3D model */}
                <div id="glasses-landing-zone" className="flex-1 flex flex-col justify-center items-center text-center py-4 select-none relative">
                  <div id="glasses-card-placeholder-content" className="flex flex-col items-center justify-center transition-opacity duration-300">
                    <div className="w-20 h-20 rounded-full border border-[#2E2F2E]/10 flex items-center justify-center relative bg-white/20 group-hover:border-[#2E2F2E]/20 transition-all duration-500">
                      <Compass className="w-6 h-6 text-[#2E2F2E]/40 animate-spin" style={{ animationDuration: "12s" }} />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-orange-500/5 to-transparent animate-pulse" />
                    </div>
                    
                    <div className="space-y-1.5 mt-4">
                      <span className="font-primary text-[10px] font-bold text-[#2E2F2E] uppercase tracking-widest block">
                        3D ENGINE READY
                      </span>
                      <p className="font-secondary text-[11px] text-[#2E2F2E]/60 leading-relaxed max-w-[180px] mx-auto">
                        Glass wireframe placeholder. High-fidelity 3D WebGL interactive model will load here on scrolling.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom button of card, fully interactive */}
                <button
                  onClick={() => setIsCustomizerOpen(true)}
                  className="w-full py-2 bg-[#2E2F2E]/5 hover:bg-[#2E2F2E] hover:text-[#F0EADF] text-[#2E2F2E] border border-[#2E2F2E]/15 hover:border-[#2E2F2E] text-[9px] font-bold uppercase tracking-wider rounded-lg transition-all duration-300 cursor-pointer"
                >
                  Configure 3D Chassis
                </button>
              </div>

              <div className="text-left select-none">
                <span className="font-primary text-xs font-bold text-[#2E2F2E] block">@digital - interact active</span>
                <span className="font-secondary italic text-[11px] text-[#2E2F2E]/60 block mt-0.5">3D WebGL canvas area</span>
              </div>
            </div>

            {/* Card 3: Obsidian block */}
            <div className="flex flex-col gap-3 group">
              <div className="font-primary text-[10px] font-bold text-[#2E2F2E]/40 uppercase tracking-widest flex items-center gap-1">
                <span>[Obsidian]</span>
              </div>
              <div className="w-full aspect-[3/4] bg-[#2E2F2E]/5 rounded-tl-[16px] rounded-br-[16px] rounded-tr-[60px] rounded-bl-[60px] overflow-hidden border border-[#2E2F2E]/10 relative group-hover:border-[#2E2F2E]/25 transition-all duration-500">
                <img 
                  src="https://pngimg.com/uploads/glasses/glasses_PNG54326.png" 
                  alt="Obsidian monolith glasses" 
                  className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-700 mix-blend-multiply"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual badge top left */}
                <div className="absolute top-4 left-4 bg-[#2E2F2E] text-[#F0EADF] text-[8px] font-bold tracking-widest px-2 py-0.5 rounded-full uppercase border border-[#2E2F2E]/15">
                  Limited
                </div>
              </div>
              
              <div className="text-left select-none">
                <span className="font-primary text-xs font-bold text-[#2E2F2E] block">@obsidian - slate block</span>
                <span className="font-secondary italic text-[11px] text-[#2E2F2E]/60 block mt-0.5">Matte absolute black acetate</span>
              </div>
            </div>

            {/* Card 4: Tortoise craft */}
            <div className="flex flex-col gap-3 group transform translate-y-0 sm:translate-y-8 lg:translate-y-12">
              <div className="font-primary text-[10px] font-bold text-[#2E2F2E]/40 uppercase tracking-widest flex items-center gap-1">
                <span>[Craft]</span>
              </div>
              <div className="w-full aspect-[3/4] bg-[#2E2F2E]/5 rounded-tl-[60px] rounded-br-[60px] rounded-tr-[16px] rounded-bl-[16px] overflow-hidden border border-[#2E2F2E]/10 relative group-hover:border-[#2E2F2E]/25 transition-all duration-500">
                <img 
                  src="https://pngimg.com/uploads/glasses/glasses_PNG54319.png" 
                  alt="Tortoise amber craft glasses" 
                  className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-700 mix-blend-multiply"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual badge top left */}
                <div className="absolute top-4 left-4 bg-[#F0EADF] text-[#2E2F2E] text-[8px] font-bold tracking-widest px-2 py-0.5 rounded-full uppercase border border-[#2E2F2E]/15">
                  Handcrafted
                </div>
              </div>
              
              <div className="text-left select-none">
                <span className="font-primary text-xs font-bold text-[#2E2F2E] block">@craft - warm tortoise</span>
                <span className="font-secondary italic text-[11px] text-[#2E2F2E]/60 block mt-0.5">Havanna tortoiseshell bio-resin</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* BICYCLE SPECIFICATION SHOWCASE (Ref Image: Dopamine GR / panaride layout added with custom fonts, colors and blank 3D canvas) */}
      <section id="bicycle-section" className="w-full bg-[#F0EADF] text-[#2E2F2E] py-20 border-t border-[#2E2F2E]/10 relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT AREA: Title, 3D WebGL Viewport Canvas, and brand footer (Column span 8) */}
            <div className="lg:col-span-8 flex flex-col justify-between h-full min-h-[580px] space-y-8">
              
              {/* Top row: Big Title */}
              <div className="flex justify-between items-start select-none">
                <div className="space-y-1">
                  <h2 className="font-primary text-5xl md:text-6xl font-black text-[#2E2F2E] tracking-tighter uppercase leading-none">
                    Dopamine<span className="font-secondary italic font-light lowercase text-3xl md:text-4xl ml-1 text-[#2E2F2E]/80">GR</span>
                  </h2>
                  <div className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#2E2F2E]/40 font-primary">
                    [ Ultimate Gravel Rig • Active Series ]
                  </div>
                </div>
                
                {/* Tech specifications chip */}
                <span className="px-3 py-1 rounded-full border border-[#2E2F2E]/15 bg-[#2E2F2E]/5 font-primary text-[8px] font-black uppercase tracking-wider">
                  Chassis v.20
                </span>
              </div>

              {/* Middle row: Invisible alignment anchor (dont change dimensions to keep glasses position intact) */}
              <div id="landing-zone-2" data-webgl-viewport-03="" className="flex-1 w-full aspect-[16/9] md:aspect-[1.8/1] relative">
              </div>

              {/* Bottom row: Brand & Logo (panaride style) */}
              <div className="flex items-center gap-3 select-none">
                {/* Symmetric bowtie style logo for panaride */}
                <div className="flex items-center justify-center">
                  <svg className="w-7 h-7 text-[#2E2F2E]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {/* Left curved wing */}
                    <path d="M4 12c4-6 6 6 10 0" strokeLinecap="round" strokeLinejoin="round" />
                    {/* Right curved wing */}
                    <path d="M20 12c-4-6-6 6-10 0" strokeLinecap="round" strokeLinejoin="round" />
                    {/* Center node */}
                    <circle cx="12" cy="12" r="1.5" className="fill-current" />
                  </svg>
                </div>
                
                <div className="font-primary text-lg font-black text-[#2E2F2E] tracking-tighter uppercase flex items-baseline gap-1">
                  panaride<span className="text-[9px] font-bold tracking-widest text-[#2E2F2E]/55 ml-0.5">®</span>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Brand names, product specs, audio review, colors and marketplace buttons (Column span 4) */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-8 lg:border-l lg:border-[#2E2F2E]/10 lg:pl-10 min-h-[580px]">
              
              {/* Product Identifier Block */}
              <div className="space-y-5">
                <div className="flex justify-between items-start border-b border-[#2E2F2E]/10 pb-4">
                  <div className="space-y-0.5">
                    <span className="font-primary text-[10px] font-bold text-[#2E2F2E]/40 uppercase tracking-widest block font-primary">Model Selection</span>
                    <h3 className="font-secondary text-lg font-bold text-[#2E2F2E] leading-snug">
                      Гравийный велосипед<br />
                      <span className="font-primary font-black uppercase text-sm tracking-wide text-[#2E2F2E]/70">Panaride / Dopamine GR</span>
                    </h3>
                  </div>
                  
                  {/* Styled Barcode identifier matching original */}
                  <div className="flex flex-col items-end">
                    <div className="flex gap-[1.5px] h-6 items-stretch select-none opacity-80" title="Barcode: C42-BIKE">
                      <div className="w-[1px] bg-[#2E2F2E]" />
                      <div className="w-[2px] bg-[#2E2F2E]" />
                      <div className="w-[1px] bg-[#2E2F2E]" />
                      <div className="w-[3px] bg-[#2E2F2E]" />
                      <div className="w-[1px] bg-[#2E2F2E]" />
                      <div className="w-[1.5px] bg-[#2E2F2E]" />
                      <div className="w-[1px] bg-[#2E2F2E]" />
                      <div className="w-[2.5px] bg-[#2E2F2E]" />
                    </div>
                    <span className="font-primary text-[8px] text-[#2E2F2E]/40 font-bold mt-1 tracking-wider">C42-BIKE</span>
                  </div>
                </div>

                {/* Description */}
                <p className="font-secondary italic text-xs leading-relaxed text-[#2E2F2E]/70">
                  Быстрый на шоссе, уверен на грунте. Крепления для сумок, комфортная геометрия для длительных поездок и путешествий.
                </p>
                <p className="font-secondary text-[11px] leading-relaxed text-[#2E2F2E]/60 pt-1">
                  Engineered with double-butted structural alloys and configured with lightweight tire arches. It acts as an immersive cross-country rig with high comfort ratios.
                </p>
              </div>

              {/* AUDIO REVIEW MODULE (Аудиообзор модели 0:20) */}
              <div className="bg-white/40 border border-[#2E2F2E]/10 rounded-2xl p-4.5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 ${isBikeAudioPlaying ? "block" : "hidden"}`}></span>
                      <span className={`relative inline-flex rounded-full h-2 w-2 ${isBikeAudioPlaying ? "bg-emerald-500" : "bg-neutral-400"}`}></span>
                    </span>
                    <span className="font-primary text-[9px] font-black uppercase tracking-widest text-[#2E2F2E] font-primary">
                      Аудиообзор модели • 0:20
                    </span>
                  </div>
                  <span className="font-primary text-[10px] font-bold text-[#2E2F2E]/40">
                    {isBikeAudioPlaying ? "0:12" : "0:00"} / 0:20
                  </span>
                </div>

                {/* Interactive Waveform / Play area */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsBikeAudioPlaying(!isBikeAudioPlaying)}
                    className="w-10 h-10 rounded-full bg-[#2E2F2E] text-[#F0EADF] flex items-center justify-center hover:bg-[#2E2F2E]/90 active:scale-95 transition-all shadow-md cursor-pointer"
                    title={isBikeAudioPlaying ? "Pause Audio Review" : "Play Audio Review"}
                  >
                    {isBikeAudioPlaying ? (
                      <div className="flex gap-0.5 justify-center items-center">
                        <div className="w-1 h-3.5 bg-[#F0EADF] rounded-full animate-pulse" />
                        <div className="w-1 h-3.5 bg-[#F0EADF] rounded-full animate-pulse" style={{ animationDelay: '0.15s' }} />
                      </div>
                    ) : (
                      <svg className="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>

                  {/* Aesthetic Audio Waves bar */}
                  <div className="flex-1 flex gap-1 h-8 items-center justify-between select-none">
                    {[16, 24, 12, 32, 18, 28, 14, 22, 10, 26, 15, 30, 20, 12, 18, 24].map((h, i) => (
                      <motion.div
                        key={i}
                        className={`w-1 rounded-full bg-[#2E2F2E]`}
                        animate={{
                          height: isBikeAudioPlaying ? [h * 0.4, h, h * 0.4] : h * 0.5
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.2,
                          delay: i * 0.05
                        }}
                        style={{ height: `${h * 0.5}px` }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* COLOR SWATCH SELECTOR (Цвета модели) */}
              <div className="space-y-2.5">
                <span className="font-primary text-[9px] font-black uppercase tracking-widest text-[#2E2F2E]/40 block font-primary">
                  Цвета модели • {activeBikeColor === "white" ? "Dopamine Pearl" : "Onyx Shadow"}
                </span>
                
                <div className="flex gap-3">
                  {/* Pearl White Button */}
                  <button
                    onClick={() => setActiveBikeColor("white")}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      activeBikeColor === "white" 
                        ? "ring-2 ring-[#2E2F2E] ring-offset-2 scale-105" 
                        : "hover:scale-105"
                    }`}
                    style={{ backgroundColor: "#F9F6F0" }}
                    title="Dopamine Pearl White"
                  >
                    <div className="w-6 h-6 rounded-full border border-[#2E2F2E]/10" />
                  </button>

                  {/* Onyx Shadow Black Button */}
                  <button
                    onClick={() => setActiveBikeColor("black")}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      activeBikeColor === "black" 
                        ? "ring-2 ring-[#2E2F2E] ring-offset-2 scale-105" 
                        : "hover:scale-105"
                    }`}
                    style={{ backgroundColor: "#181918" }}
                    title="Onyx Shadow"
                  >
                    <div className="w-6 h-6 rounded-full border border-white/10" />
                  </button>
                </div>
              </div>

              {/* MARKETPLACE LINKS (Заказать велосипед можно в нашем магазине в маркетплейсах:) */}
              <div className="space-y-4 border-t border-[#2E2F2E]/10 pt-6">
                <p className="font-secondary italic text-[11.5px] text-[#2E2F2E]/65 leading-snug">
                  Заказать велосипед можно в нашем магазине в маркетплейсах:
                </p>

                <div className="flex flex-wrap sm:flex-nowrap gap-3">
                  {/* OZON button */}
                  <a
                    href="https://ozon.ru"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[120px] py-3.5 px-4 rounded-xl border border-[#2E2F2E]/15 hover:border-[#2E2F2E] bg-white/40 hover:bg-[#2E2F2E] hover:text-[#F0EADF] text-[#2E2F2E] font-primary text-[10px] font-black uppercase tracking-widest text-center transition-all duration-300 shadow-sm active:scale-95"
                  >
                    OZON
                  </a>

                  {/* WILDBERRIES button */}
                  <a
                    href="https://wildberries.ru"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[120px] py-3.5 px-4 rounded-xl border border-[#2E2F2E]/15 hover:border-[#2E2F2E] bg-white/40 hover:bg-[#2E2F2E] hover:text-[#F0EADF] text-[#2E2F2E] font-primary text-[10px] font-black uppercase tracking-widest text-center transition-all duration-300 shadow-sm active:scale-95"
                  >
                    WILDBERRIES
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ACHIEVEMENTS SECTION (Ref Image: Phone/Device display viewport placeholder on the left, Stat cards + large achievements headline on the right) */}
      <section id="achievements-section" className="w-full bg-[#F0EADF] text-[#2E2F2E] pb-28 pt-8 relative z-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* LEFT CONTAINER (Column span 7): Twin achievement badges & giant brand headline */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-10 lg:pr-10">
              
              {/* Row containing two cards with company achievements - matching layout in ref perfectly */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full items-stretch">
                
                {/* Achievement Card 1: Revenue/Product Growth metric */}
                <div className="bg-white/40 border border-[#2E2F2E]/10 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-4 hover:border-[#2E2F2E]/25 transition-all duration-300 select-none">
                  <div>
                    <span className="font-primary text-[10px] uppercase font-black tracking-widest text-[#2E2F2E]/40 block">Design Precision</span>
                    <h4 className="font-secondary text-base font-bold text-[#2E2F2E] mt-1">Weight Optimization</h4>
                  </div>
                  <div className="space-y-1">
                    <span className="font-primary text-5xl md:text-6xl font-light tracking-tighter text-[#2E2F2E] block leading-none">88%</span>
                    <p className="font-secondary italic text-xs text-[#2E2F2E]/60">
                      Reduced optical chassis strain on the nose bridge compared to traditional horn frames.
                    </p>
                  </div>
                </div>

                {/* Achievement Card 2: AI/Optics Innovation metric */}
                <div className="bg-[#2E2F2E]/5 border border-[#2E2F2E]/10 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-4 hover:border-[#2E2F2E]/25 transition-all duration-300 select-none">
                  <div>
                    <span className="font-primary text-[10px] uppercase font-black tracking-widest text-[#2E2F2E]/40 block">Digital Comfort</span>
                    <h4 className="font-secondary text-base font-bold text-[#2E2F2E] mt-1">Adaptive Optic Filter</h4>
                  </div>
                  <div className="space-y-1">
                    <span className="font-primary text-3xl md:text-4xl font-black text-[#2E2F2E] uppercase block tracking-tight leading-none pt-2 pb-1 text-emerald-800">
                      Zeiss
                    </span>
                    <p className="font-secondary italic text-xs text-[#2E2F2E]/60 mt-1">
                      Double-sided blue light reduction layer customized specifically for luxury screens.
                    </p>
                  </div>
                </div>

              </div>

              {/* Huge Bold Section Title matching the bottom typography of reference image perfectly */}
              <div className="space-y-4 text-left select-none">
                <h3 className="font-secondary text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] text-[#2E2F2E] tracking-tight">
                  Key Achievements<br />
                  <span className="font-primary font-bold">of This Company</span>
                </h3>
                <p className="font-secondary text-xs sm:text-sm text-[#2E2F2E]/70 max-w-xl leading-relaxed">
                  We strive to marry old-world Italian bench workmanship with modern micro-mechanical enhancements. XLView represents a step-change in luxury glasses design: weight balance, chromatic integrity, and durability.
                </p>
              </div>

            </div>

            {/* RIGHT CONTAINER (Column span 5): Phone/Device mockup containing the 3D model/Glasses placeholder space */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              
              {/* Main outer shell resembling the highly-rounded phone screen in reference image */}
              <div className="w-full max-w-[340px] aspect-[4/5] bg-[#2E2F2E] rounded-[48px] p-4.5 relative shadow-2xl flex flex-col justify-between overflow-visible border-4 border-[#2E2F2E]/10">
                
                {/* Viewport container (Black screen viewport showing high-end schematics of glasses where 3D will come) */}
                <div className="flex-1 w-full h-full bg-[#181918] rounded-[36px] overflow-hidden relative flex flex-col justify-between p-6 border border-white/5 select-none">
                  
                  {/* Subtle vector background grid patterns of our optics */}
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-60" />
                  
                  {/* Top info indicators */}
                  <div className="flex justify-between items-center relative z-10 w-full">
                    <span className="font-mono text-[9px] text-[#F0EADF]/45 uppercase tracking-wider">[ scroll_target_01 ]</span>
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#F0EADF]/30" />
                    </div>
                  </div>

                  {/* Main Glasses Schematic Placeholder (leaving space for future 3D model as requested) */}
                  <div id="landing-zone-3" className="flex-1 flex flex-col justify-center items-center text-center relative z-10 py-4">
                    
                    {/* Glowing vector lens wireframe drawing (represents where the 3D glasses model lands on scrolling) */}
                    <div className="relative w-44 h-24 flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity">
                      
                      {/* Left Lens ring */}
                      <div className="absolute left-3 w-16 h-16 rounded-full border border-[#F0EADF]/20 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full border border-dashed border-[#F0EADF]/10" />
                      </div>
                      
                      {/* Right Lens ring */}
                      <div className="absolute right-3 w-16 h-16 rounded-full border border-[#F0EADF]/20 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full border border-dashed border-[#F0EADF]/10" />
                      </div>
                      
                      {/* Bridge Connection */}
                      <div className="absolute w-8 h-3 border-t border-b border-[#F0EADF]/35 rounded-full top-[45%] left-1/2 -translate-x-1/2" />
                      
                      {/* Technical Crosshairs and nodes */}
                      <div className="absolute top-1/2 left-[28%] -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <div className="absolute top-1/2 right-[28%] -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      
                      {/* Pulse circle around active center */}
                      <div className="absolute w-24 h-24 rounded-full border border-[#F0EADF]/5 animate-ping duration-[3000ms]" />
                    </div>

                    {/* Label detailing what comes there */}
                    <div className="mt-2 space-y-1">
                      <span className="font-primary text-[10px] font-bold text-[#F0EADF] uppercase tracking-[0.2em] block">
                        3D Viewport
                      </span>
                      <p className="font-secondary italic text-[11px] text-[#F0EADF]/50 px-4 leading-relaxed">
                        Interaction node primed. Future 3D models will bind here upon scroll trigger.
                      </p>
                    </div>

                  </div>

                  {/* Viewport bottom labels */}
                  <div className="flex justify-between items-center relative z-10 w-full mt-auto">
                    <span className="font-primary text-[8px] uppercase tracking-widest text-[#F0EADF]/30">XLView Engine v1.8</span>
                    <span className="font-mono text-[8px] text-emerald-400 font-bold uppercase">Online & Ready</span>
                  </div>

                </div>

                {/* PROTRUDING SEMI-CIRCLE NOTCH/BUTTON (Exactly matching ref image layout style) */}
                <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-18 h-18 bg-[#2E2F2E] rounded-full flex items-center justify-center shadow-2xl border-t border-[#F0EADF]/5">
                  <button
                    onClick={() => {
                      const el = document.getElementById("cta-get-started");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-11 h-11 rounded-full bg-[#4ADE80] hover:bg-[#22C55E] flex items-center justify-center transition-all duration-300 focus:outline-none shadow-md active:scale-90 group cursor-pointer"
                    title="Explore technical details"
                  >
                    <svg className="w-5 h-5 text-[#2E2F2E] group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* THE MOST EXPENSIVE MISTAKE - PREMIUM INTERIOR & LIFESTYLE SHOWCASE (Ref Image: Brand-compliance luxury card, bold headline, 3D furniture canvas placeholder, stats footer) */}
      <section id="mistake-section" className="w-full bg-[#F0EADF] text-[#2E2F2E] pb-24 pt-4 relative z-20 overflow-hidden text-balance">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Framed Canvas Container with brand charcoal background representing the reference image's gorgeous layout style */}
          <div className="w-full bg-[#2E2F2E] text-[#F0EADF] px-8 md:px-16 py-12 md:py-18 rounded-[48px] relative shadow-2xl overflow-hidden border border-[#2E2F2E]/10 flex flex-col justify-between min-h-[720px]">
            
            {/* Subtle aesthetic alignment corner brackets/lines to match high-end design catalog look */}
            <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-[#F0EADF]/20 pointer-events-none" />
            <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-[#F0EADF]/20 pointer-events-none" />
            <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-[#F0EADF]/20 pointer-events-none" />
            <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-[#F0EADF]/20 pointer-events-none" />

            {/* TOP BLOCK: Giant Headline */}
            <div className="w-full text-center space-y-5 select-none relative z-10 mb-12">
              <h2 className="font-primary text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none uppercase text-[#F0EADF] drop-shadow-sm">
                The Most Expensive Mistake
              </h2>
              
              {/* Linked tagline with inline directions exactly as in visual prototype */}
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 uppercase text-[9px] md:text-xs font-primary font-black tracking-[0.25em] text-[#F0EADF]/90">
                <span>In A Premium</span>
                <span className="text-[#F0EADF]/40">▸</span>
                <span>Interior & Style</span>
                <span className="text-[#F0EADF]/40">▸</span>
                <span>Is To Look</span>
                <span className="text-[#F0EADF]/40">▸</span>
                <span>Like</span>
                <span className="text-[#F0EADF]/40">▸</span>
                <span>Everyone</span>
                <span className="text-[#F0EADF]/40">▸</span>
                <span>Else</span>
              </div>
            </div>

            {/* MIDDLE BLOCK: Three columns flanking a central 3D scene mockup */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-center relative z-10">
              
              {/* Left Column (Span 4): Impression Paragraph */}
              <div className="lg:col-span-4 flex flex-col justify-center space-y-4 text-left select-none">
                <h3 className="font-primary text-xs sm:text-sm font-black uppercase tracking-wider text-[#F0EADF] border-l-2 border-[#F0EADF]/50 pl-3 leading-snug">
                  The very first overall<br />
                  impression of the entire<br />
                  interior space
                </h3>
                <p className="font-secondary italic text-xs leading-relaxed text-[#F0EADF]/85">
                  Guests form an opinion about a place in a matter of seconds — and primarily based on the visuals. Standard off-the-rack choices nullify key investments in architecture and core concept.
                </p>
                <div className="pt-2">
                  <span className="font-mono text-[9px] text-[#F0EADF]/40 uppercase tracking-widest">[ Node ref / 01 ]</span>
                </div>
              </div>

              {/* Center Column (Span 4): Completely Empty 3D Stage Placeholder for sofa/glasses scroll triggers */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center py-6 min-h-[280px]">
                
                {/* Visual empty bounding box for user's future interactive 3D model */}
                <div id="landing-zone-4" className="w-full max-w-[280px] aspect-square rounded-[36px] bg-[#F0EADF]/[0.04] border border-dashed border-[#F0EADF]/30 relative flex flex-col justify-between p-5 group hover:border-[#F0EADF]/50 transition-colors duration-500">
                  
                  {/* Internal grid ticks for technical design effect */}
                  <div className="absolute top-4 left-4 font-mono text-[8px] text-[#F0EADF]/20 uppercase tracking-wider">
                    gl_scene_container_04
                  </div>
                  <div className="absolute bottom-4 right-4 font-mono text-[8px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                    3D Port Active
                  </div>

                  {/* Empty Stage Illustration Placeholder (represents empty space for dynamic 3D Sofa model that will slide on scroll) */}
                  <div id="sofa-placeholder-content" className="flex-1 flex flex-col justify-center items-center text-center space-y-3 relative z-10 py-6 select-none animate-pulse" style={{ animationDuration: "3s" }}>
                    
                    {/* Outline vector matching visual sofa posture */}
                    <div className="w-24 h-20 relative flex flex-col justify-end items-center opacity-30 group-hover:opacity-75 transition-opacity">
                      {/* Sofa back support bubble */}
                      <div className="w-20 h-14 rounded-t-3xl border border-[#F0EADF]/40 absolute top-0" />
                      {/* Cushion plate */}
                      <div className="w-22 h-6 bg-[#F0EADF]/10 rounded-xl border border-[#F0EADF]/30 z-10" />
                      {/* Tiny wooden pegs/legs bottom */}
                      <div className="flex justify-between w-18 px-3 mt-1">
                        <div className="w-1.5 h-3 bg-[#F0EADF]/30 rounded-full" />
                        <div className="w-1.5 h-3 bg-[#F0EADF]/30 rounded-full" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="font-primary text-[9px] font-extrabold uppercase tracking-widest text-[#F0EADF] block">
                        3D Sofa Attachment Point
                      </span>
                      <p className="font-secondary italic text-[10px] leading-relaxed text-[#F0EADF]/60 max-w-[180px] mx-auto">
                        This clean coordinate stage is primed. High-definition 3D model will mount and slide here on scroll trigger.
                      </p>
                    </div>

                  </div>

                  {/* Aesthetic 3D grid reference markers */}
                  <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-[1px] border-t border-dashed border-[#F0EADF]/10 pointer-events-none" />
                  <div className="absolute inset-y-8 left-1/2 -translate-x-1/2 w-[1px] border-l border-dashed border-[#F0EADF]/10 pointer-events-none" />

                </div>

              </div>

              {/* Right Column (Span 4): Boldness Paragraph */}
              <div className="lg:col-span-4 flex flex-col justify-center space-y-4 text-left select-none lg:pl-6">
                <h3 className="font-primary text-xs sm:text-sm font-black uppercase tracking-wider text-[#F0EADF] border-l-2 border-[#F0EADF]/50 pl-3 leading-snug">
                  In the premium segment,<br />
                  invisibility costs<br />
                  more than boldness.
                </h3>
                <p className="font-secondary italic text-xs leading-relaxed text-[#F0EADF]/85">
                  Invisibility in the premium segment is more expensive than boldness. Standard commonplace furniture not only &ldquo;doesn&apos;t work&rdquo; but also dilutes the natural character of the space and reduces commercial impact.
                </p>
                <div className="pt-2">
                  <span className="font-mono text-[9px] text-[#F0EADF]/40 uppercase tracking-widest">[ Core metrics / 04 ]</span>
                </div>
              </div>

            </div>

            {/* BOTTOM BLOCK: Full-width matching metric cards precisely as in the reference layout */}
            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-[#F0EADF]/15 pt-8 mt-12 relative z-10 select-none">
              
              {/* Stat 1 */}
              <div className="flex flex-col space-y-1.5">
                <span className="font-primary text-4xl sm:text-5xl font-black tracking-tight text-[#F0EADF] leading-none">
                  75%
                </span>
                <p className="font-secondary text-[10px] sm:text-xs leading-relaxed text-[#F0EADF]/70">
                  of adults form a permanent visual opinion about a space within the first 38&ndash;60 seconds.
                </p>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col space-y-1.5">
                <span className="font-primary text-4xl sm:text-5xl font-black tracking-tight text-[#F0EADF] leading-none">
                  25%
                </span>
                <p className="font-secondary text-[10px] sm:text-xs leading-relaxed text-[#F0EADF]/70">
                  higher budget alignment score when presented with custom bespoke seating configurations.
                </p>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col space-y-1.5">
                <span className="font-primary text-4xl sm:text-5xl font-black tracking-tight text-[#F0EADF] leading-none">
                  90 min.
                </span>
                <p className="font-secondary text-[10px] sm:text-xs leading-relaxed text-[#F0EADF]/70">
                  average session dwell-time with comfortable seats instead of standard 45 minutes.
                </p>
              </div>

              {/* Stat 4 */}
              <div className="flex flex-col space-y-1.5">
                <span className="font-primary text-4xl sm:text-5xl font-black tracking-tight text-[#F0EADF] leading-none">
                  07 sec.
                </span>
                <p className="font-secondary text-[10px] sm:text-xs leading-relaxed text-[#F0EADF]/70">
                  is all it takes for a guest to form their definitive subconscious impression of your place.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* INFINITE RUNNING MARQUEE FOOTER BAR (Exactly styled copy of 'momento • momento • momento') */}
      <div className="w-full bg-[#2E2F2E] text-[#F0EADF] py-3.5 overflow-hidden select-none relative z-20 border-t border-[#2E2F2E]">
        <div className="flex whitespace-nowrap w-max overflow-hidden">
          <motion.div 
            className="flex gap-10 text-[10px] font-primary font-black uppercase tracking-[0.2em]"
            animate={{ x: [0, -1200] }}
            transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
          >
            <span>• xlview • momento • handcrafted opticians • bespoke luxury • premium series • timeless aesthetics • authentic luxury</span>
            <span>• xlview • momento • handcrafted opticians • bespoke luxury • premium series • timeless aesthetics • authentic luxury</span>
            <span>• xlview • momento • handcrafted opticians • bespoke luxury • premium series • timeless aesthetics • authentic luxury</span>
            <span>• xlview • momento • handcrafted opticians • bespoke luxury • premium series • timeless aesthetics • authentic luxury</span>
            <span>• xlview • momento • handcrafted opticians • bespoke luxury • premium series • timeless aesthetics • authentic luxury</span>
            <span>• xlview • momento • handcrafted opticians • bespoke luxury • premium series • timeless aesthetics • authentic luxury</span>
          </motion.div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-8 border-t border-[#2E2F2E]/10 relative z-10 gap-12 mt-auto">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Column 1: Brand description & Contact info (span 4) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-primary text-sm font-semibold tracking-wider text-[#2E2F2E] uppercase">MetaLeaf</h4>
            <p className="font-secondary text-xs text-[#2E2F2E]/75 leading-relaxed max-w-xs">
              Handcrafting bespoke luxury eyewear made from organic Italian bio-acetates and premium Japanese titanium.
            </p>
            <div className="space-y-2 pt-2 text-xs font-secondary text-[#2E2F2E]/85">
              <a href="mailto:hello@xlview.co" className="flex items-center gap-2 hover:text-[#2E2F2E] transition-colors">
                <Mail className="w-3.5 h-3.5" />
                <span>hello@xlview.co</span>
              </a>
              <a href="https://wa.me/390212345678" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#2E2F2E] transition-colors">
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp: +39 02 1234 5678</span>
              </a>
            </div>
          </div>

          {/* Column 2: Section Names (span 3) */}
          <div className="md:col-span-3 space-y-4">
            <h5 className="font-primary text-[10px] font-bold uppercase tracking-widest text-[#2E2F2E]/40">Explore</h5>
            <ul className="space-y-2 text-xs font-secondary text-[#2E2F2E]/85">
              <li>
                <a href="#header-element" className="hover:text-[#2E2F2E] transition-colors">Explore Models</a>
              </li>
              <li>
                <a href="#bicycle-section" className="hover:text-[#2E2F2E] transition-colors">Experiences</a>
              </li>
              <li>
                <a href="#achievements-section" className="hover:text-[#2E2F2E] transition-colors">Technology</a>
              </li>
              <li>
                <a href="#mistake-section" className="hover:text-[#2E2F2E] transition-colors">About Us</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Social Media Icons (span 2) */}
          <div className="md:col-span-2 space-y-4">
            <h5 className="font-primary text-[10px] font-bold uppercase tracking-widest text-[#2E2F2E]/40">Connect</h5>
            <div className="flex gap-4 items-center">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 border border-[#2E2F2E]/10 hover:border-[#2E2F2E] hover:bg-[#2E2F2E] hover:text-[#F0EADF] rounded-full transition-all duration-300" title="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 border border-[#2E2F2E]/10 hover:border-[#2E2F2E] hover:bg-[#2E2F2E] hover:text-[#F0EADF] rounded-full transition-all duration-300" title="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 border border-[#2E2F2E]/10 hover:border-[#2E2F2E] hover:bg-[#2E2F2E] hover:text-[#F0EADF] rounded-full transition-all duration-300" title="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 4: Contact Now Email Form (span 3) */}
          <div className="md:col-span-3 space-y-4">
            <h5 className="font-primary text-[10px] font-bold uppercase tracking-widest text-[#2E2F2E]/40">Contact Now</h5>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you! We'll get back to you shortly.");
                (e.target as HTMLFormElement).reset();
              }}
              className="relative flex items-center border-b border-[#2E2F2E]/25 pb-2 focus-within:border-[#2E2F2E] transition-colors"
            >
              <input 
                type="email" 
                placeholder="Your email address" 
                required
                className="w-full bg-transparent border-none text-xs placeholder-[#2E2F2E]/40 text-[#2E2F2E] focus:outline-none pr-8"
              />
              <button 
                type="submit" 
                className="absolute right-0 hover:translate-x-0.5 transition-transform text-[#2E2F2E]"
                title="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom row */}
        <div className="border-t border-[#2E2F2E]/5 pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] font-primary font-bold text-[#2E2F2E]/40 tracking-widest uppercase gap-4">
          <div>© 2026 XLVIEW Eyewear Co. All Rights Reserved.</div>
          <div className="flex gap-6">
            <a href="#terms" className="hover:text-[#2E2F2E]/80 transition-colors">Privacy Terms</a>
            <a href="#virtual" className="hover:text-[#2E2F2E]/80 transition-colors">Virtual Try-On</a>
          </div>
        </div>
      </footer>

      {/* CONFIG DRAWER SYSTEM */}
      <CustomizerDrawer
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        activeFrame={activeFrame}
        onAddToCart={handleAddToCart}
      />

      {/* SHOPPING BAG / CART OVERLAY DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#2E2F2E] z-50 pointer-events-auto"
              onClick={() => setIsCartOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-[#F0EADF] text-[#2E2F2E] z-50 shadow-2xl flex flex-col border-l border-[#2E2F2E]/10"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#2E2F2E]/10 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <h2 className="font-secondary text-lg font-bold">Your Custom Order Bag</h2>
                  <span className="bg-[#2E2F2E] text-[#F0EADF] text-[10px] px-2 py-0.5 rounded-full font-bold">
                    {cartItems.length} Saved
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-8 h-8 rounded-full border border-[#2E2F2E]/10 hover:border-[#2E2F2E] flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col justify-center items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-[#2E2F2E]/5 border border-dashed border-[#2E2F2E]/20 flex items-center justify-center">
                      <Compass className="w-6 h-6 text-[#2E2F2E]/50 animate-spin" style={{ animationDuration: '8s' }} />
                    </div>
                    <div className="space-y-1">
                      <p className="font-secondary text-sm font-bold">Your bag is empty</p>
                      <p className="font-primary text-xs text-[#2E2F2E]/60 max-w-xs">
                        Customize glasses by choosing gold/matte frames and premium blueprint lenses.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        setIsCustomizerOpen(true);
                      }}
                      className="font-primary text-xs font-bold uppercase tracking-wider px-5 py-2.5 bg-[#2E2F2E] text-[#F0EADF] hover:bg-[#2E2F2E]/90 rounded-full"
                    >
                      Bespoke Customizer
                    </button>
                  </div>
                ) : (
                  cartItems.map((item, index) => {
                    const matchedFrame = FRAME_STYLES.find(fs => fs.id === item.frameId);
                    return (
                      <motion.div
                        key={`${item.frameId}-${index}`}
                        className="p-4 rounded-xl border border-[#2E2F2E]/10 bg-[#2E2F2E]/5 flex gap-4 items-start relative group"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        {/* Thumbnail */}
                        <div className="w-16 h-16 rounded border border-[#2E2F2E]/10 bg-white/40 overflow-hidden flex-shrink-0">
                          <img
                            src={matchedFrame?.detailLeftImage || activeFrame.detailLeftImage}
                            alt={item.frameName}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Description */}
                        <div className="flex-1 space-y-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-secondary text-xs font-bold text-[#2E2F2E]">{item.frameName}</h4>
                            <span className="font-primary text-xs font-bold text-[#2E2F2E]">${item.totalPrice}</span>
                          </div>
                          
                          <p className="font-primary text-[10px] text-[#2E2F2E]/60">
                            Finish: {item.frameColor}
                          </p>
                          <p className="font-primary text-[10px] text-[#2E2F2E]/60">
                            Lens: {item.lensType.split("™")[0]} Coating
                          </p>
                          <p className="font-primary text-[10px] text-[#2E2F2E]/60">
                            Rx Type: {item.prescriptionType.split(" (")[0]}
                          </p>
                          
                          {item.engraving && (
                            <p className="font-primary text-[9px] font-bold text-emerald-700 bg-emerald-50 inline-block px-1.5 py-0.5 rounded border border-emerald-100 mt-2">
                              Laser Engrave: "{item.engraving}"
                            </p>
                          )}
                        </div>

                        {/* Delete absolute button */}
                        <button
                          onClick={() => handleRemoveFromCart(index)}
                          className="absolute bottom-2 right-2 p-1.5 text-red-700/60 hover:text-red-700 transition-colors rounded-lg bg-red-50 hover:bg-red-100 border border-red-200"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
                    );
                  })
                )}
              </div>

              {/* Total checkout */}
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-[#2E2F2E]/10 bg-[#F0EADF]">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-primary text-xs font-bold uppercase tracking-wider text-[#2E2F2E]/60">Order Subtotal</span>
                    <span className="font-secondary text-xl font-bold">
                      ${cartItems.reduce((acc, curr) => acc + curr.totalPrice, 0)}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      alert("Successfully initiated secure checkout at checkout.xlview.co");
                    }}
                    className="w-full py-3 bg-[#2E2F2E] text-[#F0EADF] font-primary text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-[#2E2F2E]/90 transition-all duration-300"
                  >
                    Proceed to Delivery
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
