import Step from "../src/component/Step"
import CheckoutList from "../src/component/CheckoutList";

function Checkout(){
    return(
        <div className="space-y-4 pb-32">
            <Step/>
            <CheckoutList/>
        </div>
    );
}

export default Checkout;