import React from 'react';
import { BowlerType, Line, Length, SimulationState } from '../types';
import { PlayCircle, Loader2 } from 'lucide-react';

interface ControlPanelProps {
  state: SimulationState;
  onChange: (key: keyof SimulationState, value: string) => void;
  onSimulate: () => void;
  loading: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ state, onChange, onSimulate, loading }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-1">Delivery Settings</h2>
        <p className="text-sm text-gray-500">Configure the bowler and ball delivery.</p>
      </div>

      <div className="space-y-4">
        {/* Bowler Type */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Bowler Type</label>
          <select
            value={state.bowler}
            onChange={(e) => onChange('bowler', e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
          >
            {Object.values(BowlerType).map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Line */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Line</label>
          <select
            value={state.line}
            onChange={(e) => onChange('line', e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
          >
            {Object.values(Line).map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Length */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-700">Length</label>
          <select
            value={state.length}
            onChange={(e) => onChange('length', e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
          >
            {Object.values(Length).map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={onSimulate}
        disabled={loading}
        className={`mt-4 w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-white transition-all transform active:scale-95 shadow-md ${
          loading 
            ? 'bg-emerald-400 cursor-not-allowed' 
            : 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg'
        }`}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin w-5 h-5" />
            Analyzing...
          </>
        ) : (
          <>
            <PlayCircle className="w-5 h-5" />
            Analyze Shot
          </>
        )}
      </button>
    </div>
  );
};

export default ControlPanel;
