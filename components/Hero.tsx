"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4 sm:px-8">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-primary/20 via-background to-background" />
      
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-brand-primary/30 rounded-full blur-3xl animate-float delay-1000" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-accent/20 rounded-full blur-3xl animate-float delay-700" />

      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8 text-center lg:text-left"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-brand-primary/20 text-brand-primary font-medium text-sm w-fit mx-auto lg:mx-0"
          >
            <Sparkles size={16} />
            <span>Marketplace Educacional Curado</span>
          </motion.div>

          <h1 className="text-5xl sm:text-7xl font-display font-bold tracking-tight leading-[1.1]">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 text-glow animate-pulse">
              Docsens
            </span>
            <span className="block text-2xl sm:text-4xl mt-4 font-sans font-normal text-muted-foreground">
              O futuro do aprendizado <br className="hidden sm:block" /> com quem vive o mercado.
            </span>
          </h1>

          <p className="text-lg text-muted-foreground/80 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Conectamos você a ex-alunos de instituições de elite para mentorias e aulões ao vivo que transformam sua carreira.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <Link 
              href="/explorar" 
              className="group relative px-8 py-4 bg-brand-primary text-white rounded-full font-semibold transition-all hover:shadow-[0_0_40px_-5px_rgba(var(--brand-primary),0.6)] hover:scale-105 active:scale-95 flex items-center justify-center gap-2 overflow-hidden"
            >
              <span className="relative z-10">Explorar Aulas</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-shimmer" />
            </Link>
            
            <Link 
              href="/professor/cadastro" 
              className="px-8 py-4 glass text-foreground rounded-full font-semibold hover:bg-white/10 transition-colors flex items-center justify-center hover:scale-105 active:scale-95"
            >
              Quero ser mentor
            </Link>
          </div>
        </motion.div>

        {/* 3D Visual Element */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative h-[400px] sm:h-[500px] w-full flex items-center justify-center"
        >
          {/* Animated SVG Shape - Abstract "D" or Futuristic Form */}
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              y: [0, -20, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="relative w-64 h-64 sm:w-80 sm:h-80"
          >
             {/* Glowing Orb Core */}
            <div className="absolute inset-0 bg-brand-primary rounded-full blur-[80px] opacity-40 animate-pulse" />
            
            {/* Glass Geometric Shape */}
            <div className="absolute inset-0 glass rounded-[2rem] border border-white/20 shadow-2xl backdrop-blur-xl rotate-12 flex items-center justify-center group overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-brand-accent/20 opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
               <div className="w-full h-full relative">
                 {/* Decorative lines */}
                 <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent animate-scan" />
                 <div className="absolute bottom-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/50 to-transparent animate-scan delay-700" />
               </div>
               
               {/* 3D-like content inside */}
               <div className="relative z-10 text-white font-display text-9xl font-bold opacity-20 select-none">
                 DoS
               </div>
            </div>

            {/* Floating Elements around */}
            <motion.div 
              animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -top-8 -right-8 w-16 h-16 glass rounded-2xl flex items-center justify-center text-2xl"
            >
              🚀
            </motion.div>
            
            <motion.div 
              animate={{ y: [10, -10, 10], x: [5, -5, 5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-4 -left-12 w-20 h-20 glass rounded-full flex items-center justify-center text-3xl"
            >
              🎓
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
