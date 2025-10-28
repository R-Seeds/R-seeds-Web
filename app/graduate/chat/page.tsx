import Header from '@/components/Header';
import Sidebar from '../Sidebar';
import Image from 'next/image';
import Link from 'next/link';

const chats = new Array(8).fill(0).map((_, i) => ({
  id: i,
  name: 'Umwali Nadia',
  lastMessage: 'Hello, It will be finished next week',
  time: '3:00 PM',
  avatar: '/girl.jpg',
  hasUnread: true,
}));

export default function ChatPage() {
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
              {chats.map((chat) => (
                <Link key={chat.id} href={`/graduate/chat/${chat.id}`}>
                  <div className="flex cursor-pointer items-center gap-3 rounded-lg p-3 hover:bg-slate-50">
                    <div className="relative">
                      <Image src={chat.avatar} alt={chat.name} width={48} height={48} className="h-12 w-12 rounded-full object-cover border-2 border-brand" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-slate-900">{chat.name}</div>
                      <div className="text-sm text-slate-600 truncate">{chat.lastMessage}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-700">{chat.time}</div>
                      {chat.hasUnread && (
                        <div className="mt-1 h-2 w-2 rounded-full bg-brand"></div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Chat View */}
          <div className="rounded-2xl bg-white shadow-card">
            <div className="flex h-[600px] items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-6 grid h-20 w-20 place-items-center">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" className="text-brand">
                    <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2 className="mb-3 text-xl font-bold text-slate-900">No conversation selected</h2>
                <p className="text-slate-600">You can view your conversations in the sidebar</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
