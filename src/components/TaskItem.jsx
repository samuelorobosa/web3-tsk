import { useState } from 'react';
import { Check, Trash2, Edit2, X, Save } from 'lucide-react';

const TaskItem = ({ task, onComplete, onDelete, onUpdate, isCompleting, isUpdating, isDeleting }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(task.name);

  const handleUpdate = () => {
    if (editedName.trim() && editedName !== task.name) {
      onUpdate(task.id, editedName);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(task.name);
    setIsEditing(false);
  };

  const isCompleted = task.completedAt > 0;
  const isAnyProcessing = isCompleting || isUpdating || isDeleting;

  return (
    <div className="group relative">
      {/* Glow effect on hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
      
      <div className={`relative bg-gradient-to-r from-purple-900/30 via-indigo-900/30 to-blue-900/30 backdrop-blur-sm rounded-xl border border-white/10 p-4 transition-all duration-300 hover:border-white/30 ${isCompleted ? 'opacity-60' : ''}`}>
        <div className="flex items-center space-x-4">
          {/* Complete checkbox */}
          <button
            onClick={() => onComplete(task.id)}
            disabled={isCompleted || isAnyProcessing}
            className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
              isCompleted
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-400'
                : 'border-purple-400 hover:border-purple-300 hover:bg-purple-500/20'
            } ${isAnyProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isCompleting ? (
              <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              isCompleted && <Check className="h-4 w-4 text-white" />
            )}
          </button>

          {/* Task content */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleUpdate();
                  if (e.key === 'Escape') handleCancel();
                }}
                disabled={isAnyProcessing}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50"
                autoFocus
              />
            ) : (
              <div>
                <p className={`text-white font-medium ${isCompleted ? 'line-through text-gray-400' : ''}`}>
                  {task.name}
                </p>
                <div className="flex items-center space-x-4 mt-1 text-xs text-purple-300/70">
                  <span>ID: #{task.id}</span>
                  <span>•</span>
                  <span>Created: {new Date(task.createdAt * 1000).toLocaleDateString()}</span>
                  {isCompleted && (
                    <>
                      <span>•</span>
                      <span className="text-green-400">✓ Completed</span>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleUpdate}
                  disabled={isAnyProcessing}
                  className="p-2 bg-green-600 hover:bg-green-500 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[36px]"
                  title="Save"
                >
                  {isUpdating ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <Save className="h-4 w-4 text-white" />
                  )}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isAnyProcessing}
                  className="p-2 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors duration-200 disabled:opacity-50"
                  title="Cancel"
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  disabled={isCompleted}
                  className="p-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  title="Edit"
                >
                  <Edit2 className="h-4 w-4 text-white" />
                </button>
                <button
                  onClick={() => onDelete(task.id)}
                  disabled={isAnyProcessing}
                  className="p-2 bg-red-600 hover:bg-red-500 rounded-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center min-w-[36px]"
                  title="Delete"
                >
                  {isDeleting ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <Trash2 className="h-4 w-4 text-white" />
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
