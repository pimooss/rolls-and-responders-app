import { useState, useEffect, useRef } from 'react';
import {
  Shield,
  Terminal,
  AlertTriangle,
  Clock,
  BookOpen,
  MessageSquare,
  SkipForward,
  Dice5,
  Monitor,
  Layout,
  Globe
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getScenario, getScenarioList, getDifficultyTable } from './scenarios';
import './i18n';

/**
 * UTILITIES & CONSTANTS
 */


/**
 * LANGUAGE SELECTOR COMPONENT
 */
function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('rr_language', lng);
  };

  return (
    <div className="flex items-center space-x-2">
      <Globe size={16} className="text-slate-500" />
      <select
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-orange-500"
      >
        <option value="en">English</option>
        <option value="fr">Français</option>
      </select>
    </div>
  );
}

/**
 * APP COMPONENT
 */
export default function RollsAndRespondersApp() {
  const { t } = useTranslation();
  const [mode, setMode] = useState(null); // 'facilitator' | 'player' | 'select-scenario'
  const [selectedScenarioId, setSelectedScenarioId] = useState('ddos-attack');

  // SHARED STATE (Simulated Sync via LocalStorage)
  const [gameState, setGameState] = useState({
    scenarioId: 'ddos-attack',
    turnIndex: 0,
    publicLog: [],
    lastRoll: null,
    activeInject: null,
    timer: 0
  });

  // Load state on mount and sync across tabs
  useEffect(() => {
    // Load initial state from localStorage
    const loadInitialState = () => {
      const saved = localStorage.getItem('rr_gamestate');
      if (saved) {
        setGameState(JSON.parse(saved));
      }
    };
    loadInitialState();

    // Listener for syncing tabs
    const handleStorageChange = (e) => {
      if (e.key === 'rr_gamestate') {
        setGameState(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Save state helper
  const updateState = (updates) => {
    const newState = { ...gameState, ...updates };
    setGameState(newState);
    localStorage.setItem('rr_gamestate', JSON.stringify(newState));
  };

  const addLog = (entry) => {
    const newLog = [{ 
      id: Date.now(), 
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 
      ...entry 
    }, ...gameState.publicLog];
    updateState({ publicLog: newLog });
  };

  // Get current scenario
  const scenario = getScenario(gameState.scenarioId, t);

  if (!mode) {
    return <LandingPage setMode={setMode} selectedScenarioId={selectedScenarioId} setSelectedScenarioId={setSelectedScenarioId} updateState={updateState} />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-orange-500 selection:text-white">
      {mode === 'facilitator' ? (
        <FacilitatorView
          scenario={scenario}
          state={gameState}
          updateState={updateState}
          addLog={addLog}
          exit={() => setMode(null)}
        />
      ) : (
        <PlayerView
          scenario={scenario}
          state={gameState}
          exit={() => setMode(null)}
        />
      )}
    </div>
  );
}

/**
 * LANDING PAGE
 */
function LandingPage({ setMode, selectedScenarioId, setSelectedScenarioId, updateState }) {
  const { t } = useTranslation();
  const scenarios = getScenarioList(t);
  const selectedScenario = scenarios.find(s => s.id === selectedScenarioId);

  const handleStart = (mode) => {
    updateState({ scenarioId: selectedScenarioId, turnIndex: 0, publicLog: [], lastRoll: null, activeInject: null });
    setMode(mode);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 space-y-8">
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>

      <div className="text-center space-y-4">
        <div className="flex justify-center mb-4">
          <Shield size={64} className="text-orange-500" />
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
          ROLLS <span className="text-orange-500">&</span> RESPONDERS
        </h1>
        <p className="text-slate-400 text-xl max-w-lg mx-auto">
          {t('landing.subtitle')}
        </p>
      </div>

      {/* Scenario Selector */}
      <div className="w-full max-w-2xl">
        <label className="block text-slate-400 text-sm font-bold mb-2">{t('landing.selectScenario')}</label>
        <select
          value={selectedScenarioId}
          onChange={(e) => setSelectedScenarioId(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500"
        >
          {scenarios.map(scenario => (
            <option key={scenario.id} value={scenario.id}>
              {scenario.title} ({scenario.difficulty})
            </option>
          ))}
        </select>
        {selectedScenario && (
          <p className="mt-2 text-slate-500 text-sm">{selectedScenario.description}</p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6 w-full max-w-2xl">
        <button
          onClick={() => handleStart('facilitator')}
          className="group relative p-8 bg-slate-900 border border-slate-800 rounded-2xl hover:border-orange-500 transition-all text-left space-y-4 hover:shadow-2xl hover:shadow-orange-900/20"
        >
          <div className="flex items-center space-x-3 text-orange-500">
            <Terminal size={32} />
            <span className="font-bold text-xl">{t('landing.facilitatorConsole')}</span>
          </div>
          <p className="text-slate-400">{t('landing.facilitatorDesc')}</p>
        </button>

        <button
          onClick={() => handleStart('player')}
          className="group relative p-8 bg-slate-900 border border-slate-800 rounded-2xl hover:border-blue-500 transition-all text-left space-y-4 hover:shadow-2xl hover:shadow-blue-900/20"
        >
          <div className="flex items-center space-x-3 text-blue-500">
            <Monitor size={32} />
            <span className="font-bold text-xl">{t('landing.playerDisplay')}</span>
          </div>
          <p className="text-slate-400">{t('landing.playerDesc')}</p>
        </button>
      </div>

      <p className="text-slate-600 text-sm mt-8">
        {t('landing.tip')}
      </p>
    </div>
  );
}

/**
 * FACILITATOR VIEW
 */
function FacilitatorView({ scenario, state, updateState, addLog, exit }) {
  const { t } = useTranslation();
  const currentTurnData = scenario.turns[state.turnIndex];
  const difficultyTable = getDifficultyTable(t);

  const handleNextTurn = () => {
    if (state.turnIndex < scenario.turns.length - 1) {
      const nextIndex = state.turnIndex + 1;
      const nextTurn = scenario.turns[nextIndex];

      const phaseLog = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'phase',
        text: `${t('log.advancedTo')} ${nextTurn.title}`
      };

      const infoLog = {
        id: Date.now() + 1,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'info',
        text: nextTurn.publicText
      };

      const newLog = [infoLog, phaseLog, ...state.publicLog];

      updateState({
        turnIndex: nextIndex,
        activeInject: null,
        publicLog: newLog
      });
    }
  };

  const handleRoll = (type = 'normal') => {
    const d1 = Math.floor(Math.random() * 20) + 1;
    const d2 = Math.floor(Math.random() * 20) + 1;
    let final = d1;
    let details = `${d1}`;

    if (type === 'advantage') {
      final = Math.max(d1, d2);
      details = `${t('log.rolled')} ${d1} & ${d2} (${t('facilitator.rollTakeHigh')})`;
    } else if (type === 'disadvantage') {
      final = Math.min(d1, d2);
      details = `${t('log.rolled')} ${d1} & ${d2} (${t('facilitator.rollTakeLow')})`;
    }

    const rollData = { value: final, type, details, timestamp: Date.now() };
    updateState({ lastRoll: rollData });
    addLog({ type: 'roll', text: `${t('log.rolled')} ${final} (${type})`, roll: rollData });
  };

  const triggerInject = (inject) => {
    updateState({ activeInject: inject });
    addLog({ type: 'inject', text: inject.title, content: inject.content });
  };

  const resetGame = () => {
    if (confirm(t('facilitator.resetConfirm'))) {
      updateState({
        turnIndex: 0,
        publicLog: [],
        lastRoll: null,
        activeInject: null,
        timer: 0
      });
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-slate-950 border-b border-slate-800 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="bg-orange-600 text-white px-2 py-1 rounded text-xs font-bold uppercase tracking-wide">{t('header.facilitator')}</div>
          <h2 className="font-bold text-slate-200">{scenario.title}</h2>
        </div>
        <div className="flex items-center space-x-4">
           <LanguageSelector />
           <span className="text-slate-500 text-sm">{t('header.turn')} {state.turnIndex + 1}/{scenario.turns.length}</span>
           <button onClick={resetGame} className="text-xs text-yellow-600 hover:text-yellow-400 underline">{t('header.resetGame')}</button>
           <button onClick={exit} className="text-xs text-slate-600 hover:text-white underline">{t('header.exit')}</button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Col: Script & Control */}
        <div className="w-1/2 flex flex-col border-r border-slate-800 overflow-y-auto">
          
          {/* Phase Control */}
          <div className="p-6 border-b border-slate-800 bg-slate-900/50">
            <div className="flex justify-between items-end mb-4">
              <div>
                <h3 className="text-orange-400 text-sm uppercase font-bold tracking-wider mb-1">{t('facilitator.currentPhase')}</h3>
                <h1 className="text-2xl font-bold text-white">{currentTurnData.title}</h1>
              </div>
              <button
                onClick={handleNextTurn}
                disabled={state.turnIndex === scenario.turns.length - 1}
                className="flex items-center bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('facilitator.nextTurn')} <SkipForward size={16} className="ml-2" />
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 mb-4">
              <span className="text-xs font-bold text-blue-400 uppercase mb-2 block">{t('facilitator.readToPlayers')}</span>
              <p className="text-slate-300 whitespace-pre-line leading-relaxed">
                {currentTurnData.publicText}
              </p>
              <button
                onClick={() => addLog({ type: 'info', text: currentTurnData.publicText })}
                className="mt-3 text-xs flex items-center text-slate-500 hover:text-blue-400 transition-colors"
              >
                <MessageSquare size={12} className="mr-1" /> {t('facilitator.resendToLog')}
              </button>
            </div>

            <div className="bg-orange-950/30 p-4 rounded-lg border border-orange-900/50">
              <span className="text-xs font-bold text-orange-400 uppercase mb-2 flex items-center">
                <Shield size={12} className="mr-1" /> {t('facilitator.facilitatorOnly')}
              </span>
              <p className="text-orange-100/80 text-sm whitespace-pre-line leading-relaxed">
                {currentTurnData.facilitatorInfo}
              </p>
            </div>
          </div>

          {/* Injects */}
          <div className="p-6">
            <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-4">{t('facilitator.availableInjects')}</h3>
            <div className="grid grid-cols-1 gap-3">
              {scenario.injects.map(inject => (
                <div key={inject.id} className="flex items-center justify-between bg-slate-800 p-3 rounded border border-slate-700">
                  <div className="mr-4">
                    <div className="font-bold text-slate-200 text-sm">{inject.title}</div>
                    <div className="text-xs text-slate-500 truncate max-w-[200px]">{inject.content}</div>
                  </div>
                  <button
                    onClick={() => triggerInject(inject)}
                    className="bg-slate-700 hover:bg-red-500 hover:text-white text-slate-300 text-xs font-bold py-2 px-3 rounded transition-colors"
                  >
                    {t('facilitator.trigger')}
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Col: Dice & Tools */}
        <div className="w-1/2 flex flex-col bg-slate-925">
          {/* Dice Roller */}
          <div className="p-6 border-b border-slate-800">
             <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-4">{t('facilitator.actionResolution')}</h3>
             <div className="grid grid-cols-3 gap-4 mb-6">
                <button onClick={() => handleRoll('normal')} className="flex flex-col items-center justify-center p-4 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition-colors">
                  <Dice5 size={32} className="text-white mb-2" />
                  <span className="font-bold text-white">{t('facilitator.normalRoll')}</span>
                </button>
                <button onClick={() => handleRoll('advantage')} className="flex flex-col items-center justify-center p-4 bg-slate-800 hover:bg-green-900/30 border border-slate-700 hover:border-green-500/50 rounded-xl transition-colors group">
                  <div className="flex space-x-1 mb-2">
                     <Dice5 size={24} className="text-green-500" />
                     <Dice5 size={24} className="text-green-500/50" />
                  </div>
                  <span className="font-bold text-green-500">{t('facilitator.advantage')}</span>
                  <span className="text-xs text-green-500/60">{t('facilitator.rollTakeHigh')}</span>
                </button>
                <button onClick={() => handleRoll('disadvantage')} className="flex flex-col items-center justify-center p-4 bg-slate-800 hover:bg-red-900/30 border border-slate-700 hover:border-red-500/50 rounded-xl transition-colors group">
                   <div className="flex space-x-1 mb-2">
                     <Dice5 size={24} className="text-red-500" />
                     <Dice5 size={24} className="text-red-500/50" />
                  </div>
                  <span className="font-bold text-red-500">{t('facilitator.disadvantage')}</span>
                  <span className="text-xs text-red-500/60">{t('facilitator.rollTakeLow')}</span>
                </button>
             </div>

             {/* Difficulty Reference */}
             <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
               <table className="w-full text-sm text-left">
                 <thead className="bg-slate-950 text-slate-400 font-bold uppercase text-xs">
                   <tr>
                     <th className="p-3">{t('facilitator.difficulty')}</th>
                     <th className="p-3">{t('facilitator.roll')}</th>
                     <th className="p-3">{t('facilitator.example')}</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-800 text-slate-300">
                    {difficultyTable.map((row, i) => (
                      <tr key={i}>
                        <td className="p-3 font-medium text-white">{row.level}</td>
                        <td className="p-3 font-mono text-orange-400">{row.roll}</td>
                        <td className="p-3 text-slate-500">{row.ex}</td>
                      </tr>
                    ))}
                 </tbody>
               </table>
             </div>
          </div>

          {/* Live Log Preview */}
          <div className="flex-1 flex flex-col p-6 overflow-hidden">
             <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">{t('facilitator.playerScreenLog')}</h3>
             <div className="flex-1 bg-black/40 rounded-lg border border-slate-800 overflow-y-auto p-4 font-mono text-sm space-y-3">
               {state.publicLog.length === 0 && <span className="text-slate-600 italic">{t('facilitator.noEvents')}</span>}
               {state.publicLog.map(log => (
                 <div key={log.id} className="border-l-2 border-slate-700 pl-3 py-1">
                   <span className="text-slate-500 text-xs mr-2">{log.timestamp}</span>
                   <span className={log.type === 'inject' ? 'text-red-400 font-bold' : 'text-slate-300'}>
                     {log.type === 'roll' ? `🎲 ${log.text}` : log.text}
                   </span>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * PLAYER VIEW
 */
function PlayerView({ scenario, state, exit }) {
  const { t } = useTranslation();
  const currentTurnData = scenario.turns[state.turnIndex];
  const logsEndRef = useRef(null);

  // Auto scroll logs
  useEffect(() => {
    // logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [state.publicLog]);

  return (
    <div className="h-screen flex flex-col bg-slate-950 text-white overflow-hidden">
      {/* Top Status Bar */}
      <div className="bg-slate-900 border-b border-orange-500/30 p-6 flex justify-between items-center shadow-lg z-10">
         <div>
            <h1 className="text-3xl font-black text-white tracking-tight mb-1">{scenario.title}</h1>
            <div className="flex items-center space-x-4 text-sm font-mono text-slate-400">
              <span className="flex items-center"><Shield size={14} className="mr-1" /> {scenario.description}</span>
              <span className="text-slate-600">|</span>
              <span className="flex items-center text-orange-500"><AlertTriangle size={14} className="mr-1" /> {t('player.incidentActive')}</span>
            </div>
         </div>
         <div className="flex items-center space-x-6">
            <LanguageSelector />
            <div className="text-right">
               <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{t('player.currentPhase')}</div>
               <div className="text-4xl font-black text-orange-500">{currentTurnData.title}</div>
            </div>
         </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Feed */}
        <div className="flex-1 p-8 overflow-y-auto relative bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
          
          {/* Active Inject Overlay */}
          {state.activeInject && (
            <div className="mb-8 bg-red-950/40 border-l-4 border-red-500 p-6 rounded-r-lg animate-pulse">
               <div className="flex items-center text-red-500 font-bold uppercase tracking-widest mb-2">
                 <AlertTriangle className="mr-2" /> {t('player.criticalUpdate')}
               </div>
               <h2 className="text-2xl font-bold text-white mb-2">{state.activeInject.title}</h2>
               <p className="text-xl text-red-100 leading-relaxed">{state.activeInject.content}</p>
            </div>
          )}

          {/* Dice Animation Area */}
          {state.lastRoll && (
             <div key={state.lastRoll.timestamp} className="mb-8 p-6 bg-slate-900/80 border border-slate-700 rounded-xl flex items-center justify-between animate-in slide-in-from-top-4 duration-500">
                <div className="flex items-center">
                   <div className="h-16 w-16 bg-slate-800 rounded-lg flex items-center justify-center border-2 border-slate-600 mr-6 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                     <Dice5 size={32} className="text-slate-400" />
                   </div>
                   <div>
                     <div className="text-slate-400 text-sm uppercase font-bold">{t('player.actionRollResult')}</div>
                     <div className="text-4xl font-black text-white">{state.lastRoll.value}</div>
                     <div className="text-slate-500 text-sm font-mono">{state.lastRoll.details}</div>
                   </div>
                </div>

                {/* Visual indicator of success/fail based on difficulty?
                    Since difficulty varies per action, we just show the number.
                    But we can show a chart. */}
                <div className="flex space-x-2 text-xs font-mono text-slate-500">
                   <div className={state.lastRoll.value >= 5 ? "text-green-500 font-bold" : "opacity-30"}>{t('player.routine')}(5+)</div>
                   <div className={state.lastRoll.value >= 10 ? "text-yellow-500 font-bold" : "opacity-30"}>{t('player.challenging')}(10+)</div>
                   <div className={state.lastRoll.value >= 15 ? "text-red-500 font-bold" : "opacity-30"}>{t('player.hard')}(15+)</div>
                </div>
             </div>
          )}

          {/* Log Stream */}
          <div className="space-y-6">
             {state.publicLog.map(log => (
               <LogItem key={log.id} log={log} />
             ))}
             <div ref={logsEndRef} />
          </div>

          {state.publicLog.length === 0 && (
            <div className="h-full flex items-center justify-center text-slate-700">
               <div className="text-center">
                 <Clock size={48} className="mx-auto mb-4 opacity-50" />
                 <p className="text-xl font-light">{t('player.waiting')}</p>
               </div>
            </div>
          )}
        </div>

        {/* Right Sidebar: Ref */}
        <div className="w-80 bg-slate-900 border-l border-slate-800 p-6 hidden lg:block">
           <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-6 border-b border-slate-800 pb-2">{t('player.referenceData')}</h3>

           <div className="space-y-6">
              <div>
                <h4 className="font-bold text-white mb-2 flex items-center">
                  <BookOpen size={16} className="mr-2 text-blue-500" />
                  {t('player.difficultyChecks')}
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between p-2 bg-slate-800/50 rounded">
                    <span className="text-slate-400">{t('player.routine')}</span>
                    <span className="font-mono text-blue-400">5+</span>
                  </li>
                  <li className="flex justify-between p-2 bg-slate-800/50 rounded">
                    <span className="text-slate-400">{t('player.challenging')}</span>
                    <span className="font-mono text-yellow-400">10+</span>
                  </li>
                  <li className="flex justify-between p-2 bg-slate-800/50 rounded">
                    <span className="text-slate-400">{t('player.hard')}</span>
                    <span className="font-mono text-red-400">15+</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white mb-2 flex items-center">
                  <Layout size={16} className="mr-2 text-purple-500" />
                  {t('player.turnStructure')}
                </h4>
                <div className="space-y-3 relative pl-4 border-l-2 border-slate-800">
                   {scenario.turns.map((turn, i) => (
                     <div key={turn.id} className={`text-sm transition-all ${i === state.turnIndex ? 'text-white font-bold translate-x-1' : 'text-slate-600'}`}>
                       {turn.title}
                       {i === state.turnIndex && <span className="block text-xs font-normal text-orange-500 mt-1">{t('player.currentPhase')}</span>}
                     </div>
                   ))}
                </div>
              </div>
           </div>

           <div className="mt-12 pt-6 border-t border-slate-800 text-center">
              <button onClick={exit} className="text-xs text-slate-700 hover:text-white transition-colors">
                {t('header.exitPlayerMode')}
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

function LogItem({ log }) {
  const { t } = useTranslation();

  if (log.type === 'phase') {
    return (
      <div className="flex items-center space-x-4 opacity-50">
        <div className="h-px bg-slate-700 flex-1"></div>
        <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">{log.text}</span>
        <div className="h-px bg-slate-700 flex-1"></div>
      </div>
    );
  }

  if (log.type === 'inject') {
     // Handled by the active overlay mostly, but good to keep history
     return (
       <div className="p-4 rounded bg-red-950/20 border border-red-900/30 text-red-200/60 text-sm">
          <span className="font-bold text-red-500 uppercase text-xs block mb-1">{t('player.pastInject')}</span>
          {log.text}
       </div>
     );
  }

  if (log.type === 'roll') {
    return (
       <div className="flex items-start space-x-3 text-sm text-slate-400 py-2">
          <Dice5 size={16} className="mt-0.5 text-slate-600" />
          <div>
            <span className="block font-mono text-slate-300">{t('log.actionRoll')} {log.roll.value}</span>
            <span className="text-xs text-slate-600">{log.roll.details}</span>
          </div>
       </div>
    );
  }

  // Info / Public Text
  return (
    <div className="bg-slate-900 p-5 rounded-lg border-l-2 border-blue-500 shadow-md">
      <div className="text-xs font-mono text-slate-500 mb-2">{log.timestamp}</div>
      <div className="text-slate-200 whitespace-pre-line leading-relaxed text-lg">
        {log.text}
      </div>
    </div>
  );
}