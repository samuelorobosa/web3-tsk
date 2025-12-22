# Web3 Todo DApp

A decentralized task management application built on Ethereum blockchain. Manage your tasks on-chain with complete transparency and ownership.

![Web3 Todo](https://img.shields.io/badge/Web3-Todo-purple?style=for-the-badge)
![Solidity](https://img.shields.io/badge/Solidity-^0.8.13-363636?style=for-the-badge&logo=solidity)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.18-38B2AC?style=for-the-badge&logo=tailwind-css)

## Features

- **Decentralized Storage**: All tasks are stored on the Ethereum blockchain
- **Wallet Integration**: Connect with MetaMask to manage your tasks
- **Full CRUD Operations**:
  - Create new tasks
  - Update task names
  - Mark tasks as completed
  - Delete tasks
- **Real-time Updates**: Automatic UI refresh after blockchain transactions
- **Event Logging**: All operations emit blockchain events for transparency
- **User-specific Tasks**: Each wallet address has its own task list
- **Modern UI**: Beautiful, responsive interface with gradient effects and animations

## Tech Stack

### Frontend
- **React** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - UI component library
- **ethers.js** - Ethereum library for blockchain interaction
- **react-hot-toast** - Toast notifications
- **Lucide React** - Icon library

### Blockchain
- **Solidity** - Smart contract language
- **Truffle** - Development framework
- **Ganache** - Local blockchain for testing

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MetaMask browser extension
- Ganache (for local development)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd voting-dapp
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Local Blockchain

```bash
ganache-cli
```

Or use Ganache GUI application.

### 4. Compile Smart Contracts

```bash
truffle compile
```

### 5. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```env
PRIVATE_KEY=your_wallet_private_key_here
ALCHEMY_API_KEY=your_alchemy_api_key_here
```

**WARNING**: Never commit your `.env` file to version control. It's already in `.gitignore`.

### 6. Deploy Smart Contracts

For local development:

```bash
truffle migrate --reset
```

For Sepolia testnet:

```bash
truffle migrate --network sepolia --config=truffle-config.cjs
```

After deployment, copy the contract address and update it in `src/contracts/Todo.js`:

```javascript
export const CONTRACT_ADDRESS = 'YOUR_DEPLOYED_CONTRACT_ADDRESS';
```

### 7. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Smart Contract Overview

### Contract: `Todo.sol`

**Location**: `contracts/Todo.sol`

#### Data Structure

```solidity
struct Task {
    uint256 id;
    string name;
    uint256 createdAt;
    uint256 updatedAt;
    uint256 completedAt;
    uint256 deletedAt;
}
```

#### Key Functions

| Function | Description | Parameters |
|----------|-------------|------------|
| `createTask` | Create a new task | `string _name` |
| `updateTask` | Update task name | `string _name, uint256 taskId` |
| `deleteTask` | Soft delete a task | `uint256 taskId` |
| `markTaskAsCompleted` | Mark task as done | `uint256 taskId` |
| `getAllTasksForAUser` | Get all active tasks | None |
| `getTaskById` | Get specific task | `uint256 _id` |

#### Events

- `TaskCreated(address indexed user, uint256 indexed taskId, string name)`
- `TaskUpdated(address indexed user, uint256 indexed taskId, string name)`
- `TaskDeleted(address indexed user, uint256 indexed taskId)`
- `TaskCompleted(address indexed user, uint256 indexed taskId)`

## Usage

### 1. Connect Wallet

Click the "Connect Wallet" button in the navbar to connect your MetaMask wallet.

### 2. Create a Task

Enter your task name in the input field and click "Add Task". Confirm the transaction in MetaMask.

### 3. Manage Tasks

- **Complete**: Click the checkbox to mark a task as completed
- **Edit**: Click the edit icon to update the task name
- **Delete**: Click the trash icon to delete the task

All operations require MetaMask transaction confirmation and will cost gas fees.

## Project Structure

```
voting-dapp/
├── contracts/           # Solidity smart contracts
│   └── Todo.sol
├── migrations/          # Truffle migration scripts
│   └── 1_deploy_contracts.js
├── src/
│   ├── components/      # React components
│   │   ├── Navbar.jsx
│   │   ├── TaskInput.jsx
│   │   ├── TaskItem.jsx
│   │   └── TaskList.jsx
│   ├── contracts/       # Contract integration
│   │   └── Todo.js
│   ├── App.jsx         # Main application component
│   ├── main.jsx        # Application entry point
│   └── index.css       # Global styles
├── build/              # Compiled contracts (generated)
├── truffle-config.cjs  # Truffle configuration
├── vite.config.js      # Vite configuration
└── package.json        # Dependencies
```

## UI Components

### Navbar
- Displays wallet connection status
- Shows connected wallet address (truncated)
- Connect/disconnect wallet functionality

### TaskInput
- Input field for new tasks
- Gradient effects and animations
- Form validation

### TaskList
- Statistics cards (Total, Active, Completed)
- Separated active and completed tasks
- Empty state handling

### TaskItem
- Inline editing capability
- Complete/Edit/Delete actions
- Visual feedback for completed tasks
- Timestamp display

## Configuration

### Network Configuration

Update `truffle-config.cjs` to configure different networks:

```javascript
networks: {
  development: {
    host: "127.0.0.1",
    port: 8545,
    network_id: "*"
  },
  // Add other networks as needed
}
```

### Contract Address

Update the contract address in `src/contracts/Todo.js` after deployment:

```javascript
export const CONTRACT_ADDRESS = 'YOUR_CONTRACT_ADDRESS';
```

## Testing

Run Truffle tests:

```bash
truffle test
```

## Deployment

### Deploy to Testnet (e.g., Sepolia)

1. Update `truffle-config.cjs` with testnet configuration
2. Get testnet ETH from a faucet
3. Deploy:

```bash
truffle migrate --network sepolia
```

### Deploy to Mainnet

**Warning**: Deploying to mainnet costs real ETH. Ensure thorough testing first.

```bash
truffle migrate --network mainnet
```


## License

This project is licensed under the MIT License.

## Acknowledgments

- Built with React, Tailwind CSS, and Solidity
- UI components inspired by modern Web3 applications
- Icons by Lucide React