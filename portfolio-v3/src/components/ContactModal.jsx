import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { developerData } from '../data/portfolioData';

export default function ContactModal({ isOpen, onClose }) {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Architecture Consulting',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Manage mounting & transition state cleanly without transform: none layer snaps
  useEffect(() => {
    let timer;
    let raf1;
    let raf2;
    if (isOpen) {
      setMounted(true);
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          setActive(true);
        });
      });
    } else {
      setActive(false);
      timer = setTimeout(() => {
        setMounted(false);
      }, 250);
    }
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      clearTimeout(timer);
    };
  }, [isOpen]);

  // Close on Escape key and prevent background scroll without layout shift
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setSubmitting(true);
    setErrorMessage(null);

    let success = false;

    // 1. Primary Attempt: Azure Email API
    try {
      const azureResponse = await fetch('https://emailsenderapi.azurewebsites.net/api/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: new URLSearchParams({
          ToEmail: developerData.email || 'rabbyalone@gmail.com',
          Subject: `[Portfolio Inquiry] ${formData.subject} from ${formData.name}`,
          Body: `From: ${formData.name} <${formData.email}>\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`
        })
      });

      if (azureResponse.ok) {
        success = true;
      }
    } catch (err) {
      console.warn('Primary Azure Email API issue, attempting FormSubmit failover...', err);
    }

    // 2. Secondary Attempt: FormSubmit Failover
    if (!success) {
      try {
        const fallbackResponse = await fetch(`https://formsubmit.co/ajax/${developerData.email || 'rabbyalone@gmail.com'}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            _subject: `[Portfolio Inquiry] ${formData.subject} from ${formData.name}`
          })
        });

        if (fallbackResponse.ok) {
          success = true;
        }
      } catch (fallbackErr) {
        console.error('Fallback email dispatch error:', fallbackErr);
      }
    }

    if (success) {
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: 'Architecture Consulting',
        message: ''
      });
    } else {
      setErrorMessage(
        `Unable to dispatch automatically due to a network restriction. Please email directly at ${developerData.email || 'rabbyalone@gmail.com'}`
      );
    }

    setSubmitting(false);
  };

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Backdrop Scrim with blur */}
      <div
        onClick={onClose}
        style={{
          opacity: active ? 1 : 0,
          transition: 'opacity 220ms ease-out',
        }}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm"
      />

      {/* Modal Window matching Velora zero-shadow minimalism with permanent translate3d */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        style={{
          opacity: active ? 1 : 0,
          transform: active ? 'translate3d(0, 0, 0)' : 'translate3d(0, 16px, 0)',
          transition: 'opacity 220ms cubic-bezier(0.16, 1, 0.3, 1), transform 220ms cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'opacity, transform',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-[8px] bg-[#141416] border border-[#2C2C32] z-10 text-white p-6 sm:p-9 space-y-6"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#222226]">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="inline-block w-6 h-[1px] bg-[var(--velora-main-01)] select-none"></span>
                <span className="text-xs font-sans text-[var(--velora-main-01)] uppercase tracking-wider">
                  Direct Communication
                </span>
              </div>
              <h3 id="contact-modal-title" className="text-2xl sm:text-3xl font-sans font-medium text-white tracking-tight">
                Get in Touch
              </h3>
            </div>

            <button
              onClick={onClose}
              aria-label="Close contact modal"
              className="w-8 h-8 rounded-[4px] flex items-center justify-center border border-[#2C2C32] text-[#8E8E93] hover:text-white hover:border-[var(--velora-main-01)] transition-colors cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form Content / Success State */}
          {submitted ? (
            <div className="py-8 text-center space-y-5">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
              </div>

              <div className="space-y-2">
                <h4 className="text-xl font-sans font-medium text-white">
                  Message Sent Successfully
                </h4>
                <p className="text-sm font-sans text-[#A1A1AA] max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out! Your message has been dispatched directly to Rabby. Expect a response within 24 hours.
                </p>
              </div>

              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 rounded-[4px] border border-[#2C2C32] hover:border-[var(--velora-main-01)] text-xs font-sans text-white transition-colors cursor-pointer"
                >
                  Send another note
                </button>
                <button
                  onClick={onClose}
                  className="py-2.5 px-6 rounded-[4px] bg-[var(--velora-main-01)] text-[#0C0C0D] hover:bg-white text-xs font-sans font-medium transition-colors cursor-pointer select-none"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMessage && (
                <div className="p-3.5 rounded-[4px] bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="modal-name" className="text-xs font-sans text-[#8E8E93] uppercase tracking-wider block">
                    Your Name *
                  </label>
                  <input
                    id="modal-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Vance"
                    className="w-full bg-[#1A1A1E] border border-[#2C2C32] rounded-[4px] px-3.5 py-2.5 text-sm font-sans text-white placeholder-[#52525B] focus:border-[var(--velora-main-01)] focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="modal-email" className="text-xs font-sans text-[#8E8E93] uppercase tracking-wider block">
                    Email Address *
                  </label>
                  <input
                    id="modal-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. alex@company.com"
                    className="w-full bg-[#1A1A1E] border border-[#2C2C32] rounded-[4px] px-3.5 py-2.5 text-sm font-sans text-white placeholder-[#52525B] focus:border-[var(--velora-main-01)] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Subject / Service Selection */}
              <div className="space-y-1.5">
                <label htmlFor="modal-subject" className="text-xs font-sans text-[#8E8E93] uppercase tracking-wider block">
                  Subject / Topic
                </label>
                <select
                  id="modal-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-[#1A1A1E] border border-[#2C2C32] rounded-[4px] px-3.5 py-2.5 text-sm font-sans text-white focus:border-[var(--velora-main-01)] focus:outline-none transition-colors cursor-pointer"
                >
                  <option value="Architecture Consulting">Architecture Consulting & Review</option>
                  <option value="Distributed Microservices">Distributed .NET Microservices</option>
                  <option value="Cloud Modernization">Azure / AWS Cloud Modernization</option>
                  <option value="Senior Engineering Contract">Senior / Lead Engineering Contract</option>
                  <option value="General Inquiry">General Technical Inquiry</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label htmlFor="modal-message" className="text-xs font-sans text-[#8E8E93] uppercase tracking-wider block">
                  Message *
                </label>
                <textarea
                  id="modal-message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your system challenge, tech stack, or engagement timeline..."
                  className="w-full bg-[#1A1A1E] border border-[#2C2C32] rounded-[4px] px-3.5 py-2.5 text-sm font-sans text-white placeholder-[#52525B] focus:border-[var(--velora-main-01)] focus:outline-none transition-colors resize-none leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="py-2.5 px-6 rounded-[4px] bg-[var(--velora-main-01)] text-[#0C0C0D] hover:bg-white hover:text-black transition-colors text-sm font-sans font-medium inline-flex items-center gap-2 cursor-pointer disabled:opacity-60 select-none"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#0C0C0D]" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
}
