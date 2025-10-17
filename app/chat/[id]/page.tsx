import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Image from 'next/image';
import Link from 'next/link';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'contact';
  time: string;
  emoji?: string;
};

type Params = { params: { id: string } };

const messages: Message[] = [
  { id: 1, text: "Good Morning", sender: 'user', time: "12:05 pm" },
  { id: 2, text: "Can you tell me how your project is going so far?", sender: 'contact', time: "12:05 pm" },
  { id: 3, text: "Good Morning", sender: 'user', time: "12:05 pm" },
  { id: 4, text: "We're currently working on the navigation system, adding AI mapping features.", sender: 'contact', time: "12:05 pm" },
  { id: 5, text: "Nice! When will it finish?", sender: 'user', time: "12:05 pm" },
  { id: 6, text: "Next month. Your help means a lot", sender: 'contact', time: "12:05 pm", emoji: "💙💙💙" },
  { id: 7, text: "Great, I'll check back.", sender: 'user', time: "12:05 pm" },
  { id: 8, text: "Thank you!", sender: 'contact', time: "12:05 pm" },
];

export default function ChatConversation({ params }: Params) {
  return (
    <div>
      <Header />
      <Sidebar />
      <main className="mx-auto max-w-7xl px-6 py-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[400px_1fr]">
          {/* Chat List */}
          <div className="rounded-2xl bg-white p-6 shadow-card">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-xl font-bold text-slate-900">Chat</h1>
              <button className="grid h-8 w-8 place-items-center rounded border border-slate-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-slate-600">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            
            {/* Search */}
            <div className="mb-6 flex items-center rounded-full border border-brand/60 bg-white px-4 py-2 text-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mr-2 text-brand">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <input placeholder="Search..." className="w-full bg-transparent outline-none placeholder:text-slate-400" />
            </div>

            {/* Chat List */}
            <div className="space-y-3">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
                <Link key={id} href={`/chat/${id}`}>
                  <div className={`flex cursor-pointer items-center gap-3 rounded-lg p-3 hover:bg-slate-50 ${id === 1 ? 'bg-brand/5' : ''}`}>
                    <div className="relative">
                      <Image src="/girl.jpg" alt="Umwali Nadia" width={48} height={48} className="h-12 w-12 rounded-full object-cover border-2 border-brand" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-slate-900">Umwali Nadia</div>
                      <div className="text-sm text-slate-600 truncate">Hello, It will be finished next week</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-700">3:00 PM</div>
                      <div className="mt-1 h-2 w-2 rounded-full bg-brand"></div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Chat Conversation */}
          <div className="rounded-2xl bg-white shadow-card flex flex-col h-[600px]">
            {/* Chat Header */}
            <div className="relative">
              {/* Green curved section */}
              <div className="relative bg-brand px-6 py-4" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0 100%)' }}>
                <div className="flex items-center gap-3">
                  <Image src="/girl.jpg" alt="Umwali Nadia" width={40} height={40} className="h-10 w-10 rounded-full object-cover border-2 border-white" />
                  <div className="flex-1">
                    <div className="text-lg font-semibold text-white">Umwali Nadia</div>
                  </div>
                  <div className="flex gap-3">
                    <button className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/20">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                        <path d="M23 7l-7 5 7 5V7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </button>
                    <button className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/20">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/20">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                        <circle cx="12" cy="12" r="1" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="19" cy="12" r="1" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="5" cy="12" r="1" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              {/* White curved section */}
              <div className="bg-white -mt-2 h-4" style={{ clipPath: 'polygon(0 100%, 100% 80%, 100% 100%, 0% 100%)' }}></div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs rounded-2xl px-4 py-2 ${
                    message.sender === 'user' 
                      ? 'bg-brand/20 text-slate-900' 
                      : 'bg-brand text-white'
                  }`}>
                    <div className="text-sm">{message.text}</div>
                    {message.emoji && <div className="mt-1 text-sm">{message.emoji}</div>}
                    <div className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-slate-500' : 'text-brand-100'
                    }`}>
                      {message.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="border-t border-slate-100 p-4">
              <div className="flex items-center gap-3">
                <button className="grid h-8 w-8 place-items-center rounded-full hover:bg-slate-100">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-slate-600">
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66L9.64 16.2a2 2 0 0 1-2.83-2.83l8.49-8.49" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <input 
                  placeholder="Type something here..." 
                  className="flex-1 rounded-full border border-slate-200 px-4 py-2 text-sm outline-none focus:border-brand"
                />
                <button className="grid h-8 w-8 place-items-center rounded-full hover:bg-slate-100">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-slate-600">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className="grid h-8 w-8 place-items-center rounded-full bg-brand text-white hover:bg-brand-dark">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                    <line x1="22" y1="2" x2="11" y2="13" stroke="currentColor" strokeWidth="2"/>
                    <polygon points="22,2 15,22 11,13 2,9 22,2" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
