import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { auth, db } from "../firebaseconfig";
import customize from "@/json/customize.json";

const customizeCollection = collection(db, "customize");

//APIs
export const feedCustomize = async () => {
    try {
        // 刪除現有資料
        const querySnapshot = await getDocs(customizeCollection);
        querySnapshot.forEach(async (item) => {
            await deleteDoc(doc(db, "customize", item.id));
        });

        //新增新的資料
        customize.forEach(async (item) => {
            const docRef = await doc(customizeCollection);
            await setDoc(docRef, { ...item, id: docRef.id });
        });
        console.log("資料重設完成");
    } catch (err) {
        console.error("錯誤：", err);
    }
}

//從資料庫拿回資料並顯示在畫面上

//顯示所有商品
export const getCustomize = async () => {
    const querySnapshot = await getDocs(customizeCollection);
    //將查詢結果轉換成json陣列
    let result = [];
    querySnapshot.forEach(async (item) => {
        await result.push(item.data());
    });
    return result;
}


//顯示某一產品詳細頁面
export const getCustomizeById = async (id) => {
    const docRef = await doc(db, "customize", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}

//顯示每一類別的商品
export const getCustomizeByCategory = async (category) => {
    //建立查詢 判斷類別
    const q = await query(customizeCollection, where("category", "==", category.toUpperCase()));
    const querySnapshot = await getDocs(q);

    //將查詢結果轉換成json陣列
    let result = [];
    querySnapshot.forEach(async (item) => {
        await result.push(item.data());
    });
    return result;
}

//拿目前使用者的資訊
export const getUserInfo = async () => {
    //取得目前登入的使用者
    const user = auth?.currentUser || null;
    if (user) {
        //如果有登入的話，取得使用者的文件參考
        const docRef = doc(db, "users", user.uid);
        //取得文件
        //docRef是文件的參考，docSnap是文件的快照
        const docSnap = await getDoc(docRef);
        //得到實際資料
        const userDoc = docSnap.data();
        return {
            uid: user.uid,
            email: user.email,
            ...userDoc,
        };
    }
    else {
        return {}
    }
}

export const updateUserInfo = async ({ username, adrs, tel, uid }) => {
    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, {
        username,
        adrs,
        tel,
    });
    const user = auth.currentUser;
    localStorage.setItem("user", JSON.stringify(user));
}

export const submitOrder = async (orderItems, totalAmount, buyerInfo) => {
    const user = auth.currentUser;

    if (!user) {
        throw new Error("使用者尚未登入");
    }

    const orderData = {
        userId: user.uid,
        createdAt: serverTimestamp(),
        buyerInfo,
        items: orderItems,
        totalAmount,
    };

    try {
        await addDoc(collection(db, "orders"), orderData);
        console.log("訂單已成功送出");
    } catch (error) {
        console.error("送出訂單失敗：", error);
        throw error;
    }
};


