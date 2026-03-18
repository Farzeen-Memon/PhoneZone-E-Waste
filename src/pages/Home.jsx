import React from 'react';
import { Link } from 'react-router-dom';

const CATEGORY_IMAGES = [
  {
    name: 'Phones', tag: 'Top Value', tagClass: 'tag-primary',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2Oz1Oq4ajgebX4OqsYAQHwBCtyMK79ODGWkiUUgL5hxkHyqFkRoa_PU8HvOL2Z5dNXIGvcL4QBWtVL289W0yAfZ_2rKBVE98r3An425T7ZVj1wPk2sC4Uu41rtQKG0ogGd2oeKgsaEJ9f6cayX0i1jCI1MlRfkD-ZkZqUvyuYSIR94LOzvCSWLst92k7iu1WmiQo5Tw-hLs7nqD64mGm59mXjpY7f5l5ssUN-jWq_b24tIdWLGx4ncFBXVJFHn9UJGVB26Rr7n1k'
  },
  {
    name: 'Laptops', tag: 'MacBooks & Surface', tagClass: 'tag-muted',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8zA_2-e1rkNyggVsguFr0mD7RXtZOa9d7eem-2OABE1e5KAbiDcY1V7nO3tj2p9kqvOm146zW2r9CXqDKxA-aEBadfrCVgAUPt9pRXBur6iTA2iPKswa9Cf9uGgPiebUD5g1IU-5Hrd5LKSQI7UkoWcTuwCycKhHdqi8a-Lyi3riOwIOslCBjJzXWqCT7Q9VvDSnm8ddx5YL00kf_7bavdE1Yc8a58-LWysk7pMe8npsFKCEX95r1e_CFrn8FZtOc-7Vqy7Ns9_4'
  },
  {
    name: 'Computers', tag: 'Workstations & iMacs', tagClass: 'tag-muted',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdaJUutkITC8AddXmL2dm8wxuTBLLAB4lMCNna7TveOx4AYpzgeiPKLrU4vLrccszX4fAmHOfAjLWNot4lx7ypebVwily_VP9SXcmN3X37pMj1XBkuzOrL2M6Xqch7xWw7FqWgnhOAhYV7d_pibuJO90G5OrVLv31OGo4Xw_b_JwATWPRyi78fjmIP4V5i8AWnJWQ4lUtfxKJnOoUll1-SuQq0n5ZinO9rp83tBU26gtBv6A-ibeCphzP5XklqyshCCmkll5SmWtk'
  },
  {
    name: 'Electronics', tag: 'Tablets & Audio', tagClass: 'tag-muted',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1nonXavn35MdViizNZ23wBXOqMxZ0JVTY0Q1eQgXDNYRxfnAiNdvmozOcj6an2p5sihSfH1IPHwUHRm4lbJzsdJ2YKhSVfkWcOMsD7yifx9gVMog-iQseW2VgWQLcjYI5zuy7P_UIB5ZiuH4SL0MFP6w9LH6H9bFR2GCYfVOj5EG6mZ_AFPDuQQlSgVpA0yiGv8UAg_fpDuO-2xvtQxx6o9XuONXo7IzNLathHj8V0woDIXU1MgBNF0OBaooCxsuDLzwmS3ZWBX0'
  },
  {
    name: 'Bulk Scrap', tag: 'Enterprise Solutions', tagClass: 'tag-muted',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSWC-r7-DZIIC74eUsxgFxdlDiPmwYaGRG-fzPQLU4saYtZ51eoYTXkpulgKijp4MbeyxbVEGbxWTSRYXdbqq8niNbzLDw39Vd8K4LLXWFdGhV4RN4psQue4LTgcDQjRovYnuqSKWtvta8mDN6DD1XbKym8zZE8XiVFOCRxMHhW0FSLsOSV8FZBCH0WonZc1cwYDjlYPNmN8sptXxjEZ1ak0IkxUXkIBfsJJ_ffQQ3kgBGxeTyEEZmAtH9g-VmMtotptHahA5F3CE'
  },
];

const STEPS = [
  { icon: 'edit_note', title: 'Request', desc: 'Tell us about your device, its condition, and specifications via our portal.' },
  { icon: 'payments', title: 'Price', desc: 'Get an instant, market-leading valuation based on current demand and condition.' },
  { icon: 'local_shipping', title: 'Pickup', desc: 'We provide a secure, insured shipping label or arrange a home pickup.' },
  { icon: 'account_balance_wallet', title: 'Payment', desc: 'Funds are transferred to your account within 24 hours of device inspection.' },
];

const Home = () => {
  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-badge">
          <span className="material-symbols-outlined" style={{ fontSize: '0.875rem' }}>verified</span>
          Premium Tech Trade-In Service
        </div>
        <h2>
          Recycle &amp; <span className="text-primary">Earn Big</span>
        </h2>
        <p>
          Get an instant valuation and secure payment for your high-end electronics. Professional handling, zero hassle.
        </p>
        <div>
          <Link to="/sell" className="hero-cta">
            Sell Your Device
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>

        {/* Background orbs */}
        <div className="hero-bg-orb" style={{ top: 0, right: 0, width: 500, height: 500, background: '#16c55f' }}></div>
        <div className="hero-bg-orb" style={{ bottom: 0, left: 0, width: 400, height: 400, background: '#3b82f6' }}></div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="categories-section container" id="categories">
        <div className="categories-header">
          <div>
            <h3>Select Category</h3>
            <p>Browse our most popular trade-in departments</p>
          </div>
          <a href="#" className="categories-link">
            View all categories
            <span className="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>
        <div className="categories-grid">
          {CATEGORY_IMAGES.map((cat, i) => (
            <Link to="/sell" key={i} className="category-card">
              <div className="category-overlay"></div>
              <img src={cat.img} alt={cat.name} loading="lazy" />
              <div className="category-info">
                <h4>{cat.name}</h4>
                <p className={cat.tagClass}>{cat.tag}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="process-section" id="how-it-works">
        <div className="container">
          <div className="section-header">
            <h3>How It Works</h3>
            <p>From appraisal to payment in four easy steps. Experience the premium standard in tech trade-ins.</p>
          </div>
          <div className="process-grid">
            {STEPS.map((step, i) => (
              <div className="process-step" key={i}>
                <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div className="step-number">{i + 1}</div>
                  <div className="step-icon-box">
                    <span className="material-symbols-outlined">{step.icon}</span>
                  </div>
                </div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ENTERPRISE CTA ===== */}
      <section className="enterprise-cta">
        <div className="container">
          <div className="enterprise-card">
            <div className="gradient-overlay"></div>
            <div className="enterprise-content">
              <h3>Upgrading your company hardware?</h3>
              <p>Get special bulk rates and professional data destruction certificates for your business assets.</p>
              <button className="hero-cta" style={{ fontSize: '0.95rem', padding: '1rem 2rem' }}>
                Corporate Trade-In Portal
              </button>
            </div>
            <div className="enterprise-sidebar">
              <div className="security-card">
                <div className="security-card-header">
                  <div className="security-icon">
                    <span className="material-symbols-outlined">security</span>
                  </div>
                  <div>
                    <h5>Data Security</h5>
                    <p>NIST 800-88 Compliant</p>
                  </div>
                </div>
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: '98%' }}></div>
                </div>
                <div className="progress-labels">
                  <span>Security Level</span>
                  <span>Military Grade</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
