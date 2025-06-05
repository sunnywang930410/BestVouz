import { Search, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

const PopularItems = ({ isInMenu = false, priceSort }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const navigate = useNavigate();
    const popularItems = [
        {
            id: "chiffon-cake",
            name: '戚風蛋糕',
            url: '/img/chiffon-cake.png',
            price: 550,
            description: "戚風蛋糕以其蓬鬆輕盈的口感和濕潤細緻的質地深受喜愛。選用新鮮雞蛋、低筋麵粉與天然食材，搭配獨特的打發技術，使蛋糕既柔軟又帶有彈性，入口即化但不失嚼感。無負擔的輕盈口感，使其成為日常點心或慶祝場合的理想選擇。現在就打造屬於你的專屬戚風蛋糕，為每一刻增添溫暖與甜蜜！",
        },
        {
            id: "sponge-cake",
            name: '海綿蛋糕',
            url: '/img/sponge-cake.png',
            price: 450,
            description: "海綿蛋糕，像是一場簡單卻無可取代的溫柔。輕盈、鬆軟，入口即化，每一層都是細心打發的時光。沒有華麗的裝飾，卻有著讓人安心的香氣和口感，就像老朋友一樣熟悉又真誠。在浮躁的世界裡，它安靜地提醒著我們：簡單，才是最不簡單的美好。",
        },
        {
            id: "mango-cake",
            name: "芒果冰淇淋蛋糕",
            url: "/img/mango-cake.png",
            price: "550",
            description: "這不是普通的蛋糕，這是把夏天封存起來的奇蹟！香甜濃郁的芒果冰淇淋，搭配輕柔綿密的蛋糕層層堆疊，每一口都是陽光灑落舌尖的感動。酸甜平衡得剛剛好，不膩口、不造作，專屬未來派甜點愛好者的極致享受。想逃離日常的你，這顆芒果冰淇淋蛋糕早就準備好帶你瞬間穿越到熱帶天堂——別等，甜美永遠留給行動派！",
        },
        {
            id: "orangeYogurt-cake",
            name: '柳橙優格杯子蛋糕',
            url: '/img/orangeYogurt-cake.png',
            price: 280,
            description: "柳橙優格杯子蛋糕，清新的柳橙香氣與滑順優格的完美搭配，帶來一場清爽的味覺之旅。蛋糕體柔軟輕盈，酸甜的柳橙風味在舌尖綻放，優格霜層則增添一抹綿密口感，讓每一口都充滿層次。這款杯子蛋糕不僅是對甜點的美好詮釋，也讓人感受到來自自然的清新能量。無論是夏日午后，還是與朋友分享，它都是完美的甜點選擇。",
        },
    ];

    const handleNavigateTocake = () => {
        navigate("/menu");
        // 導航時也滾動到頂部
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    const handleOpenModal = (item) => {
        setSelectedItem(item);
        const dialog = document.getElementById("item_modal");
        if (dialog) dialog.showModal();
    };

    // 假設 popularProducts 是你載入的資料
    let sortedPopularProducts = [...popularItems];

    if (priceSort === "lowToHigh") {
        sortedPopularProducts.sort((a, b) => parseInt(a.price) - parseInt(b.price));
    } else if (priceSort === "highToLow") {
        sortedPopularProducts.sort((a, b) => parseInt(b.price) - parseInt(a.price));
    }

    return (
        <div className="mt-4 mb-8">
            {isInMenu ? (
                // ✅ 三欄網格版本
                <div className="grid md:grid-cols-3 px-4 justify-center items-center">
                    {sortedPopularProducts.map((item) => (
                        <div key={item.id} className="w-[270px] justify-center items-center rounded-xl overflow-hidden relative group">
                            <div className="relative group w-full h-auto rounded-xl overflow-hidden">
                                <img
                                    src={item.url}
                                    alt={item.name}
                                    className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-75"
                                />
                                <div className="absolute inset-0 flex items-center justify-center gap-4 
                                    bg-black/40 opacity-0 translate-y-full 
                                    group-hover:translate-y-0 group-hover:opacity-100 
                                    transition-all duration-500 ease-in-out">
                                    <button
                                        onClick={() => navigate(`/product/${item.id}`, handleNavigateTocake())}
                                        className="p-2 cursor-pointer border-2 border-secondary bg-gray-300 rounded-lg shadow-lg hover:bg-gray-200 transition"
                                    >
                                        <ShoppingCart className="w-8 h-auto text-secondary" />
                                    </button>
                                    <button
                                        onClick={() => handleOpenModal(item)}
                                        className="p-2 cursor-pointer border-2 border-gray-300 bg-gray-300 rounded-lg shadow-lg hover:bg-gray-200 transition"
                                    >
                                        <Search className="w-8 h-auto text-secondary" />
                                    </button>
                                </div>
                            </div>
                            <div className="text-center">
                                <h4 className="text-lg font-bold">{item.name}</h4>
                                <h5 className="text-color-base-content">${item.price}</h5>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                // 原本的橫向滑動版本
                <div className="flex flex-col items-center mb-4 mt-4">
                    <h2 className="text-2xl font-bold m-6">人氣商品</h2>
                    <div className="flex flex-row justify-center items-center overflow-x-auto">
                        {popularItems.map((item) => (
                            <div key={item.id} className="flex-shrink-0 w-40 md:w-50 lg:w-60 flex flex-col items-center mb-4 mt-4">

                                <div className="relative group w-40 md:w-50 lg:w-60 h-auto rounded-xl overflow-hidden">
                                    <img
                                        src={item.url}
                                        alt={item.name}
                                        className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-75"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center gap-4 
                bg-black/40 opacity-0 translate-y-full 
                group-hover:translate-y-0 group-hover:opacity-100 
                transition-all duration-500 ease-in-out">
                                        <button
                                            onClick={() => {
                                                handleNavigateTocake();
                                                console.log("購買商品");
                                                navigate(`/product/${item.id}`);
                                            }}
                                            className="p-2 cursor-pointer border-2 border-secondary bg-gray-300 rounded-lg shadow-lg hover:bg-gray-200 transition"
                                        >
                                            <ShoppingCart className="w-8 h-auto text-secondary" />

                                        </button>

                                        <button
                                            onClick={() => handleOpenModal(item)}
                                            className="p-2 cursor-pointer border-2 border-gray-300 bg-gray-300 rounded-lg shadow-lg hover:bg-gray-200 transition"
                                        >
                                            <Search className="w-8 h-auto text-secondary" />
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-2 text-center">
                                    <h4 className="font-bold text-lg">{item.name}</h4>
                                    <h5 className="text-color-base-content">${item.price}</h5>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}





            <dialog id="item_modal" className="modal ">
                <div className="flex modal-box max-w-3xl body-bg h-[400px] ">
                    {selectedItem && (
                        <div className="flex flex-row items-center ">
                            {/* 圖片區 */}
                            <div className="flex w-1/3 ">
                                <img
                                    src={selectedItem.url}
                                    alt={selectedItem.name}
                                    className="w-full h-auto rounded-xl"
                                />
                            </div>

                            {/* 文字區 */}
                            <div className="w-2/3 flex flex-col text-left ml-2  ">
                                <h4 className="text-lg font-bold mb-2">{selectedItem.name}</h4>
                                <h5 className="mb-4 custom-text-gray-500">{selectedItem.description}</h5>
                                <h4 className="text-lg mb-4">${selectedItem.price}</h4>

                                <button
                                    onClick={() => {
                                        const dialog = document.getElementById("item_modal");
                                        if (dialog) dialog.close();
                                        navigate(`/product/${selectedItem.id}`);
                                    }}
                                    className="mt-auto  px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary/90 transition"
                                >
                                    前往購買
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* 關閉背景遮罩 */}
                <form method="dialog" className="modal-backdrop">
                    <button>關閉</button>
                </form>
            </dialog>

        </div>
    );
};

export default PopularItems;
