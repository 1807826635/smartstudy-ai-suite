
import React, { useState } from 'react';

interface ExportPageProps {
  onBack: () => void;
}

const ExportPage: React.FC<ExportPageProps> = ({ onBack }) => {
  const [selectedFormat, setSelectedFormat] = useState('pdf');

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display flex flex-col overflow-hidden">
      <header className="h-16 flex items-center justify-between px-10 bg-white dark:bg-surface-dark border-b border-slate-200 dark:border-slate-800 shrink-0">
        <div className="flex items-center gap-4">
          <div className="size-8 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-2xl">description</span>
          </div>
          <h2 className="text-xl font-bold">DocuStudy</h2>
        </div>
        <div className="flex items-center gap-8">
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
            <a href="#" className="hover:text-primary">File</a>
            <a href="#" className="hover:text-primary">Edit</a>
            <a href="#" className="hover:text-primary">View</a>
            <a href="#" className="hover:text-primary">Help</a>
          </nav>
          <button onClick={onBack} className="h-9 px-4 rounded-lg border border-slate-200 dark:border-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors">
            Back to Editor
          </button>
          <img src="https://picsum.photos/seed/user/100" className="size-10 rounded-full border-2 border-primary" />
        </div>
      </header>

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto h-full grid grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-8">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight mb-2">Save & Export</h1>
              <p className="text-slate-500 text-lg">Manage your file versions and choose your preferred download format.</p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="material-symbols-outlined text-primary">cloud_done</span>
                    <span className="font-bold text-lg">Cloud Sync</span>
                  </div>
                  <p className="text-sm text-slate-500">All changes saved 2m ago.</p>
                </div>
                <button className="h-10 px-4 rounded-lg bg-primary/10 text-primary font-bold text-sm flex items-center gap-2 hover:bg-primary/20 transition-all">
                  <span className="material-symbols-outlined text-lg">sync</span>
                  Force Sync
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <h3 className="font-bold text-xl mb-6">Select Format</h3>
              <div className="space-y-4">
                {[
                  { id: 'pdf', title: 'PDF Document', desc: 'Best for printing and sharing', icon: 'picture_as_pdf', color: 'bg-red-50 text-red-600' },
                  { id: 'docx', title: 'Word Document (.docx)', desc: 'Best for further editing', icon: 'description', color: 'bg-blue-50 text-blue-600' },
                  { id: 'md', title: 'Markdown File (.md)', desc: 'Plain text with formatting', icon: 'markdown', color: 'bg-slate-100 text-slate-600' },
                ].map((format) => (
                  <label key={format.id} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedFormat === format.id ? 'border-primary bg-primary/5' : 'border-slate-100 hover:border-slate-200'
                  }`}>
                    <input 
                      type="radio" 
                      name="format" 
                      checked={selectedFormat === format.id} 
                      onChange={() => setSelectedFormat(format.id)}
                      className="hidden" 
                    />
                    <div className={`size-12 rounded-lg flex items-center justify-center ${format.color}`}>
                      <span className="material-symbols-outlined">{format.icon}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-base">{format.title}</p>
                      <p className="text-xs text-slate-500">{format.desc}</p>
                    </div>
                    {selectedFormat === format.id && (
                      <span className="material-symbols-outlined text-primary">check_circle</span>
                    )}
                  </label>
                ))}
              </div>
            </div>

            <button className="w-full h-14 bg-primary hover:bg-primary-dark text-white rounded-xl shadow-xl shadow-primary/20 flex items-center justify-center gap-3 font-bold text-lg transition-all active:scale-[0.98]">
              <span className="material-symbols-outlined">download</span>
              Download to Local
            </button>
          </div>

          {/* Right Column: Mini AI Chat */}
          <div className="col-span-12 lg:col-span-7 flex flex-col bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="size-12 rounded-full bg-gradient-to-tr from-primary to-emerald-400 flex items-center justify-center text-white shadow-lg">
                  <span className="material-symbols-outlined">auto_awesome</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-none mb-1">AI Study Assistant</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-primary animate-pulse"></span>
                    Online & Ready
                  </p>
                </div>
              </div>
              <button className="text-slate-400"><span className="material-symbols-outlined">more_horiz</span></button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/50 dark:bg-slate-900/50">
              <div className="flex gap-4 max-w-[90%]">
                <div className="size-10 rounded-full bg-gradient-to-tr from-primary to-emerald-400 shrink-0 flex items-center justify-center text-white text-xs font-bold">AI</div>
                <div className="space-y-1">
                  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl rounded-tl-none shadow-sm text-sm leading-relaxed">
                    Hello! I noticed you're finalizing your document on <strong>"Environmental Impact of Urbanization"</strong>. Would you like me to generate a quick summary or check for citations before you download?
                  </div>
                  <span className="text-[10px] text-slate-400 px-1">10:23 AM</span>
                </div>
              </div>

              <div className="flex flex-row-reverse gap-4 max-w-[90%] self-end ml-auto">
                <img src="https://picsum.photos/seed/user/100" className="size-10 rounded-full shrink-0" />
                <div className="space-y-1 flex flex-col items-end">
                  <div className="bg-primary text-white p-4 rounded-2xl rounded-tr-none shadow-lg text-sm leading-relaxed">
                    Yes, please check the grammar in the conclusion section. I feel like the last sentence is a bit clunky.
                  </div>
                  <span className="text-[10px] text-slate-400 px-1">10:25 AM</span>
                </div>
              </div>

              <div className="flex gap-4 max-w-[90%]">
                <div className="size-10 rounded-full bg-gradient-to-tr from-primary to-emerald-400 shrink-0 flex items-center justify-center text-white text-xs font-bold">AI</div>
                <div className="space-y-1">
                  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl rounded-tl-none shadow-sm text-sm leading-relaxed">
                    <p className="mb-3">Sure thing! Here is a revised version of your conclusion's last sentence for better flow:</p>
                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl border border-slate-100 font-mono text-xs mb-3 text-slate-700 dark:text-slate-300">
                      "Ultimately, sustainable urban planning is not merely an option but a necessity for future generations."
                    </div>
                    <p>Does this sound better?</p>
                  </div>
                  <span className="text-[10px] text-slate-400 px-1">10:26 AM</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700">
              <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar pb-1">
                <button className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-bold hover:border-primary transition-colors whitespace-nowrap">
                  <span className="material-symbols-outlined text-sm">summarize</span> Summarize
                </button>
                <button className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-bold hover:border-primary transition-colors whitespace-nowrap">
                  <span className="material-symbols-outlined text-sm">spellcheck</span> Grammar Check
                </button>
                <button className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-bold hover:border-primary transition-colors whitespace-nowrap">
                  <span className="material-symbols-outlined text-sm">title</span> Suggest Title
                </button>
              </div>
              <div className="relative flex items-center">
                <button className="absolute left-4 text-slate-400 hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">add_circle</span>
                </button>
                <input 
                  className="w-full pl-12 pr-14 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-primary focus:border-primary outline-none transition-all text-sm font-medium"
                  placeholder="Ask AI to help revise or explain..."
                />
                <button className="absolute right-2 size-10 bg-primary hover:bg-primary-dark text-white rounded-xl shadow-lg shadow-primary/20 flex items-center justify-center transition-all">
                  <span className="material-symbols-outlined">arrow_upward</span>
                </button>
              </div>
              <p className="text-center text-[10px] text-slate-400 mt-4 uppercase font-bold tracking-widest">AI can make mistakes. Please review generated text.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExportPage;
