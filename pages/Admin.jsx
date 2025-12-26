import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Plus, Trash2, LogOut, LayoutDashboard, Code, FolderGit2, MessageSquare, Loader2, ArrowLeft, Briefcase, GraduationCap, Edit2, ChevronUp, Menu, X, Reply, Send, CheckCircle } from 'lucide-react';
import { getAppData, saveAppData, logoutUser, getEnquiries, markEnquiryAsReplied } from '../services/storage';

const Admin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Enquiry specific states
  const [replyingToId, setReplyingToId] = useState(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    const loadAllData = async () => {
      setIsLoading(true);
      const [fetchedData, fetchedEnquiries] = await Promise.all([
        getAppData(),
        getEnquiries()
      ]);
      setData(fetchedData);
      setEnquiries(fetchedEnquiries);
      setIsLoading(false);
    };
    loadAllData();
  }, []);

  const handleSave = async () => {
    if (data) {
      setIsSaving(true);
      await saveAppData(data);
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    await logoutUser();
    navigate('/');
  };

  const switchTab = (tabId) => {
    setActiveTab(tabId);
    setIsSidebarOpen(false);
  };

  const updateProfile = (field, value) => {
    if (!data) return;
    setData({ ...data, profile: { ...data.profile, [field]: value } });
  };

  const updateSkill = (id, field, value) => {
    if (!data) return;
    setData({ ...data, skills: data.skills.map(s => s.id === id ? { ...s, [field]: value } : s) });
  };

  const addSkill = () => {
    if (!data) return;
    const newSkill = { id: Date.now().toString(), name: 'New Skill', category: 'Tools', level: 50 };
    setData({ ...data, skills: [...data.skills, newSkill] });
  };

  const deleteSkill = (id) => {
    setData({ ...data, skills: data.skills.filter(s => s.id !== id) });
  };

  const updateProject = (id, field, value) => {
    setData({ ...data, projects: data.projects.map(p => p.id === id ? { ...p, [field]: value } : p) });
  };

  const addProject = () => {
    const newId = Date.now().toString();
    const newProject = {
      id: newId,
      title: 'New Project',
      description: 'Project description...',
      technologies: [],
      imageUrl: 'https://picsum.photos/600/400',
      category: 'Web'
    };
    setData({ ...data, projects: [newProject, ...data.projects] });
    setEditingProjectId(newId);
  };

  const deleteProject = (id, e) => {
    e.stopPropagation();
    if (window.confirm('Delete project?')) {
        setData({ ...data, projects: data.projects.filter(p => p.id !== id) });
        if (editingProjectId === id) setEditingProjectId(null);
    }
  };

  const handleMarkAsReplied = async (id) => {
    const success = await markEnquiryAsReplied(id);
    if (success) {
      setEnquiries(enquiries.map(e => e.id === id ? { ...e, replied: true } : e));
      setReplyingToId(null);
    }
  };

  const handleSendEmail = (enquiry) => {
    const subject = encodeURIComponent(`Re: Project Inquiry from ${enquiry.name}`);
    const body = encodeURIComponent(replyText);
    window.location.href = `mailto:${enquiry.email}?subject=${subject}&body=${body}`;
    handleMarkAsReplied(enquiry.id);
  };

  const existingCategories = data ? Array.from(new Set(data.projects.map(p => p.category))) : [];

  if (isLoading) return <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-indigo-400"><Loader2 className="animate-spin mr-2" /> Loading Dashboard...</div>;

  const NavItems = [
    { id: 'profile', icon: LayoutDashboard, label: 'Profile & Bio' },
    { id: 'skills', icon: Code, label: 'Skills & Highlights' },
    { id: 'projects', icon: FolderGit2, label: 'Projects' },
    { id: 'enquiries', icon: MessageSquare, label: 'Enquiries' }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 flex flex-col md:flex-row font-sans relative overflow-hidden">
      
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 bg-zinc-900 border-b border-zinc-800 z-50">
        <h1 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full"></span>
            Admin
        </h1>
        <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-zinc-400 hover:text-white transition-colors"
        >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`
        fixed md:relative inset-y-0 left-0 z-40 w-72 bg-zinc-900 border-r border-zinc-800 flex flex-col transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-8 hidden md:block">
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="w-3 h-3 bg-indigo-500 rounded-full"></span>
            Admin Panel
          </h1>
          <p className="text-xs text-zinc-500 mt-2 ml-5">Content Management</p>
        </div>
        
        <nav className="flex-grow px-4 mt-4 md:mt-0 space-y-1">
          {NavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => switchTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                activeTab === item.id 
                  ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-600/20' 
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              <item.icon size={18} /> {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-zinc-800 space-y-2">
          <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-4 py-2 text-zinc-400 hover:text-white transition-colors text-sm">
             <ArrowLeft size={16} /> Back to Site
          </button>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-red-900/10 rounded-lg transition-colors text-sm">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow h-[calc(100vh-64px)] md:h-screen overflow-y-auto bg-zinc-950/50 scroll-smooth">
        <div className="p-6 md:p-12 max-w-5xl mx-auto">
            
            {/* Context Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white capitalize">{activeTab}</h2>
                    <p className="text-zinc-500 text-sm mt-1">Manage your {activeTab} section</p>
                </div>
                
                {activeTab !== 'enquiries' && (
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50 font-medium text-sm"
                    >
                        {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                )}
            </div>

            {/* Profile Tab */}
            {activeTab === 'profile' && (
                <div className="grid grid-cols-1 gap-6 md:gap-8">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 md:p-6">
                        <h3 className="text-lg font-semibold text-white mb-6 border-b border-zinc-800 pb-4">Personal Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                            <InputField label="Full Name" value={data.profile.name} onChange={v => updateProfile('name', v)} />
                            <InputField label="Job Title" value={data.profile.title} onChange={v => updateProfile('title', v)} />
                            <div className="md:col-span-2">
                                <InputField label="Tagline" value={data.profile.tagline} onChange={v => updateProfile('tagline', v)} />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">About Bio</label>
                                <textarea rows={6} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-zinc-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all" value={data.profile.about} onChange={e => updateProfile('about', e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Skills Tab */}
            {activeTab === 'skills' && (
                <div className="space-y-8">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 md:p-6">
                         <h3 className="text-lg font-semibold text-white mb-6 border-b border-zinc-800 pb-4">Career Highlights</h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Briefcase size={16} className="text-indigo-400" />
                                    <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Experience Summary</label>
                                </div>
                                <textarea 
                                    rows={3} 
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-zinc-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                                    value={data.profile.experience || ''}
                                    onChange={e => updateProfile('experience', e.target.value)}
                                    placeholder="Experience summary..."
                                />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <GraduationCap size={16} className="text-violet-400" />
                                    <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Learning Goals</label>
                                </div>
                                <textarea 
                                    rows={3} 
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-zinc-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                                    value={data.profile.learning || ''}
                                    onChange={e => updateProfile('learning', e.target.value)}
                                    placeholder="Current learning goals..."
                                />
                            </div>
                         </div>
                    </div>

                    <div className="space-y-6">
                         <div className="flex justify-between items-center">
                             <h3 className="text-lg font-semibold text-white">Technical Skills</h3>
                             <button onClick={addSkill} className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors px-4 py-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                                <Plus size={16} /> Add Skill
                            </button>
                         </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {data.skills.map(skill => (
                                <div key={skill.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex items-center gap-4 group hover:border-zinc-700 transition-colors">
                                    <div className="flex-grow grid grid-cols-2 gap-2">
                                        <input className="bg-transparent border-b border-transparent focus:border-indigo-500 outline-none text-white font-medium" value={skill.name} onChange={e => updateSkill(skill.id, 'name', e.target.value)} placeholder="Skill" />
                                        <input type="number" className="bg-transparent border-b border-transparent focus:border-indigo-500 outline-none text-zinc-400 text-right" value={skill.level} onChange={e => updateSkill(skill.id, 'level', parseInt(e.target.value))} placeholder="%" />
                                        <select className="bg-zinc-950 text-xs text-zinc-400 rounded p-1 outline-none border border-zinc-800" value={skill.category} onChange={e => updateSkill(skill.id, 'category', e.target.value)}>
                                            <option value="Frontend">Frontend</option>
                                            <option value="Backend">Backend</option>
                                            <option value="Design">Design</option>
                                            <option value="Tools">Tools</option>
                                        </select>
                                    </div>
                                    <button onClick={() => deleteSkill(skill.id)} className="text-zinc-600 hover:text-red-400 p-2"><Trash2 size={18} /></button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Projects Tab */}
            {activeTab === 'projects' && (
                <div className="space-y-6 md:space-y-8">
                    <button onClick={addProject} className="w-full py-6 border-2 border-dashed border-zinc-800 rounded-xl text-zinc-500 hover:border-indigo-500 hover:text-indigo-500 transition-colors flex items-center justify-center gap-2 font-medium">
                        <Plus size={20} /> Add New Project
                    </button>
                    <div className="grid grid-cols-1 gap-4">
                        {data.projects.map(project => (
                            <div key={project.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden transition-all">
                                {editingProjectId === project.id ? (
                                    <div className="p-5 md:p-6 relative animate-fade-in">
                                         <div className="flex justify-end gap-2 mb-4">
                                            <button onClick={() => setEditingProjectId(null)} className="text-zinc-500 hover:text-white p-2 bg-zinc-800/50 rounded-lg transition-colors" title="Collapse">
                                                <ChevronUp size={20} />
                                            </button>
                                            <button onClick={(e) => deleteProject(project.id, e)} className="text-zinc-500 hover:text-red-400 p-2 bg-zinc-800/50 rounded-lg transition-colors" title="Delete">
                                                <Trash2 size={20} />
                                            </button>
                                         </div>
                                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
                                            <div className="lg:col-span-4">
                                                <div className="aspect-video bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800 mb-4">
                                                    <img src={project.imageUrl} alt="" className="w-full h-full object-cover opacity-70" />
                                                </div>
                                                <InputField label="Image URL" value={project.imageUrl} onChange={v => updateProject(project.id, 'imageUrl', v)} />
                                            </div>
                                            <div className="lg:col-span-8 space-y-4">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <InputField label="Title" value={project.title} onChange={v => updateProject(project.id, 'title', v)} />
                                                    <div>
                                                        <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Category</label>
                                                        <input 
                                                            type="text"
                                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2.5 text-zinc-300 outline-none focus:border-indigo-500 transition-all placeholder-zinc-700"
                                                            value={project.category}
                                                            onChange={e => updateProject(project.id, 'category', e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Description</label>
                                                    <textarea rows={3} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-zinc-300 focus:border-indigo-500 outline-none" value={project.description} onChange={e => updateProject(project.id, 'description', e.target.value)} />
                                                </div>
                                                <InputField label="Technologies (comma separated)" value={project.technologies.join(', ')} onChange={v => updateProject(project.id, 'technologies', v.split(',').map(t => t.trim()))} />
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <InputField label="Demo Link" value={project.demoLink || ''} onChange={v => updateProject(project.id, 'demoLink', v)} />
                                                    <InputField label="Repo Link" value={project.repoLink || ''} onChange={v => updateProject(project.id, 'repoLink', v)} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:bg-zinc-800/30 transition-colors">
                                        <div className="w-full sm:w-20 h-24 sm:h-14 bg-zinc-950 rounded-lg overflow-hidden border border-zinc-800 flex-shrink-0">
                                            <img src={project.imageUrl} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-grow">
                                             <h4 className="font-bold text-white text-base md:text-lg">{project.title}</h4>
                                             <span className="text-xs text-zinc-500 font-medium">{project.category}</span>
                                        </div>
                                        <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                                            <button 
                                                onClick={() => setEditingProjectId(project.id)} 
                                                className="flex-grow sm:flex-grow-0 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 hover:text-indigo-300 rounded-lg transition-all text-sm font-medium border border-indigo-500/20"
                                            >
                                                <Edit2 size={16} /> Edit
                                            </button>
                                            <button 
                                                onClick={(e) => deleteProject(project.id, e)} 
                                                className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Enquiries Tab */}
            {activeTab === 'enquiries' && (
                <div className="space-y-4">
                    {enquiries.length === 0 ? (
                        <div className="text-center py-16 text-zinc-500 bg-zinc-900/50 rounded-2xl border border-zinc-800 border-dashed">
                            No enquiries received yet.
                        </div>
                    ) : (
                        enquiries.map(enquiry => (
                            <div key={enquiry.id} className={`bg-zinc-900 border transition-all duration-300 rounded-2xl overflow-hidden ${enquiry.replied ? 'border-green-900/30 opacity-75' : 'border-zinc-800'}`}>
                                <div className="p-5 md:p-6">
                                    <div className="flex justify-between items-start mb-2 gap-2">
                                        <div className="flex items-center gap-3">
                                            <h4 className="text-base md:text-lg font-bold text-white leading-tight">{enquiry.name}</h4>
                                            {enquiry.replied && (
                                                <span className="flex items-center gap-1 bg-green-500/10 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-500/20">
                                                    <CheckCircle size={10} /> REPLIED
                                                </span>
                                            )}
                                        </div>
                                        <span className="text-[10px] text-zinc-500 whitespace-nowrap">{new Date(enquiry.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="text-indigo-400 text-xs md:text-sm mb-4 truncate">{enquiry.email}</div>
                                    <p className="text-zinc-300 text-sm bg-zinc-950 p-4 rounded-lg border border-zinc-800 leading-relaxed overflow-wrap-anywhere mb-4">
                                        {enquiry.message}
                                    </p>

                                    {/* Action Row */}
                                    <div className="flex items-center justify-between gap-4">
                                        <button 
                                            onClick={() => setReplyingToId(replyingToId === enquiry.id ? null : enquiry.id)}
                                            className="flex items-center gap-2 text-xs font-bold text-indigo-400 hover:text-indigo-300 px-3 py-2 bg-indigo-500/10 rounded-lg transition-colors"
                                        >
                                            <Reply size={14} /> {replyingToId === enquiry.id ? 'Cancel Reply' : 'Reply Now'}
                                        </button>
                                        
                                        {!enquiry.replied && (
                                            <button 
                                                onClick={() => handleMarkAsReplied(enquiry.id)}
                                                className="text-[10px] font-bold text-zinc-500 hover:text-zinc-300 uppercase tracking-wider"
                                            >
                                                Mark as Replied
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Integrated Reply Composer */}
                                {replyingToId === enquiry.id && (
                                    <div className="bg-zinc-950 p-5 md:p-6 border-t border-zinc-800 animate-slide-down">
                                        <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Compose Reply</label>
                                        <textarea 
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-sm text-zinc-200 focus:border-indigo-500 outline-none transition-all placeholder-zinc-700 mb-4"
                                            rows={4}
                                            placeholder={`Hey ${enquiry.name.split(' ')[0]}, thanks for reaching out! I'd love to help with...`}
                                        />
                                        <div className="flex justify-end gap-3">
                                            <button 
                                                onClick={() => handleSendEmail(enquiry)}
                                                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-600/20"
                                            >
                                                <Send size={14} /> Send via Email Client
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            )}

        </div>
      </main>
    </div>
  );
};

const InputField = ({ label, value, onChange, type = "text" }) => (
    <div className="w-full">
        <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">{label}</label>
        <input 
            type={type} 
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2.5 text-zinc-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder-zinc-700" 
            value={value} 
            onChange={e => onChange(e.target.value)} 
        />
    </div>
);

export default Admin;