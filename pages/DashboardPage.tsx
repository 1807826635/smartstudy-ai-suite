
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, CartesianGrid } from 'recharts';
import { Student, Activity } from '../types';

interface DashboardPageProps {
  onBack: () => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onBack }) => {
  const students: Student[] = [
    { id: '1', name: '李明 (Alex)', avatar: 'https://picsum.photos/seed/alex/100', status: 'active', currentTask: '正在编辑: 期末作文.docx', lastActive: '刚刚' },
    { id: '2', name: '王芳 (Sarah)', avatar: 'https://picsum.photos/seed/sarah/100', status: 'idle', currentTask: '闲置 1m 20s', lastActive: '1m前' },
    { id: '3', name: '陈伟 (Mike)', avatar: 'https://picsum.photos/seed/mike/100', status: 'offline', currentTask: '离线 > 3m', lastActive: '3m前', offlineTime: '3m' },
    { id: '4', name: '张珍妮 (Jenny)', avatar: 'https://picsum.photos/seed/jenny/100', status: 'active', currentTask: 'AI 对话中...', lastActive: '刚刚' },
  ];

  const activities: Activity[] = [
    { time: '10:42:15', type: 'Input', detail: '输入了 "环境污染的影响..." ' },
    { time: '10:41:02', type: 'Delete', detail: '删除了 24 个字符' },
    { time: '10:38:45', type: 'Format', detail: '将段落设为 "标题 2" ' },
    { time: '10:35:10', type: 'Paste', detail: '从外部源粘贴了 150 字' },
    { time: '10:30:05', type: 'Format', detail: '使用了 AI 润色功能' },
  ];

  const focusData = [
    { time: '09:00', value: 45 },
    { time: '09:15', value: 72 },
    { time: '09:30', value: 58 },
    { time: '09:45', value: 12, isWarning: true },
    { time: '10:00', value: 88 },
    { time: '10:15', value: 92 },
    { time: '10:30', value: 85 },
  ];

  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark font-display overflow-hidden">
      
      {/* 1. Far Left Mini Sidebar */}
      <aside className="w-16 bg-slate-900 flex flex-col items-center py-6 gap-8 shrink-0">
        <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined font-bold">school</span>
        </div>
        <nav className="flex flex-col gap-6">
          <button className="size-10 rounded-xl bg-white/10 text-primary flex items-center justify-center"><span className="material-symbols-outlined">dashboard</span></button>
          <button className="size-10 rounded-xl text-slate-400 hover:text-white transition-colors flex items-center justify-center"><span className="material-symbols-outlined">group</span></button>
          <button className="size-10 rounded-xl text-slate-400 hover:text-white transition-colors flex items-center justify-center"><span className="material-symbols-outlined">bar_chart</span></button>
          <button className="size-10 rounded-xl text-slate-400 hover:text-white transition-colors flex items-center justify-center"><span className="material-symbols-outlined">notifications</span></button>
        </nav>
        <div className="mt-auto flex flex-col gap-6">
          <button className="size-10 rounded-xl text-slate-400 hover:text-white transition-colors flex items-center justify-center"><span className="material-symbols-outlined">settings</span></button>
          <img src="https://picsum.photos/seed/teacher/100" className="size-10 rounded-full border-2 border-slate-700" />
        </div>
      </aside>

      {/* 2. Main Content Wrapper */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-8 bg-white dark:bg-surface-dark border-b border-slate-200 dark:border-slate-800 shadow-sm z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-extrabold text-slate-800 dark:text-white">智慧教室监控系统</h1>
            <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
            <p className="text-sm font-bold text-slate-400">文学创作一班 - 期末测试</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
              实时流同步中
            </div>
            <button onClick={onBack} className="h-10 px-6 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-sm shadow-xl flex items-center gap-2 transition-all active:scale-95">
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              返回编辑器
            </button>
          </div>
        </header>

        {/* Inner Grid */}
        <main className="flex-1 p-6 grid grid-cols-12 gap-6 overflow-hidden">
          
          {/* Student Roster (Left) */}
          <div className="col-span-12 lg:col-span-3 flex flex-col bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-100 dark:border-slate-800">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                <input 
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20"
                  placeholder="搜索学生..."
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-1 no-scrollbar">
              <p className="px-3 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">活跃学生</p>
              {students.map(student => (
                <button 
                  key={student.id} 
                  className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all ${
                    student.id === '1' ? 'bg-primary/10 ring-1 ring-primary/30' : 'hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img src={student.avatar} className="size-11 rounded-full bg-slate-100 object-cover" />
                    <span className={`absolute -bottom-0.5 -right-0.5 size-3.5 rounded-full border-2 border-white dark:border-surface-dark ${
                      student.status === 'active' ? 'bg-primary' : 
                      student.status === 'idle' ? 'bg-amber-400' : 'bg-slate-300'
                    }`}></span>
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex justify-between items-center mb-0.5">
                      <p className="text-sm font-bold truncate text-slate-800 dark:text-slate-200">{student.name}</p>
                      <span className="text-[9px] text-slate-400 font-bold">{student.lastActive}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 truncate leading-none">{student.currentTask}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Student Detail View (Middle) */}
          <div className="col-span-12 lg:col-span-6 flex flex-col gap-6 overflow-hidden">
            
            {/* Top Detail Card */}
            <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <span className="material-symbols-outlined text-[120px]">person</span>
              </div>
              
              <div className="flex items-start justify-between mb-8 relative z-10">
                <div className="flex gap-6">
                  <div className="size-20 rounded-3xl overflow-hidden shadow-2xl ring-4 ring-primary/10">
                    <img src="https://picsum.photos/seed/alex/100" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2">李明 (Alex)</h2>
                    <div className="flex gap-3">
                      <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest">正常编辑中</span>
                      <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest">UID: 20240901</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="h-11 px-4 rounded-xl bg-primary text-white font-bold flex items-center gap-2 hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                    <span className="material-symbols-outlined">chat</span>
                    发送提醒
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 relative z-10">
                {[
                  { label: '累计字数', val: '2,482', unit: '字', color: 'text-primary' },
                  { label: '专注度', val: '94', unit: '%', color: 'text-blue-500' },
                  { label: 'AI 交互', val: '08', unit: '次', color: 'text-purple-500' },
                ].map((stat, i) => (
                  <div key={i} className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-2xl font-black ${stat.color}`}>{stat.val}</span>
                      <span className="text-xs font-bold text-slate-400">{stat.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="flex-1 bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col overflow-hidden shadow-sm">
              <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/30">
                <h3 className="font-black text-slate-800 dark:text-white uppercase tracking-wider text-sm">操作轨迹分析</h3>
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-lg">实时更新</span>
              </div>
              <div className="flex-1 overflow-y-auto p-8 space-y-10 no-scrollbar">
                {activities.map((activity, idx) => (
                  <div key={idx} className="flex gap-6 relative group">
                    {idx !== activities.length - 1 && (
                      <div className="absolute left-[23px] top-12 bottom-[-40px] w-0.5 bg-slate-100 dark:bg-slate-800 group-hover:bg-primary/20 transition-colors"></div>
                    )}
                    <div className={`size-12 rounded-2xl flex items-center justify-center shrink-0 z-10 shadow-lg transition-transform group-hover:scale-110 ${
                      activity.type === 'Input' ? 'bg-emerald-500 text-white shadow-emerald-500/20' :
                      activity.type === 'Delete' ? 'bg-rose-500 text-white shadow-rose-500/20' :
                      activity.type === 'Format' ? 'bg-blue-500 text-white shadow-blue-500/20' : 'bg-amber-500 text-white shadow-amber-500/20'
                    }`}>
                      <span className="material-symbols-outlined text-[20px]">
                        {activity.type === 'Input' ? 'edit' :
                         activity.type === 'Delete' ? 'backspace' :
                         activity.type === 'Format' ? 'auto_fix_high' : 'content_paste'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-sm font-black text-slate-700 dark:text-slate-300">{activity.type}</p>
                        <span className="text-xs font-bold text-slate-400 bg-slate-50 dark:bg-slate-900 px-2 py-0.5 rounded-lg border border-slate-100 dark:border-slate-800">{activity.time}</span>
                      </div>
                      <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                        {activity.detail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (Analytics) */}
          <div className="col-span-12 lg:col-span-3 flex flex-col gap-6 overflow-hidden">
            
            <div className="bg-white dark:bg-surface-dark border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col h-full overflow-hidden">
              <div className="mb-8">
                <h3 className="font-black text-slate-800 dark:text-white mb-1">群体专注力趋势</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">每 15 分钟聚合分析</p>
              </div>
              
              <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={focusData} margin={{ top: 10, right: 0, left: -30, bottom: 0 }}>
                    <XAxis 
                      dataKey="time" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}} 
                    />
                    <Tooltip 
                      cursor={{fill: 'rgba(23, 207, 84, 0.05)'}}
                      contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 'bold'}}
                    />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={24}>
                      {focusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.isWarning ? '#f43f5e' : '#17cf54'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-8 space-y-4">
                <div className="p-5 bg-rose-50 dark:bg-rose-900/20 border-2 border-rose-100 dark:border-rose-900/50 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-rose-500 text-lg">warning</span>
                    <p className="text-[11px] text-rose-600 dark:text-rose-400 font-black uppercase">严重异常检测</p>
                  </div>
                  <p className="text-xs text-rose-700 dark:text-rose-300 font-bold leading-tight mb-2">Alex 的专注力跌破 15%</p>
                  <p className="text-[10px] text-rose-500/80 leading-relaxed font-medium">连续 8 分钟未产生有效字符输入，且当前窗口非活动状态。建议立即查验。</p>
                </div>
                
                <button className="w-full h-14 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl font-black text-xs text-slate-600 dark:text-slate-300 hover:border-primary transition-all flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">file_download</span>
                  导出全班多维分析报表
                </button>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
