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
            className="bg-base-100 p-6 mx-auto w-[500px] rounded-xl shadow-md space-y-4 content mt-40"
        >
            <div>
                <label className="label">
                    <span className="label-text">E-Mail</span>
                </label>
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
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <div className="relative">
                    <input type="password"
                        name="password"
                        placeholder="At least 6 characters"
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
                    <span className="label-text">Remember me</span>
                </label>
                <Link to="/" className="link link-hover text-sm">Forgot password</Link>
            </div>
            <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isLoading}
            >
                {isLoading ? "Loading..." : "Log in"}
            </button>
            <p className="text-sm mt-2">
                Or <Link to={`/auth/register?redirect=${redirect}`} className="link link-primary">register now!</Link>
            </p>
            {isError && <FormError error={error} />}
        </form>
    )
}

export default LoginCard;