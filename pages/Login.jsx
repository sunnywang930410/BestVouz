import LoginCard from "../src/component/LoginCard";
import { useSearchParams } from "react-router"



function Login() {

    const [searchParams] = useSearchParams()
    const redirect = searchParams.get("redirect")
    const redirectPath = redirect ? redirect : "/";

    return (
        <div>
            <div>
                <LoginCard redirect={redirectPath} />
            </div>
        </div>
    )
}

export default Login;