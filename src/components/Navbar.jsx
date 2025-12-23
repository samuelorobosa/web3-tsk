import { CheckCircle2, LogOut, Loader2 } from 'lucide-react';

const Navbar = ({ walletAddress, onConnect, onDisconnect, isConnecting }) => {
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-900/90 via-indigo-900/90 to-blue-900/90 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg blur-md opacity-75"></div>
              <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-lg">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-200 via-blue-200 to-cyan-200 bg-clip-text text-transparent">
                Web3 Todo
              </h1>
              <p className="text-xs text-purple-300">Decentralized Task Manager</p>
            </div>
          </div>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-4">
            {walletAddress ? (
              <div className="flex items-center space-x-3">
                <div className="hidden sm:flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-white">Connected</span>
                </div>
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 rounded-lg border border-white/20 shadow-lg">
                  <p className="text-sm font-mono text-white">{formatAddress(walletAddress)}</p>
                </div>
                <button
                  onClick={onDisconnect}
                  className="group relative px-4 py-2 bg-red-500/80 hover:bg-red-600 rounded-lg font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2"
                  title="Disconnect Wallet"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Disconnect</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onConnect}
                disabled={isConnecting}
                className="group relative px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-lg blur opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
                <span className="relative flex items-center space-x-2">
                  {isConnecting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Connecting...</span>
                    </>
                  ) : (
                    <span>Connect Wallet</span>
                  )}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
