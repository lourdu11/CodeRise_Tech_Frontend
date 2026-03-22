import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Lock, Mail, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import Logo from '../components/Logo';
import { useTheme } from '../context/ThemeContext';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('/api/admin/login', formData);
      localStorage.setItem('adminToken', res.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Neural Handshake Failed. Access Denied by CodeRise.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300" style={{ backgroundColor: 'var(--bg-color)' }}>
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-blue/10 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass p-10 rounded-[2.5rem] border-[var(--surface-border)] relative z-10 shadow-2xl"
      >
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <Logo className="text-4xl" />
          </div>
          <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-main)' }}>Admin Portal</h2>
          <p style={{ color: 'var(--text-alt)' }}>Secure access to CodeRise control center.</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, x: -20, rotate: -1 }}
            animate={{ 
              opacity: 1, 
              x: [0, -10, 10, -10, 10, 0],
            }}
            transition={{ duration: 0.5 }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl flex items-center justify-between gap-3 text-xs md:text-sm shadow-[0_0_20px_rgba(239,68,68,0.1)]"
          >
            <div className="flex items-center gap-3">
              <AlertCircle size={18} className="shrink-0" />
              <span className="font-bold tracking-tight">{error}</span>
            </div>
            <span className="text-[8px] font-black uppercase tracking-widest opacity-40 shrink-0">CR-SEC-01</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium ml-1" style={{ color: 'var(--text-alt)' }}>Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary-blue transition-colors" size={20} />
              <input 
                type="email" 
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[var(--surface-color)] border border-[var(--surface-border)] rounded-2xl pl-14 pr-6 py-4 outline-none focus:border-primary-blue transition-all focus:shadow-[0_0_20px_rgba(37,99,235,0.15)] text-[var(--text-main)] placeholder:text-gray-500"
                placeholder="admin@coderise.io"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium ml-1" style={{ color: 'var(--text-alt)' }}>Password</label>
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary-blue transition-colors" size={20} />
              <input 
                type={showPassword ? "text" : "password"} 
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-[var(--surface-color)] border border-[var(--surface-border)] rounded-2xl pl-14 pr-14 py-4 outline-none focus:border-primary-blue transition-all focus:shadow-[0_0_20px_rgba(37,99,235,0.15)] text-[var(--text-main)] placeholder:text-gray-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary-blue transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full gradient-bg py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 hover:glow-glow transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Authenticating...
              </>
            ) : (
              'Login to Dashboard'
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
            <p className="text-sm" style={{ color: 'var(--text-alt)' }}>
                Proprietary & Confidential. Unauthorized access is prohibited.
            </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
