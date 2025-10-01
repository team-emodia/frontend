import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // 모달이 열려있지 않으면 아무것도 렌더링하지 않음

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* 배경 (클릭 시 닫힘) */}
      <div
        className="absolute inset-0 bg-black bg-opacity-30"
        onClick={onClose}
      ></div>

      {/* 모달 박스 */}
      <div className="relative bg-purple-100 rounded-2xl p-8 max-w-md w-full shadow-lg z-10">
        {/* 닫기 버튼 */}
        <button
          className="absolute top-3 right-4 text-lg font-bold text-gray-600 hover:text-black"
          onClick={onClose}
        >
          ✕
        </button>

        {/* 모달 내용 */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
