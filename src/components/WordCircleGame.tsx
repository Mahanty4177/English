
"use client";

import { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';

const gameLevels = [
    {
        letters: "TEACHER".split(''),
        words: ["TEA", "EAT", "ARE", "RAT", "RATE", "REACT", "TEAR", "HEART", "CHEAT", "REACH", "HER", "HAT", "CAT", "CAR", "ART", "ERA", "EACH", "HATE", "HEAT", "CARE", "CREATE", "TEACHER"]
    }
];

const WordCircleGame = () => {
    const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
    const level = useMemo(() => gameLevels[currentLevelIndex], [currentLevelIndex]);
    
    const [foundWords, setFoundWords] = useState<string[]>([]);
    const [path, setPath] = useState<number[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

    const gameContainerRef = useRef<HTMLDivElement>(null);
    const letterPositions = useRef<Array<{ x: number; y: number }>>([]);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const currentWord = useMemo(() => path.map(i => level.letters[i]).join(''), [path, level.letters]);
    
    useEffect(() => {
        setFoundWords([]);
        resetCurrentAttempt();
    }, [currentLevelIndex]);

    const handleMouseDown = (index: number) => {
        setIsDragging(true);
        setPath([index]);
    };

    const handleMouseEnter = (index: number) => {
        if (isDragging && !path.includes(index)) {
            setPath(prevPath => [...prevPath, index]);
        }
    };
    
    const handleMouseUp = () => {
        if (!isDragging) return;

        setIsDragging(false);
        if (level.words.includes(currentWord) && !foundWords.includes(currentWord)) {
            setFoundWords(prev => [...prev, currentWord].sort((a,b) => a.length - b.length || a.localeCompare(b)));
            setFeedback('correct');
        } else if (currentWord.length > 0) {
            setFeedback('incorrect');
        }
        
        setTimeout(() => {
           resetCurrentAttempt();
        }, 500);
    };

    const resetCurrentAttempt = () => {
        setPath([]);
        setIsDragging(false);
        setFeedback(null);
    };

    const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (gameContainerRef.current) {
            const rect = gameContainerRef.current.getBoundingClientRect();
            const touch = 'touches' in e ? e.touches[0] : null;
            const clientX = touch ? touch.clientX : (e as React.MouseEvent).clientX;
            const clientY = touch ? touch.clientY : (e as React.MouseEvent).clientY;

            const x = (clientX - rect.left) / rect.width * 300;
            const y = (clientY - rect.top) / rect.height * 300;

            setMousePos({ x, y });
        }
    };
    
    // Pre-calculate letter positions
    useMemo(() => {
        const numLetters = level.letters.length;
        const radius = 120;
        const center = 150;
        letterPositions.current = Array.from({ length: numLetters }, (_, i) => {
            const angle = (i / numLetters) * 2 * Math.PI - Math.PI / 2;
            return {
                x: center + radius * Math.cos(angle),
                y: center + radius * Math.sin(angle),
            };
        });
    }, [level.letters]);
    
    return (
        <section className="w-full max-w-5xl mx-auto py-12 px-4">
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-4 sm:p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold font-headline text-center text-primary">
                    Make It So - Word Circle
                </h2>
                <p className="text-center text-gray-300 mt-2 mb-6 md:mb-8">
                    Connect the letters to form words. Find all {level.words.length} words to win!
                </p>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Game Circle */}
                    <div 
                        ref={gameContainerRef}
                        className="relative aspect-square max-w-[300px] sm:max-w-[400px] mx-auto w-full touch-none" 
                        onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}
                        onTouchMove={handleMouseMove} onTouchEnd={handleMouseUp}
                    >
                        {isClient && (
                        <>
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 300">
                             {/* Connecting line */}
                            <motion.path
                                d={path.map((p, i) => `${i === 0 ? 'M' : 'L'} ${letterPositions.current[p]?.x || 0} ${letterPositions.current[p]?.y || 0}`).join(' ') + (isDragging && path.length > 0 ? ` L ${mousePos.x} ${mousePos.y}` : '')}
                                stroke="hsl(var(--primary))"
                                strokeWidth="3"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                            />
                        </svg>
                        {level.letters.map((letter, i) => {
                            const pos = letterPositions.current[i];
                            if (!pos) return null;
                            
                            return (
                                <motion.div
                                    key={i}
                                    className="absolute w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-slate-800 border-2 border-amber-300/40 flex items-center justify-center text-xl sm:text-2xl font-bold text-amber-200 cursor-pointer select-none"
                                    style={{
                                        left: `calc(${pos.x / 3}%)`,
                                        top:  `calc(${pos.y / 3}%)`,
                                        transform: 'translate(-50%, -50%)',
                                    }}
                                    onMouseDown={() => handleMouseDown(i)}
                                    onMouseEnter={() => handleMouseEnter(i)}
                                    onTouchStart={(e) => {
                                        e.preventDefault();
                                        handleMouseDown(i)
                                    }}
                                    whileHover={{ scale: 1.1, boxShadow: '0 0 15px hsl(var(--primary))' }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    {letter}
                                </motion.div>
                            );
                        })}
                        </>
                        )}
                    </div>

                    {/* Words List */}
                    <div className="bg-slate-800/50 rounded-lg p-4 h-[350px] sm:h-[400px] flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-headline text-lg sm:text-xl text-primary">Found Words ({foundWords.length}/{level.words.length})</h3>
                            <Button variant="ghost" size="sm" onClick={() => { setFoundWords([]); resetCurrentAttempt(); }}>
                                <RefreshCw className="w-4 h-4 mr-2" /> Reset
                            </Button>
                        </div>
                        <div className="flex items-center justify-center h-12 bg-slate-900 rounded-md mb-4 text-xl sm:text-2xl font-bold tracking-widest text-white/90 min-h-[48px]">
                            {currentWord}
                            <AnimatePresence>
                               {feedback === 'correct' && <motion.div initial={{scale:0}} animate={{scale:1}} className="ml-2 text-green-400"><CheckCircle /></motion.div>}
                               {feedback === 'incorrect' && <motion.div initial={{scale:0}} animate={{scale:1}} className="ml-2 text-red-400"><XCircle /></motion.div>}
                           </AnimatePresence>
                        </div>
                        <div className="flex-1 overflow-y-auto pr-2">
                             <div className="flex flex-wrap gap-2">
                                {foundWords.map(word => (
                                    <motion.span
                                        key={word}
                                        className="px-3 py-1 bg-green-500/10 text-green-300 rounded-full text-sm font-medium"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WordCircleGame;
