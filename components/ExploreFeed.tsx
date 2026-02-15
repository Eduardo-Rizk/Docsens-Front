"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { institutions, type Institution } from "@/lib/domain";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

type Tab = "UNIVERSITY" | "SCHOOL";

export function ExploreFeed() {
  const [activeTab, setActiveTab] = useState<Tab>("UNIVERSITY");

  const filteredInstitutions = institutions.filter(
    (inst) => inst.type === activeTab
  );

  return (
    <section id="explore" className="py-20 px-4 sm:px-8 relative z-10">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-center md:text-left">
            Explore por <span className="text-brand-accent">Instituição</span>
          </h2>

          {/* Tabs */}
          <div className="flex p-1 bg-surface-hover/50 backdrop-blur-md rounded-full border border-white/5">
            <button
              onClick={() => setActiveTab("UNIVERSITY")}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 relative",
                activeTab === "UNIVERSITY" 
                  ? "text-brand-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {activeTab === "UNIVERSITY" && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-brand-primary rounded-full shadow-lg shadow-brand-primary/25"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">Faculdades</span>
            </button>
            <button
              onClick={() => setActiveTab("SCHOOL")}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 relative",
                activeTab === "SCHOOL" 
                  ? "text-brand-secondary-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {activeTab === "SCHOOL" && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-brand-secondary rounded-full shadow-lg shadow-brand-secondary/25"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">Escolas</span>
            </button>
          </div>
        </div>

        {/* Grid */}
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
                  <GlassCard className="h-full group flex flex-col justify-between overflow-hidden relative border-white/5 bg-gradient-to-br from-white/5 to-white/0 hover:border-brand-primary/30">
                    
                    {/* Hover Glow Effect */}
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
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
