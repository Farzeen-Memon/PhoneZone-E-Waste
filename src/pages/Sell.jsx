import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, Laptop, Cpu, Check, 
  Camera, MapPin, ShieldCheck, 
  Info, AlertCircle, Clock, 
  CheckCircle2, ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './SellFlow.css';

const Sell = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Sync step with URL Search Params
  const initialStep = parseInt(searchParams.get('step')) || 1;
  const [step, setStep] = useState(initialStep);
  
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [refId, setRefId] = useState('');

  // Form State
  const [form, setForm] = useState({
    category: '',
    model: '',
    condition: 'Good',
    brokenIssues: {
      screenBroken: false,
      notPoweringOn: false,
      motherboardIssue: false
    },
    address: '',
    notes: '',
    acceptedTerms: false
  });

  const updateForm = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  // Keep step state in sync with URL for global Navbar progress
  useEffect(() => {
    const s = parseInt(searchParams.get('step')) || 1;
    if (s !== step) setStep(s);
  }, [searchParams]);

  const updateStep = (newStep) => {
    setSearchParams({ step: newStep });
    window.scrollTo(0, 0);
  };

  const nextStep = () => {
    if (step < 4) updateStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) updateStep(step - 1);
    else navigate(-1);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    try {
      const response = await fetch('http://localhost:5000/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          device: form.model || 'Unknown Device',
          specs: `${form.category} • ${form.notes}`,
          condition: form.condition.toUpperCase(),
          address: form.address,
          customer: user.name,
          email: user.email,
          status: 'Pending Review'
        }),
      });

      const data = await response.json();
      if (data.success) {
        setRefId(data.refId || `RE-${Math.floor(10000 + Math.random() * 90000)}`);
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="sell-flow-wrapper" style={{ justifyContent: 'center', alignItems: 'center', padding: 'var(--step-padding)' }}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', maxWidth: 420 }}>
          <div className="cat-icon-wrapper-huge active" style={{ margin: '0 auto 1.5rem', width: 80, height: 80, borderRadius: '50%', background: 'var(--primary)', color: 'black' }}>
            <CheckCircle2 size={40} strokeWidth={2.5} />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '0.75rem', color: 'white' }}>Request Sent!</h2>
          <p style={{ color: 'var(--text-muted-dark)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            Request <strong style={{ color: 'white' }}>#{refId}</strong> is sent to vendors.
          </p>
          <div className="disclaimer-card-premium" style={{ borderLeft: 'none', background: 'rgba(255,255,255,0.04)', marginBottom: '2rem', justifyContent: 'center' }}>
             <Clock size={18} className="disclaimer-icon" />
             <p className="disclaimer-text" style={{ color: 'white' }}>Quotation provided after review.</p>
          </div>
          <button className="btn-cta-premium" onClick={() => navigate('/dashboard')}>Track Request</button>
        </motion.div>
      </div>
    );
  }

  const categoryOptions = [
    { id: 'Mobile', label: 'Smartphones', icon: <Smartphone />, desc: 'Android & Keypads' },
    { id: 'Laptops', label: 'Laptops', icon: <Laptop />, desc: 'Business & Gaming' },
    { id: 'Other', label: 'Electronics', icon: <Cpu />, desc: 'Motherboard items' }
  ];

  return (
    <div className="sell-flow-wrapper">
      
      {/* 1. Header Removed - Progress is now in the global Navbar */}

      {/* 2. Page Content - Precise Hierarchy */}
      <main className="sell-content-main" style={{ paddingTop: '2rem' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.25 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
          >
            
            {/* STEP 1: CATEGORY */}
            {step === 1 && (
              <>
                <div className="step-heading-group">
                  <h2 className="form-step-title">Identify Item</h2>
                  <p className="form-step-subtitle">High-value electronics category.</p>
                </div>

                <div className="category-grid-balanced">
                  {categoryOptions.map(opt => (
                    <div 
                      key={opt.id} 
                      className={`category-card-fixed ${form.category === opt.id ? 'active' : ''}`}
                      onClick={() => updateForm('category', opt.id)}
                    >
                      <div className="cat-icon-wrapper-huge">{opt.icon}</div>
                      <h4>{opt.label}</h4>
                      <p>{opt.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="disclaimer-card-premium">
                  <AlertCircle size={16} className="disclaimer-icon" />
                  <p className="disclaimer-text">Keypads, Androids & laptops supported.</p>
                </div>
              </>
            )}

            {/* STEP 2: DETAILS */}
            {step === 2 && (
              <>
                <div className="step-heading-group" style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                   <div style={{ flex: 1 }}>
                     <h2 className="form-step-title">Enter Model</h2>
                     <p className="form-step-subtitle">Identify product for response.</p>
                   </div>
                   <button onClick={nextStep} className="skip-btn-link">Skip</button>
                </div>
                
                <div className="form-group-step">
                  <label className="input-label-premium">Product Brand/Model</label>
                  <input 
                    type="text" className="input-field-premium" 
                    placeholder="e.g. Samsung Galaxy, Dell Precision"
                    value={form.model} onChange={e => updateForm('model', e.target.value)}
                    autoFocus
                  />
                </div>
              </>
            )}

            {/* STEP 3: CONDITION */}
            {step === 3 && (
              <>
                <div className="step-heading-group">
                  <h2 className="form-step-title">Condition</h2>
                  <p className="form-step-subtitle">Be honest for vendor audit accuracy.</p>
                </div>

                <div className="category-grid-balanced">
                  {['Like New', 'Good', 'Fair', 'Broken'].map(c => (
                    <div key={c} className={`category-card-fixed ${form.condition === c ? 'active' : ''}`} onClick={() => updateForm('condition', c)} style={{ minHeight: '100px', height: 'auto' }}>
                      <h4 style={{ fontSize: '0.95rem' }}>{c}</h4>
                      <p style={{ fontSize: '0.65rem' }}>Condition check</p>
                    </div>
                  ))}
                </div>

                {form.condition === 'Broken' && (
                  <div className="disclaimer-card-premium" style={{ background: 'rgba(255,255,255,0.03)', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => updateForm('brokenIssues', { ...form.brokenIssues, screenBroken: !form.brokenIssues.screenBroken })}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Screen Damage</span>
                      <div className={`checkbox-custom ${form.brokenIssues.screenBroken ? 'active' : ''}`} style={{ width: 18, height: 18 }}>
                        {form.brokenIssues.screenBroken && <Check size={12} />}
                      </div>
                    </div>
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => updateForm('brokenIssues', { ...form.brokenIssues, notPoweringOn: !form.brokenIssues.notPoweringOn })}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Not Powering</span>
                      <div className={`checkbox-custom ${form.brokenIssues.notPoweringOn ? 'active' : ''}`} style={{ width: 18, height: 18 }}>
                        {form.brokenIssues.notPoweringOn && <Check size={12} />}
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* STEP 4: FINAL */}
            {step === 4 && (
              <>
                <div className="step-heading-group">
                  <h2 className="form-step-title">Final Details</h2>
                  <p className="form-step-subtitle">Verification & logistics check.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                  {['FRONT', 'BACK', 'SIDES'].map(side => (
                    <div key={side} className="upload-box-premium" style={{ height: '70px', borderRadius: '12px' }}>
                      <Camera size={18} className="disclaimer-icon" />
                      <span style={{ fontSize: '0.55rem', fontWeight: 900 }}>{side}</span>
                    </div>
                  ))}
                </div>

                <div className="form-group-step">
                   <input type="text" className="input-field-premium" placeholder="Street Pickup Address" value={form.address} onChange={e => updateForm('address', e.target.value)} />
                   <textarea className="input-field-premium" placeholder="Pickup Notes (optional)" rows="2" value={form.notes} onChange={e => updateForm('notes', e.target.value)} style={{ minHeight: '60px' }} />
                </div>

                <div className="disclaimer-card-premium" style={{ borderLeftColor: '#3b82f6', background: 'rgba(59, 130, 246, 0.05)', padding: '0.75rem' }}>
                   <ShieldCheck size={20} style={{ color: '#3b82f6', flexShrink: 0 }} />
                   <p className="disclaimer-text" style={{ fontSize: '0.7rem' }}>Tech health verified post-pickup. Payment released after audit.</p>
                </div>

                <div className="terms-container" onClick={() => updateForm('acceptedTerms', !form.acceptedTerms)} style={{ cursor: 'pointer', display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div className={`checkbox-custom ${form.acceptedTerms ? 'active' : ''}`} style={{ width: 20, height: 20 }}>
                    {form.acceptedTerms && <Check size={14} />}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'white', opacity: 0.9, fontWeight: 600 }}>Agree to technical audit terms</span>
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* 3. Floating Action Area - Safe from Nav */}
        <div className="sell-cta-fixed-footer" style={{ bottom: '100px' }}>
          <button 
            className="btn-cta-premium" 
            onClick={step === 4 ? handleSubmit : nextStep}
            disabled={(step === 1 && !form.category) || (step === 4 && (!form.address || !form.acceptedTerms)) || loading}
          >
            {loading ? (
               <div style={{ width: 18, height: 18, border: '2px solid black', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            ) : step === 4 ? 'Confirm Request' : 'Next Step'}
          </button>
        </div>
      </main>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default Sell;
