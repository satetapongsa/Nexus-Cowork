import React, { useState, useMemo } from 'react';
import {
  LayoutDashboard,
  CheckCircle2,
  Clock,
  Calendar as CalendarIcon,
  Kanban,
  List,
  Plus,
  Search,
  Bell,
  Settings,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
  FolderOpen,
  MessageSquare,
  Users,
  Zap,
  GripVertical,
  X,
  Trash2,
  Sparkles,
  Bot,
  Loader2,
  LogOut,
  Lock,
  Mail
} from 'lucide-react';

// --- Mock Data ---
const initialTasks = [];

const priorities = {
  'Urgent': { color: 'bg-rose-500/10 text-rose-500 border-rose-500/20', icon: Zap, label: 'ด่วนมาก' },
  'High': { color: 'bg-orange-500/10 text-orange-500 border-orange-500/20', icon: null, label: 'สูง' },
  'Normal': { color: 'bg-blue-500/10 text-blue-500 border-blue-500/20', icon: null, label: 'ปานกลาง' },
  'Low': { color: 'bg-slate-500/10 text-slate-400 border-slate-500/20', icon: null, label: 'ต่ำ' }
};

const statuses = {
  'TO DO': { color: 'bg-slate-800 text-slate-300', dot: 'bg-slate-400', label: 'สิ่งที่ต้องทำ' },
  'IN PROGRESS': { color: 'bg-indigo-900/50 text-indigo-300', dot: 'bg-indigo-400', label: 'กำลังดำเนินการ' },
  'DONE': { color: 'bg-emerald-900/50 text-emerald-300', dot: 'bg-emerald-400', label: 'เสร็จสิ้น' }
};

// --- Sub-Components ---

const SidebarItem = ({ icon: Icon, label, filterValue, activeFilter, setActiveFilter, badge }) => {
  const isActive = activeFilter === filterValue;
  return (
    <div onClick={() => setActiveFilter(filterValue)}
      className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 group
  ${isActive ? 'bg-indigo-500/10 text-indigo-400' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}
    >
      <div className="flex items-center gap-3">
        <Icon size={18} className={isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'} />
        <span className="font-medium text-sm">{label}</span>
      </div>
      {badge && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">{badge}</span>}
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const config = statuses[status];
  if (!config) return null;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`}></span>
      {config.label}
    </span>
  );
};

const PriorityBadge = ({ priority }) => {
  const config = priorities[priority];
  if (!config) return null;
  const Icon = config.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium border ${config.color}`}>
      {Icon && <Icon size={12} />}
      {config.label}
    </span>
  );
};

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      onLogin();
    } else {
      setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950 flex items-center justify-center p-4 z-[200]">
      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-2xl shadow-indigo-500/20 mb-4">
            <Zap size={32} className="text-white fill-white/20" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Nexus Studio</h1>
          <p className="text-slate-500 mt-2">ยินดีต้อนรับสู่พื้นที่ทำงานของคุณ</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs p-3 rounded-lg text-center animate-in fade-in slide-in-from-top-1 duration-200">
                {error}
              </div>
            )}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400 px-1 uppercase tracking-wider">ชื่อผู้ใช้งาน</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="text" 
                  required
                  placeholder="admin"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setError(''); }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-slate-100 focus:outline-none focus:border-indigo-500 transition-all font-medium" 
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-400 px-1 uppercase tracking-wider">รหัสผ่าน</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="password" 
                  required
                  placeholder="admin"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-slate-100 focus:outline-none focus:border-indigo-500 transition-all font-medium" 
                />
              </div>
            </div>
            
            <button 
              type="submit"
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98] mt-4"
            >
              เข้าสู่ระบบ
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-500">
              ยังไม่มีบัญชี? <span className="text-indigo-400 hover:underline cursor-pointer">สร้างบัญชีใหม่</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function NexusApp() {
  // State Management
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('nexus_tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });
  
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('nexus_profile');
    const profile = saved ? JSON.parse(saved) : null;
    // Force the CEO profile as requested
    if (!profile || profile.name === 'Krittin S.') {
      return {
        name: 'เวฟนิกก้า',
        email: 'wavenigga@nexus.io',
        role: 'CEO',
        avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d'
      };
    }
    return profile;
  });

  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('nexus_notes');
    return saved ? JSON.parse(saved) : [];
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('nexus_is_logged_in') === 'true';
  });

  const [spaces, setSpaces] = useState(() => {
    const saved = localStorage.getItem('nexus_spaces');
    return saved ? JSON.parse(saved) : [
      { id: 'eng', name: 'Engineering', color: 'blue' },
      { id: 'design', name: 'Design Team', color: 'pink' },
      { id: 'product', name: 'Product', color: 'emerald' }
    ];
  });

  const [currentView, setCurrentView] = useState('dashboard'); // dashboard, profile, notes
  const [activeView, setActiveView] = useState('list');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedSpaces, setExpandedSpaces] = useState({ eng: true, design: false });

  // Feature States
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isCreateSpaceModalOpen, setIsCreateSpaceModalOpen] = useState(false);

  const [newTask, setNewTask] = useState({
    title: '', status: 'TO DO', priority: 'Normal', assignee: userProfile.name, dueDate: new Date().toISOString().split('T')[0],
    list: 'Engineering'
  });

  // AI Feature States
  const [aiPrompt, setAiPrompt] = useState('');
  const [isAILoading, setIsAILoading] = useState(false);
  const [aiError, setAiError] = useState('');

  // Persistence Hooks
  React.useEffect(() => {
    localStorage.setItem('nexus_tasks', JSON.stringify(tasks));
  }, [tasks]);

  React.useEffect(() => {
    localStorage.setItem('nexus_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  React.useEffect(() => {
    localStorage.setItem('nexus_notes', JSON.stringify(notes));
  }, [notes]);

  React.useEffect(() => {
    localStorage.setItem('nexus_is_logged_in', isLoggedIn);
  }, [isLoggedIn]);

  React.useEffect(() => {
    localStorage.setItem('nexus_spaces', JSON.stringify(spaces));
  }, [spaces]);

  // --- Actions ---

  const toggleSpace = (space) => setExpandedSpaces(prev => ({ ...prev, [space]: !prev[space] }));

  const changeTaskStatus = (taskId, newStatus) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    const taskToAdd = {
      ...newTask,
      id: Date.now(),
    };

    setTasks([taskToAdd, ...tasks]);
    setIsModalOpen(false);
    setNewTask({
      title: '', status: 'TO DO', priority: 'Normal', assignee: 'Krittin', dueDate: new
        Date().toISOString().split('T')[0], list: 'Engineering'
    });
  };

  // --- Gemini API Integration ---
  const handleAIGenerate = async (e) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    setIsAILoading(true);
    setAiError('');

    // API key should be provided by the user or through environment
    const apiKey = ""; 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
      if (!apiKey) {
        // Simulate API response for demo if No API key
        await new Promise(resolve => setTimeout(resolve, 1500));
        const demoTasks = [
          { title: "งานจำลองจาก AI: วิเคราะห์ระบบ", status: "TO DO", priority: "High", assignee: "Krittin", dueDate: "2026-03-25", list: "Engineering" },
          { title: "งานจำลองจาก AI: ออกแบบ UI ใหม่", status: "IN PROGRESS", priority: "Normal", assignee: "Alex", dueDate: "2026-03-27", list: "Design Team" }
        ];
        const tasksWithIds = demoTasks.map((task, index) => ({ ...task, id: Date.now() + index }));
        setTasks(prev => [...tasksWithIds, ...prev]);
        setIsAIModalOpen(false);
        setAiPrompt('');
        return;
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `วิเคราะห์และสร้างงานจากโปรเจกต์ต่อไปนี้: "${aiPrompt}"` }]
          }],
          systemInstruction: {
            parts: [{
              text: `คุณคือผู้จัดการโปรเจกต์มืออาชีพ (Project Manager) ให้แบ่งโปรเจกต์ที่ผู้ใช้ป้อนเข้ามาให้กลายเป็น 3-5 งานย่อย (Tasks) ที่สามารถนำไปปฏิบัติได้จริง

ข้อบังคับ:
1. ส่งคืนผลลัพธ์เป็นโครงสร้าง JSON Array เท่านั้น ห้ามมีข้อความอื่นปน
2. ห้ามใช้ Markdown code block (เช่น \`\`\`json)
3. แต่ละ Object ใน Array ต้องประกอบด้วย keys ดังนี้:
- title (string): ชื่อของงานนั้น เป็นภาษาไทย สั้นและกระชับ
- status (string): สุ่มเลือกระหว่าง 'TO DO' หรือ 'IN PROGRESS'
- priority (string): เลือกระดับความสำคัญตามความเหมาะสมจาก 'Urgent', 'High', 'Normal', 'Low'
- assignee (string): สุ่มเลือกผู้รับผิดชอบจาก 'Krittin', 'Alex', 'Sarah', 'John'
- dueDate (string): วันกำหนดส่งในรูปแบบ YYYY-MM-DD
- list (string): เลือกหมวดหมู่ที่เหมาะสมจาก 'Engineering', 'Design Team', 'Product', 'Marketing'`
            }]
          },
          generationConfig: {
            responseMimeType: "application/json"
          }
        })
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (textResponse) {
        const cleanText = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
        const generatedTasks = JSON.parse(cleanText);
        const tasksWithIds = generatedTasks.map((task, index) => ({
          ...task,
          id: Date.now() + index
        }));
        setTasks(prev => [...tasksWithIds, ...prev]);
        setIsAIModalOpen(false);
        setAiPrompt('');
      } else {
        throw new Error('No response content');
      }
    } catch (error) {
      console.error("AI Generation Error:", error);
      setAiError("เกิดข้อผิดพลาดในการเชื่อมต่อกับ AI กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsAILoading(false);
    }
  };

  // --- Filtering Logic ---
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.assignee.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesFilter = true;
      if (activeFilter === 'My Tasks') {
        matchesFilter = task.assignee === userProfile.name;
      } else if (activeFilter !== 'All' && activeFilter !== 'Home') {
        matchesFilter = task.list === activeFilter;
      }

      return matchesSearch && matchesFilter;
    });
  }, [tasks, searchQuery, activeFilter]);

  // --- Drag & Drop Handlers (Board View) ---
  const handleDragStart = (e, taskId) => setDraggedTaskId(taskId);
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    if (draggedTaskId) {
      changeTaskStatus(draggedTaskId, targetStatus);
      setDraggedTaskId(null);
    }
  };

  // --- View Components ---
  const ProfileView = () => {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="relative group">
            <img src={userProfile.avatar} alt="Profile" className="w-32 h-32 rounded-3xl object-cover border-4 border-slate-800 shadow-xl" />
            <button className="absolute -bottom-2 -right-2 bg-indigo-600 p-2 rounded-xl text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <Sparkles size={16} />
            </button>
          </div>
          
          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{userProfile.name}</h1>
              <p className="text-slate-400 flex items-center gap-2">
                <Users size={16} /> {userProfile.role} • {userProfile.email}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4">
                <p className="text-xs text-slate-500 uppercase font-bold mb-1">งานที่รอดำเนินการ</p>
                <p className="text-2xl font-bold text-indigo-400">{tasks.filter(t => t.status !== 'DONE' && t.assignee === userProfile.name).length}</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4">
                <p className="text-xs text-slate-500 uppercase font-bold mb-1">งานที่ทำสำเร็จ</p>
                <p className="text-2xl font-bold text-emerald-400">{tasks.filter(t => t.status === 'DONE' && t.assignee === userProfile.name).length}</p>
              </div>
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4">
                <p className="text-xs text-slate-500 uppercase font-bold mb-1">ความคืบหน้าโดยรวม</p>
                <p className="text-2xl font-bold text-blue-400">
                  {Math.round((tasks.filter(t => t.status === 'DONE').length / tasks.length) * 100) || 0}%
                </p>
              </div>
            </div>

            {userProfile.role !== 'CEO' ? (
              <button 
                onClick={() => setIsEditProfileOpen(true)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2"
              >
                <Settings size={18} /> แก้ไขโปรไฟล์
              </button>
            ) : (
              <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900/50 border border-indigo-500/30 text-indigo-400 text-sm font-semibold cursor-not-allowed">
                <Lock size={16} /> บัญชีระดับผู้บริหาร (Locked)
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">การตั้งค่าความปลอดภัย</h2>
            <div className="bg-slate-900/30 border border-slate-800/60 rounded-2xl divide-y divide-slate-800/60">
              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-200">ยืนยันตัวตนสองชั้น (2FA)</p>
                  <p className="text-xs text-slate-500">ช่วยให้บัญชีของคุณปลอดภัยยิ่งขึ้น</p>
                </div>
                <div className="w-10 h-5 bg-slate-700 rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-3 h-3 bg-slate-400 rounded-full"></div>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-200">เปลี่ยนรหัสผ่าน</p>
                  <p className="text-xs text-slate-500">อัปเดตครั้งล่าสุดเมื่อ 3 เดือนที่แล้ว</p>
                </div>
                <ChevronRight size={18} className="text-slate-600" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">เครื่องจดจำ (Saved Features)</h2>
            <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-indigo-500/20 rounded-2xl text-indigo-400">
                  <Zap size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">ระบบจดจำพิกัดพื้นที่</p>
                  <p className="text-xs text-indigo-400/70">กำลังเปิดใช้งาน (Active)</p>
                </div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                ระบบกำลังจดจำการใช้งานและการตั้งค่าทั้งหมดบนเครื่องของคุณ ข้อมูลเหล่านี้จะถูกเก็บไว้ใน Browser LocalStorage ไม่หายแม้จะรีเฟรชหน้าเว็บ
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const NotesView = () => {
    const [newNote, setNewNote] = useState('');
    
    const addNote = () => {
      if (!newNote.trim()) return;
      setNotes([{ id: Date.now(), content: newNote, date: new Date().toISOString().split('T')[0] }, ...notes]);
      setNewNote('');
    };

    const deleteNote = (id) => {
      setNotes(notes.filter(n => n.id !== id));
    };

    return (
      <div className="max-w-4xl mx-auto py-8 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">สมุดจดบันทึก</h1>
          <p className="text-slate-500">จดบันทึกไอเดียหรือสิ่งที่ต้องทำแบบด่วนๆ</p>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-2 flex gap-2 mb-8 focus-within:border-indigo-500/50 transition-all">
          <input 
            type="text" 
            placeholder="พิมพ์สิ่งที่ต้องการจดบันทึก..." 
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addNote()}
            className="flex-1 bg-transparent border-none outline-none px-4 text-slate-200 placeholder:text-slate-600"
          />
          <button 
            onClick={addNote}
            className="bg-indigo-600 hover:bg-indigo-500 text-white p-3 rounded-xl shadow-lg transition-all active:scale-95"
          >
            <Plus size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notes.map(note => (
            <div key={note.id} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl group hover:border-slate-700 transition-all">
              <div className="flex justify-between items-start gap-4 mb-4">
                <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap">{note.content}</p>
                <button 
                  onClick={() => deleteNote(note.id)}
                  className="text-slate-600 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                <CalendarIcon size={12} /> {new Date(note.date).toLocaleDateString('th-TH')}
              </div>
            </div>
          ))}
          {notes.length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-600 italic">
              ยังไม่มีบันทึกใดๆ...
            </div>
          )}
        </div>
      </div>
    );
  };

  const ListView = () => {
    const groupedStatuses = ['TO DO', 'IN PROGRESS', 'DONE'];
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        {groupedStatuses.map((status) => {
          const items = filteredTasks.filter(t => t.status === status);
          return (
            <div key={status} className="space-y-3">
              <div className="flex items-center gap-2 mb-4 sticky top-0 bg-slate-950/80 backdrop-blur-md py-2 z-10">
                <StatusBadge status={status} />
                <span className="text-sm text-slate-500 font-medium">{items.length} งาน</span>
                <div className="h-px bg-slate-800 flex-1 ml-4"></div>
              </div>

              <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900/80 text-slate-400 text-xs uppercase tracking-wider border-b border-slate-800">
                      <th className="px-4 py-3 font-medium w-8"></th>
                      <th className="px-4 py-3 font-medium">ชื่องาน</th>
                      <th className="px-4 py-3 font-medium w-32">ผู้รับผิดชอบ</th>
                      <th className="px-4 py-3 font-medium w-32">วันกำหนดส่ง</th>
                      <th className="px-4 py-3 font-medium w-32">ความสำคัญ</th>
                      <th className="px-4 py-3 font-medium w-24">ลิสต์</th>
                      <th className="px-4 py-3 font-medium w-12 text-center">จัดการ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {items.map(task => (
                      <tr key={task.id} className="group hover:bg-slate-800/40 transition-colors">
                        <td className="px-4 py-3 text-slate-600 cursor-grab">
                          <GripVertical size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={() => {
                                const nextStatus = task.status === 'DONE' ? 'TO DO' : task.status === 'TO DO' ? 'IN PROGRESS' : 'DONE';
                                changeTaskStatus(task.id, nextStatus);
                              }}
                              className={`w-5 h-5 rounded border flex items-center justify-center transition-colors shrink-0
                              ${task.status === 'DONE' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-500' :
                                task.status === 'IN PROGRESS' ? 'bg-indigo-500/20 border-indigo-500 text-indigo-500' :
                                'border-slate-600 hover:border-indigo-400 text-transparent hover:text-indigo-400'}`}
                              title="เปลี่ยนสถานะ"
                            >
                              {task.status === 'IN PROGRESS' ? <Clock size={12} /> : <CheckCircle2 size={14} />}
                            </button>
                            <span className={`text-sm font-medium truncate max-w-md ${task.status === 'DONE' ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                              {task.title}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] text-white font-bold shrink-0">
                              {task.assignee.charAt(0)}
                            </div>
                            <span className="text-xs text-slate-400 truncate w-20">{task.assignee}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-400">
                          {new Date(task.dueDate).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })}
                        </td>
                        <td className="px-4 py-3">
                          <PriorityBadge priority={task.priority} />
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-500 truncate max-w-[100px]">
                          {task.list}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button onClick={() => deleteTask(task.id)} className="text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-3 px-4 py-2 mt-1 opacity-50 hover:opacity-100 transition-opacity text-slate-500 hover:text-slate-300 w-full text-left">
                <Plus size={16} />
                <span className="text-sm">เพิ่มงานใหม่...</span>
              </button>
            </div>
          );
        })}
      </div>
    );
  };

  const BoardView = () => {
    const columns = ['TO DO', 'IN PROGRESS', 'DONE'];
    return (
      <div className="flex gap-6 h-full overflow-x-auto pb-4 animate-in fade-in duration-500">
        {columns.map(status => {
          const columnTasks = filteredTasks.filter(t => t.status === status);
          return (
            <div key={status} className={`flex-none w-80 flex flex-col rounded-xl transition-colors ${draggedTaskId ? 'bg-slate-900/10' : ''}`} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, status)}>
              <div className="flex items-center justify-between mb-4 px-1">
                <StatusBadge status={status} />
                <span className="text-xs text-slate-500 font-medium">{columnTasks.length}</span>
              </div>
              <div className="flex-1 bg-slate-900/30 rounded-xl p-3 border border-slate-800/50 space-y-3 min-h-[200px] flex flex-col">
                {columnTasks.map(task => (
                  <div key={task.id} draggable onDragStart={(e) => handleDragStart(e, task.id)} className="bg-slate-900 border border-slate-700/50 rounded-lg p-4 shadow-lg hover:border-indigo-500/50 transition-colors cursor-grab active:cursor-grabbing group relative">
                    <div className="flex justify-between items-start mb-2">
                      <PriorityBadge priority={task.priority} />
                      <button onClick={() => deleteTask(task.id)} className="text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className={`text-sm font-medium mb-4 ${task.status === 'DONE' ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                      {task.title}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2 text-slate-400 text-xs">
                        <CalendarIcon size={14} />
                        <span>{new Date(task.dueDate).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-500 max-w-[80px] truncate">{task.list}</span>
                        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] text-white font-bold shadow-sm shrink-0" title={task.assignee}>
                          {task.assignee.charAt(0)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={() => setIsModalOpen(true)} className="w-full mt-auto py-2.5 flex items-center justify-center gap-2 text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 rounded-lg transition-colors text-sm font-medium border border-dashed border-slate-700 hover:border-slate-500">
                  <Plus size={16} />
                  เพิ่มการ์ด
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 font-sans overflow-hidden selection:bg-indigo-500/30 relative">

      {/* Sidebar */}
      <aside className={`flex-shrink-0 bg-slate-950/50 border-r border-slate-800/60 backdrop-blur-xl flex flex-col transition-all duration-300 z-20 ${sidebarOpen ? 'w-64' : 'w-0 -ml-64'} lg:w-64 lg:ml-0`}>
        <div className="h-16 flex items-center px-4 border-b border-slate-800/60">
          <div 
            onClick={() => { setCurrentView('dashboard'); setActiveFilter('All'); }}
            className="flex items-center gap-3 w-full hover:bg-slate-800/50 p-2 rounded-lg cursor-pointer transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Zap size={18} className="text-white fill-white/20" />
            </div>
            <div className="flex-1 overflow-hidden">
              <h1 className="text-sm font-bold text-slate-100 truncate">Nexus Studio</h1>
              <p className="text-[10px] text-slate-400 truncate">Free Plan • 12 Members</p>
            </div>
            <ChevronDown size={16} className="text-slate-500" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-2 space-y-6 custom-scrollbar">
          <div className="space-y-1">
            <SidebarItem icon={LayoutDashboard} label="หน้าหลัก (Dashboard)" filterValue="All" activeFilter={activeFilter} setActiveFilter={(val) => { setActiveFilter(val); setCurrentView('dashboard'); }} />
            <SidebarItem icon={CheckCircle2} label="งานของฉัน" filterValue="My Tasks" activeFilter={activeFilter} setActiveFilter={(val) => { setActiveFilter(val); setCurrentView('dashboard'); }} badge={tasks.filter(t => t.assignee === userProfile.name).length || null} />
            <div 
              onClick={() => setCurrentView('notes')}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 group ${currentView === 'notes' ? 'bg-indigo-500/10 text-indigo-400' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}
            >
              <MessageSquare size={18} className={currentView === 'notes' ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'} />
              <span className="font-medium text-sm">สมุดบันทึก</span>
            </div>
            <div className="flex items-center justify-between px-3 py-2 rounded-lg cursor-not-allowed text-slate-500 opacity-50">
              <div className="flex items-center gap-3">
                <Bell size={18} /> <span className="font-medium text-sm">การแจ้งเตือน</span>
              </div>
            </div>
          </div>

          <div>
            <div className="px-3 mb-2 flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <span>พื้นที่ทำงาน (Spaces)</span>
              <button 
                onClick={() => setIsCreateSpaceModalOpen(true)}
                className="w-5 h-5 flex items-center justify-center rounded-md border border-slate-800 text-slate-500 hover:text-slate-200 hover:border-slate-600 transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>

            <div className="space-y-1">
              {spaces.map(space => {
                const colorMap = {
                  blue: 'blue',
                  pink: 'pink',
                  emerald: 'emerald',
                  indigo: 'indigo',
                  orange: 'orange',
                  rose: 'rose'
                };
                const color = colorMap[space.color] || 'indigo';
                const isActive = activeFilter === space.name;
                
                return (
                  <div key={space.id}>
                    <div 
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${isActive ? `bg-${color}-500/10 text-${color}-400` : 'hover:bg-slate-800/50 text-slate-300'}`} 
                      onClick={() => { setActiveFilter(space.name); setCurrentView('dashboard'); }}
                    >
                      <div className={`w-4 h-4 rounded flex items-center justify-center ${isActive ? `bg-${color}-500 text-white` : `bg-${color}-500/20 text-${color}-400`}`}>
                        <FolderOpen size={10} />
                      </div>
                      <span className="text-sm font-medium flex-1 truncate">{space.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-800/60 mt-auto">
          <div 
            onClick={() => setCurrentView('profile')}
            className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-colors ${currentView === 'profile' ? 'bg-indigo-500/10' : 'hover:bg-slate-800/50'}`}
          >
            <img src={userProfile.avatar} alt="User" className="w-8 h-8 rounded-full border-2 border-slate-800" />
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium text-slate-200 truncate">{userProfile.name}</p>
              <p className="text-xs text-slate-500 truncate">{userProfile.email}</p>
            </div>
            <Settings size={16} className={`transition-transform duration-500 ${currentView === 'profile' ? 'rotate-90 text-indigo-400' : 'text-slate-500'}`} />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-gradient-to-br from-slate-950 to-slate-900">
        <header className="h-16 flex items-center justify-between px-6 border-b border-slate-800/60 bg-slate-950/50 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 text-slate-400 hover:text-slate-200" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <List size={20} />
            </button>
            <div className="hidden md:flex items-center text-sm">
              <span className="text-slate-500 hover:text-slate-300 cursor-pointer transition-colors" onClick={() => { setActiveFilter('All'); setCurrentView('dashboard'); }}>Dashboard</span>
              {currentView === 'dashboard' && (
                <>
                  <ChevronRight size={14} className="mx-2 text-slate-600" />
                  <span className="text-slate-200 font-semibold flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${activeFilter === 'All' ? 'bg-slate-500' : 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]'}`}></div>
                    {activeFilter === 'All' ? 'หน้าหลัก' : activeFilter === 'My Tasks' ? 'งานของฉัน' : activeFilter}
                  </span>
                </>
              )}
              {currentView === 'profile' && (
                <>
                  <ChevronRight size={14} className="mx-2 text-slate-600" />
                  <span className="text-slate-200 font-semibold flex items-center gap-2">โปรไฟล์</span>
                </>
              )}
              {currentView === 'notes' && (
                <>
                  <ChevronRight size={14} className="mx-2 text-slate-600" />
                  <span className="text-slate-200 font-semibold flex items-center gap-2">สมุดบันทึก</span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 w-64 focus-within:border-indigo-500/50 focus-within:ring-1 focus-within:ring-indigo-500/50 transition-all">
              <Search size={16} className="text-slate-500 mr-2" />
              <input type="text" placeholder="ค้นหางาน, ชื่อคน..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent border-none outline-none text-sm w-full text-slate-200 placeholder:text-slate-600" />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-slate-500 hover:text-slate-300">
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1">
              <button onClick={() => setActiveView('list')} className={`p-1.5 rounded-md flex items-center gap-1.5 text-xs font-medium transition-colors ${activeView === 'list' ? 'bg-slate-800 text-slate-200 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}>
                <List size={14} /> <span className="hidden sm:inline">รายการ</span>
              </button>
              <button onClick={() => setActiveView('board')} className={`p-1.5 rounded-md flex items-center gap-1.5 text-xs font-medium transition-colors ${activeView === 'board' ? 'bg-slate-800 text-slate-200 shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}>
                <Kanban size={14} /> <span className="hidden sm:inline">บอร์ด</span>
              </button>
            </div>

            <div className="w-px h-6 bg-slate-800 mx-1"></div>

            <button onClick={() => setIsAIModalOpen(true)} className="bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all active:scale-95">
              <Sparkles size={16} />
              <span className="hidden sm:inline">สร้างด้วย AI</span>
            </button>

            <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 active:scale-95">
              <Plus size={16} />
              <span className="hidden sm:inline">สร้างงานใหม่</span>
            </button>

            <div className="w-px h-6 bg-slate-800 mx-1"></div>

            <button 
              onClick={() => setIsLoggedIn(false)}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 rounded-lg transition-all"
              title="ออกจากระบบ"
            >
              <LogOut size={20} />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6 scroll-smooth custom-scrollbar">
          {currentView === 'dashboard' ? (
            <div className="space-y-8 animate-in fade-in duration-500">
              {/* Dashboard Summary Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Task Stats Card */}
                <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-200 flex items-center gap-2">
                       <CheckCircle2 size={18} className="text-indigo-400" /> สรุปงาน
                    </h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 rounded-xl bg-slate-950/50">
                      <p className="text-xs text-slate-500 font-bold mb-1 uppercase">ทั้งหมด</p>
                      <p className="text-xl font-bold text-white">{tasks.length}</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-slate-950/50">
                      <p className="text-xs text-slate-500 font-bold mb-1 uppercase">กำลังทำ</p>
                      <p className="text-xl font-bold text-indigo-400">{tasks.filter(t => t.status === 'IN PROGRESS').length}</p>
                    </div>
                    <div className="text-center p-3 rounded-xl bg-slate-950/50">
                      <p className="text-xs text-slate-500 font-bold mb-1 uppercase">เสร็จแล้ว</p>
                      <p className="text-xl font-bold text-emerald-400">{tasks.filter(t => t.status === 'DONE').length}</p>
                    </div>
                  </div>
                </div>

                {/* Quick Notes Card */}
                <div className="bg-slate-900/40 border border-slate-800/60 rounded-2xl p-6 backdrop-blur-sm relative group overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-200 flex items-center gap-2">
                       <MessageSquare size={18} className="text-indigo-400" /> บันทึกล่าสุด
                    </h3>
                    <button onClick={() => setCurrentView('notes')} className="text-xs text-indigo-400 hover:underline">ดูทั้งหมด</button>
                  </div>
                  <div className="space-y-2 max-h-[80px] overflow-hidden">
                    {notes.slice(0, 2).map(note => (
                      <div key={note.id} className="text-xs text-slate-400 line-clamp-1 flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-slate-600"></div>
                        {note.content}
                      </div>
                    ))}
                    {notes.length === 0 && <p className="text-xs text-slate-600 italic">ไม่มีบันทึกใหม่...</p>}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-slate-950/50 to-transparent pointer-events-none"></div>
                </div>
              </div>

              {/* Original List or Board View */}
              {activeView === 'list' ? <ListView /> : <BoardView />}
            </div>
          ) : currentView === 'profile' ? (
            <ProfileView />
          ) : (
            <NotesView />
          )}
        </div>
      </main>

      {/* --- AI Task Generator Modal --- */}
      {isAIModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl w-full max-w-lg shadow-2xl shadow-indigo-500/10 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-5 border-b border-slate-800 bg-indigo-500/5">
              <h2 className="text-lg font-semibold text-indigo-300 flex items-center gap-2">
                <Bot size={20} className="text-indigo-400" /> ให้ AI ช่วยคิดและสร้างงาน
              </h2>
              <button onClick={() => setIsAIModalOpen(false)} className="text-slate-400 hover:text-slate-200 p-1 rounded-md hover:bg-slate-800 transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAIGenerate} className="p-5 space-y-4">
              <p className="text-sm text-slate-400">อธิบายโปรเจกต์หรือเป้าหมายที่คุณต้องการทำ แล้ว Gemini AI จะช่วยแตกย่อยออกมาเป็น 3-5 งานลงในบอร์ดให้ทันที</p>
              <div>
                <textarea autoFocus rows="4" placeholder="ตัวอย่าง: อยากทำแคมเปญการตลาดเปิดตัวรองเท้ารุ่นใหม่ช่วงสงกรานต์..." value={aiPrompt} onChange={e => setAiPrompt(e.target.value)} className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm resize-none custom-scrollbar" required disabled={isAILoading} />
              </div>
              {aiError && <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-rose-400 text-xs">{aiError}</div>}
              <div className="pt-2 flex justify-end gap-3">
                <button type="button" onClick={() => setIsAIModalOpen(false)} disabled={isAILoading} className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50">ยกเลิก</button>
                <button type="submit" disabled={isAILoading || !aiPrompt.trim()} className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-lg shadow-lg shadow-indigo-500/20 transition-all active:scale-95 disabled:opacity-70 flex items-center gap-2">
                  {isAILoading ? (
                    <><Loader2 size={16} className="animate-spin" /> กำลังประมวลผล...</>
                  ) : (
                    <><Sparkles size={16} /> สร้างงานด้วย AI</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- Create Task Modal --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-5 border-b border-slate-800">
              <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
                <Plus size={18} className="text-indigo-400" /> สร้างงานใหม่
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-200 p-1 rounded-md hover:bg-slate-800 transition-colors">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="p-5 space-y-4">
              <div>
                <input autoFocus type="text" placeholder="ชื่องาน (เช่น อัปเดตโลโก้หน้าเว็บไซต์)" value={newTask.title} onChange={e => setNewTask({ ...newTask, title: e.target.value })} className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-400 px-1">ผู้รับผิดชอบ</label>
                  <select value={newTask.assignee} onChange={e => setNewTask({ ...newTask, assignee: e.target.value })} className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-3 py-2.5 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 appearance-none cursor-pointer">
                    <option value={userProfile.name}>{userProfile.name} (ฉัน)</option>
                    <option value="Alex">Alex</option>
                    <option value="Sarah">Sarah</option>
                    <option value="John">John</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-400 px-1">พื้นที่ทำงาน (List)</label>
                  <select value={newTask.list} onChange={e => setNewTask({ ...newTask, list: e.target.value })} className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-3 py-2.5 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 appearance-none cursor-pointer">
                    <option value="Engineering">Engineering</option>
                    <option value="Design Team">Design Team</option>
                    <option value="Product">Product</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-400 px-1">ความสำคัญ</label>
                  <select value={newTask.priority} onChange={e => setNewTask({ ...newTask, priority: e.target.value })} className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-3 py-2.5 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 appearance-none cursor-pointer">
                    <option value="Urgent">ด่วนมาก (Urgent)</option>
                    <option value="High">สูง (High)</option>
                    <option value="Normal">ปานกลาง (Normal)</option>
                    <option value="Low">ต่ำ (Low)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-400 px-1">วันกำหนดส่ง</label>
                  <input type="date" value={newTask.dueDate} onChange={e => setNewTask({ ...newTask, dueDate: e.target.value })} className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 [&::-webkit-calendar-picker-indicator]:invert" />
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors">ยกเลิก</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-lg shadow-indigo-500/20 transition-all active:scale-95">สร้างงาน</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- Edit Profile Modal --- */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-5 border-b border-slate-800">
              <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
                <Settings size={18} className="text-indigo-400" /> แก้ไขโปรไฟล์
              </h2>
              <button onClick={() => setIsEditProfileOpen(false)} className="text-slate-400 hover:text-slate-200 p-1 rounded-md hover:bg-slate-800 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400 px-1">ชื่อที่แสดง</label>
                <input 
                  type="text" 
                  value={userProfile.name} 
                  onChange={e => setUserProfile({ ...userProfile, name: e.target.value })} 
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500 transition-all text-sm" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400 px-1">อีเมล</label>
                <input 
                  type="email" 
                  value={userProfile.email} 
                  onChange={e => setUserProfile({ ...userProfile, email: e.target.value })} 
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500 transition-all text-sm" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400 px-1">ตำแหน่งงาน</label>
                <input 
                  type="text" 
                  value={userProfile.role} 
                  onChange={e => setUserProfile({ ...userProfile, role: e.target.value })} 
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500 transition-all text-sm" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400 px-1">URL รูปภาพประจำตัว</label>
                <input 
                  type="text" 
                  value={userProfile.avatar} 
                  onChange={e => setUserProfile({ ...userProfile, avatar: e.target.value })} 
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500 transition-all text-sm" 
                />
              </div>
              
              <div className="pt-4 flex justify-end">
                <button 
                  onClick={() => setIsEditProfileOpen(false)}
                  className="px-6 py-2.5 text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
                >
                  บันทึกข้อมูล
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- Create Space Modal --- */}
      {isCreateSpaceModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-sm shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-5 border-b border-slate-800">
              <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
                <FolderOpen size={18} className="text-indigo-400" /> สร้างพื้นที่ทำงานใหม่
              </h2>
              <button onClick={() => setIsCreateSpaceModalOpen(false)} className="text-slate-400 hover:text-slate-200 p-1 rounded-md hover:bg-slate-800 transition-colors">
                <X size={20} />
              </button>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const name = e.target.spaceName.value;
                if (!name) return;
                const colors = ['blue', 'pink', 'emerald', 'indigo', 'orange', 'rose'];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                const newSpace = {
                  id: Date.now().toString(),
                  name: name,
                  color: randomColor
                };
                setSpaces([...spaces, newSpace]);
                setIsCreateSpaceModalOpen(false);
              }}
              className="p-5 space-y-4"
            >
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-400 px-1">ชื่อพื้นที่ทำงาน</label>
                <input 
                  name="spaceName"
                  autoFocus
                  type="text" 
                  placeholder="เช่น Marketing, UX Research"
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:border-indigo-500 transition-all text-sm" 
                  required
                />
              </div>
              
              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsCreateSpaceModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-200"
                >
                  ยกเลิก
                </button>
                <button 
                  type="submit"
                  className="px-6 py-2 text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
                >
                  สร้าง Spaces
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Global styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(71, 85, 105, 0.5); border-radius: 10px; }
          .custom-scrollbar:hover::-webkit-scrollbar-thumb { background-color: rgba(71, 85, 105, 0.8); }
        `}} />
    </div>
  );
}