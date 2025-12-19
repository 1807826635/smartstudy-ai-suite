
import React from 'react';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  return (
    <div className="flex h-screen w-full bg-white dark:bg-background-dark">
      {/* Left Side: Login Form */}
      <div className="flex flex-col w-full lg:w-[560px] flex-shrink-0 bg-white dark:bg-surface-dark border-r border-slate-100 dark:border-slate-800 shadow-2xl z-10 overflow-y-auto">
        <header className="flex items-center justify-between px-12 py-8">
          <div className="flex items-center gap-3">
            <div className="size-10 text-primary">
              <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">SmartStudy</h2>
          </div>
          <a href="#" className="text-sm font-bold text-slate-400 hover:text-primary transition-colors">需要帮助?</a>
        </header>

        <div className="flex-1 flex flex-col justify-center px-12 pb-12">
          <div className="max-w-[400px] w-full mx-auto">
            <div className="mb-10">
              <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">学生登录</h1>
              <p className="text-primary text-lg font-medium">进入您的智能学习空间</p>
            </div>

            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">学号 / 邮箱</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="请输入您的学号或邮箱" 
                    className="w-full h-14 px-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-base pr-12"
                  />
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">person</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">密码</label>
                  <a href="#" className="text-sm font-bold text-primary hover:underline">忘记密码?</a>
                </div>
                <div className="relative">
                  <input 
                    type="password" 
                    placeholder="请输入密码" 
                    className="w-full h-14 px-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-base pr-12"
                  />
                  <button type="button" className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors">visibility</button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="rounded border-slate-300 text-primary focus:ring-primary" />
                <label htmlFor="remember" className="text-sm font-medium text-slate-600 dark:text-slate-400 cursor-pointer">记住我</label>
              </div>

              <button 
                type="submit"
                className="w-full h-14 bg-primary hover:bg-primary-dark text-slate-900 text-lg font-bold rounded-lg shadow-lg shadow-primary/20 transition-all active:scale-[0.99]"
              >
                立即登录
              </button>
            </form>

            <div className="mt-10 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                <span className="text-sm font-medium text-slate-500">首次使用 SmartStudy?</span>
                <a href="#" className="text-sm font-bold text-primary">设置密码</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Hero Section */}
      <div className="hidden lg:flex flex-1 relative bg-background-light overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#17cf54 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="absolute inset-8 rounded-2xl overflow-hidden shadow-2xl z-10">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/smartstudy/1200/1000')" }}>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full p-16 text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="size-10 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">auto_awesome</span>
                </div>
                <span className="text-sm font-bold uppercase tracking-widest text-primary">AI 赋能教育</span>
              </div>
              <h2 className="text-5xl font-bold mb-8 leading-tight max-w-2xl">
                不仅仅是文档编辑，<br />更是你的 <span className="text-primary">全能助教</span>。
              </h2>
              <div className="flex gap-12 border-t border-white/20 pt-8 max-w-xl">
                <div>
                  <p className="text-3xl font-bold">10w+</p>
                  <p className="text-sm text-slate-300">活跃学生</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">24/7</p>
                  <p className="text-sm text-slate-300">AI 实时响应</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">∞</p>
                  <p className="text-sm text-slate-300">云端存储</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
