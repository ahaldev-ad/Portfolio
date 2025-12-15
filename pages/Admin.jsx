import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Plus, Trash2, LogOut, LayoutDashboard, Code, FolderGit2, MessageSquare, Loader2, ArrowLeft } from 'lucide-react';
import { getAppData, saveAppData, logoutUser, getEnquiries } from '../services/storage';

const Admin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  // Generic Update Handlers
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
    const newProject = {
      id: Date.now().toString(),
      title: 'New Project',
      description: 'Project description...',
      technologies: [],
      imageUrl: 'https://picsum.photos/600/400',
      category: 'Web'
    };
    setData({ ...data, projects: [newProject, ...data.projects] });
  };

  const deleteProject = (id) => {
    if (window.confirm('Delete project?')) {
        setData({ ...data, projects: data.projects.filter(p => p.id !== id) });
    }
  };

  if (isLoading) return <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-indigo-400"><Loader2 className="animate-spin mr-2" /> Loading Dashboard...</div>;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 flex flex-col md:flex-row font-sans">
      
      {/* Modern Sidebar */}
      <aside className="bg-zinc-900 w-full md:w-72 flex-shrink-0 border-r border-zinc-800 flex flex-col">
        <div className="p-8">
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="w-3 h-3 bg-indigo-500 rounded-full"></span>
            Admin Panel
          </h1>
          <p className="text-xs text-zinc-500 mt-2 ml-5">Content Management</p>
        </div>
        
        <nav className="flex-grow px-4 space-y-1">
          {[
            { id: 'profile', icon: LayoutDashboard, label: 'Profile & Bio' },
            { id: 'skills', icon: Code, label: 'Skills' },
            { id: 'projects', icon: FolderGit2, label: 'Projects' },
            { id: 'enquiries', icon: MessageSquare, label: 'Enquiries' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
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
      <main className="flex-grow h-screen overflow-y-auto bg-zinc-950/50">
        <div className="p-8 md:p-12 max-w-5xl mx-auto">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white capitalize">{activeTab}</h2>
                    <p className="text-zinc-500 text-sm mt-1">Manage your {activeTab} section</p>
                </div>
                
                {activeTab !== 'enquiries' && (
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50 font-medium text-sm"
                    >
                        {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                )}
            </div>

            {/* Profile Tab */}
            {activeTab === 'profile' && (
                <div className="grid grid-cols-1 gap-8">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-6 border-b border-zinc-800 pb-4">Personal Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                        <h3 className="text-lg font-semibold text-white mb-6 border-b border-zinc-800 pb-4">Contact & Media</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputField label="Email" type="email" value={data.profile.email} onChange={v => updateProfile('email', v)} />
                            <InputField label="Location" value={data.profile.location} onChange={v => updateProfile('location', v)} />
                            <InputField label="GitHub" value={data.profile.github} onChange={v => updateProfile('github', v)} />
                            <InputField label="LinkedIn" value={data.profile.linkedin} onChange={v => updateProfile('linkedin', v)} />
                            <div className="md:col-span-2">
                                <InputField label="Hero Image URL" value={data.profile.heroImage} onChange={v => updateProfile('heroImage', v)} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Skills Tab */}
            {activeTab === 'skills' && (
                <div className="space-y-6">
                    <button onClick={addSkill} className="w-full py-3 border-2 border-dashed border-zinc-800 rounded-xl text-zinc-500 hover:border-indigo-500 hover:text-indigo-500 transition-colors flex items-center justify-center gap-2 font-medium">
                        <Plus size={20} /> Add New Skill
                    </button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.skills.map(skill => (
                            <div key={skill.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex items-center gap-4 group hover:border-zinc-700 transition-colors">
                                <div className="flex-grow grid grid-cols-2 gap-2">
                                    <input className="bg-transparent border-b border-transparent focus:border-indigo-500 outline-none text-white font-medium" value={skill.name} onChange={e => updateSkill(skill.id, 'name', e.target.value)} placeholder="Skill Name" />
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
            )}

            {/* Projects Tab */}
            {activeTab === 'projects' && (
                <div className="space-y-8">
                    <button onClick={addProject} className="w-full py-4 border-2 border-dashed border-zinc-800 rounded-xl text-zinc-500 hover:border-indigo-500 hover:text-indigo-500 transition-colors flex items-center justify-center gap-2 font-medium">
                        <Plus size={20} /> Add New Project
                    </button>
                    <div className="grid grid-cols-1 gap-8">
                        {data.projects.map(project => (
                            <div key={project.id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl relative">
                                <button onClick={() => deleteProject(project.id)} className="absolute top-4 right-4 text-zinc-600 hover:text-red-400 p-2"><Trash2 size={20} /></button>
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                    <div className="lg:col-span-4">
                                        <div className="aspect-video bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800 mb-4">
                                            <img src={project.imageUrl} alt="" className="w-full h-full object-cover opacity-70" />
                                        </div>
                                        <InputField label="Image URL" value={project.imageUrl} onChange={v => updateProject(project.id, 'imageUrl', v)} />
                                    </div>
                                    <div className="lg:col-span-8 space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <InputField label="Title" value={project.title} onChange={v => updateProject(project.id, 'title', v)} />
                                            <div>
                                                <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Category</label>
                                                <select className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2.5 text-zinc-300 outline-none focus:border-indigo-500" value={project.category} onChange={e => updateProject(project.id, 'category', e.target.value)}>
                                                    <option value="Web">Web Development</option>
                                                    <option value="Mobile">Mobile App</option>
                                                    <option value="Design">UI/UX Design</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Description</label>
                                            <textarea rows={3} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-zinc-300 focus:border-indigo-500 outline-none" value={project.description} onChange={e => updateProject(project.id, 'description', e.target.value)} />
                                        </div>
                                        <InputField label="Technologies (comma separated)" value={project.technologies.join(', ')} onChange={v => updateProject(project.id, 'technologies', v.split(',').map(t => t.trim()))} />
                                        <div className="grid grid-cols-2 gap-4">
                                            <InputField label="Demo Link" value={project.demoLink || ''} onChange={v => updateProject(project.id, 'demoLink', v)} />
                                            <InputField label="Repo Link" value={project.repoLink || ''} onChange={v => updateProject(project.id, 'repoLink', v)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Enquiries Tab (New) */}
            {activeTab === 'enquiries' && (
                <div className="space-y-4">
                    {enquiries.length === 0 ? (
                        <div className="text-center py-20 text-zinc-500 bg-zinc-900/50 rounded-2xl border border-zinc-800 border-dashed">
                            No enquiries received yet.
                        </div>
                    ) : (
                        enquiries.map(enquiry => (
                            <div key={enquiry.id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl hover:border-indigo-500/30 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="text-lg font-bold text-white">{enquiry.name}</h4>
                                    <span className="text-xs text-zinc-500">{new Date(enquiry.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="text-indigo-400 text-sm mb-4">{enquiry.email}</div>
                                <p className="text-zinc-300 text-sm bg-zinc-950 p-4 rounded-lg border border-zinc-800 leading-relaxed">
                                    {enquiry.message}
                                </p>
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

// Helper Component
const InputField = ({ label, value, onChange, type = "text" }) => (
    <div>
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