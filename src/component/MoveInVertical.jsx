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
                '-rotate-4',
                '-rotate-2',
                'rotate-2',
                'rotate-4',
                '-rotate-3',
                'rotate-3'
            ];
            return rotations[index % rotations.length];
        };

        return (
            <div
                className={`card bg-neutral w-[280px] sm:w-[320px] md:w-[300px] mx-auto shadow-xl transform ${getRotationClass(index)} transition-all duration-300 ease-in-out hover:rotate-0 hover:scale-105 hover:shadow-lg`}
            >
                <figure className="py-6">
                    <img
                        src={picture.url}
                        alt={picture.title}
                        className="rounded-xl w-[150px] sm:w-[180px] md:w-[200px] h-auto"
                    />
                </figure>
                <div className="card-body items-center text-center py-4">
                    <h2 className="text-base">{picture.title}</h2>
                </div>
            </div>
        )
    }

    return (
        <div className="container px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {picture.map((pic, index) => (
                    <Card key={pic.ID} picture={pic} index={index} />
                ))}
            </div>
        </div>
    );

}
export default MoveInVertical;