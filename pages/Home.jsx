import Homepage from "../src/component/Homepage";
import product from "../src/json/customize.json";


function Home() {
    return (
        <Homepage product={product} />
    )
}

export default Home;