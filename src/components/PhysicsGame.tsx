
"use client";

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { CheckCircle, XCircle } from 'lucide-react';

const levels = [
  {
    name: "Newton's Second Law",
    formula: "F = m × a",
    equation: ['F', '=', 'm', '×', 'a'],
    parts: ['F', 'm', 'a'],
    distractors: ['v', 't'],
  },
  {
    name: 'Kinetic Energy',
    formula: 'KE = ½mv²',
    equation: ['KE', '=', '½', 'm', 'v²'],
    parts: ['KE', 'm', 'v²'],
    distractors: ['a', 'F'],
  },
];

const DraggableItem = ({ item, onDrop, onDragStart }) => {
  return (
    <motion.div
      drag
      onDragStart={onDragStart}
      onDragEnd={(event, info) => onDrop(info, item)}
      whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(255, 255, 255, 0.4)' }}
      whileTap={{ scale: 0.9, cursor: 'grabbing' }}
      className="w-16 h-16 md:w-20 md:h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-lg md:text-xl font-bold font-headline text-amber-300 cursor-grab shadow-lg"
    >
      {item}
    </motion.div>
  );
};

const DropZone = ({ id, content, isFilled, isCorrect }) => {
  const baseClasses = "w-20 h-20 md:w-24 md:h-24 rounded-lg flex items-center justify-center text-2xl md:text-3xl font-bold font-headline transition-all duration-300";
  const filledClasses = isFilled
    ? `bg-amber-400/20 border-amber-400 text-amber-200 shadow-lg scale-105`
    : `bg-black/20 border-dashed border-white/20 text-gray-500`;

  let displayContent = content;
  if (isFilled) {
     if (isCorrect) {
       displayContent = <CheckCircle className="text-green-400" />;
     } else if(isCorrect === false) {
       displayContent = <XCircle className="text-red-400" />;
     }
  }


  return (
    <div data-dropzone-id={id} className={`${baseClasses} ${filledClasses}`}>
      {isFilled ? content : '?'}
    </div>
  );
};

export default function PhysicsGame() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [droppedItems, setDroppedItems] = useState({});
  const [feedback, setFeedback] = useState({});
  const [gameCompleted, setGameCompleted] = useState(false);

  const currentLevel = levels[levelIndex];
  const draggableElements = useMemo(() => {
    const all = [...currentLevel.parts, ...currentLevel.distractors];
    return all.sort(() => Math.random() - 0.5);
  }, [levelIndex]);

  const handleDrop = (info, item) => {
    const dropZones = Array.from(document.querySelectorAll('[data-dropzone-id]'));
    const dropZone = dropZones.find(dz => {
      const rect = dz.getBoundingClientRect();
      return (
        info.point.x >= rect.left &&
        info.point.x <= rect.right &&
        info.point.y >= rect.top &&
        info.point.y <= rect.bottom
      );
    });
  
    if (dropZone) {
      const dropZoneId = dropZone.getAttribute('data-dropzone-id');
      const expectedItem = currentLevel.equation[dropZoneId];
      
      setDroppedItems(prev => ({ ...prev, [dropZoneId]: item }));
      setFeedback(prev => ({ ...prev, [dropZoneId]: item === expectedItem }));
    }
  };

  const isLevelComplete = useMemo(() => {
    return currentLevel.parts.every(part => {
      const dropZoneIndex = currentLevel.equation.indexOf(part);
      return droppedItems[dropZoneIndex] === part;
    });
  }, [droppedItems, currentLevel]);

  const handleNextLevel = () => {
    if (levelIndex < levels.length - 1) {
      setLevelIndex(prev => prev + 1);
      setDroppedItems({});
      setFeedback({});
    } else {
      setGameCompleted(true);
    }
  };

  const resetLevel = () => {
    setDroppedItems({});
    setFeedback({});
  };

  if (gameCompleted) {
    return (
      <section className="w-full max-w-5xl mx-auto py-12 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8"
        >
          <h2 className="text-3xl font-bold font-headline text-primary">Congratulations!</h2>
          <p className="mt-4 text-lg text-gray-200">
            You've completed all the challenges! Pallab Sir, you nailed it!
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
          F = ma Challenge
        </h2>
        <p className="text-center text-gray-300 mt-2">
          Drag the correct elements to form the formula for: <span className="font-semibold text-white">{currentLevel.name}</span>
        </p>

        {/* The formula board */}
        <motion.div
          key={levelIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-center gap-2 md:gap-4 my-8 p-4 bg-black/20 rounded-xl"
        >
          {currentLevel.equation.map((part, index) => {
            if (currentLevel.parts.includes(part)) {
              return (
                <DropZone
                  key={index}
                  id={index}
                  content={droppedItems[index] || '?'}
                  isFilled={!!droppedItems[index]}
                  isCorrect={feedback[index]}
                />
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
          {draggableElements.map((item) => (
            <DraggableItem
              key={item}
              item={item}
              onDrop={handleDrop}
              onDragStart={() => {}}
            />
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
           <Button onClick={resetLevel} variant="outline" className="bg-white/10">Reset Level</Button>
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
