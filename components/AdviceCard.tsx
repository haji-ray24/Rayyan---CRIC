import React from 'react';
import { ShotAdvice } from '../types';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface AdviceCardProps {
  advice: ShotAdvice;
}

const AdviceCard: React.FC<AdviceCardProps> = ({ advice }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{advice.shotName}</h2>
          <span className="inline-block mt-1 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full">
            Target: {advice.fieldingRegion}
          </span>
        </div>
        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${
          advice.riskLevel === 'Low' ? 'bg-green-100 text-green-700' :
          advice.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
          'bg-red-100 text-red-700'
        }`}>
          <AlertTriangle className="w-4 h-4" />
          Risk: {advice.riskLevel}
        </div>
      </div>

      <div className="mb-6">
        <p className="text-gray-600 leading-relaxed">{advice.description}</p>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2">
          <Info className="w-4 h-4 text-emerald-600" />
          Execution Tips
        </h3>
        <ul className="space-y-2">
          {advice.executionTips.map((tip, idx) => (
            <li key={idx} className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
              <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm">{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdviceCard;
