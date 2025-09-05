"use client";

import { useState } from 'react';
import { Atom, FlaskConical, Beaker, Orbit, Lightbulb, BrainCircuit, Gift } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';


interface CelebrationClientProps {
  easterEggs: string[];
}

const icons = [
  { Icon: Atom, color: 'text-sky-300' },
  { Icon: FlaskConical, color: 'text-pink-400' },
  { Icon: Gift, color: 'text-amber-300' },
  { Icon: Orbit, color: 'text-green-400' },
  { Icon: Lightbulb, color: 'text-orange-400' },
  { Icon: BrainCircuit, color: 'text-indigo-400' },
];

const CelebrationClient = ({ easterEggs }: CelebrationClientProps) => {
  const [showGiftNote, setShowGiftNote] = useState(false);

  const giftVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0 }
  };

  const triggerConfetti = () => {
    const evt = new CustomEvent("confetti-burst");
    window.dispatchEvent(evt);
  }

  const triggerFireworks = () => {
    const evt = new CustomEvent("fireworks");
    window.dispatchEvent(evt);
  }
  
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 pb-48">
       <header className="text-center">
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-extrabold font-headline tracking-tight drop-shadow-lg"
        >
          Happy Teacher's Day,
          <span className="block text-3xl md:text-5xl mt-2 text-amber-300">Pallab Sir ✨</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 max-w-2xl mx-auto text-gray-200 text-base sm:text-lg"
        >
          This small website is my way of saying thank you on this special day.
        </motion.p>
        
        <motion.div 
          initial={{y: 20, opacity: 0}}
          animate={{y: 0, opacity: 1}}
          transition={{delay: 0.8}}
          className="mt-8 flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
            <Button
              onClick={triggerConfetti}
              variant="outline"
              className="bg-amber-400/10 border-amber-400 text-amber-200 hover:bg-amber-400/20 hover:text-amber-100"
            >
              Surprise!
            </Button>
            <Button
              onClick={() => {
                document.getElementById("tribute")?.scrollIntoView({ behavior: "smooth" });
              }}
               variant="outline"
              className="bg-sky-400/10 border-sky-400 text-sky-200 hover:bg-sky-400/20 hover:text-sky-100"
            >
              Read Tribute
            </Button>
        </motion.div>
      </header>


      <main className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <motion.div
            id="tribute"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white/5 backdrop-blur-lg border border-white/5 rounded-2xl p-4 sm:p-6"
          >
            <h2 className="text-2xl font-semibold font-headline text-primary">A Personal Tribute</h2>
            <p className="mt-4 text-gray-200 leading-relaxed">
              Sir, you have made physics come alive for me. Your guidance and support inspire me every day. Thank you for igniting my curiosity and illuminating the universe to me. Click on the floating icons to find some hidden surprises!
            </p>
             <div className="mt-6 flex gap-3 flex-wrap">
              <Button
                onClick={() => setShowGiftNote(s => !s)}
                size="sm"
                className="bg-amber-300/10 border border-amber-300 text-amber-200 hover:bg-amber-400/20"
              >
                A special note
              </Button>
            </div>
             <AnimatePresence>
              {showGiftNote && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={giftVariants}
                  transition={{ duration: 0.35 }}
                  className="mt-6 p-4 rounded-xl bg-amber-400/10 border border-amber-400"
                >
                  <h3 className="font-semibold text-amber-200">A quick hint...</h3>
                  <p className="mt-2 text-gray-200">Click the icons on the right to reveal the hidden messages!</p>
                </motion.div>
              )}
            </AnimatePresence>

        </motion.div>
         <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/5"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold font-headline text-primary">Secret Surprises</h3>
              <div className="text-sm text-gray-300">Click to reveal</div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:gap-4">
              {easterEggs.map((egg, index) => {
                const { Icon, color } = icons[index % icons.length];
                return (
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                       <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition cursor-pointer border border-white/10 text-left"
                       >
                          <Icon className={`${color} w-8 h-8`} />
                          <p className="mt-2 text-sm text-gray-300 font-medium">Message #{index + 1}</p>
                       </motion.button>
                    </DialogTrigger>
                     <DialogContent className="bg-[#08102a]/80 backdrop-blur-xl border-violet-400/30 text-white">
                      <DialogHeader>
                        <DialogTitle className="text-primary font-headline">A Little Physics Fun!</DialogTitle>
                        <DialogDescription className="pt-4 text-base text-gray-200">
                          {egg}
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                )
              })}
            </div>
         </motion.div>
      </main>

      <section className="mt-12 text-center">
          <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="inline-block p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0b2340]/40 to-[#12304a]/30 border border-white/5"
          >
            <h3 className="text-2xl font-semibold font-headline text-primary">Thank you, Sir!</h3>
            <p className="mt-3 text-gray-200 max-w-xl">
              Wishing you a very Happy Teacher’s Day!
            </p>
            <div className="mt-4">
              <Button
                onClick={triggerFireworks}
                className="bg-amber-400/20 border border-amber-400 text-amber-200 hover:bg-amber-400/30"
              >
                Celebrate!
              </Button>
            </div>
          </motion.div>
        </section>
    </div>
  );
};

export default CelebrationClient;
