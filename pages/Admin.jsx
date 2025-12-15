import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Plus, Trash2, LogOut, LayoutDashboard, Code, FolderGit2 } from 'lucide-react';
import { getAppData, saveAppData, logout } from '../services/storage';

const Admin = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setData(getAppData());
  }, []);

  const handleSave = () => {
    if (data) {
      setIsSaving(true);
      saveAppData(data);
      setTimeout(() => setIsSaving(false), 800);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Profile Handlers
  const updateProfile = (field, value) => {
    if (!data) return;
    setData({
      ...data,
      profile: { ...data.profile, [field]: value }
    });
  };

  // Skill Handlers
  const updateSkill = (id, field, value) => {
    if (!data) return;
    setData({
      ...data,
      skills: data.skills.map(s => s.id === id ? { ...s, [field]: value } : s)
    });
  };

  const addSkill = () => {
    if (!data) return;
    const newSkill = {
      id: Date.now().toString(),
      name: 'New Skill',
      category: 'Tools',
      level: 50
    };
    setData({ ...data, skills: [...data.skills, newSkill] });
  };

  const deleteSkill = (id) => {
    if (!data) return;
    setData({ ...data, skills: data.skills.filter(s => s.id !== id) });
  };

  // Project Handlers
  const updateProject = (id, field, value) => {
    if (!data) return;
    setData({
      ...data,
      projects: data.projects.map(p => p.id === id ? { ...p, [field]: value } : p)
    });
  };

  const addProject = () => {
    if (!data) return;
    const newProject = {
      id: Date.now().toString(),
      title: 'New Project',
      description: 'Project description goes here...',
      technologies: [],
      imageUrl: 'https://picsum.photos/600/400',
      category: 'Web'
    };
    setData({ ...data, projects: [newProject, ...data.projects] });
  };

  const deleteProject = (id) => {
    if (!data) return;
    if (window.confirm('Are you sure you want to delete this project?')) {
        setData({ ...data, projects: data.projects.filter(p => p.id !== id) });
    }
  };

  if (!data) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-zinc-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="bg-zinc-900 text-white w-full md:w-64 flex-shrink-0">
        <div className="p-6 border-b border-zinc-800">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <p className="text-xs text-zinc-500 mt-1">Manage content</p>
        </div>
        <nav className="p-4 space-y-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'profile' ? 'bg-indigo-600' : 'hover:bg-zinc-800'}`}
          >
            <LayoutDashboard size={18} /> Profile
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'skills' ? 'bg-indigo-600' : 'hover:bg-zinc-800'}`}
          >
            <Code size={18} /> Skills
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'projects' ? 'bg-indigo-600' : 'hover:bg-zinc-800'}`}
          >
            <FolderGit2 size={18} /> Projects
          </button>
        </nav>
        <div className="p-4 mt-auto border-t border-zinc-800">
          <button onClick={handleLogout} className="w-full flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 md:p-10 h-screen overflow-y-auto scrollbar-thin">
        <header className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 capitalize">{activeTab} Manager</h2>
            <div className="flex gap-4">
                 <button 
                    onClick={() => navigate('/')}
                    className="px-4 py-2 text-zinc-600 bg-white border border-zinc-300 rounded-lg hover:bg-zinc-50"
                 >
                    View Site
                 </button>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 disabled:opacity-70"
                >
                    <Save size={18} /> {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </header>

        {/* Profile Editor */}
        {activeTab === 'profile' && (
            <div className="bg-white rounded-xl shadow-sm border border-zinc-200 p-6 space-y-6 max-w-3xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-1">Full Name</label>
                        <input type="text" className="w-full p-2 border rounded-md" value={data.profile.name} onChange={e => updateProfile('name', e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-1">Job Title</label>
                        <input type="text" className="w-full p-2 border rounded-md" value={data.profile.title} onChange={e => updateProfile('title', e.target.value)} />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">Tagline</label>
                    <input type="text" className="w-full p-2 border rounded-md" value={data.profile.tagline} onChange={e => updateProfile('tagline', e.target.value)} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">About Bio</label>
                    <textarea rows={5} className="w-full p-2 border rounded-md" value={data.profile.about} onChange={e => updateProfile('about', e.target.value)} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-1">Email</label>
                        <input type="email" className="w-full p-2 border rounded-md" value={data.profile.email} onChange={e => updateProfile('email', e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-1">Location</label>
                        <input type="text" className="w-full p-2 border rounded-md" value={data.profile.location} onChange={e => updateProfile('location', e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-1">GitHub URL</label>
                        <input type="text" className="w-full p-2 border rounded-md" value={data.profile.github} onChange={e => updateProfile('github', e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-1">LinkedIn URL</label>
                        <input type="text" className="w-full p-2 border rounded-md" value={data.profile.linkedin} onChange={e => updateProfile('linkedin', e.target.value)} />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">Hero Image URL</label>
                    <input type="text" className="w-full p-2 border rounded-md" value={data.profile.heroImage} onChange={e => updateProfile('heroImage', e.target.value)} />
                </div>
            </div>
        )}

        {/* Skills Editor */}
        {activeTab === 'skills' && (
            <div className="space-y-4 max-w-4xl">
                <button onClick={addSkill} className="flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-800">
                    <Plus size={20} /> Add New Skill
                </button>
                <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
                    <table className="min-w-full divide-y divide-zinc-200">
                        <thead className="bg-zinc-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Skill Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">Level (0-100)</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-zinc-200">
                            {data.skills.map(skill => (
                                <tr key={skill.id}>
                                    <td className="px-6 py-4">
                                        <input className="w-full border-b border-transparent focus:border-indigo-500 outline-none" value={skill.name} onChange={e => updateSkill(skill.id, 'name', e.target.value)} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <select className="border-none bg-transparent outline-none cursor-pointer" value={skill.category} onChange={e => updateSkill(skill.id, 'category', e.target.value)}>
                                            <option value="Frontend">Frontend</option>
                                            <option value="Backend">Backend</option>
                                            <option value="Design">Design</option>
                                            <option value="Tools">Tools</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4">
                                        <input type="number" min="0" max="100" className="w-16 border rounded p-1" value={skill.level} onChange={e => updateSkill(skill.id, 'level', parseInt(e.target.value))} />
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => deleteSkill(skill.id)} className="text-red-500 hover:text-red-700">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}

        {/* Projects Editor */}
        {activeTab === 'projects' && (
            <div className="space-y-6">
                <button onClick={addProject} className="flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-800">
                    <Plus size={20} /> Add New Project
                </button>
                <div className="grid grid-cols-1 gap-6">
                    {data.projects.map(project => (
                        <div key={project.id} className="bg-white p-6 rounded-xl shadow-sm border border-zinc-200 relative group">
                            <button 
                                onClick={() => deleteProject(project.id)}
                                className="absolute top-4 right-4 text-zinc-300 hover:text-red-500 transition-colors"
                            >
                                <Trash2 size={20} />
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-semibold text-zinc-500 uppercase">Title</label>
                                        <input className="w-full mt-1 p-2 border rounded bg-zinc-50" value={project.title} onChange={e => updateProject(project.id, 'title', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-zinc-500 uppercase">Category</label>
                                        <select className="w-full mt-1 p-2 border rounded bg-zinc-50" value={project.category} onChange={e => updateProject(project.id, 'category', e.target.value)}>
                                            <option value="Web">Web Development</option>
                                            <option value="Mobile">Mobile App</option>
                                            <option value="Design">UI/UX Design</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-zinc-500 uppercase">Image URL</label>
                                        <input className="w-full mt-1 p-2 border rounded bg-zinc-50" value={project.imageUrl} onChange={e => updateProject(project.id, 'imageUrl', e.target.value)} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs font-semibold text-zinc-500 uppercase">Demo Link</label>
                                            <input className="w-full mt-1 p-2 border rounded bg-zinc-50" value={project.demoLink || ''} onChange={e => updateProject(project.id, 'demoLink', e.target.value)} placeholder="https://..." />
                                        </div>
                                        <div>
                                            <label className="text-xs font-semibold text-zinc-500 uppercase">Repo Link</label>
                                            <input className="w-full mt-1 p-2 border rounded bg-zinc-50" value={project.repoLink || ''} onChange={e => updateProject(project.id, 'repoLink', e.target.value)} placeholder="https://..." />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                     <div>
                                        <label className="text-xs font-semibold text-zinc-500 uppercase">Description</label>
                                        <textarea rows={4} className="w-full mt-1 p-2 border rounded bg-zinc-50" value={project.description} onChange={e => updateProject(project.id, 'description', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-zinc-500 uppercase">Technologies (comma separated)</label>
                                        <input 
                                            className="w-full mt-1 p-2 border rounded bg-zinc-50" 
                                            value={project.technologies.join(', ')} 
                                            onChange={e => updateProject(project.id, 'technologies', e.target.value.split(',').map(t => t.trim()))} 
                                        />
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {project.technologies.map((t, i) => (
                                                <span key={i} className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded">{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </main>
    </div>
  );
};

export default Admin;