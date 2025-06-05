import Step from "../src/component/Step"
import CheckoutForm from "../src/component/CheckoutForm";
function Form() {
    return (
        <div className="space-y-4 pb-12 mt-12 md:pb-32 md:mt-36">
            <Step />
            <CheckoutForm />
        </div>
    );
}
export default Form;