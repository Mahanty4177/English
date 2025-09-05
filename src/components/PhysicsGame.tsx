
"use client";

import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';

const levels = [
  {
    name: "Newton's Second Law",
    equation: ['F', '=', 'm', 'a'],
    parts: ['F', 'm', 'a'],
    distractors: ['v', 't'],
  },
  {
    name: 'Kinetic Energy',
    equation: ['KE', '=', '½', 'm', 'v²'],
    parts: ['KE', 'm', 'v²'],
    distractors: ['g', 'p'],
  },
  {
    name: "Einstein's Mass-Energy Equivalence",
    equation: ['E', '=', 'm', 'c²'],
    parts: ['E', 'm', 'c²'],
    distractors: ['v', 'F'],
  }
];

const DraggableItem = ({ item, isDropped }) => {
  return (
    <motion.div
      layoutId={item}
      drag
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      dragElastic={0.8}
      whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(255, 255, 255, 0.4)' }}
      whileTap={{ scale: 0.9, cursor: 'grabbing' }}
      className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-lg md:text-xl font-bold font-headline text-amber-300 cursor-grab shadow-lg z-10"
      style={{ display: isDropped ? 'none' : 'flex' }}
    >
      {item}
    </motion.div>
  );
};


export default function PhysicsGame() {
  const [levelIndex, setLevelIndex] = useState(0);
  // Stores the item dropped in each slot, e.g., { 0: 'F', 2: 'm', 3: 'a' }
  const [droppedItems, setDroppedItems] = useState({});
  const [gameCompleted, setGameCompleted] = useState(false);

  const currentLevel = levels[levelIndex];
  const draggableElements = useMemo(() => {
    const all = [...currentLevel.parts, ...currentLevel.distractors];
    return all.sort(() => Math.random() - 0.5);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [levelIndex]);

  const handleDrop = (index, item) => {
    // If the slot is already filled with the correct item, do nothing
    if (droppedItems[index] === currentLevel.equation[index]) return;

    setDroppedItems(prev => ({ ...prev, [index]: item }));
  };

  const isLevelComplete = useMemo(() => {
    return currentLevel.parts.every(part => {
      const index = currentLevel.equation.indexOf(part);
      return droppedItems[index] === part;
    });
  }, [droppedItems, currentLevel]);

  const handleNextLevel = () => {
    if (levelIndex < levels.length - 1) {
      setLevelIndex(prev => prev + 1);
      setDroppedItems({});
    } else {
      setGameCompleted(true);
    }
  };

  const resetLevel = () => {
    setDroppedItems({});
  };
  
  if (gameCompleted) {
    return (
      <section className="w-full max-w-5xl mx-auto py-12 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8"
        >
          <h2 className="text-3xl font-bold font-headline text-primary">You are truly the master of the formulas!</h2>
          <p className="mt-4 text-lg text-gray-200">
            Pallab Sir, you are great!
          </p>
           <CheckCircle className="w-16 h-16 text-green-400 mx-auto mt-6"/>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-5xl mx-auto py-12 px-4">
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold font-headline text-center text-primary">
          Physics Formula Challenge
        </h2>
        <p className="text-center text-gray-300 mt-2">
          Drag the variables into the correct positions to form the equation.
        </p>

        {/* The formula board */}
        <motion.div
          key={levelIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-center gap-2 md:gap-4 my-8 p-4 bg-black/20 rounded-xl"
        >
          {currentLevel.equation.map((part, index) => {
            const isDropZone = currentLevel.parts.includes(part);
            const droppedItem = droppedItems[index];
            const isCorrect = droppedItem === part;

             if (isDropZone) {
                let bgClass = "bg-black/20 border-dashed border-white/20 text-gray-500";
                if (droppedItem) {
                    bgClass = isCorrect
                    ? "bg-green-500/20 border-green-500 text-green-200"
                    : "bg-red-500/20 border-red-500 text-red-200";
                }

                return (
                    <motion.div
                        key={index}
                        onDrop={(e) => {
                          const data = e.dataTransfer.getData('text/plain');
                          handleDrop(index, data);
                        }}
                        onDragOver={(e) => e.preventDefault()}
                        className={`w-20 h-20 md:w-24 md:h-24 rounded-lg flex items-center justify-center text-2xl md:text-3xl font-bold font-headline transition-all duration-300 ${bgClass}`}
                    >
                         {droppedItem ? (
                           isCorrect ? droppedItem : <XCircle className="text-red-300" />
                         ) : '?'}
                    </motion.div>
                );
             }

            return (
              <div key={index} className="text-2xl md:text-3xl font-bold text-gray-200 px-2">
                {part}
              </div>
            );
          })}
        </motion.div>
        
        {/* The draggable elements */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8 min-h-[100px]">
           {draggableElements.map(item => (
                <motion.div
                    key={item}
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData('text/plain', item)}
                    whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(255, 255, 255, 0.4)' }}
                    whileTap={{ scale: 0.9, cursor: 'grabbing' }}
                    className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-lg md:text-xl font-bold font-headline text-amber-300 cursor-grab shadow-lg"
                >
                    {item}
                </motion.div>
            ))}
        </div>

        <AnimatePresence>
          {isLevelComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 text-center"
            >
              <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-300 border border-green-500/20 px-4 py-2 rounded-lg">
                <CheckCircle className="w-5 h-5" />
                <span>Formula Correct! Well done!</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>


        <div className="flex items-center justify-center gap-4 mt-8">
           <Button onClick={resetLevel} variant="outline" className="bg-white/10">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset
           </Button>
          {isLevelComplete && (
             <Button onClick={handleNextLevel}>
               {levelIndex < levels.length - 1 ? 'Next Level' : 'Finish Game'}
             </Button>
          )}
        </div>
      </div>
    </section>
  );
}

    
