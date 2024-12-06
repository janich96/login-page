import "./App.css";
import hidePass from "./assets/images/hide-pass.png";
import { useState } from "react";

interface FetchResponse {
  user: object,
  token: string,
}

const App = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6 && /[A-Z]/.test(password);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsEmailValid(validateEmail(e.target.value));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setIsPasswordValid(validatePassword(e.target.value));
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://mock-api.binaryboxtuts.com/api/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Binarybox-Api-Key': 'binarybox_api_key_VzO8M31mfzUAW58MBuDkyVX68IWufWJWW7m5BqqSi3FSXHHwKeHjuXQzOC7QdACzffplQ93npFb6Q3sMQLeImXxkz3IHQDkWy1yt',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data: FetchResponse = await response.json();
      console.log(data);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <main className="bg-[#F2F2F2] h-[100vh] pt-[5vh] sm:pt-[20vh]">
      <form onSubmit={handleSubmit} className="w-[90%] sm:w-[535px] h-[500px] mx-auto">
        <h2 className="text-center text-[#21262e] text-[1.75rem] font-semibold leading-9 mb-[56px]">
          Войдите в свой профиль
        </h2>
        <input
          type="email"
          placeholder="Электронная почта"
          onChange={handleEmailChange}
          value={email}
          className='bg-[url("./assets/images/email.png")] placeholder-[#6e7681] text-[1.25rem] bg-no-repeat rounded-lg border border-[#afbac5] py-[15px] px-[12px] pl-[48px] bg-[length:20px_20px] bg-[12px] w-full mb-[20px]'
        />
        <section className="relative">
          <input
            type={isPasswordVisible ? "text" : "password"}
            placeholder="Пароль"
            onChange={handlePasswordChange}
            value={password}
            className='bg-[url("./assets/images/pass.png")] placeholder-[#6e7681] text-[1.25rem] bg-no-repeat rounded-lg border border-[#afbac5] py-[15px] px-[12px] pl-[48px] bg-[length:20px_20px] bg-[12px] w-full mb-[20px]'
          />
          <button type="button" className="absolute top-[20px] right-[12px]">
            <img
              src={hidePass}
              alt="Показать либо скрыть пароль"
              onClick={togglePasswordVisibility}
              className="w-[20px] h-[20px]"
            />
          </button>
          {
            (!isPasswordValid && password.length > 0) && (
              <div className="absolute top-[50px] left-[12px] text-[#FF0000] text-[0.75rem] border border-[#FF0000] rounded-lg p-[10px] bg-[#FFECEC] w-max">
                Пароль должен содержать
                <ul className="pl-4 list-disc">
                  <li>не менее 6 символов</li>
                  <li>не менее 1 заглавной буквы</li>
                </ul>
              </div>
            )
          }
        </section>
        <p className="text-center py-[10px] mb-[56px]">
          <a href="#" className="text-[#388BFD]">
            Забыли пароль?
          </a>
        </p>
        <button
          type="submit"
          disabled={!isEmailValid || !isPasswordValid}
          className={`${isEmailValid && isPasswordValid ? "bg-[#34c759]" : "bg-[#afbac5]"} text-white text-[1.25rem] rounded-lg py-[15px] w-full mb-[16px]`}
        >
          Войти
        </button>
        <p className="text-center py-[10px]">
          <a href="#" className="text-[#388BFD]">
            Зарегистрироваться
          </a>
        </p>
      </form>
    </main>
  );
};

export default App;
