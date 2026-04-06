import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Leaf,
  Compass,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import Header from "../Components/header/index";
import Footer from "../Components/footer/index";
import fondoContacto from "../assets/portadaProyecto3.webp";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const fadeInUp = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

function Contacto() {
  return (
    <div className="min-h-screen bg-black flex flex-col font-sans overflow-x-hidden">
      <Header />

      <main className="flex-grow relative pt-20">
        <div className="absolute inset-0 h-[70vh] lg:h-screen w-full overflow-hidden">
          <motion.img
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
            src={fondoContacto}
            alt="Risaralda Landscape"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black"></div>
        </div>

        <section className="relative pt-40 pb-20 px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-7xl mx-auto"
          >
            <motion.div
              variants={fadeInUp}
              className="max-w-4xl mb-24 text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#20A217]/20 border border-[#20A217]/30 text-[#20A217] text-xs font-bold uppercase tracking-widest mb-8"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#20A217] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#20A217]"></span>
                </span>
                Soporte en línea 24/7
              </motion.div>

              <h1 className="text-6xl md:text-8xl font-black text-white leading-none pb-8">
                Hablemos de tu próxima
                <br />
                <span className="bg-clip-text bg-gradient-to-r text-[#20A217]">
                  aventura.
                </span>
              </h1>
            </motion.div>

            {/* Tarjetas de contacto aquí */}
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Contacto;