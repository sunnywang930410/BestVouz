import { useEffect, useState } from "react";
import { useLogout, useUpdateProfile, useUserInfo } from "../react-query";


const ProfileCard = () => {
    const { data: userInfo } = useUserInfo();
    const logout = useLogout();
    const updateProfile = useUpdateProfile();
    const [formData, setFormData] = useState({
        username: userInfo?.username || '',
        adrs: userInfo?.adrs || '',
        tel: userInfo?.tel || '',
    });

    const handleLogout = () => {
        logout.mutate();
    }

    const onChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleFinish = (e) => {
        e.preventDefault();
        updateProfile.mutate({
            ...formData,
            uid: userInfo?.uid,
        });
    }
    useEffect(() => {
        setFormData({
            username: userInfo?.username || '',
            adrs: userInfo?.adrs || '',
            tel: userInfo?.tel || '',
        });
    }, [userInfo]);


    return (
        <div className="profile-card mt-40">
            <form onSubmit={handleFinish}>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={onChange}
                />
                <input
                    type="text"
                    name="adrs"
                    value={formData.adrs}
                    onChange={onChange}
                />
                <input
                    type="text"
                    name="tel"
                    value={formData.tel}
                    onChange={onChange}
                />
                <button type="submit">Update Profile</button>
                <button onClick={handleLogout}>Logout</button>
            </form>
        </div>
    )
}

export default ProfileCard;