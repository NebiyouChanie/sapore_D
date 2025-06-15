"use client";

import * as motion from "motion/react-client";
import SmoothScrollLink from "./SmoothScrollLink";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

export default function QuickLinks({ categories }: { categories: Category[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (isInitialLoad) {
      const timer = setTimeout(() => {
        setIsInitialLoad(false);
      }, 2400); // Matches 2 animation cycles (1200ms each)
      return () => clearTimeout(timer);
    }
  }, [isInitialLoad]);

  const scroll = (direction: "left" | "right") => {
    setIsInitialLoad(false);
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = direction === "left" ? -200 : 200;
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });

    setTimeout(() => {
      if (container) {
        setShowLeftArrow(container.scrollLeft > 0);
        setShowRightArrow(
          container.scrollLeft < container.scrollWidth - container.clientWidth
        );
      }
    }, 300);
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setShowLeftArrow(container.scrollLeft > 0);
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.clientWidth
    );
  };

  return (
    <motion.div
      className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm py-3 shadow-sm border-b border-gray-100"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative px-2">
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-50 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="relative overflow-x-auto hide-scrollbar px-6"
        >
          <div className="flex gap-2 w-max">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex-shrink-0"
              >
                <SmoothScrollLink
                  href={`#${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <div className="px-4 py-2 bg-amber-50 hover:bg-amber-100 transition-colors cursor-pointer rounded-full border border-amber-200 text-amber-900 font-medium text-sm whitespace-nowrap">
                    {category.name}
                  </div>
                </SmoothScrollLink>
              </motion.div>
            ))}
          </div>
        </div>

        {showRightArrow && (
          <motion.button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg border-2 border-amber-400 hover:bg-gray-50 transition-colors"
            aria-label="Scroll right"
            initial={isInitialLoad ? { scale: 1 } : {}}
            animate={isInitialLoad ? { 
              scale: [1, 1.3, 1],
              x: [0, -10, 0],
              boxShadow: [
                "0 2px 5px rgba(0,0,0,0.1)",
                "0 0 15px rgba(251, 191, 36, 0.7)",
                "0 2px 5px rgba(0,0,0,0.1)"
              ],
              borderColor: [
                "rgb(251, 191, 36)",
                "rgb(245, 158, 11)",
                "rgb(251, 191, 36)"
              ]
            } : {}}
            transition={isInitialLoad ? { 
              duration: 1.2,
              repeat: 1, // Will play twice (initial + 1 repeat)
              ease: "easeInOut",
              times: [0, 0.5, 1]
            } : {}}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              animate={isInitialLoad ? {
                color: [
                  "rgb(120, 53, 15)",
                  "rgb(245, 158, 11)",
                  "rgb(120, 53, 15)"
                ]
              } : {}}
              transition={isInitialLoad ? {
                duration: 1.2,
                repeat: 1,
                ease: "easeInOut"
              } : {}}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.span>
          </motion.button>
        )}
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </motion.div>
  );
}