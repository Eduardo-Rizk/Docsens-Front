"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, ArrowUpRight } from "lucide-react";
import { institutions } from "@/lib/domain";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

type Tab = "ALL" | "UNIVERSITY" | "SCHOOL";

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState<Tab>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredInstitutions = institutions.filter((inst) => {
    // Filter by Tab
    if (activeTab !== "ALL" && inst.type !== activeTab) return false;
    
    // Filter by Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        inst.name.toLowerCase().includes(query) ||
        inst.shortName.toLowerCase().includes(query) ||
        inst.city.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  return (
    <div className="min-h-screen pt-20 pb-20">
      <div className="container mx-auto px-4 sm:px-8">
        
        {/* Header & Search */}
        <div className="max-w-2xl mx-auto text-center mb-12 space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-display font-bold"
          >
            Explore o Conhecimento
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Encontre escolas e faculdades de elite para alavancar sua carreira.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground">
              <Search size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Buscar por nome da instituição..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-full glass bg-white/5 border-white/10 focus:border-brand-primary/50 focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all placeholder:text-muted-foreground/50"
            />
          </motion.div>
        </div>

        {/* Filters */}
        <div className="flex justify-center mb-12">
          <div className="flex p-1 bg-surface-hover/50 backdrop-blur-md rounded-full border border-white/5">
            {[
              { id: "ALL", label: "Todas" },
              { id: "UNIVERSITY", label: "Faculdades" },
              { id: "SCHOOL", label: "Escolas" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 relative",
                  activeTab === tab.id 
                    ? "text-white" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="active-filter-tab"
                    className="absolute inset-0 bg-brand-primary rounded-full shadow-lg shadow-brand-primary/25"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid Results */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredInstitutions.map((inst) => (
              <motion.div
                key={inst.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                layout
                transition={{ duration: 0.3 }}
              >
                <Link href={`/instituicoes/${inst.id}`}>
                  <GlassCard className="h-full group flex flex-col justify-between overflow-hidden relative border-white/5 bg-gradient-to-br from-white/5 to-white/0 hover:border-brand-primary/30 min-h-[220px]">
                    
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/0 via-brand-primary/5 to-brand-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    
                    <div className="flex items-start justify-between mb-6">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white p-2 shadow-inner">
                        <Image
                          src={inst.logoUrl}
                          alt={inst.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="p-2 rounded-full glass group-hover:bg-brand-primary group-hover:text-white transition-colors">
                        <ArrowUpRight size={20} />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-display font-bold mb-2 group-hover:text-brand-primary transition-colors">
                        {inst.shortName}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{inst.name}</p>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredInstitutions.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-20 text-muted-foreground"
            >
              <p className="text-xl">Nenhuma instituição encontrada.</p>
              <button 
                onClick={() => {setSearchQuery(""); setActiveTab("ALL")}}
                className="mt-4 text-brand-primary underline hover:text-brand-accent"
              >
                Limpar filtros
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
