import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router";

const Carousel = ({ product }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: "0px",
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    const Card = ({ product }) => (

        <Link to={`/product/${product.id}`} className="px-2">
            <div className="card shadow-lg transition-transform duration-300 hover:scale-105">
                <figure>
                    <img
                        src={product.cover}
                        alt={product.name}
                        className="rounded-t-xl h-64 w-full object-cover"
                    />
                </figure>

                <div className="card-body bg-primary rounded-b-xl items-center text-center">
                    <span className="card-title text-lg">{product.name}</span>
                    <span className="text-base">${product.price}</span>
                    <div className="card-actions ">
                        <div className="mt-2 flex flex-wrap justify-center gap-2 text-sm">
                            {product.tags.map((tag, id) => (
                                <button
                                    key={id}
                                    className="bg-neutral body-text px-2 py-1 rounded-lg shadow text-[#333] hover:bg-gray-100 transition-colors"
                                >
                                    {tag}+
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </Link>
    );

    return (
        <div className="max-w-6xl mx-auto px-4 py-4">
            <Slider {...settings}>
                {product.map((item, index) => (
                    <Card key={index} product={item} />
                ))}
            </Slider>
        </div>
    );
};

export default Carousel;


