import { useState } from 'react';
import { Plus, Sparkles } from 'lucide-react';

const TaskInput = ({ onAddTask }) => {
  const [taskName, setTaskName] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim()) {
      onAddTask(taskName);
      setTaskName('');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className={`relative transition-all duration-300 ${isFocused ? 'scale-[1.02]' : ''}`}>
          {/* Glow effect */}
          <div className={`absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 rounded-2xl blur-lg transition-opacity duration-300 ${isFocused ? 'opacity-75' : 'opacity-0'}`}></div>
          
          {/* Input container */}
          <div className="relative bg-gradient-to-r from-purple-900/50 via-indigo-900/50 to-blue-900/50 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl p-6">
            <div className="flex items-center space-x-3 mb-2">
              <Sparkles className="h-5 w-5 text-purple-400" />
              <h2 className="text-lg font-semibold text-white">Create New Task</h2>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="What needs to be done?"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300"
                />
              </div>
              
              <button
                type="submit"
                disabled={!taskName.trim()}
                className="group relative px-6 py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-2">
                  <Plus className="h-5 w-5" />
                  <span className="hidden sm:inline">Add Task</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaskInput;
