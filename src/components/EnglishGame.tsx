
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { BookOpen } from 'lucide-react';
import Image from 'next/image';

const books = [
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    coverUrl: "https://picsum.photos/300/450",
    hint: "justice Alabama"
  },
  {
    title: "1984",
    author: "George Orwell",
    coverUrl: "https://picsum.photos/300/451",
    hint: "dystopian big brother"
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverUrl: "https://picsum.photos/300/452",
    hint: "jazz age wealth"
  }
];

export default function EnglishGame() {
    const [flipped, setFlipped] = useState<number[]>([]);

    const handleFlip = (index: number) => {
        if (flipped.includes(index)) {
            setFlipped(flipped.filter(i => i !== index));
        } else {
            setFlipped([...flipped, index]);
        }
    };
  
  return (
    <section className="w-full max-w-5xl mx-auto py-12 px-4">
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold font-headline text-center text-primary">
          A Shelf of Classics
        </h2>
        <p className="text-center text-gray-300 mt-2 mb-8">
          A tribute to the stories and lessons you've shared. Click on a book to see the title.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {books.map((book, index) => (
            <div key={index} className="perspective-[1000px] group">
              <motion.div
                className="relative w-full h-[240px] md:h-[300px] transform-style-3d transition-transform duration-700"
                animate={{ rotateY: flipped.includes(index) ? 180 : 0 }}
                onClick={() => handleFlip(index)}
              >
                {/* Front of the card (Book Cover) */}
                <div className="absolute w-full h-full backface-hidden flex items-center justify-center rounded-lg overflow-hidden border-2 border-amber-300/20 shadow-lg">
                   <Image 
                      src={book.coverUrl} 
                      alt={`Cover of ${book.title}`} 
                      fill
                      className="object-cover"
                      data-ai-hint={book.hint}
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                    <BookOpen className="w-12 h-12 text-white/70 absolute z-10 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                </div>

                {/* Back of the card (Book Info) */}
                <div className="absolute w-full h-full backface-hidden transform rotate-y-180 bg-slate-800 rounded-lg shadow-lg flex flex-col items-center justify-center p-4 text-center border-2 border-amber-300/40">
                  <h3 className="font-bold font-headline text-amber-200 text-lg">{book.title}</h3>
                  <p className="text-gray-300 text-sm mt-1">by {book.author}</p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
         <div className="mt-10 text-center">
            <p className="text-gray-200">Happy reading, Sir!</p>
        </div>
      </div>
    </section>
  );
}

// Add these to your globals.css or a style tag if not there already
// .perspective-1000 { perspective: 1000px; }
// .transform-style-3d { transform-style: preserve-3d; }
// .backface-hidden { backface-visibility: hidden; }
// .rotate-y-180 { transform: rotateY(180deg); }

