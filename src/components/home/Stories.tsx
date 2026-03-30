import React, { useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Story, storyService } from '../../services/story.service';

import { StoryCard } from './StoryCard';
import { StoryModal } from './StoryModal';


interface StoriesProps {
    hideHeader?: boolean;
}

export const Stories: React.FC<StoriesProps> = ({ hideHeader = false }) => {
    const [stories, setStories] = useState<Story[]>([]);
    const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await storyService.getActiveStories();
                if (response.success) {
                    setStories(response.data.stories);
                    if (response.data.stories.length > 0) {
                        setActiveStoryIndex(0);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch stories', error);
            }
        };
        fetchStories();
    }, []);

    useEffect(() => {
        if (!scrollRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const index = Number(entry.target.getAttribute('data-index'));
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
                        setActiveStoryIndex(index);
                    }
                });
            },
            {
                root: scrollRef.current,
                threshold: [0.6],
            }
        );

        const children = scrollRef.current.children;
        for (let i = 0; i < children.length; i++) {
            observer.observe(children[i]);
        }

        return () => observer.disconnect();
    }, [stories]);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    if (stories.length === 0) return null;

    return (
        <section className="py-8 bg-white border-b border-gray-100 overflow-hidden" ref={containerRef}>
            <div className="container mx-auto px-4 relative group">
                {!hideHeader && (
                    <div className="mb-6 text-center max-w-2xl mx-auto px-4">
                        <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-2 tracking-tight">
                            From Manufacturing to Your Doorstep
                        </h2>
                        <p className="text-gray-500 text-[10px] md:text-sm leading-relaxed font-medium">
                            Watch how every product is crafted with precision, quality, and care — before it reaches you.
                        </p>
                    </div>
                )}

                <div className="flex items-center mb-4 px-1 md:px-0">
                    <div className="flex gap-2 ml-auto">
                        <button
                            onClick={() => scroll('left')}
                            className="p-1.5 md:p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors bg-white/50 backdrop-blur-sm shadow-sm"
                        >
                            <FiChevronLeft size={18} className="md:w-5 md:h-5" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="p-1.5 md:p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors bg-white/50 backdrop-blur-sm shadow-sm"
                        >
                            <FiChevronRight size={18} className="md:w-5 md:h-5" />
                        </button>
                    </div>
                </div>

                {/* Scrollable Container */}
                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {stories.map((story, index) => (
                        <div
                            key={story._id}
                            data-index={index}
                            className="snap-start"
                        >
                            <StoryCard
                                story={story}
                                onOpen={() => {
                                    setSelectedStoryIndex(index);
                                    setIsModalOpen(true);
                                    storyService.incrementViews(story._id);
                                }}
                                isActiveInViewport={activeStoryIndex === index}
                            />
                        </div>
                    ))}
                </div>

                {/* Modal */}
                <StoryModal
                    stories={stories}
                    initialIndex={selectedStoryIndex}
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            </div>

            <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-progress {
          animation: progress 15s linear forwards;
        }
      `}</style>
        </section>
    );
};
