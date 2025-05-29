import Step from "../src/component/Step"
import CheckoutForm from "../src/component/CheckoutForm";
function Form() {
    return (
        <div className="space-y-4 pb-32 mt-36">
            <Step />
            <CheckoutForm />
        </div>
    );
}
export default Form;