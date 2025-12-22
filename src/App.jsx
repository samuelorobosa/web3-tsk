import { useState } from 'react';
import Navbar from './components/Navbar';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import { ethers } from 'ethers';
import toast, { Toaster } from 'react-hot-toast';
import { getTodoContract } from "./contracts/Todo";

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [contract, setContract] = useState(null);
  const [tasks, setTasks] = useState([]);

  const parseTaskData = (task) => ({
    id: Number(task.id),
    name: task.name,
    createdAt: Number(task.createdAt),
    updatedAt: Number(task.updatedAt),
    completedAt: Number(task.completedAt),
    deletedAt: Number(task.deletedAt)
  });

  const findEventInReceipt = (receipt, eventName) => {
    return receipt.logs.find(log => {
      try {
        const parsed = contract.interface.parseLog(log);
        return parsed.name === eventName;
      } catch {
        return false;
      }
    });
  };

  const refreshTasks = async () => {
    const allTasks = await contract.getAllTasksForAUser();
    setTasks(allTasks.map(parseTaskData));
  };

  const executeTaskTransaction = async (txPromise, eventName, successMessage, errorMessage) => {
    try {
      const tx = await txPromise;
      const receipt = await tx.wait();
      const event = findEventInReceipt(receipt, eventName);

      if (event) {
        const parsed = contract.interface.parseLog(event);
        console.log(`${eventName}:`, parsed.args);
        await refreshTasks();
        toast.success(successMessage);
      }
    } catch (error) {
      console.error(errorMessage, error);
      toast.error(errorMessage);
    }
  };

  const connectWallet = async () => {
    if(!window.ethereum){
      toast.error("Please install MetaMask!")
      return null;
    }
    
    try{
      await window.ethereum.request({method: 'eth_requestAccounts'});
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      return { provider, signer, address };
    } catch (error){
       console.error("Error connecting wallet:", error);
       toast.error("Error connecting wallet");
       return null;
    }
  };

  const loadTasks = async (todoContract) => {
    try {
      const allTasks = await todoContract.getAllTasksForAUser();
      setTasks(allTasks.map(parseTaskData));
      toast.success("Tasks loaded successfully!");
    } catch (error) {
      console.error("Error loading tasks:", error);
      toast.error("Failed to load tasks");
    }
  };

  const handleConnect = async () => {
    const connection = await connectWallet();
    if(!connection) return;

    const {signer, address } = connection;
    setWalletAddress(address);

    const todoContract = getTodoContract(signer);
    setContract(todoContract);
    
    await loadTasks(todoContract);
  };

  const handleAddTask = async (taskName) => {
    await executeTaskTransaction(
      contract.createTask(taskName),
      "TaskCreated",
      "Task created successfully!",
      "Failed to create task"
    );
  };

  const handleCompleteTask = async (taskId) => {
    await executeTaskTransaction(
      contract.markTaskAsCompleted(taskId),
      "TaskCompleted",
      "Task completed successfully!",
      "Failed to complete task"
    );
  };

  const handleDeleteTask = async (taskId) => {
    await executeTaskTransaction(
      contract.deleteTask(taskId),
      "TaskDeleted",
      "Task deleted successfully!",
      "Failed to delete task"
    );
  };

  const handleUpdateTask = async (taskId, newName) => {
    await executeTaskTransaction(
      contract.updateTask(newName, taskId),
      "TaskUpdated",
      "Task updated successfully!",
      "Failed to update task"
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="relative z-10">
          <Navbar walletAddress={walletAddress} onConnect={handleConnect} />
          
          <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-200 via-blue-200 to-cyan-200 bg-clip-text text-transparent">
                  Manage Your Tasks On-Chain
                </h2>
                <p className="text-purple-300/70 text-lg max-w-2xl mx-auto">
                  A decentralized task manager powered by blockchain technology. Your tasks are stored securely on the Ethereum network.
                </p>
              </div>

              <TaskInput onAddTask={handleAddTask} />

              <TaskList
                tasks={tasks}
                onComplete={handleCompleteTask}
                onDelete={handleDeleteTask}
                onUpdate={handleUpdateTask}
              />
            </div>
          </main>

          <footer className="relative z-10 py-8 text-center text-purple-300/50 text-sm">
            <p>Built with React, Tailwind CSS, and Solidity</p>
            <p className="mt-2">Ready for Web3 integration 🚀</p>
          </footer>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default App;
