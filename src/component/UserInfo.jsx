import { User } from "lucide-react";
import { useNavigate } from "react-router";
import { useUserInfo } from "../react-query";



//登入icon點擊
export default function UserInfo(props) {
    const navigate = useNavigate();
    const { data: userInfo } = useUserInfo();

    // 更換頭像
    const avatarUrl = "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp";

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
            {userInfo?.email && avatarUrl ? (
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden border border-gray-300 group-hover:scale-105 transition-transform">
                    <img
                        src={avatarUrl}
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                    />
                </div>
            ) : (
                <User className="w-6 md:w-7 lg:w-8 h-auto text-current group-hover:scale-105 transition-transform" />
            )}
        </nav>
    );
}
