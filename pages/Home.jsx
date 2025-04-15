import Footer from "../src/component/Footer";
import Header from "../src/component/Header";
import Productlist from "../src/component/Productlist";
import menu from "../src/json/menu.json";

function Home() {
    return (
        <div>
            <Header />
            <Productlist menu={menu} />
            <Footer />
        </div>
    )
}

export default Home;