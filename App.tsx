import React, { useState } from 'react';
import { getShotAdvice } from './services/gemini';
import { BowlerType, Length, Line, ShotAdvice, SimulationState } from './types';
import ControlPanel from './components/ControlPanel';
import FieldView from './components/FieldView';
import AdviceCard from './components/AdviceCard';
import { CircleDot } from 'lucide-react';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState<ShotAdvice | null>(null);
  const [simulationState, setSimulationState] = useState<SimulationState>({
    bowler: BowlerType.FAST,
    line: Line.OUTSIDE_OFF,
    length: Length.GOOD
  });

  const handleStateChange = (key: keyof SimulationState, value: string) => {
    setSimulationState(prev => ({ ...prev, [key]: value }));
  };

  const handleSimulate = async () => {
    setLoading(true);
    setAdvice(null);
    try {
      const result = await getShotAdvice(
        simulationState.bowler,
        simulationState.line,
        simulationState.length
      );
      setAdvice(result);
    } catch (error) {
      console.error(error);
      alert("Failed to get advice from Coach AI. Please check your API key.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50 pb-12">
      {/* Header */}
      <header className="bg-emerald-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="bg-white p-2 rounded-full">
            <CircleDot className="w-6 h-6 text-emerald-900" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">CricShot AI</h1>
            <p className="text-xs text-emerald-200">Intelligent Shot Selection Assistant</p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Controls (Mobile: Top, Desktop: Left) */}
          <div className="lg:col-span-4 space-y-6">
            <ControlPanel 
              state={simulationState} 
              onChange={handleStateChange}
              onSimulate={handleSimulate}
              loading={loading}
            />
            
            {/* Quick Tip Box (Static for now, could be dynamic) */}
            <div className="bg-emerald-800 text-emerald-50 p-6 rounded-2xl hidden lg:block">
              <h3 className="font-bold mb-2">Did you know?</h3>
              <p className="text-sm opacity-90">
                Playing late (waiting for the ball) is crucial for shots behind square, especially against faster bowlers on bouncy tracks.
              </p>
            </div>
          </div>

          {/* Right Column: Visualization & Results */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Visualization Container */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex justify-center items-center min-h-[400px] relative">
               {/* Overlay when no advice yet */}
               {!advice && !loading && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10 bg-white/50 backdrop-blur-sm rounded-2xl">
                   <p className="text-gray-500 font-medium">Select parameters and click "Analyze Shot" to see the simulation.</p>
                 </div>
               )}
               <FieldView advice={advice} loading={loading} />
            </div>

            {/* Results Card */}
            {advice && (
              <AdviceCard advice={advice} />
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;
