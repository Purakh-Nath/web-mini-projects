import { useState } from 'react';
import { Timer as TimerIcon, Watch } from 'lucide-react';
import { Stopwatch } from './components/Stopwatch';
import { Timer } from './components/Timer';
import { TabButton } from './components/TabButton';

type Tab = 'stopwatch' | 'timer';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('stopwatch');

  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-start sm:justify-center px-4 py-10 sm:py-8 relative overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(6,182,212,0.08) 0%, transparent 50%), #0B1020',
      }}
    >

      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-violet/10 blur-[100px] animate-pulse-slow" />
        <div
          className="absolute -bottom-40 -right-20 w-80 h-80 rounded-full bg-cyan/[0.08] blur-[80px] animate-pulse-slow"
          style={{ animationDelay: '1.5s' }}
        />
      </div>

      <header className="w-full max-w-md mb-8 sm:mb-10 flex flex-col items-center gap-2 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet to-cyan flex items-center justify-center shadow-glow-violet">
            <Watch className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-text-primary">Chrono</span>
        </div>
        <p className="text-text-muted text-sm tracking-wide">Precision time tracking</p>
      </header>

      <main className="w-full max-w-md animate-slide-up relative z-10">
        <div
          className="glass rounded-3xl shadow-glass-lg overflow-hidden"
        >

          <div
            role="tablist"
            className="flex p-1.5 mx-4 mt-4 gap-1 rounded-2xl bg-white/[0.04] border border-white/[0.06]"
          >
            <TabButton
              active={activeTab === 'stopwatch'}
              onClick={() => setActiveTab('stopwatch')}
              icon={<Watch className="w-4 h-4" />}
              label="Stopwatch"
            />
            <TabButton
              active={activeTab === 'timer'}
              onClick={() => setActiveTab('timer')}
              icon={<TimerIcon className="w-4 h-4" />}
              label="Timer"
            />
          </div>

          <div className="px-6 pb-8 pt-6 sm:px-8 sm:pb-10 sm:pt-8">
            {activeTab === 'stopwatch' ? (
              <Stopwatch key="stopwatch" />
            ) : (
              <Timer key="timer" />
            )}
          </div>
        </div>
      </main>

      <footer className="mt-8 text-text-muted/40 text-xs tracking-widest uppercase select-none relative z-10">
        Precision to 10ms
      </footer>
    </div>
  );
}

export default App;