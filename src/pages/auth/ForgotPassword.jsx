import React from "react";

const ForgotPassword = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-50">
      <form className="w-96 bg-white shadow rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6">비밀번호 찾기</h2>
        <label className="block mb-4">
          이메일
          <input
            type="email"
            className="w-full border rounded p-2 mt-1"
            placeholder="가입한 이메일 입력"
          />
        </label>
        <button className="w-full py-2 bg-indigo-500 text-white rounded-lg">
          비밀번호 재설정 메일 보내기
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
