
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { getAIResponse } from '../services/geminiService';

interface EditorPageProps {
  onExport: () => void;
  onLogout: () => void;
  onDashboard: () => void;
}

const EditorPage: React.FC<EditorPageProps> = ({ onExport, onLogout, onDashboard }) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: "Hello! I'm here to help with your assignment. Need help expanding on the \"Key Principles\" section?", timestamp: '10:23 AM' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    const docContent = editorRef.current?.innerText || "";
    const aiResponse = await getAIResponse(inputText, docContent);

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: aiResponse || "I couldn't generate a response.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  return (
    <div className="flex h-screen bg-background-light dark:bg-background-dark overflow-hidden font-display">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-surface-dark border-r border-slate-200 dark:border-slate-800 flex flex-col z-20">
        <div className="p-6 flex items-center gap-3">
          <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <span className="material-symbols-outlined">description</span>
          </div>
          <span className="font-bold text-lg">DocEditor</span>
        </div>

        <div className="flex-1 px-4 py-2 space-y-6 overflow-y-auto">
          <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
            <img src="https://picsum.photos/seed/alex/100" className="size-10 rounded-full" />
            <div className="min-w-0">
              <p className="text-sm font-bold truncate">Alex Johnson</p>
              <p className="text-xs text-slate-500 truncate">alex.j@uni.edu</p>
            </div>
          </div>

          <nav className="space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-bold">
              <span className="material-symbols-outlined filled">article</span>
              <span className="text-sm">My Docs</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined">group</span>
              <span className="text-sm">Shared</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="text-sm">Templates</span>
            </button>
            <button onClick={onDashboard} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined">monitoring</span>
              <span className="text-sm">Teacher View</span>
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-slate-800 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 transition-colors">
            <span className="material-symbols-outlined">settings</span>
            <span className="text-sm">Settings</span>
          </button>
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors">
            <span className="material-symbols-outlined">logout</span>
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Editor Area */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-surface-dark border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <input 
                className="bg-transparent border-none p-0 text-lg font-bold focus:ring-0 w-64"
                defaultValue="Introduction to Modern UI Design"
              />
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary uppercase">Saved</span>
            </div>
            <span className="text-xs text-slate-400 px-1">Last edit was 2 minutes ago</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              <img src="https://picsum.photos/seed/collab1/100" className="size-8 rounded-full border-2 border-white ring-2 ring-primary/20" />
              <img src="https://picsum.photos/seed/collab2/100" className="size-8 rounded-full border-2 border-white ring-2 ring-primary/20" />
            </div>
            <button onClick={onExport} className="h-9 px-4 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">download</span>
              Export
            </button>
            <button className="h-9 px-4 rounded-lg bg-primary text-white text-sm font-bold shadow-md flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">share</span>
              Share
            </button>
          </div>
        </header>

        {/* Toolbar */}
        <div className="h-12 bg-white dark:bg-surface-dark border-b border-slate-100 dark:border-slate-800 flex items-center px-4 gap-1 no-scrollbar overflow-x-auto">
          <button className="p-1.5 rounded hover:bg-slate-100"><span className="material-symbols-outlined text-[20px]">undo</span></button>
          <button className="p-1.5 rounded hover:bg-slate-100"><span className="material-symbols-outlined text-[20px]">redo</span></button>
          <div className="w-px h-6 bg-slate-200 mx-2"></div>
          <button className="px-2 py-1 flex items-center text-sm font-medium hover:bg-slate-100 rounded">Manrope <span className="material-symbols-outlined">arrow_drop_down</span></button>
          <button className="px-2 py-1 flex items-center text-sm font-medium hover:bg-slate-100 rounded">11 <span className="material-symbols-outlined">arrow_drop_down</span></button>
          <div className="w-px h-6 bg-slate-200 mx-2"></div>
          <button className="p-1.5 rounded bg-slate-200"><span className="material-symbols-outlined text-[20px]">format_bold</span></button>
          <button className="p-1.5 rounded hover:bg-slate-100"><span className="material-symbols-outlined text-[20px]">format_italic</span></button>
          <button className="p-1.5 rounded hover:bg-slate-100"><span className="material-symbols-outlined text-[20px]">format_underlined</span></button>
          <div className="w-px h-6 bg-slate-200 mx-2"></div>
          <button className="p-1.5 rounded hover:bg-slate-100"><span className="material-symbols-outlined text-[20px]">format_align_left</span></button>
          <button className="p-1.5 rounded hover:bg-slate-100"><span className="material-symbols-outlined text-[20px]">format_align_center</span></button>
          <button className="p-1.5 rounded hover:bg-slate-100"><span className="material-symbols-outlined text-[20px]">format_align_right</span></button>
          <div className="flex-1"></div>
          <button className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">auto_fix_high</span>
            Format with AI
          </button>
        </div>

        {/* Editor Container */}
        <div className="flex-1 bg-slate-50 dark:bg-slate-900 p-8 overflow-y-auto flex justify-center">
          <div 
            ref={editorRef}
            contentEditable
            className="w-full max-w-[816px] min-h-[1056px] bg-white dark:bg-slate-800 shadow-xl rounded-sm p-16 outline-none text-slate-800 dark:text-slate-100 leading-relaxed text-lg"
          >
            <h1 className="text-3xl font-bold mb-6">Introduction to Modern UI Design</h1>
            <p className="mb-4">The evolution of user interface design has been driven by the need for more intuitive, accessible, and visually appealing digital experiences. In the early days of computing, interfaces were text-based and required users to memorize commands.</p>
            <p className="mb-4">With the advent of graphical user interfaces (GUIs), the paradigm shifted towards visual metaphors like folders, trash cans, and desktops. Today, we are witnessing another shift towards minimalist, content-first designs that prioritize readability and focus.</p>
            <h2 className="text-xl font-bold mt-8 mb-4">Key Principles</h2>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Clarity:</strong> The interface should be self-explanatory.</li>
              <li><strong>Efficiency:</strong> Users should be able to complete tasks with minimal effort.</li>
              <li><strong>Consistency:</strong> Similar elements should look and behave similarly.</li>
              <li><strong>Beauty:</strong> Aesthetic appeal can enhance usability and user satisfaction.</li>
            </ul>
            <p className="text-slate-400 italic">Start typing your assignment here...</p>
          </div>
        </div>
      </main>

      {/* AI Assistant Sidebar */}
      <aside className="w-80 bg-white dark:bg-surface-dark border-l border-slate-200 dark:border-slate-800 flex flex-col z-20">
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">colors_spark</span>
            <span className="font-bold">AI Assistant</span>
          </div>
          <button className="text-slate-400 hover:text-slate-600"><span className="material-symbols-outlined">close</span></button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`size-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'assistant' ? 'bg-primary/10 text-primary' : 'bg-slate-100 overflow-hidden'}`}>
                {msg.role === 'assistant' ? (
                  <span className="material-symbols-outlined text-[18px]">smart_toy</span>
                ) : (
                  <img src="https://picsum.photos/seed/user/100" />
                )}
              </div>
              <div className={`flex flex-col gap-1 max-w-[85%] ${msg.role === 'user' ? 'items-end' : ''}`}>
                <div className={`p-3 rounded-2xl text-sm ${
                  msg.role === 'assistant' 
                    ? 'bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-tl-none' 
                    : 'bg-primary text-white rounded-tr-none'
                }`}>
                  {msg.content}
                </div>
                <span className="text-[10px] text-slate-400 px-1">{msg.timestamp}</span>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3">
              <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[18px]">smart_toy</span>
              </div>
              <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded-2xl rounded-tl-none flex gap-1">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <div className="relative">
            <textarea 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              className="w-full resize-none rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 pr-10 text-sm focus:ring-primary focus:border-primary"
              placeholder="Ask me anything..."
              rows={3}
            />
            <div className="flex justify-between items-center mt-2">
              <button className="p-1.5 text-slate-400 hover:text-primary"><span className="material-symbols-outlined text-[20px]">add_link</span></button>
              <button 
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="size-10 bg-primary hover:bg-primary-dark text-white rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
              >
                <span className="material-symbols-outlined">send</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default EditorPage;
