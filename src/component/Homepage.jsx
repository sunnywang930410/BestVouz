import Carousel from "./Carousel";
import { useNavigate } from "react-router";
import MoveInVertical from "./MoveInVertical";
import { useEffect, useState } from "react";
import PopularItems from "./PopularItems";
import decorations from '../json/ButterAndFruits.json'


function Homepage({ product }) {
    const [selectedDecoration, setSelectedDecoration] = useState(null);
    const navigate = useNavigate();

    // 添加 useEffect 來處理頁面載入時滾動到頂部
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []); // 空依賴數組表示只在組件掛載時執行

    const handleNavigateToMenu = () => {
        navigate("/menu");
        // 導航時也滾動到頂部
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }



    const chiffonCake = product.find(item => item.name === "戚風蛋糕");

    if (!chiffonCake) {
        return <div>error404 無法顯示戚風蛋糕</div>
    }

    // 水果圖片陣列
    const fruitImages = [
        "/img/strawberry.png",
        "/img/blueberry.png",
        "/img/kiwi.png",
        "/img/grape.png"
    ];



    return (
        <div className="flex flex-col justify-center md:pt-20 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 p-10 pt-20">
                {/* 左側：蛋糕圖片、名稱、原價  */}
                <div className="flex flex-col items-center gap-4">
                    {/* 圖片包裝：設定寬度與相對定位 */}
                    <div className="relative w-[300px] md:w-[350px] flex justify-center items-center">
                        {/* 蛋糕圖片 */}
                        <img
                            alt={chiffonCake.name}
                            className="w-full h-auto rounded-xl"
                            src={chiffonCake.cover}
                        />
                        {/* 裝飾圖片（選到才顯示） */}
                        {selectedDecoration && (
                            <img
                                src={selectedDecoration.cover}
                                alt={selectedDecoration.name}
                                className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
                            />
                        )}
                    </div>
                </div>


                {/* 右側：客製化選項 */}
                <div className="flex flex-col gap-4 p-8 justify-center items-center">
                    <h2 className="text-2xl text-center font-bold">為您獻上最好的祝福</h2>
                    {/* 水果按鈕 */}
                    <div className="flex flex-row md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                        {decorations.filter((item) => item.name !== "奶油").map((item, index) => (
                            <button
                                key={item.id}
                                onClick={() => setSelectedDecoration(item)}
                                className="btn w-20 h-20 btn-circle flex items-center justify-center hover:bg-primary/10"
                                title={item.name}
                            >
                                <img
                                    src={fruitImages[index]}  // ← 這裡是關鍵
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded-full"
                                />
                            </button>
                        ))}

                    </div>
                </div>
            </div>
            <div>
                <PopularItems />
            </div>
            <div className="justify-center items-center">
                <h2 className={`text-2xl font-bold mt-6 mb-2`}>
                    為您生命中重要的人獻上最好的祝福
                </h2>
                <MoveInVertical />
            </div>
            <hr className="w-[300px] sm:w-[500px] md:w-[700px] lg:w-[800px] mx-auto"></hr>
            <div className="pt-8 justify-center items-center">
                <h2 className={`text-2xl font-bold mb-2 text-center`}>
                    選擇你想要的蛋糕
                </h2>
                <Carousel products={product} />
            </div>
            <div className="mb-14">
                <button
                    className="btn bg-secondary font-normal text-lg  active:bg-secondary-content py-6 px-12 text-info mt-4 mb-4"
                    onClick={handleNavigateToMenu}
                >開始製作你的蛋糕!</button>
            </div>

        </div>
    );
}

export default Homepage;