import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { query, where, orderBy, doc, getDoc, getDocs, setDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebaseconfig";


export const login = async ({ email, password }) => {
    return await signInWithEmailAndPassword(auth, email, password)
};


export const register = async ({ username, email, password }) => {
    //在firebase新增一個使用者
    const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
    );
    const user = userCredential?.user;

    await updateProfile(user, {
        displayName: username,
    });

    //建立一個新的文件
    //在users這個collection裡面新增一個文件，文件名稱是uid
    const docRef = doc(db, "users", user.uid);
    //在文件裡面新增一個欄位，欄位名稱是name
    await setDoc(docRef, {
        username,
    });
    return user;
};

export const getUserInfo = async () => {
    //取得目前登入的使用者
    const user = auth?.currentUser || null;
    //如果有使用者登入，取得使用者的uid和email
    if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        const userDoc = docSnap.data();
        return {
            uid: user.uid,
            email: user.email,
            ...userDoc,
        };
    }
    else {
        //如果沒有使用者登入，回傳空物件
        return {}
    }
}

export const logout = async () => {
    auth.signOut();
}

export const getMyOrders = async () => {
  const user = auth.currentUser;
  if (!user) return [];

  const q = query(
    collection(db, "orders"),
    where("userId", "==", user.uid),
    orderBy("createdAt", "desc")
  );

  const snap = await getDocs(q);
  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
};