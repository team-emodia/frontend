import React from "react";
// TODO: signup/bg-full.svg, vector-파일들 추가 필요

const ForgotPassword = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-[400px]">
        <h2 className="text-xl font-bold mb-4">비밀번호 재설정</h2>
        <input
          type="email"
          placeholder="이메일 입력"
          className="border px-4 py-2 mb-3 w-full rounded"
        />
        <button className="bg-purple-600 text-white px-6 py-2 rounded w-full">
          인증 메일 보내기
        </button>
        <p className="text-sm text-gray-500 mt-3 text-center">
          이메일을 받을 수 없나요? 고객센터에 문의하세요.
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
