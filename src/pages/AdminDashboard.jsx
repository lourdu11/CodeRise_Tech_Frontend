import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Plus, 
  Trash2, 
  ExternalLink, 
  LogOut, 
  Upload, 
  CheckCircle,
  X,
  RefreshCw,
  Edit2
} from 'lucide-react';
import Logo from '../components/Logo';
import { useTheme } from '../context/ThemeContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AdminDashboard = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  // New Project Form State
  const [newProject, setNewProject] = useState({
    title: '',
    category: '',
    tech: '',
    desc: '',
    useCase: '',
    developer: '',
    demoUrl: '',
    imageUrls: ''
  });
  const [imageSource, setImageSource] = useState('browse'); // 'browse' or 'url'
  const [selectedFiles, setSelectedFiles] = useState([]);


  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
      return;
    }

    fetchInitialData();
  }, [navigate]);

  const fetchInitialData = async () => {
    setLoading(true);
    const token = localStorage.getItem('adminToken');
    const headers = { Authorization: `Bearer ${token}` };

    try {
      const [projRes, contactRes] = await Promise.all([
        axios.get('/api/projects'),
        axios.get('/api/contact', { headers })
      ]);
      setProjects(Array.isArray(projRes.data) ? projRes.data : []);
      setContacts(Array.isArray(contactRes.data) ? contactRes.data : []);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    
    const token = localStorage.getItem('adminToken');
    try {
      await axios.delete(`/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(projects.filter(p => p._id !== id));
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const openEditModal = (proj) => {
    setEditId(proj._id);
    setIsEditing(true);
    setNewProject({
      title: proj.title,
      category: proj.category,
      tech: Array.isArray(proj.tech) ? proj.tech.join(', ') : proj.tech,
      desc: proj.desc,
      useCase: proj.useCase || '',
      developer: proj.developer || '',
      demoUrl: proj.demoUrl || proj.liveDemo || '',
      imageUrls: proj.images && proj.images.length > 0 && !proj.images[0].includes('uploads') ? proj.images.join(', ') : ''
    });
    setImageSource(proj.images && proj.images.length > 0 && proj.images[0].includes('uploads') ? 'browse' : 'url');
    setSelectedFiles([]); // Reset files, keep existing images if not changed

    setShowAddProject(true);
  };

  const openAddModal = () => {
    setEditId(null);
    setIsEditing(false);
    setNewProject({ title: '', category: '', tech: '', desc: '', useCase: '', developer: '', demoUrl: '', imageUrls: '' });
    setImageSource('browse');
    setSelectedFiles([]);

    setShowAddProject(true);
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    const token = localStorage.getItem('adminToken');

    const formData = new FormData();
    formData.append('title', newProject.title);
    formData.append('category', newProject.category);
    formData.append('desc', newProject.desc);
    formData.append('useCase', newProject.useCase);
    formData.append('developer', newProject.developer);
    formData.append('demoUrl', newProject.demoUrl);
    
    if (imageSource === 'url' && newProject.imageUrls) {
      formData.append('imageUrls', newProject.imageUrls);
    }
    
    // Tech needs to be a stringified array for the backend parser
    const techArray = newProject.tech.split(',').map(item => item.trim());
    formData.append('tech', JSON.stringify(techArray));

    if (imageSource === 'browse') {
      selectedFiles.forEach(file => {
        formData.append('images', file);
      });
    }

    try {
      if (isEditing) {
        console.log('Updating project with formData');
        await axios.put(`/api/projects/${editId}`, formData, {
          headers: { 
            Authorization: `Bearer ${token}`
          }
        });
      } else {
        console.log('Creating project with formData');
        await axios.post('/api/projects', formData, {
          headers: { 
            Authorization: `Bearer ${token}`
          }
        });
      }
      setShowAddProject(false);
      setNewProject({ title: '', category: '', tech: '', desc: '', useCase: '', developer: '', demoUrl: '', imageUrls: '' });
      setSelectedFiles([]);

      fetchInitialData();
    } catch (err) {
      console.error('Submission Error:', err.response?.data);
      alert(err.response?.data?.message || (isEditing ? 'Update failed' : 'Creation failed'));
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col pt-24 pb-12 px-4 transition-colors duration-300" style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-main)' }}>
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 glass p-8 rounded-[2rem] border-[var(--surface-border)]">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary-blue/20 rounded-2xl">
              <LayoutDashboard className="text-primary-blue size-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-outfit" style={{ color: 'var(--text-main)' }}>Admin Panel</h1>
              <p style={{ color: 'var(--text-alt)' }} className="text-sm">Manage projects and client messages</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <button 
              onClick={fetchInitialData}
              className="p-4 glass rounded-2xl hover:bg-white/10 transition-colors border-[var(--surface-border)]"
              title="Refresh Data"
              style={{ color: 'var(--text-main)' }}
            >
              <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-2xl transition-colors font-semibold"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all ${activeTab === 'projects' ? 'gradient-bg shadow-[0_0_15px_rgba(37,99,235,0.4)] text-white' : 'glass hover:bg-white/5 opacity-60 border-[var(--surface-border)]'}`}
            style={activeTab !== 'projects' ? { color: 'var(--text-main)' } : {}}
          >
            <Plus size={20} />
            Projects
          </button>
          <button 
            onClick={() => setActiveTab('contacts')}
            className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all ${activeTab === 'contacts' ? 'gradient-bg shadow-[0_0_15px_rgba(37,99,235,0.4)] text-white' : 'glass hover:bg-white/5 opacity-60 border-[var(--surface-border)]'}`}
            style={activeTab !== 'contacts' ? { color: 'var(--text-main)' } : {}}
          >
            <MessageSquare size={20} />
            Messages
            {contacts.length > 0 && (
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs ml-1" style={{ color: 'white' }}>{contacts.length}</span>
            )}
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 opacity-50">
              <RefreshCw size={48} className="animate-spin mb-4" />
              <p>Synchronizing data...</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {activeTab === 'projects' ? (
                <motion.div 
                  key="projects"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold" style={{ color: 'var(--text-main)' }}>Manage Portfolio</h2>
                    <button 
                      onClick={openAddModal}
                      className="flex items-center gap-2 px-6 py-3 bg-[var(--text-main)] text-[var(--bg-color)] rounded-xl font-bold hover:opacity-90 transition-all shadow-lg"
                    >
                      <Plus size={20} />
                      Add Project
                    </button>
                  </div>

                  {projects.length === 0 ? (
                    <div className="glass p-20 text-center rounded-[2rem] border-dashed border-[var(--surface-border)]">
                      <p style={{ color: 'var(--text-alt)' }} className="text-lg">No projects added yet.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {projects.map(proj => (
                        <div key={proj._id} className="glass rounded-3xl overflow-hidden border border-[var(--surface-border)] group relative">
                          <div className="h-48 relative overflow-hidden">
                            <img 
                              src={proj.image && proj.image.includes('uploads') ? `${API_URL}${proj.image.startsWith('/') ? '' : '/'}${proj.image}` : proj.image} 
                              alt={proj.title} 
                              className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-color)] to-transparent"></div>
                            <div className="absolute bottom-4 left-4">
                              <span className="text-xs font-bold text-primary-blue uppercase tracking-widest">{proj.category}</span>
                              <h3 className="text-xl font-bold" style={{ color: 'var(--text-main)' }}>{proj.title}</h3>
                            </div>
                          </div>
                          <div className="p-6 flex justify-between items-center bg-[var(--surface-color)] backdrop-blur-md">
                            <div className="flex items-center gap-3">
                              <a href={proj.demoUrl} target="_blank" rel="noreferrer" className="p-2 glass rounded-lg hover:bg-primary-blue/20 transition-colors border-[var(--surface-border)]" style={{ color: 'var(--text-alt)' }}><ExternalLink size={18} /></a>
                              <button 
                                onClick={() => openEditModal(proj)}
                                className="p-2 glass rounded-lg hover:bg-primary-blue/20 transition-colors border-[var(--surface-border)]"
                                style={{ color: 'var(--text-alt)' }}
                              >
                                <Edit2 size={18} />
                              </button>
                            </div>
                            <button 
                              onClick={() => handleDeleteProject(proj._id)}
                              className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-all border border-red-500/20"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div 
                  key="contacts"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-main)' }}>Contact Submissions</h2>
                  {contacts.length === 0 ? (
                    <div className="glass p-20 text-center rounded-[2rem] border-dashed border-[var(--surface-border)]">
                      <p style={{ color: 'var(--text-alt)' }} className="text-lg">Your inbox is empty.</p>
                    </div>
                  ) : (
                    contacts.map(c => (
                      <div key={c._id} className="glass p-8 rounded-[2rem] border-[var(--surface-border)] hover:border-primary-blue/20 transition-all group">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center font-bold text-xl uppercase shadow-lg">
                              {c.name.charAt(0)}
                            </div>
                            <div>
                              <h3 className="font-bold text-xl">{c.name}</h3>
                              <p className="text-gray-400 text-sm">{c.email}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-xs block mb-1" style={{ color: 'var(--text-alt)', opacity: 0.6 }}>{new Date(c.createdAt).toLocaleDateString()}</span>
                            <span className="inline-block px-3 py-1 bg-primary-blue/20 text-primary-blue rounded-full text-[10px] font-bold uppercase tracking-widest">{c.projectType || 'General Inquiry'}</span>
                          </div>
                        </div>
                        <p style={{ color: 'var(--text-alt)' }} className="leading-relaxed pl-16 italic group-hover:text-[var(--text-main)] transition-colors">
                          "{c.message}"
                        </p>
                      </div>
                    ))
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Add Project Modal */}
      <AnimatePresence>
        {showAddProject && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 backdrop-blur-xl bg-black/60 overflow-y-auto">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass max-w-2xl w-full rounded-[2.5rem] p-10 border-[var(--surface-border)] relative my-auto shadow-3xl overflow-hidden"
              style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-main)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowAddProject(false)}
                className="absolute top-8 right-8 p-3 glass rounded-full hover:bg-white/10 transition-colors border-[var(--surface-border)]"
                style={{ color: 'var(--text-main)' }}
              >
                <X size={20} />
              </button>

              <h2 className="text-3xl font-bold mb-8 flex items-center gap-4">
                {isEditing ? <Edit2 className="text-primary-blue" size={32} /> : <Plus className="text-primary-blue" size={32} />}
                {isEditing ? 'Edit Project' : 'Create New Project'}
              </h2>

              <form onSubmit={handleCreateProject} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 ml-1" style={{ color: 'var(--text-alt)' }}>Title</label>
                    <input 
                      type="text" 
                      required
                      value={newProject.title}
                      onChange={e => setNewProject({...newProject, title: e.target.value})}
                      className="w-full bg-[var(--surface-color)] border border-[var(--surface-border)] rounded-2xl px-6 py-4 outline-none focus:border-primary-blue transition-colors text-[var(--text-main)] placeholder:text-gray-500"
                      placeholder="e.g. Nova CRM"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 ml-1" style={{ color: 'var(--text-alt)' }}>Category</label>
                    <input 
                      type="text" 
                      required
                      value={newProject.category}
                      onChange={e => setNewProject({...newProject, category: e.target.value})}
                      className="w-full bg-[var(--surface-color)] border border-[var(--surface-border)] rounded-2xl px-6 py-4 outline-none focus:border-primary-blue transition-colors text-[var(--text-main)] placeholder:text-gray-500"
                      placeholder="e.g. SaaS / Web App"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 ml-1" style={{ color: 'var(--text-alt)' }}>Core Tech (comma separated)</label>
                  <input 
                    type="text" 
                    required
                    value={newProject.tech}
                    onChange={e => setNewProject({...newProject, tech: e.target.value})}
                    className="w-full bg-[var(--surface-color)] border border-[var(--surface-border)] rounded-2xl px-6 py-4 outline-none focus:border-primary-blue transition-colors text-[var(--text-main)] placeholder:text-gray-500"
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 ml-1" style={{ color: 'var(--text-alt)' }}>Description</label>
                  <textarea 
                    required
                    rows="4"
                    value={newProject.desc}
                    onChange={e => setNewProject({...newProject, desc: e.target.value})}
                    className="w-full bg-[var(--surface-color)] border border-[var(--surface-border)] rounded-2xl px-6 py-4 outline-none focus:border-primary-blue transition-colors resize-none text-[var(--text-main)] placeholder:text-gray-500"
                    placeholder="Brief overview of functionality..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 ml-1" style={{ color: 'var(--text-alt)' }}>Developed By</label>
                    <input 
                      type="text" 
                      value={newProject.developer}
                      onChange={e => setNewProject({...newProject, developer: e.target.value})}
                      className="w-full bg-[var(--surface-color)] border border-[var(--surface-border)] rounded-2xl px-6 py-4 outline-none focus:border-primary-blue transition-colors text-[var(--text-main)] placeholder:text-gray-500"
                      placeholder="e.g. John Doe / CodeRise Team"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 ml-1" style={{ color: 'var(--text-alt)' }}>Live Demo URL</label>
                    <input 
                      type="url" 
                      value={newProject.demoUrl}
                      onChange={e => setNewProject({...newProject, demoUrl: e.target.value})}
                      className="w-full bg-[var(--surface-color)] border border-[var(--surface-border)] rounded-2xl px-6 py-4 outline-none focus:border-primary-blue transition-colors text-[var(--text-main)] placeholder:text-gray-500"
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 ml-1" style={{ color: 'var(--text-alt)' }}>Use Case / Problem Solved</label>
                  <textarea 
                    rows="3"
                    value={newProject.useCase}
                    onChange={e => setNewProject({...newProject, useCase: e.target.value})}
                    className="w-full bg-[var(--surface-color)] border border-[var(--surface-border)] rounded-2xl px-6 py-4 outline-none focus:border-primary-blue transition-colors resize-none text-[var(--text-main)] placeholder:text-gray-500"
                    placeholder="Describe the specific problem this project solves..."
                  />
                </div>

                {/* Image Source Selection */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium ml-1" style={{ color: 'var(--text-alt)' }}>Project Image Source</label>
                  <div className="flex gap-4 p-1 glass rounded-2xl border-[var(--surface-border)]">
                    <button
                      type="button"
                      onClick={() => setImageSource('browse')}
                      className={`flex-1 py-3 rounded-xl font-bold transition-all ${imageSource === 'browse' ? 'bg-primary-blue text-white shadow-lg' : 'hover:bg-white/5 opacity-60'}`}
                    >
                      Browse Files
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageSource('url')}
                      className={`flex-1 py-3 rounded-xl font-bold transition-all ${imageSource === 'url' ? 'bg-primary-blue text-white shadow-lg' : 'hover:bg-white/5 opacity-60'}`}
                    >
                      Image URL
                    </button>
                  </div>

                  {imageSource === 'browse' ? (
                    <div className="border-2 border-dashed border-[var(--surface-border)] rounded-[2rem] p-8 text-center bg-white/[0.02]">
                      <Upload className="mx-auto text-primary-blue mb-4" size={32} />
                      <p className="mb-2 text-sm font-bold">
                        {isEditing ? 'Update Images (Optional)' : 'Multiple Image Upload'}
                      </p>
                      <p style={{ color: 'var(--text-alt)' }} className="text-xs mb-4">
                        {isEditing ? 'Selecting new images will replace existing ones' : 'Select screenshots to showcase in the gallery'}
                      </p>
                      <input 
                        type="file" 
                        multiple 
                        onChange={handleFileChange}
                        className="hidden" 
                        id="file-upload"
                        accept="image/*"
                      />
                      <label 
                        htmlFor="file-upload" 
                        className="inline-block px-6 py-3 glass rounded-xl cursor-pointer hover:bg-white/10 transition-colors text-sm font-bold"
                      >
                        {selectedFiles.length > 0 ? `${selectedFiles.length} files selected` : 'Browse Files'}
                      </label>
                      {selectedFiles.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-2 mt-4">
                          {selectedFiles.map((f, i) => (
                            <div key={i} className="bg-white/10 px-3 py-1 rounded-full text-[10px] flex items-center gap-2">
                                {f.name}
                                <CheckCircle size={10} className="text-green-500" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <textarea 
                        rows="3"
                        value={newProject.imageUrls}
                        onChange={e => setNewProject({...newProject, imageUrls: e.target.value})}
                        className="w-full bg-[var(--surface-color)] border border-[var(--surface-border)] rounded-2xl px-6 py-4 outline-none focus:border-primary-blue transition-colors text-[var(--text-main)] placeholder:text-gray-500 resize-none"
                        placeholder="Enter direct image URLs separated by commas..."
                      />
                      <div className="flex flex-col gap-2 px-4">
                        <p className="text-[10px] opacity-50">Provide direct links (comma separated) for the project gallery.</p>
                        {newProject.imageUrls && (
                          <div className="flex flex-wrap gap-2">
                            {newProject.imageUrls.split(',').map((url, i) => url.trim() && (
                              <div key={i} className="bg-primary-blue/10 px-2 py-1 rounded text-[8px] flex items-center gap-1 border border-primary-blue/20">
                                URL {i+1} <CheckCircle size={8} className="text-primary-blue" />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>


                <button 
                  type="submit" 
                  disabled={btnLoading}
                  className="w-full gradient-bg py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:glow-glow transition-all disabled:opacity-50"
                >
                  {btnLoading ? (
                    <><RefreshCw className="animate-spin" size={20} /> {isEditing ? 'Updating...' : 'Publishing...'}</>
                  ) : (
                    <>
                      {isEditing ? 'Save Changes' : 'Publish to Live Site'} 
                      <CheckCircle size={20} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
