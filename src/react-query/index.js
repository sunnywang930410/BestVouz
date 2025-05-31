import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { login, register, logout } from "../api/fireAuth";
import { useNavigate } from 'react-router';
import { getCustomize, getCustomizeByCategory, getCustomizeById, getUserInfo, updateUserInfo } from "../api/FireStore";



//讓我用 hook 的方式簡單安全地抓資料，不用再自己管 useEffect 或 Axios 的重複流程。
export const useCustomize = () => {
    console.log('getCustomize 被呼叫了！');
    return useQuery({
        queryKey: ['customize'],
        queryFn: getCustomize
    });
};

export const useCustomizeByCategory = (category) => {
    return useQuery({
        queryKey: [category],
        queryFn: getCustomizeByCategory
    });
};

export const useCustomizeById = (CustomizeId) => {
    return useQuery({
        queryKey: [CustomizeId],
        queryFn: getCustomizeById
    });
};


//useMutation寫入 useQuery讀取
export const useSignInWithEmailPassword = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: login,
        onSuccess: (_, variables) => {
            const { redirect } = variables || {};
            console.log('login 成功了！');
            //自動將userInfo的物件重新呼叫(如果登出的話就會清除內容
            queryClient.invalidateQueries(['userInfo']);
            if (redirect) {
                navigate(redirect);
            }
            else {
                navigate('/');
            }
        }
    });
};

export const useRegisterWithEmailPassword = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: register,
        onSuccess: (_, variables) => {
            const { redirect } = variables;
            console.log("註冊成功！變數是：", redirect);
            queryClient.invalidateQueries(['userInfo']);
            if (redirect) {
                navigate(redirect);
            }
            else {
                navigate('/');
            }
        }
    });
};

//更新用戶個人頁資料
export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateUserInfo,
        onSuccess: () => {
            queryClient.invalidateQueries(['userInfo']);
        },
    });
};

export const useUserInfo = () => {
    return useQuery({
        queryKey: ['userInfo'],
        queryFn: getUserInfo,
        initialData: {},
    })
};

export const useLogout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.removeQueries(['userInfo']);
            navigate("/auth/login");
        },
    });
};