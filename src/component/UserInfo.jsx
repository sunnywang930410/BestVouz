import { User } from "lucide-react";
import { useNavigate } from "react-router";
import { useUserInfo } from "../react-query";



//登入icon點擊
export default function UserInfo(props) {
    const navigate = useNavigate();
    const { data: userInfo } = useUserInfo();


    const goToProfile = () => {
        //如果 userInfo 存在，且它裡面有 email 的話，就切換到首頁
        if (userInfo?.email)
            navigate("/auth/profile");
        //navigate("/");

        else
            //如果沒有userInfo或是沒有email就導向login頁面，登入之後直接跳轉到profile頁面
            navigate("/auth/login?redirect=/auth/profile");
        //navigate("/");

    };

    // const userName = userInfo?.displayName || userInfo?.email?.split("@")[0] || "請登入";
    return (
        <nav
            onClick={goToProfile}
            style={{ ...props.style }}
            className="cursor-pointer flex flex-col items-center group"
        >
            <User className="w-6 md:w-7 lg:w-8 h-auto text-current group-hover:scale-105 transition-transform" />
            {/* <p className="hidden md:block text-[0.5rem] md:text-[0.7rem] opacity-60 mt-[-0.2rem] md:mt-[0.3rem] text-current">
                {userName}
            </p> */}
        </nav>
    );
}
