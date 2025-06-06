import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom"; // 改為 react-router-dom，除非你有特別理由用 router

const Carousel = ({ products = [] }) => {
    const [startIndex, setStartIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(3); // 預設 3
    const [direction, setDirection] = useState(0); // 1 = 下一張，-1 = 上一張

    // 1️⃣ 響應式調整可見卡片數
    useEffect(() => {
        const updateVisibleCount = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setVisibleCount(1); // 手機：1
            } else if (width < 768) {
                setVisibleCount(2); // 平板：2
            } else {
                setVisibleCount(3); // 中型以上：固定 3
            }
        };

        updateVisibleCount(); // 初始設定
        window.addEventListener("resize", updateVisibleCount);
        return () => window.removeEventListener("resize", updateVisibleCount);
    }, []);

    // 2️⃣ 防止 startIndex 超過邊界
    useEffect(() => {
        if (startIndex > products.length - visibleCount) {
            setStartIndex(Math.max(products.length - visibleCount, 0));
        }
    }, [visibleCount, products.length]);

    // 3️⃣ 處理切換邏輯
    const handlePrev = () => {
        if (startIndex > 0) {
            setDirection(-1);
            setStartIndex((prev) => prev - 1);
        }
    };

    const handleNext = () => {
        if (startIndex < products.length - visibleCount) {
            setDirection(1);
            setStartIndex((prev) => prev + 1);
        }
    };

    const visibleProducts = products.slice(startIndex, startIndex + visibleCount);

    return (
        <div className="relative w-full flex items-center justify-center p-4">
            {/* ⬅️ 左箭頭 */}
            <button
                className="btn btn-circle z-10 mr-2"
                onClick={handlePrev}
                disabled={startIndex === 0}
            >
                ❮
            </button>

            {/* 🖼️ 卡片群組（含動畫） */}
            <div className="w-full max-w-[920px] h-[280px] md:h-[400px] relative overflow-hidden flex justify-center items-center">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={startIndex}
                        className="absolute top-0 -translate-x-1/2 flex gap-4"
                        custom={direction}
                        initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {visibleProducts.map((item) => (
                            <motion.div
                                key={item.id}
                                className="flex card w-40 md:w-56 h-auto bg-primary shadow-xl items-center justify-center"
                                layout
                            >
                                <Link
                                    to={`/product/${item.id}`}
                                    onClick={() =>
                                        window.scrollTo({ top: 0, behavior: "smooth" })
                                    }
                                    className="w-full h-full"
                                >
                                    <figure>
                                        <img
                                            src={item.cover}
                                            alt={item.name}
                                            className="h-auto w-full rounded-lg"
                                        />
                                    </figure>
                                    <div className="text-center">
                                        <h2>{item.name}</h2>
                                        <h2 className="text-center">${item.price}</h2>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* ➡️ 右箭頭 */}
            <button
                className="btn btn-circle z-10 ml-2"
                onClick={handleNext}
                disabled={startIndex >= products.length - visibleCount}
            >
                ❯
            </button>
        </div>
    );
};

export default Carousel;
