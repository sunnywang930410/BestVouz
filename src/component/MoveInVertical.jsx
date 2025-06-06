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
            url: "/img/birthday.png",
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
                'md:mt-0',
                'md:mt-30',
                'md:mt-64',
                'md:mt-20',
                'md:mt-34',
                'md:mt-6'
            ];
            return offsets[index % offsets.length];
        };

        return (
            <div
                className={`flex flex-col justify-center rounded-xl bg-neutral border-2 border-primary w-[130px] sm:w-[150px] md:h-[230px] lg:w-[200px] lg:h-[280px] shadow transform ${getRotationClass(index)} ${getOffsetClass(index)}  transition-all duration-300 ease-in-out hover:rotate-0 hover:scale-105 hover:shadow-lg`}
            >
                <figure className="w-full h-auto p-4">
                    <img
                        src={picture.url}
                        alt={picture.title}
                        className="rounded-xl w-full h-auto object-contain"
                    />
                </figure>
                <div className="card-body items-center text-center lg:p-4 pt-0">
                    <h2 className="md:text-sm lg:text-base">{picture.title}</h2>
                </div>
            </div>
        )
    }

    return (
        <div className=" flex flex-col  m-10">
            <div className="m-10  grid grid-cols-2  md:grid-cols-6 gap-2 items-center justify-items-center ">
                {picture.map((pic, index) => (
                    <Card key={pic.ID} picture={pic} index={index} />
                ))}
            </div>
            <div className="flex justify-center md:justify-end">
                <Link to="/comment">
                    <button className="p-1 pr-2 pl-2 lg:p-2 lg:pr-4 lg:pl-4 cursor-pointer bg-primary rounded-lg shadow-lg hover:bg-gray-200 transition">
                        <MoveRight />
                    </button>
                </Link>
            </div>
        </div>
    );

}
export default MoveInVertical;