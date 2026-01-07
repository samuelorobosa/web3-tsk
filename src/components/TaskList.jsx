import { ListTodo, CheckCircle2, Circle } from 'lucide-react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onComplete, onDelete, onUpdate, processingTask }) => {
  const activeTasks = tasks.filter(task => task.completedAt === 0);
  const completedTasks = tasks.filter(task => task.completedAt > 0);

  if (tasks.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl blur-xl"></div>
          <div className="relative bg-gradient-to-r from-purple-900/30 via-indigo-900/30 to-blue-900/30 backdrop-blur-xl rounded-2xl border border-white/10 p-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full">
                <ListTodo className="h-12 w-12 text-purple-400" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No tasks yet</h3>
            <p className="text-purple-300/70">Create your first task to get started!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
          <div className="relative bg-gradient-to-r from-purple-900/50 to-indigo-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300/70 text-sm">Total Tasks</p>
                <p className="text-2xl font-bold text-white">{tasks.length}</p>
              </div>
              <ListTodo className="h-8 w-8 text-purple-400" />
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
          <div className="relative bg-gradient-to-r from-indigo-900/50 to-blue-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300/70 text-sm">Active</p>
                <p className="text-2xl font-bold text-white">{activeTasks.length}</p>
              </div>
              <Circle className="h-8 w-8 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
          <div className="relative bg-gradient-to-r from-blue-900/50 to-cyan-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-300/70 text-sm">Completed</p>
                <p className="text-2xl font-bold text-white">{completedTasks.length}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Active Tasks */}
      {activeTasks.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
            <Circle className="h-5 w-5 text-blue-400" />
            <span>Active Tasks</span>
            <span className="text-sm text-purple-300/70">({activeTasks.length})</span>
          </h3>
          <div className="space-y-3">
            {activeTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onComplete={onComplete}
                  onDelete={onDelete}
                  onUpdate={onUpdate}
                  isCompleting={processingTask.id === task.id && processingTask.action === 'complete'}
                  isUpdating={processingTask.id === task.id && processingTask.action === 'update'}
                  isDeleting={processingTask.id === task.id && processingTask.action === 'delete'}
                />
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
            <CheckCircle2 className="h-5 w-5 text-green-400" />
            <span>Completed Tasks</span>
            <span className="text-sm text-purple-300/70">({completedTasks.length})</span>
          </h3>
          <div className="space-y-3">
            {completedTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onComplete={onComplete}
                  onDelete={onDelete}
                  onUpdate={onUpdate}
                  isCompleting={processingTask.id === task.id && processingTask.action === 'complete'}
                  isUpdating={processingTask.id === task.id && processingTask.action === 'update'}
                  isDeleting={processingTask.id === task.id && processingTask.action === 'delete'}
                />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
