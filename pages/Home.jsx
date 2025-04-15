import Footer from "../src/component/Footer";
import Header from "../src/component/Header";
import Productlist from "../src/component/Productlist";
import product from "../src/json/customize.json";

function Home() {
    return (
        <div>
            <Header />
            <Productlist product={product} />
            <Footer />
        </div>
    )
}

export default Home;