import { useState } from 'react';
import { 
  Menu, ArrowRight, GraduationCap, Code, Database, PenTool, 
  Store, FileText, Download, Mail, MapPin 
} from 'lucide-react';

// --- TIC TAC TOE COMPONENT ---
const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winningLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  const checkWinner = (squares) => {
    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c] = winningLines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return squares.includes(null) ? null : 'Tie';
  };

  const handleClick = (idx) => {
    const winner = checkWinner(board);
    if (board[idx] || winner) return;

    const newBoard = [...board];
    newBoard[idx] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const winner = checkWinner(board);

  return (
    <div className="md:col-span-5 bg-brand-bg p-6 rounded border border-brand-border">
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-bold text-white font-mono">
          {winner === 'Tie' ? (
            'Game Ended in a Draw'
          ) : winner ? (
            <>Winner: <span className="text-brand-crimson">{winner}</span>!</>
          ) : (
            <>Turn: <span className={xIsNext ? 'text-brand-crimson' : 'text-white'}>{xIsNext ? 'X' : 'O'}</span></>
          )}
        </span>
        <button onClick={resetGame} className="text-[11px] font-mono text-brand-muted hover:text-white underline">
          Reset Game
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(idx)}
            className={`ttt-cell ${cell === 'X' ? 'text-brand-crimson' : 'text-white'}`}
            disabled={!!winner}
          >
            {cell}
          </button>
        ))}
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  const handleDownloadCV = () => {
    const dummyContent = "Aleah Claire Recide - Resume\n\nBS Information Technology Student\nLaguna State Polytechnic University\nAge: 20\n\nProjects:\n- Readrada Digital Storefront\n- Student Record System (Prisma ORM)\n- React Tic-Tac-Toe App";
    const blob = new Blob([dummyContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Aleah_Claire_Recide_Resume.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* Grid lines subtle background */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none z-0 opacity-70"></div>

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-brand-bg/80 border-b border-brand-border/60 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="group flex items-center gap-3">
            <span className="h-3 w-3 bg-brand-crimson rounded-full inline-block group-hover:scale-125 transition-transform duration-300 shadow-[0_0_10px_#dc2626]"></span>
            <span className="font-bold text-lg tracking-wider text-white uppercase group-hover:text-brand-crimson transition-colors">
              A. C. RECIDE
            </span>
          </a>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide">
            <a href="#about" className="text-brand-muted hover:text-white transition-colors duration-200 hover:border-b-2 hover:border-brand-crimson pb-1">About</a>
            <a href="#skills" className="text-brand-muted hover:text-white transition-colors duration-200 hover:border-b-2 hover:border-brand-crimson pb-1">Skills</a>
            <a href="#projects" className="text-brand-muted hover:text-white transition-colors duration-200 hover:border-b-2 hover:border-brand-crimson pb-1">Projects</a>
            <a href="#creative" className="text-brand-muted hover:text-white transition-colors duration-200 hover:border-b-2 hover:border-brand-crimson pb-1">Design Studio</a>
            <a href="#contact" className="px-4 py-2 border border-brand-crimson/50 text-white hover:bg-brand-crimson hover:border-brand-crimson rounded transition-all duration-300 text-xs uppercase tracking-widest font-semibold">Contact</a>
          </nav>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-brand-muted hover:text-white focus:outline-none p-2">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Drawer */}
        {isMenuOpen && (
          <div className="md:hidden bg-brand-card border-b border-brand-border px-6 py-6 space-y-4">
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="block text-brand-muted hover:text-brand-crimson text-sm font-medium py-1">About</a>
            <a href="#skills" onClick={() => setIsMenuOpen(false)} className="block text-brand-muted hover:text-brand-crimson text-sm font-medium py-1">Skills</a>
            <a href="#projects" onClick={() => setIsMenuOpen(false)} className="block text-brand-muted hover:text-brand-crimson text-sm font-medium py-1">Projects</a>
            <a href="#creative" onClick={() => setIsMenuOpen(false)} className="block text-brand-muted hover:text-brand-crimson text-sm font-medium py-1">Design Studio</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block text-brand-crimson font-medium text-sm py-1">Contact Me</a>
          </div>
        )}
      </header>

      <main className="relative z-10 pt-20">
        {/* HERO SECTION */}
        <section className="min-h-[calc(100vh-5rem)] flex items-center justify-center relative px-6 py-20 border-b border-brand-border/40">
          <div className="max-w-5xl mx-auto w-full">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-border bg-brand-card/90 mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs uppercase tracking-widest font-semibold text-brand-muted">BS Information Technology Student</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
              Crafting Clean Code & <br className="hidden sm:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-brand-crimson">
                Minimal Luxury
              </span> Digital Experiences.
            </h1>

            <p className="text-base sm:text-xl text-brand-muted max-w-2xl font-light leading-relaxed mb-10">
              Hello, I'm <strong className="text-white font-semibold">Aleah Claire Recide</strong>. A 20-year-old IT student at Laguna State Polytechnic University bridging modern full-stack development with deliberate visual design.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a href="#projects" className="px-8 py-4 bg-brand-crimson hover:bg-brand-crimsonHover text-white font-medium text-sm rounded shadow-lg shadow-brand-crimson/20 transition-all duration-300 flex items-center gap-2 group">
                Explore Selected Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#contact" className="px-8 py-4 border border-brand-border hover:border-brand-text text-brand-text hover:text-white font-medium text-sm rounded bg-brand-card/50 transition-all duration-300">
                Get In Touch
              </a>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-16 mt-16 border-t border-brand-border/50 text-xs tracking-wider text-brand-muted">
              <div><span className="block text-brand-text font-bold text-base mb-1">20 Y/O</span><span>AGE</span></div>
              <div><span className="block text-brand-text font-bold text-base mb-1">LSPU</span><span>INSTITUTION</span></div>
              <div><span className="block text-brand-text font-bold text-base mb-1">BS IT</span><span>DEGREE PROGRAM</span></div>
              <div><span className="block text-brand-text font-bold text-base mb-1">2026</span><span>STATUS: ACTIVE</span></div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="py-24 border-b border-brand-border/40 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <span className="w-8 h-[1px] bg-brand-crimson"></span>
              <h2 className="text-xs uppercase tracking-widest font-bold text-brand-crimson">01 / Profile & Education</h2>
            </div>
            <div className="grid md:grid-cols-12 gap-12 items-start">
              <div className="md:col-span-7 space-y-6">
                <h3 className="text-3xl font-semibold text-white tracking-tight">Driven by system structure, refined by aesthetic precision.</h3>
                <p className="text-brand-muted leading-relaxed font-light">
                  I am a 20-year-old Information Technology student currently pursuing my Bachelor of Science degree at <strong className="text-white font-medium">Laguna State Polytechnic University (LSPU)</strong>. My passion lies in transforming concepts into fully operational digital products.
                </p>
                <p className="text-brand-muted leading-relaxed font-light">
                  Whether architecting database schemas using ORMs like Prisma or curating monochromatic design systems, I prioritize clean architecture, performant code, and high visual standards.
                </p>
              </div>
              <div className="md:col-span-5 bg-brand-card p-8 rounded-lg border border-brand-border crimson-glow-hover relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-crimson/5 rounded-bl-full pointer-events-none"></div>
                <GraduationCap className="w-8 h-8 text-brand-crimson mb-6" />
                <h4 className="text-xl font-bold text-white mb-1">Bachelor of Science in Information Technology</h4>
                <p className="text-brand-crimson font-medium text-sm mb-4">Laguna State Polytechnic University</p>
                <p className="text-xs text-brand-muted leading-relaxed mb-6">Focusing on web computing, database architecture, software engineering, and modern frontend frameworks.</p>
                <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between text-xs text-brand-muted">
                  <span>Status: Undergraduate</span>
                  <span className="font-mono text-white">LSPU Campus</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-24 border-b border-brand-border/40 px-6 bg-brand-card/20">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-12">
              <span className="w-8 h-[1px] bg-brand-crimson"></span>
              <h2 className="text-xs uppercase tracking-widest font-bold text-brand-crimson">02 / Technical Stack</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 bg-brand-card border border-brand-border rounded-md hover:border-brand-borderHover transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <Code className="w-5 h-5 text-brand-crimson" />
                  <h3 className="font-bold text-white text-base">Frontend Engineering</h3>
                </div>
                <ul className="space-y-3 text-sm text-brand-muted">
                  <li className="flex items-center justify-between"><span>React.js</span><span className="text-xs font-mono text-brand-crimson">Component-Based</span></li>
                  <li className="flex items-center justify-between"><span>JavaScript (ES6+)</span><span className="text-xs font-mono text-brand-muted">Core Language</span></li>
                  <li className="flex items-center justify-between"><span>HTML5 / CSS3</span><span className="text-xs font-mono text-brand-muted">Semantic</span></li>
                  <li className="flex items-center justify-between"><span>Tailwind CSS</span><span className="text-xs font-mono text-brand-muted">Utility First</span></li>
                </ul>
              </div>

              <div className="p-6 bg-brand-card border border-brand-border rounded-md hover:border-brand-borderHover transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <Database className="w-5 h-5 text-brand-crimson" />
                  <h3 className="font-bold text-white text-base">Backend & Data</h3>
                </div>
                <ul className="space-y-3 text-sm text-brand-muted">
                  <li className="flex items-center justify-between"><span>Node.js / Express</span><span className="text-xs font-mono text-brand-muted">Server Logic</span></li>
                  <li className="flex items-center justify-between"><span>Prisma ORM</span><span className="text-xs font-mono text-brand-crimson">Type-Safe Data</span></li>
                  <li className="flex items-center justify-between"><span>MySQL / PostgreSQL</span><span className="text-xs font-mono text-brand-muted">Relational DB</span></li>
                  <li className="flex items-center justify-between"><span>RESTful APIs</span><span className="text-xs font-mono text-brand-muted">Architecture</span></li>
                </ul>
              </div>

              <div className="p-6 bg-brand-card border border-brand-border rounded-md hover:border-brand-borderHover transition-all sm:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-3 mb-4">
                  <PenTool className="w-5 h-5 text-brand-crimson" />
                  <h3 className="font-bold text-white text-base">Design & Tools</h3>
                </div>
                <ul className="space-y-3 text-sm text-brand-muted">
                  <li className="flex items-center justify-between"><span>UI / UX Prototyping</span><span className="text-xs font-mono text-brand-muted">Figma</span></li>
                  <li className="flex items-center justify-between"><span>Git & GitHub</span><span className="text-xs font-mono text-brand-muted">Version Control</span></li>
                  <li className="flex items-center justify-between"><span>Minimal Architecture</span><span className="text-xs font-mono text-brand-crimson">Monochrome Aesthetic</span></li>
                  <li className="flex items-center justify-between"><span>System Layouts</span><span className="text-xs font-mono text-brand-muted">Grid Systems</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-24 border-b border-brand-border/40 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-[1px] bg-brand-crimson"></span>
                  <h2 className="text-xs uppercase tracking-widest font-bold text-brand-crimson">03 / Academic & Technical Projects</h2>
                </div>
                <h3 className="text-3xl font-bold text-white tracking-tight">Featured Engineering Work</h3>
              </div>
              <p className="text-xs text-brand-muted font-mono">SELECTED WORK (2nd Year – Present)</p>
            </div>

            <div className="space-y-12">
              {/* Project 1 */}
              <div className="grid md:grid-cols-12 gap-8 items-center bg-brand-card border border-brand-border rounded-lg p-6 md:p-8 crimson-glow-hover">
                <div className="md:col-span-7 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-brand-crimson uppercase tracking-wider">
                    <span>2nd Year Milestone Project</span><span>•</span><span>Web Application</span>
                  </div>
                  <h4 className="text-2xl font-bold text-white">Readrada Digital Storefront</h4>
                  <p className="text-brand-muted text-sm leading-relaxed font-light">
                    Developed as a major project during 2nd year IT studies, Readrada bridges a local physical store into a modern digital platform. Created to showcase inventory online, streamline store visibility, and offer customers an intuitive web showcase.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-2.5 py-1 text-xs font-mono bg-brand-bg text-brand-muted border border-brand-border rounded">Full Web Development</span>
                    <span className="px-2.5 py-1 text-xs font-mono bg-brand-bg text-brand-muted border border-brand-border rounded">UI Design</span>
                    <span className="px-2.5 py-1 text-xs font-mono bg-brand-bg text-brand-muted border border-brand-border rounded">Database Sync</span>
                  </div>
                </div>
                <div className="md:col-span-5 bg-brand-bg/80 border border-brand-border p-6 rounded flex flex-col justify-center items-center text-center">
                  <Store className="w-12 h-12 text-brand-crimson mb-3" />
                  <span className="text-sm font-semibold text-white">Physical Store Digitization</span>
                  <span className="text-xs text-brand-muted mt-1">E-Commerce Architecture & Catalog</span>
                </div>
              </div>

              {/* Project 2 */}
              <div className="grid md:grid-cols-12 gap-8 items-center bg-brand-card border border-brand-border rounded-lg p-6 md:p-8 crimson-glow-hover">
                <div className="md:col-span-7 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-brand-crimson uppercase tracking-wider">
                    <span>Backend Architecture</span><span>•</span><span>Node.js & Database</span>
                  </div>
                  <h4 className="text-2xl font-bold text-white">Student Record System (Prisma ORM)</h4>
                  <p className="text-brand-muted text-sm leading-relaxed font-light">
                    A robust, type-safe data management application designed for registering, querying, updating, and maintaining academic student records efficiently using Prisma ORM with relational databases.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-2.5 py-1 text-xs font-mono bg-brand-bg text-brand-muted border border-brand-border rounded">Node.js</span>
                    <span className="px-2.5 py-1 text-xs font-mono bg-brand-bg text-brand-crimson border border-brand-crimson/40 rounded">Prisma ORM</span>
                    <span className="px-2.5 py-1 text-xs font-mono bg-brand-bg text-brand-muted border border-brand-border rounded">Relational Schema</span>
                  </div>
                </div>
                <div className="md:col-span-5 bg-brand-bg/80 border border-brand-border p-6 rounded font-mono text-xs text-brand-muted space-y-2">
                  <div className="flex items-center justify-between border-b border-brand-border/40 pb-1">
                    <span className="text-white">schema.prisma</span>
                    <span className="text-brand-crimson">Active</span>
                  </div>
                  <p className="text-left text-[11px] text-emerald-400">
                    model Student &#123;<br/>
                    &nbsp;&nbsp;id &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;String @id @default(uuid())<br/>
                    &nbsp;&nbsp;name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;String<br/>
                    &nbsp;&nbsp;course &nbsp;&nbsp;&nbsp;String<br/>
                    &nbsp;&nbsp;createdAt DateTime @default(now())<br/>
                    &#125;
                  </p>
                </div>
              </div>

              {/* Project 3 - React Tic Tac Toe */}
              <div className="grid md:grid-cols-12 gap-8 items-center bg-brand-card border border-brand-border rounded-lg p-6 md:p-8 crimson-glow-hover">
                <div className="md:col-span-7 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-brand-crimson uppercase tracking-wider">
                    <span>React Component Interactive</span><span>•</span><span>Frontend Logic</span>
                  </div>
                  <h4 className="text-2xl font-bold text-white">Interactive Tic-Tac-Toe App</h4>
                  <p className="text-brand-muted text-sm leading-relaxed font-light">
                    An interactive, state-managed React game built to master state immutability, move history time-travel, component lifecycle, and modern UI interaction patterns.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-2.5 py-1 text-xs font-mono bg-brand-bg text-brand-crimson border border-brand-crimson/40 rounded">React.js</span>
                    <span className="px-2.5 py-1 text-xs font-mono bg-brand-bg text-brand-muted border border-brand-border rounded">State Management</span>
                    <span className="px-2.5 py-1 text-xs font-mono bg-brand-bg text-brand-muted border border-brand-border rounded">Interactive UI</span>
                  </div>
                </div>
                <TicTacToe />
              </div>
            </div>
          </div>
        </section>

        {/* CREATIVE DESIGN SHOWCASE SECTION (Design Studio) */}
        <section id="creative" className="py-24 border-b border-brand-border/40 px-6 bg-brand-card/10">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-brand-crimson"></span>
              <h2 className="text-xs uppercase tracking-widest font-bold text-brand-crimson">04 / Visual & Creative Identity</h2>
            </div>
            <h3 className="text-3xl font-bold text-white tracking-tight mb-4">Design Portfolio & System Rules</h3>
            <p className="text-brand-muted font-light max-w-2xl mb-12">
              Understanding backend structures requires equal respect for frontend presentation. Here is a breakdown of my signature <strong className="text-white">Minimal Luxury</strong> design language used across my work.
            </p>

            <div className="mb-12">
              <h4 className="text-xs uppercase tracking-widest text-brand-muted font-mono mb-4">I. Palette Strategy (Monochrome + Crimson Accent)</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded border border-brand-border bg-[#09090b] space-y-2">
                  <div className="h-12 w-full rounded bg-[#09090b] border border-brand-border"></div>
                  <div className="text-xs"><p className="font-bold text-white">Pitch Black</p><p className="font-mono text-brand-muted">#09090B</p></div>
                </div>
                <div className="p-4 rounded border border-brand-border bg-[#141417] space-y-2">
                  <div className="h-12 w-full rounded bg-[#141417] border border-brand-border"></div>
                  <div className="text-xs"><p className="font-bold text-white">Card Charcoal</p><p className="font-mono text-brand-muted">#141417</p></div>
                </div>
                <div className="p-4 rounded border border-brand-border bg-[#27272a] space-y-2">
                  <div className="h-12 w-full rounded bg-[#27272a]"></div>
                  <div className="text-xs"><p className="font-bold text-white">Slate Border</p><p className="font-mono text-brand-muted">#27272A</p></div>
                </div>
                <div className="p-4 rounded border border-brand-border bg-brand-card space-y-2">
                  <div className="h-12 w-full rounded bg-[#dc2626] shadow-[0_0_12px_#dc2626]"></div>
                  <div className="text-xs"><p className="font-bold text-white">Crimson Accent</p><p className="font-mono text-brand-crimson">#DC2626</p></div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 bg-brand-card border border-brand-border rounded-lg space-y-4">
                <h4 className="text-xs uppercase tracking-widest text-brand-muted font-mono">II. Typography System</h4>
                <div className="border-b border-brand-border pb-4">
                  <p className="text-4xl font-bold text-white">Open Sans</p>
                  <p className="text-xs text-brand-muted font-mono mt-1">Google Font Family • Clean, Highly Legible</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center text-xs text-brand-muted"><span>Headline Bold (700)</span><span className="font-bold text-white">Aa Bb Cc 123</span></div>
                  <div className="flex justify-between items-center text-xs text-brand-muted"><span>Subhead Medium (500)</span><span className="font-medium text-white">Aa Bb Cc 123</span></div>
                  <div className="flex justify-between items-center text-xs text-brand-muted"><span>Body Regular (400)</span><span className="font-normal text-white">Aa Bb Cc 123</span></div>
                </div>
              </div>

              <div className="p-8 bg-brand-card border border-brand-border rounded-lg space-y-4">
                <h4 className="text-xs uppercase tracking-widest text-brand-muted font-mono">III. Visual Principles</h4>
                <ul className="space-y-3 text-xs text-brand-muted leading-relaxed">
                  <li className="flex items-start gap-3"><span className="text-brand-crimson font-bold">01</span><span><strong className="text-white">Strict Alignment:</strong> Using baseline grids and consistent margin ratios for crisp visual hierarchy.</span></li>
                  <li className="flex items-start gap-3"><span className="text-brand-crimson font-bold">02</span><span><strong className="text-white">High Whitespace Ratio:</strong> Allowing content breathing room to convey sophisticated luxury.</span></li>
                  <li className="flex items-start gap-3"><span className="text-brand-crimson font-bold">03</span><span><strong className="text-white">Monochromatic Balance:</strong> Using muted grays for non-intrusive metadata, saving bright crimson purely for call-to-actions.</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* RESUME SECTION */}
        <section className="py-20 border-b border-brand-border/40 px-6">
          <div className="max-w-4xl mx-auto bg-brand-card border border-brand-border rounded-lg p-8 md:p-12 text-center relative overflow-hidden crimson-glow-hover">
            <FileText className="w-12 h-12 text-brand-crimson mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">Curriculum Vitae / Résumé</h3>
            <p className="text-brand-muted text-sm font-light max-w-xl mx-auto mb-8">
              Detailed summary of academic standing at LSPU, technical skillset, past web projects, and software engineering coursework.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={handleDownloadCV} className="px-6 py-3 bg-brand-crimson hover:bg-brand-crimsonHover text-white font-medium text-xs uppercase tracking-widest rounded transition-all duration-300 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download Resume (PDF)
              </button>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-12 gap-12">
              <div className="md:col-span-5 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-brand-crimson"></span>
                  <h2 className="text-xs uppercase tracking-widest font-bold text-brand-crimson">05 / Get In Touch</h2>
                </div>
                <h3 className="text-3xl font-bold text-white tracking-tight">Let's Connect</h3>
                <p className="text-brand-muted text-sm font-light leading-relaxed">
                  Interested in collaborating on a web project, reviewing my academic software work, or discussing internship opportunities? Feel free to drop a message.
                </p>
                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-4 text-sm text-brand-muted">
                    <div className="w-10 h-10 rounded bg-brand-card border border-brand-border flex items-center justify-center text-brand-crimson"><Mail className="w-5 h-5" /></div>
                    <div><span className="block text-xs font-mono text-brand-muted">EMAIL</span><span className="text-white font-medium">aleahclaire.recide@lspu.edu.ph</span></div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-brand-muted">
                    <div className="w-10 h-10 rounded bg-brand-card border border-brand-border flex items-center justify-center text-brand-crimson"><MapPin className="w-5 h-5" /></div>
                    <div><span className="block text-xs font-mono text-brand-muted">LOCATION</span><span className="text-white font-medium">Laguna, Philippines</span></div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-7 bg-brand-card p-8 border border-brand-border rounded-lg">
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono text-brand-muted uppercase mb-2">Your Name</label>
                    <input type="text" id="name" required placeholder="John Doe" className="w-full bg-brand-bg border border-brand-border rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-crimson transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-mono text-brand-muted uppercase mb-2">Your Email</label>
                    <input type="email" id="email" required placeholder="john@example.com" className="w-full bg-brand-bg border border-brand-border rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-crimson transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs font-mono text-brand-muted uppercase mb-2">Message</label>
                    <textarea id="message" rows="4" required placeholder="Hello Aleah, I'd like to talk about..." className="w-full bg-brand-bg border border-brand-border rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-crimson transition-colors resize-none"></textarea>
                  </div>
                  <button type="submit" className="w-full py-4 bg-brand-crimson hover:bg-brand-crimsonHover text-white text-xs font-bold uppercase tracking-widest rounded transition-all duration-300">
                    Send Message
                  </button>
                </form>

                {formSubmitted && (
                  <div className="mt-4 p-4 bg-emerald-950/40 border border-emerald-500/40 rounded text-emerald-400 text-xs font-mono text-center">
                    Thank you! Your message has been dispatched successfully.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-8 border-t border-brand-border/60 text-center text-xs text-brand-muted font-mono">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Aleah Claire Recide. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>BSIT Student</span>
            <span>•</span>
            <span>Laguna State Polytechnic University</span>
          </p>
        </div>
      </footer>
    </>
  );
}