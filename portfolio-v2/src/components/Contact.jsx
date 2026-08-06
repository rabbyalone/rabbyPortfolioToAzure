import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, Github, Globe, MessageSquare, AlertCircle } from 'lucide-react';
import { developerData } from '../data/portfolioData';

export default function Contact({ theme }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);
    setErrorMessage(null);

    let dispatchedSuccessfully = false;

    // 1. Primary Attempt: Azure Custom Email API
    try {
      const azureResponse = await fetch('https://emailsenderapi.azurewebsites.net/api/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: new URLSearchParams({
          ToEmail: 'rabbyalone@gmail.com',
          Subject: `Portfolio Message from ${formData.name}`,
          Body: `Email From: ${formData.email}\nName: ${formData.name}\nDomain Email: ${developerData.secondaryEmail}\n\nMessage:\n${formData.message}`
        })
      });

      if (azureResponse.ok) {
        dispatchedSuccessfully = true;
      }
    } catch (azureErr) {
      console.warn('Primary Azure Email API error, executing FormSubmit failover...', azureErr);
    }

    // 2. Secondary Failover Attempt: FormSubmit Endpoint
    if (!dispatchedSuccessfully) {
      try {
        const fallbackResponse = await fetch('https://formsubmit.co/ajax/rabbyalone@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            _cc: developerData.secondaryEmail,
            _subject: `[Portfolio Inquiry] Message from ${formData.name}`
          })
        });

        if (fallbackResponse.ok) {
          dispatchedSuccessfully = true;
        }
      } catch (fallbackErr) {
        console.error('Fallback email dispatch error:', fallbackErr);
      }
    }

    if (dispatchedSuccessfully) {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } else {
      setErrorMessage(`Automated delivery encountered a network issue. Please send directly to ${developerData.secondaryEmail}`);
    }

    setSubmitting(false);
  };

  return (
    <section id="contact" className="py-32 px-6 sm:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-4 max-w-3xl mx-auto"
        >
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono ${
            theme === 'dark'
              ? 'bg-slate-900 border-[#dfc898]/30 text-[#dfc898]'
              : 'bg-white border-[#b89b5e]/40 text-[#854d0e] shadow-sm'
          }`}>
            <Mail className="w-3.5 h-3.5" />
            <span>EXECUTIVE DISCOVERY</span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight font-heading ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Direct <span className="gold-gradient-text">Correspondence</span>
          </h2>
          <div className="w-16 h-1 bg-[#dfc898] mx-auto rounded-full" />
          <p className={`text-sm sm:text-base max-w-xl mx-auto font-normal leading-relaxed ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}>
            Available for technical architecture consulting, executive engineering leadership roles, or freelance assignments.
          </p>
        </motion.div>

        {/* Contact Grid - Equal Height Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-stretch">
          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 h-full"
          >
            <div className="luxury-card p-8 sm:p-9 h-full flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <h3 className={`text-xl font-bold font-heading border-b pb-4 ${
                  theme === 'dark' ? 'text-white border-slate-800' : 'text-slate-900 border-slate-200'
                }`}>
                  Direct Contact
                </h3>

                <div className="space-y-3.5">
                  {/* Executive Email Block */}
                  <a
                    href={`mailto:${developerData.secondaryEmail}`}
                    className={`flex items-center gap-3.5 p-3.5 rounded-xl border transition-colors group ${
                      theme === 'dark'
                        ? 'bg-slate-900/60 border-slate-800 hover:border-[#dfc898]/40'
                        : 'bg-slate-50 border-slate-200 hover:border-[#b89b5e]'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
                      theme === 'dark'
                        ? 'bg-slate-900 border-[#dfc898]/30 text-[#dfc898]'
                        : 'bg-white border-[#b89b5e]/40 text-[#854d0e]'
                    }`}>
                      <Mail className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <div className={`text-[10px] font-mono uppercase tracking-wider ${
                        theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                      }`}>Executive Inquiries</div>
                      <div className={`text-xs font-semibold group-hover:underline ${
                        theme === 'dark' ? 'text-white group-hover:text-[#dfc898]' : 'text-slate-900 group-hover:text-[#854d0e]'
                      }`}>
                        {developerData.secondaryEmail}
                      </div>
                    </div>
                  </a>

                  {/* Direct Communications Block */}
                  <a
                    href={`mailto:${developerData.email}`}
                    className={`flex items-center gap-3.5 p-3.5 rounded-xl border transition-colors group ${
                      theme === 'dark'
                        ? 'bg-slate-900/60 border-slate-800 hover:border-[#dfc898]/40'
                        : 'bg-slate-50 border-slate-200 hover:border-[#b89b5e]'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
                      theme === 'dark'
                        ? 'bg-slate-900 border-[#dfc898]/30 text-[#dfc898]'
                        : 'bg-white border-[#b89b5e]/40 text-[#854d0e]'
                    }`}>
                      <Mail className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <div className={`text-[10px] font-mono uppercase tracking-wider ${
                        theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                      }`}>Direct Correspondence</div>
                      <div className={`text-xs font-semibold group-hover:underline ${
                        theme === 'dark' ? 'text-white group-hover:text-[#dfc898]' : 'text-slate-900 group-hover:text-[#854d0e]'
                      }`}>
                        {developerData.email}
                      </div>
                    </div>
                  </a>

                  {/* Phone */}
                  <div className={`flex items-center gap-3.5 p-3.5 rounded-xl border ${
                    theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
                      theme === 'dark'
                        ? 'bg-slate-900 border-emerald-500/30 text-emerald-400'
                        : 'bg-white border-emerald-500/40 text-emerald-600'
                    }`}>
                      <Phone className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <div className={`text-[10px] font-mono uppercase tracking-wider ${
                        theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                      }`}>Phone / WhatsApp</div>
                      <div className={`text-xs font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-slate-900'
                      }`}>
                        {developerData.phone}
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className={`flex items-center gap-3.5 p-3.5 rounded-xl border ${
                    theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
                      theme === 'dark'
                        ? 'bg-slate-900 border-indigo-500/30 text-indigo-400'
                        : 'bg-white border-indigo-500/40 text-indigo-600'
                    }`}>
                      <MapPin className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <div className={`text-[10px] font-mono uppercase tracking-wider ${
                        theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                      }`}>Location</div>
                      <div className={`text-xs font-semibold ${
                        theme === 'dark' ? 'text-white' : 'text-slate-900'
                      }`}>
                        {developerData.location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className={`pt-4 border-t space-y-3 ${
                theme === 'dark' ? 'border-slate-800' : 'border-slate-200'
              }`}>
                <div className={`text-xs font-mono uppercase tracking-wider ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                }`}>Profiles</div>
                <div className="flex items-center gap-3">
                  <a
                    href={developerData.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-xl border transition-all ${
                      theme === 'dark'
                        ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-[#dfc898] hover:border-[#dfc898]/40'
                        : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-400'
                    }`}
                    title="GitHub"
                  >
                    <Github className="w-4.5 h-4.5" />
                  </a>

                  <a
                    href={developerData.socials.stackoverflow}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-xl border transition-all ${
                      theme === 'dark'
                        ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-500/40'
                        : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-amber-600 hover:border-amber-400'
                    }`}
                    title="StackOverflow"
                  >
                    <Globe className="w-4.5 h-4.5" />
                  </a>

                  <a
                    href={developerData.socials.blog}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-xl border transition-all ${
                      theme === 'dark'
                        ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40'
                        : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-emerald-600 hover:border-emerald-400'
                    }`}
                    title="Developer Blog"
                  >
                    <MessageSquare className="w-4.5 h-4.5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 h-full"
          >
            <div className="luxury-card p-8 sm:p-9 h-full flex flex-col justify-between space-y-6">
              <h3 className={`text-xl font-bold font-heading border-b pb-4 ${
                theme === 'dark' ? 'text-white border-slate-800' : 'text-slate-900 border-slate-200'
              }`}>
                Send Direct Message
              </h3>

              {submitted ? (
                <div className={`p-8 rounded-xl border text-center space-y-4 animate-fadeIn my-auto ${
                  theme === 'dark'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-white'
                    : 'bg-emerald-50 border-emerald-300 text-slate-900'
                }`}>
                  <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
                  <h4 className="text-lg font-bold">Message Sent Successfully</h4>
                  <p className={`text-xs leading-relaxed max-w-md mx-auto ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    Thank you for writing. Your message has been dispatched. I will review your note and respond promptly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className={`mt-2 px-5 py-2.5 rounded-xl text-xs font-mono border transition-colors ${
                      theme === 'dark'
                        ? 'bg-slate-900 text-[#dfc898] border-[#dfc898]/30 hover:bg-slate-800'
                        : 'bg-white text-[#854d0e] border-[#b89b5e]/40 hover:bg-slate-100 shadow-sm'
                    }`}
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col justify-between">
                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className={`text-xs font-mono ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}>Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none transition-colors ${
                        theme === 'dark'
                          ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-600 focus:border-[#dfc898]/50'
                          : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#b89b5e]'
                      }`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className={`text-xs font-mono ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}>Email</label>
                    <input
                      type="email"
                      required
                      placeholder="name@organization.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none transition-colors ${
                        theme === 'dark'
                          ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-600 focus:border-[#dfc898]/50'
                          : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#b89b5e]'
                      }`}
                    />
                  </div>

                  <div className="space-y-1.5 flex-1 flex flex-col">
                    <label className={`text-xs font-mono ${
                      theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                    }`}>Message</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Technical consultation, leadership opportunity, or project inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none resize-none flex-1 min-h-[100px] transition-colors ${
                        theme === 'dark'
                          ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-600 focus:border-[#dfc898]/50'
                          : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-[#b89b5e]'
                      }`}
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={submitting}
                    className={`w-full py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md shrink-0 mt-2 ${
                      theme === 'dark'
                        ? 'bg-gradient-to-r from-[#dfc898] to-[#b89b5e] text-black shadow-glow-gold'
                        : 'bg-slate-900 text-white hover:bg-black'
                    }`}
                  >
                    {submitting ? (
                      <span>Dispatching Email...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Correspondence</span>
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
