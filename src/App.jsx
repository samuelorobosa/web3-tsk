import { useEffect, useState } from 'react';
import { useChainId, useConnect, useDisconnect, useConnection, useConnectors, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { switchChain } from '@wagmi/core';
import { config } from '../config';
import { sepolia } from '@wagmi/core/chains';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import Todo from '../build/contracts/Todo.json';

const CONTRACT_ADDRESS = '0x689E4E0D141Fac9034fFaDdC9f1d83035F88f9aC';

function App() {
  const { connect } = useConnect();
  const { address, isConnected, isConnecting } = useConnection();
  const chainId = useChainId();
  const connectors = useConnectors();
  const disconnect = useDisconnect();
  const [processingTask, setProcessingTask] = useState({ id: null, action: null });
  const { data, isLoading: isDataLoading, refetch: refreshTasks } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: Todo.abi,
    functionName: "getAllTasksForAUser",
    account: address,
    query: {
      enabled: !!address,
    },
  });
  const { data: hash, writeContract, isPending: isWritePending, error: writeError } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isConfirmed) {
      toast.success('Transaction confirmed!');
      setProcessingTask({ id: null, action: null });
      refreshTasks();
    }
    if (writeError) {
      toast.error(writeError.shortMessage || 'Transaction failed');
      setProcessingTask({ id: null, action: null });
    }
  }, [isConfirmed, writeError, refreshTasks]);

  const isLoading = isWritePending || isConfirming;

  // Format data for TaskList
  const fetchedTasks = data ? data.map(task => ({
    id: Number(task.id),
    name: task.name,
    createdAt: Number(task.createdAt),
    updatedAt: Number(task.updatedAt),
    completedAt: Number(task.completedAt),
    deletedAt: Number(task.deletedAt)
  })) : [];


  // Auto-switch to Sepolia when connected to wrong chain
  useEffect(() => {
    const performSwitch = async () => {
      if (isConnected && chainId !== sepolia.id) {
        try {
          await switchChain(config, { chainId: sepolia.id });
        } catch (error) {
          console.error("Failed to switch chain:", error);
        }
      }
    };
    performSwitch();
  }, [isConnected, chainId]);

  const handleConnect = () => {
    const injectedConnector = connectors[0];
    if (injectedConnector) {
      connect({ connector: injectedConnector });
    }
  };

  const handleDisconnect = () => {
    disconnect.mutate();
    toast.success('Wallet disconnected');
  };

  const handleAddTask = async (taskName) => {
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: Todo.abi,
      functionName: 'createTask',
      args: [taskName],
    });
  };

  const handleCompleteTask = async (taskId) => {
    setProcessingTask({ id: taskId, action: 'complete' });
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: Todo.abi,
      functionName: 'markTaskAsCompleted',
      args: [BigInt(taskId)],
    });
  };

  const handleDeleteTask = async (taskId) => {
    setProcessingTask({ id: taskId, action: 'delete' });
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: Todo.abi,
      functionName: 'deleteTask',
      args: [BigInt(taskId)],
    });
  };

  const handleUpdateTask = async (taskId, newName) => {
    setProcessingTask({ id: taskId, action: 'update' });
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: Todo.abi,
      functionName: 'updateTask',
      args: [newName, BigInt(taskId)],
    });
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
          {/* Global Connection Loader */}
          {isConnecting && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md">
              <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-white/5 border border-white/10 shadow-2xl">
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
                  <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin relative z-10"></div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-1">Connecting Wallet</h3>
                  <p className="text-purple-300/70 text-sm">Please approve the connection in your wallet...</p>
                </div>
              </div>
            </div>
          )}

          <Navbar 
            walletAddress={address} 
            onConnect={handleConnect} 
            onDisconnect={handleDisconnect}
            isConnecting={connectors.isPending}
          />
          
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

              <TaskInput onAddTask={handleAddTask} isLoading={isLoading} />

              {isDataLoading ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-purple-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
                    <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin relative z-10"></div>
                  </div>
                  <div className="text-center">
                    <p className="text-purple-300/70 font-medium animate-pulse">Fetching your tasks from the blockchain...</p>
                    <p className="text-purple-300/40 text-xs mt-1 italic">This may take a moment depending on network status</p>
                  </div>
                </div>
              ) : (
                <TaskList
                  tasks={fetchedTasks}
                  onComplete={handleCompleteTask}
                  onDelete={handleDeleteTask}
                  onUpdate={handleUpdateTask}
                  processingTask={processingTask}
                />
              )}
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
