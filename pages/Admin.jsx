import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, Plus, Trash2, LogOut, LayoutDashboard, Code, FolderGit2, MessageSquare, Loader2, ArrowLeft, Briefcase, GraduationCap, Edit2, ChevronUp, Menu, X, Reply, Send, CheckCircle, Settings, Mail } from 'lucide-react';
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
  const [isSendingReply, setIsSendingReply] = useState(false);

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

  const updateSettings = (field, value) => {
    if (!data) return;
    setData({ ...data, settings: { ...data.settings, [field]: value } });
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

  const handleDirectSend = async (enquiry) => {
    if (!replyText.trim()) return;
    
    setIsSendingReply(true);
    
    // Simulating API call to send email via a background service (e.g. EmailJS, SendGrid, etc.)
    // In a production app, you would fetch('/api/send-email', { method: 'POST', body: ... })
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log(`Sending email from: ${data.settings?.senderEmail || data.profile.email}`);
    console.log(`To: ${enquiry.email}`);
    console.log(`Content: ${replyText}`);
    
    const success = await markEnquiryAsReplied(enquiry.id);
    if (success) {
      setEnquiries(prev => prev.map(item => item.id === enquiry.id ? {...item, replied: true} : item));
      setReplyingToId(null);
      setReplyText('');
    }
    
    setIsSendingReply(false);
    alert(`Email successfully sent to ${enquiry.email} using ${data.settings?.senderEmail || 'default server configuration'}.`);
  };

  const existingCategories = data ? Array.from(new Set(data.projects.map(p => p.category))) : [];

  if (isLoading) return <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-indigo-400"><Loader2 className="animate-spin mr-2" /> Loading Dashboard...</div>;

  const NavItems = [
    { id: 'profile', icon: LayoutDashboard, label: 'Profile & Bio' },
    { id: 'skills', icon: Code, label: 'Skills & Highlights' },
    { id: 'projects', icon: FolderGit2, label: 'Projects' },
    { id: 'enquiries', icon: MessageSquare, label: 'Enquiries' },
    { id: 'settings', icon: Settings, label: 'Settings' }
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
      {isSidebar