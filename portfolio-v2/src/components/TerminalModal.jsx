import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, Minimize2, CornerDownLeft } from 'lucide-react';
import { developerData, experiences, architecturalCapabilities, projectsData } from '../data/portfolioData';

export default function TerminalModal({ isOpen, onClose }) {
  const [history, setHistory] = useState([
    { type: 'output', text: 'Md Rabby Hasan - Systems Architect CLI [Version 2.0.0]' },
    { type: 'output', text: 'Type "help" to view available commands.' },
    { type: 'output', text: '---------------------------------------------------' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { type: 'input', text: `$ ${inputVal}` }];

    switch (cmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: `Available Commands:
  - bio        : Profile overview & stats
  - skills     : Architectural capabilities matrix
  - projects   : Featured case studies
  - experience : Professional experiences summary
  - contact    : Direct correspondence info
  - resume     : Open official PDF resume
  - clear      : Clear screen`
        });
        break;

      case 'bio':
        newHistory.push({
          type: 'output',
          text: `${developerData.name} - ${developerData.title}
Years Experience: ${developerData.experienceYears}
Location: ${developerData.location}
Bio: ${developerData.bioParagraphs[0]}`
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'output',
          text: `Architectural Domains & Verified Experience:
${architecturalCapabilities.map(c => `  * ${c.domain}:\n${c.technologies.map(s => `      - ${s.name} [${s.yoe || '10+ Yrs'}]`).join('\n')}`).join('\n')}`
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'output',
          text: `Featured Projects (${projectsData.length} Total):
${projectsData.slice(0, 5).map(p => `  * ${p.title} (${p.client})`).join('\n')}
...and 12 more enterprise applications!`
        });
        break;

      case 'experience':
        newHistory.push({
          type: 'output',
          text: `Recent Milestones:
${experiences.slice(0, 4).map(e => `  * ${e.role} @ ${e.company} (${e.period})`).join('\n')}`
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          text: `Email: ${developerData.email}
Phone: ${developerData.phone}
GitHub: ${developerData.socials.github}
StackOverflow: ${developerData.socials.stackoverflow}`
        });
        break;

      case 'resume':
        window.open(developerData.resumePdf, '_blank');
        newHistory.push({ type: 'output', text: 'Opening PDF resume in new tab...' });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        newHistory.push({
          type: 'output',
          text: `Command not recognized: "${cmd}". Type "help" for a list of valid commands.`
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  return (
    <div
      onClick={onClose}
      className="fixed top-[68px] left-0 right-0 bottom-0 z-30 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl h-[500px] max-h-[calc(100vh-5.5rem)] rounded-2xl bg-[#04060d] border border-[#dfc898]/40 text-slate-200 shadow-2xl flex flex-col font-mono text-xs overflow-hidden"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#dfc898]" />
            <span className="font-bold text-white text-xs">rabby@dev-terminal:~</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-red-500/20 text-slate-400 hover:text-red-400"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2 leading-relaxed bg-[#04060d]">
          {history.map((item, idx) => (
            <div
              key={idx}
              className={item.type === 'input' ? 'text-[#dfc898] font-bold' : 'text-slate-300 whitespace-pre-wrap'}
            >
              {item.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleCommand} className="flex items-center gap-2 px-4 py-3 bg-slate-900/90 border-t border-slate-800 shrink-0">
          <span className="text-[#dfc898] font-bold">$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="type 'help' or any command..."
            className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder-slate-600"
          />
          <button type="submit" className="text-slate-500 hover:text-[#dfc898]">
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
