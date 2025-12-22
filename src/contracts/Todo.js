import { ethers } from "ethers";
import TodoABI from '../../build/contracts/Todo.json'

export const CONTRACT_ADDRESS = '0x689E4E0D141Fac9034fFaDdC9f1d83035F88f9aC';

export function getTodoContract (signer) {
    return new ethers.Contract(CONTRACT_ADDRESS, TodoABI.abi, signer)
}