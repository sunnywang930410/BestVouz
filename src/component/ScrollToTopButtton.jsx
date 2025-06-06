import React, { useState, useEffect } from 'react';

export default function ScrollToTopButton() {
    const [showBtn, setShowBtn] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShowBtn(true);
            } else {
                setShowBtn(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // 清理事件監聽
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        // 平滑滾動
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            {showBtn && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-12 right-8 px-4 py-2 text-base rounded-full bg-primary text-white border-none cursor-pointer z-50"
                >
                    TOP
                </button>
            )}
        </>
    );
}
