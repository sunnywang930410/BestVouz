import Carousel from "./Carousel";
import { useNavigate } from "react-router";
import MoveInVertical from "./MoveInVertical";

function Homepage({ product }) {

    const navigate = useNavigate();

    const handleNavigateToMenu = () => {
        navigate("/menu")
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
        <div className="justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-20">
                {/* 左側：蛋糕圖片、名稱、原價  */}
                <div className="flex flex-col items-center gap-4">
                    <img
                        alt={chiffonCake.name}
                        className="w-[350px] h-auto rounded-xl"
                        src={chiffonCake.cover}
                    />
                </div>
                {/* 右側：客製化選項 */}
                <div className="flex flex-col gap-4 p-8 justify-center items-center">
                    <span className="text-lg text-center ">為您獻上最好的祝福</span>
                    {/* 水果按鈕 */}
                    <div className="flex flex-row md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                        {fruitImages.map((fruit, index) => (
                            <button
                                key={index}
                                className="btn w-20 h-20 btn-circle flex items-center justify-center hover:bg-primary/10"
                            >
                                <img
                                    src={fruit}
                                    alt={`fruit-${index + 1}`}
                                    className="w-18 h-auto object-cover rounded-full"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="relative py-16">
                <h2 className={`text-2xl font-bold mb-16`}>
                    為您生命中重要的人獻上最好的祝福
                </h2>
                <MoveInVertical />
            </div>
            <hr></hr>
            <div className="pt-8">
                <h2 className={`text-2xl`}>
                    選擇你想要的蛋糕
                </h2>
                <Carousel product={product} />
            </div>
            <div className="my-14">
                <button
                    className="btn bg-secondary font-normal text-lg  active:bg-secondary-content py-6 px-12 text-info mt-4 mb-4"
                    onClick={handleNavigateToMenu}
                >開始製作你的蛋糕!</button>
            </div>

        </div>
    );
}

export default Homepage;