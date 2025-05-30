import { MoveRight } from "lucide-react";
import { Link } from "react-router";

const MoveInVertical = () => {

    const picture = [
        {
            ID: 1,
            url: "/img/two-person-heart.png",
            title: "感恩的心",
        },
        {
            ID: 2,
            url: "/img/family.png",
            title: "最棒的生日禮物",

        },
        {
            ID: 3,
            url: "/img/chiffon-cake.png",
            title: "我超喜歡這個蛋糕的",
        },
        {
            ID: 4,
            url: "/img/chiffon-and-juice.png",
            title: "真的很謝謝你們!",
        },
        {
            ID: 5,
            url: "/img/snowman.png",
            title: "今天我生日!!!",
        },
        {
            ID: 6,
            url: "/img/dog.png",
            title: "謝謝~收到蛋糕超開心的",
        }
    ];

    const Card = ({ picture, index }) => {
        const getRotationClass = (index) => {
            const rotations = [
                '-rotate-6',
                'rotate-4',
                '-rotate-2',
                'rotate-4',
                '-rotate-3',
                'rotate-3'
            ];
            return rotations[index % rotations.length];
        };

        // 新增位移效果函數
        const getOffsetClass = (index) => {
            const offsets = [
                'mt-0',
                'mt-30',
                'mt-64',
                'mt-20',
                'mt-34',
                'mt-6'
            ];
            return offsets[index % offsets.length];
        };

        return (
            <div
                className={`rounded-xl bg-neutral border-2 border-primary w-[200px] md:w-[200px] h-[280px] shadow transform ${getRotationClass(index)} ${getOffsetClass(index)}  transition-all duration-300 ease-in-out hover:rotate-0 hover:scale-105 hover:shadow-lg`}
            >
                <figure className="w-full h-[200px] p-4">
                    <img
                        src={picture.url}
                        alt={picture.title}
                        className="rounded-xl w-full h-auto object-contain"
                    />
                </figure>
                <div className="card-body items-center text-center p-4 pt-0">
                    <h2 className="text-base">{picture.title}</h2>
                </div>
            </div>
        )
    }

    return (
        <div className="container px-4">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-6 items-center justify-center ">
                {picture.map((pic, index) => (
                    <Card key={pic.ID} picture={pic} index={index} />
                ))}
            </div>
            <div className="flex justify-end">
                <Link to="/comment">
                    <button className="p-2 pr-4 pl-4 cursor-pointer bg-primary rounded-lg shadow-lg hover:bg-gray-200 transition">
                        <MoveRight />
                    </button>
                </Link>
            </div>
        </div>
    );

}
export default MoveInVertical;