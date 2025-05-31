import { collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebaseconfig";
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