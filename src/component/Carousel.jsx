import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";

const Carousel = ({ products = [] }) => {
    const [startIndex, setStartIndex] = useState(0);
    const visibleCount = 3;
    const [direction, setDirection] = useState(0); // 1 = 右移, -1 = 左移

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
        <div className="relative w-full flex items-center justify-center p-4 overflow-hidden">
            {/* ❮ 左按鈕 */}
            <button
                className="btn btn-circle z-10 mr-2"
                onClick={handlePrev}
                disabled={startIndex === 0}
            >
                ❮
            </button>

            {/* 卡片群組（有動畫） */}
            <div className=" flex w-[920px] h-[400px] relative overflow-hidden justify-center">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={startIndex} // 每次切換讓整排重繪
                        className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-4"
                        custom={direction}
                        initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {visibleProducts.map((item) => (
                            <motion.div
                                key={item.id}
                                className="flex card md:w-60 lg:w-72 h-auto bg-primary shadow-xl itmes-center justify-center"
                                layout
                            >
                                <Link to={`/product/${item.id}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="w-full h-full">
                                    <figure>
                                        <img
                                            src={item.cover}
                                            alt={item.name}
                                            className="h-auto w-full rounded-lg"
                                        />
                                    </figure>
                                    <div className=" justify-center">
                                        <h2 className=" justify-center">{item.name}</h2>
                                        <h2 className="text-center">${item.price}</h2>
                                        {/* <div className="card-actions justify-center">
                                        <div className="badge badge-outline">Fashion</div>
                                        <div className="badge badge-outline">Products</div>
                                    </div> */}
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* ❯ 右按鈕 */}
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
