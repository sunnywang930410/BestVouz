import { Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { useSignInWithEmailPassword } from "../react-query";
import { useDispatch, useSelector } from "react-redux";

import FormError from "./common/FormError";
import { remember, selectIsRemember } from "../redux/usersSlice";






const LoginCard = ({ redirect }) => {
    const dispatch = useDispatch();
    const isRemember = useSelector(selectIsRemember);
    const { mutate, isLoading, isError, error } = useSignInWithEmailPassword();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });


    const onFinish = (e) => {
        //不讓表單刷新頁面
        e.preventDefault();
        //把 email + password 丟去登入 Firebase
        mutate({ ...formData, redirect });
    };
    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }


    return (

        <form
            onSubmit={onFinish}
            className="border-2 border-radius border-primary p-8 mb-15  mx-auto w-[500px] rounded-xl shadow-md space-y-4 content mt-40"
        >
            <div>
                <h1 className="text-lg font-bold">登入</h1>

                <span className="block text-sm font-medium text-left mb-1 custom-text-gray-500">電子郵件</span>

                <div className="relative">
                    <input
                        type="email"
                        name="email"
                        placeholder="e.g.,123@gmail.com"
                        className="input input-bordered w-full pl-10"
                        //使用者一定要填的部分
                        required
                        onChange={onChange}
                    />
                    <Mail className="absolute left-3 top-1/3 transform -translate-y-1/2 w-4 h-4 text-current" />
                </div>
            </div>
            <div>
                <span className="block text-sm font-medium text-left mb-1 custom-text-gray-500">密碼</span>
                <div className="relative">
                    <input type="password"
                        name="password"
                        placeholder="至少 6 個字元"
                        className="input input-bordered w-full pl-10"
                        required
                        onChange={onChange}
                    />
                    <Lock className="absolute left-3 top-1/3 transform -translate-y-1/2 w-4 h-4 text-current" />
                </div>
            </div>
            <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={isRemember}
                        onChange={e => dispatch(remember(e.target.checked))}
                        className="checkbox"
                    />
                    <span className="label-text">記住我</span>
                </label>
                <Link to="/" className="link link-hover text-sm">忘記密碼?</Link>
            </div>
            <button
                type="submit"
                className="btn btn-secondary w-60 text-info"
                style={{ fontWeight: 'normal' }}
                disabled={isLoading}
            >
                {isLoading ? "Loading..." : "登入"}
            </button>
            <div className="flex items-center justify-center mt-4">
                <div className="flex-grow max-w-[100px] h-[1px] bg-primary mr-2"></div>
                <span>or</span>
                <div className="flex-grow max-w-[100px] h-[1px] bg-primary ml-2"></div>
            </div>
            <div className="flex flex-row gap-2 mt-4 mb-4 justify-center">
                {/* Facebook */}
                <button className="btn bg-[#1A77F2] text-white border-[#005fd8] rounded-full" type="button" style={{ width: "40px", height: "40px", padding: 0 }} >
                    <svg aria-label="Facebook logo" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="white" d="M8 12h5V8c0-6 4-7 11-6v5c-4 0-5 0-5 3v2h5l-1 6h-4v12h-6V18H8z"></path></svg>
                </button>
                {/* Google */}
                <button className="btn bg-white text-black border-[#e5e5e5] rounded-full" type="button" style={{ width: "40px", height: "40px", padding: 0 }}>
                    <svg aria-label="Google logo" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                </button>
                {/* Line */}
                <button className="btn bg-[#03C755] text-white border-[#00b544] rounded-full" type="button" style={{ width: "40px", height: "40px", padding: 0 }}>
                    <svg aria-label="Line logo" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g fillRule="evenodd" strokeLinejoin="round" fill="white"><path fillRule="nonzero" d="M12.91 6.57c.232 0 .42.19.42.42 0 .23-.188.42-.42.42h-1.17v.75h1.17a.42.42 0 1 1 0 .84h-1.59a.42.42 0 0 1-.418-.42V5.4c0-.23.188-.42.42-.42h1.59a.42.42 0 0 1-.002.84h-1.17v.75h1.17zm-2.57 2.01a.421.421 0 0 1-.757.251l-1.63-2.217V8.58a.42.42 0 0 1-.42.42.42.42 0 0 1-.418-.42V5.4a.418.418 0 0 1 .755-.249L9.5 7.366V5.4c0-.23.188-.42.42-.42.23 0 .42.19.42.42v3.18zm-3.828 0c0 .23-.188.42-.42.42a.42.42 0 0 1-.418-.42V5.4c0-.23.188-.42.42-.42.23 0 .418.19.418.42v3.18zM4.868 9h-1.59c-.23 0-.42-.19-.42-.42V5.4c0-.23.19-.42.42-.42.232 0 .42.19.42.42v2.76h1.17a.42.42 0 1 1 0 .84M16 6.87C16 3.29 12.41.376 8 .376S0 3.29 0 6.87c0 3.208 2.846 5.896 6.69 6.405.26.056.615.172.705.394.08.2.053.518.026.722 0 0-.092.565-.113.685-.035.203-.16.79.693.432.854-.36 4.607-2.714 6.285-4.646C15.445 9.594 16 8.302 16 6.87"></path></g></svg>
                </button>
            </div>
            <p className="text-sm mt-2">
                還沒註冊?<Link to={`/auth/register?redirect=${redirect}`} className="link link-primary">註冊</Link>
            </p>
            {isError && <FormError error={error} />}
        </form>
    )
}

export default LoginCard;