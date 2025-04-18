import { createContext, useState, useRef } from "react";

// 創建 ModalContext
export const ModalContext = createContext();

export function ModalProvider({ children }) {
  // 管理 checkbox 的狀態
  const [isChecked, setIsChecked] = useState(false);
  const drawerCheckboxRef = useRef(null);

  const toggleModal = () => {
    setIsChecked((prev) => !prev);  // 切換狀態
  };

  return (
    <ModalContext.Provider value={{ toggleModal, drawerCheckboxRef, isChecked, setIsChecked }}>
      {children}
    </ModalContext.Provider>
  );
}
