import React, { useState } from 'react';
import { 
  Search, Home, Video, Users, UserCircle, Store, MessageCircle, Bell, Menu, 
  Grid, Plus, Edit2, MoreHorizontal, Image, UserPlus, MapPin, Smile, 
  Settings, Lock, Globe, Volume2, Shield, Languages, Ban, List, Layout, 
  ChevronRight, Heart, MessageSquare, Share2, Send, X
} from 'lucide-react';

// Основной компонент теперь называется App, чтобы Vercel его увидел
const App = () => {
  const [activeTab, setActiveTab] = useState('posts');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [postText, setPostText] = useState('');

  // --- Внутренние компоненты интерфейса ---

  const TopBar = () => (
    <nav className="fixed top-0 z-50 w-full bg-zinc-900 border-b border-zinc-800 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="bg-blue-600 p-2 rounded-full hidden sm:block">
          <Globe className="text-white w-5 h-5" />
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-zinc-400 w-4 h-4" />
          <input 
            placeholder="Search AXIS..." 
            className="bg-zinc-800 rounded-full py-2 pl-10 pr-4 text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500 w-40 sm:w-64"
          />
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-8">
        <Home className="text-blue-500 w-6 h-6 cursor-pointer" />
        <Video className="text-zinc-400 w-6 h-6 cursor-pointer hover:text-zinc-200" />
        <Users className="text-zinc-400 w-6 h-6 cursor-pointer hover:text-zinc-200" />
        <Store className="text-zinc-400 w-6 h-6 cursor-pointer hover:text-zinc-200" />
      </div>

      <div className="flex items-center gap-2">
        <div className="bg-zinc-800 p-2 rounded-full cursor-pointer"><MessageCircle className="w-5 h-5 text-zinc-200" /></div>
        <div className="bg-zinc-800 p-2 rounded-full cursor-pointer relative">
          <Bell className="w-5 h-5 text-zinc-200" />
          <span className="absolute top-0 right-0 bg-red-500 text-[10px] px-1 rounded-full text-white">3</span>
        </div>
        <div className="bg-zinc-800 p-2 rounded-full cursor-pointer lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu className="w-5 h-5 text-zinc-200" />
        </div>
        <div className="w-8 h-8 rounded-full bg-zinc-700 ml-2 overflow-hidden hidden sm:block cursor-pointer">
           <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
        </div>
      </div>
    </nav>
  );

  const ProfileHeader = () => (
    <div className="bg-zinc-900 shadow-lg">
      <div className="h-48 md:h-80 bg-gradient-to-r from-zinc-800 to-zinc-700 relative">
        <button className="absolute bottom-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-3 py-1.5 rounded-md text-sm flex items-center gap-2 transition">
          <Image className="w-4 h-4" /> Edit Cover
        </button>
      </div>
      
      <div className="max-w-5xl mx-auto px-4 pb-4">
        <div className="flex flex-col md:flex-row items-center md:items-end -mt-12 md:-mt-16 gap-4">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-zinc-900 bg-zinc-800 overflow-hidden shadow-xl">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="profile" />
          </div>
          <div className="flex-1 text-center md:text-left mb-2">
            <h1 className="text-3xl font-bold text-white">Ingvarr Sp. z o.o.</h1>
            <p className="text-zinc-400 font-medium">1.2K Friends • Digital Creator</p>
            <div className="mt-2 text-zinc-300 text-sm max-w-sm">Building the future of e-commerce with AXIS Platform. 🚀📈</div>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" /> Add to Story
            </button>
            <button className="flex-1 md:flex-none bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2">
              <Edit2 className="w-4 h-4" /> Edit Profile
            </button>
          </div>
        </div>
        
        <div className="mt-6 border-t border-zinc-800 flex items-center justify-between">
          <div className="flex overflow-x-auto no-scrollbar">
            {['Posts', 'About', 'Friends', 'Photos', 'Videos'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`px-4 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition ${
                  activeTab === tab.toLowerCase() ? 'border-blue-500 text-blue-500' : 'border-transparent text-zinc-400 hover:bg-zinc-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="p-2 text-zinc-400 hover:bg-zinc-800 rounded-md"><MoreHorizontal /></button>
        </div>
      </div>
    </div>
  );

  const PostCard = () => (
    <div className="bg-zinc-900 rounded-xl shadow-md border border-zinc-800 mb-4 overflow-hidden">
      <div className="p-4 flex items-center justify-between">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-zinc-800 overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Ingvarr Sp. z o.o.</h4>
            <p className="text-xs text-zinc-400 flex items-center gap-1">2h • <Globe className="w-3 h-3" /></p>
          </div>
        </div>
        <button className="text-zinc-400 hover:bg-zinc-800 p-2 rounded-full"><MoreHorizontal /></button>
      </div>
      <div className="px-4 pb-4 text-zinc-200 text-sm">
        Наконец-то запустили наш проект на Vercel! Всё работает идеально. 😎📈
      </div>
      <div className="h-64 sm:h-96 bg-zinc-800 border-y border-zinc-800 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="post" />
      </div>
      <div className="p-2">
        <div className="flex justify-around text-zinc-400">
          <button className="flex-1 py-2 hover:bg-zinc-800 rounded-lg flex items-center justify-center gap-2 font-medium"><Heart className="w-5 h-5" /> Like</button>
          <button className="flex-1 py-2 hover:bg-zinc-800 rounded-lg flex items-center justify-center gap-2 font-medium"><MessageSquare className="w-5 h-5" /> Comment</button>
          <button className="flex-1 py-2 hover:bg-zinc-800 rounded-lg flex items-center justify-center gap-2 font-medium"><Send className="w-5 h-5" /> Send</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <TopBar />
      
      <main className="pt-14">
        <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-4 gap-6">
          
          {/* Левое меню (только для ПК) */}
          <aside className="hidden lg:block p-4 sticky top-14 h-screen">
             <div className="space-y-1">
               <div className="flex items-center gap-3 p-2 hover:bg-zinc-800 rounded-lg cursor-pointer">
                  <div className="w-8 h-8 bg-zinc-700 rounded-full overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
                  </div>
                  <span className="font-semibold text-sm">Ingvarr Sp. z o.o.</span>
               </div>
               {[
                 { icon: Users, label: 'Friends' },
                 { icon: Video, label: 'Reels' },
                 { icon: Store, label: 'Marketplace' },
                 { icon: Settings, label: 'Settings' },
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-3 p-3 hover:bg-zinc-800 rounded-lg cursor-pointer">
                   <item.icon className="w-6 h-6 text-blue-500" />
                   <span className="text-sm font-medium">{item.label}</span>
                 </div>
               ))}
             </div>
          </aside>

          {/* Центральный контент */}
          <div className="lg:col-span-3 max-w-5xl mx-auto w-full">
            <ProfileHeader />
            <div className="px-4 py-6 md:grid md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
                  <h3 className="text-xl font-bold mb-4">Intro</h3>
                  <div className="space-y-3 text-sm text-zinc-300">
                    <p className="flex items-center gap-2"><Globe className="w-4 h-4" /> Professional services</p>
                    <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Poland</p>
                  </div>
                </div>
              </div>
              <div className="md:col-span-3">
                <PostCard />
                <PostCard />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;