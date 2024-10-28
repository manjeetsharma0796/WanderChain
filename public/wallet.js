// document.getElementById("walletButton").addEventListener("click", function () {
//   // Prompt the user to enter a wallet address
//   const walletAddress = prompt("Enter the wallet address you want to connect:");

//   if (walletAddress) {
//     // Log the entered wallet address
//     console.log("Wallet Address:", walletAddress);
//   } else {
//     console.log("No wallet address entered.");
//   }
// });

let clientAddress;
const CONTRACT_ADDRESS = "0xdF3eBD63A287d8B86782174C9f6CbcA61E404F7C"

const isWalletConnected = () => {
  return localStorage.getItem("clientAddress");
};

window.onload = () => {
  if (isWalletConnected()) {
    console.log(isWalletConnected());

    document.getElementById("walletButton").innerText = "Connected";
  }
};

async function connectWallet() {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // Request connection to MetaMask only when the button is clicked
    await window.ethereum.request({ method: "eth_requestAccounts" });

    // Get the connected wallet's signer
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    // Update button text to "Connected"
    document.getElementById("walletButton").innerText = "Connected";

    // Store the connected address in localStorage
    localStorage.setItem("clientAddress", address);
    console.log("Connected wallet address:", address);
    // withdraw();
  } catch (error) {
    console.error("Error connecting to MetaMask:", error);
  }
}
const connectBttn = document.getElementById("walletButton")
connectBttn.onclick = () => {
  connectWallet();
  withdraw();
};
const withdraw = async () => {
  const abi = Token.abi;
  const charge = 5000;
  console.log(charge, "=========withdraw=========");
  // const contractAddress = "0x55cA1a31fDF87F1470F724373FF551af73FA00F1"
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = await provider.getSigner();
  const address = await signer.getAddress();
  const bounceContract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer)

  await (await bounceContract.mint(address, ethers.utils.parseUnits(charge.toString(), 18))).wait();

}

const deposit = async () => {

  const abi = Token.abi;
  const charge = document.getElementById("deduct-amount").value;
  console.log(charge, "=========deposit=========");
  // const contractAddress = "0x55cA1a31fDF87F1470F724373FF551af73FA00F1"
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = await provider.getSigner();
  const address = await signer.getAddress();
  const bounceContract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer)

  await (await bounceContract.donate(address, "0x94A7Af5edB47c3B91d1B4Ffc2CA535d7aDA8CEDe", ethers.utils.parseUnits(charge.toString(), 18))).wait();

}

const Token = {
  "_format": "hh-sol-artifact-1",
  "contractName": "WanderToken",
  "sourceName": "contracts/WanderToken.sol",
  "abi": [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "allowance",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "needed",
          "type": "uint256"
        }
      ],
      "name": "ERC20InsufficientAllowance",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "needed",
          "type": "uint256"
        }
      ],
      "name": "ERC20InsufficientBalance",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "approver",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidApprover",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "receiver",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidReceiver",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidSender",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "ERC20InvalidSpender",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "mint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x608060405234801561001057600080fd5b506040518060400160405280600b81526020016a2bb0b73232b92a37b5b2b760a91b815250604051806040016040528060048152602001635752544360e01b81525081600390816100619190610117565b50600461006e8282610117565b5050506101d6565b634e487b7160e01b600052604160045260246000fd5b600181811c908216806100a057607f821691505b6020821081036100c057634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115610112576000816000526020600020601f850160051c810160208610156100ef5750805b601f850160051c820191505b8181101561010e578281556001016100fb565b5050505b505050565b81516001600160401b0381111561013057610130610076565b6101448161013e845461008c565b846100c6565b602080601f83116001811461017957600084156101615750858301515b600019600386901b1c1916600185901b17855561010e565b600085815260208120601f198616915b828110156101a857888601518255948401946001909101908401610189565b50858210156101c65787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61078d806101e56000396000f3fe608060405234801561001057600080fd5b506004361061009e5760003560e01c806340c10f191161006657806340c10f191461011857806370a082311461012d57806395d89b4114610156578063a9059cbb1461015e578063dd62ed3e1461017157600080fd5b806306fdde03146100a3578063095ea7b3146100c157806318160ddd146100e457806323b872dd146100f6578063313ce56714610109575b600080fd5b6100ab6101aa565b6040516100b891906105d6565b60405180910390f35b6100d46100cf366004610641565b61023c565b60405190151581526020016100b8565b6002545b6040519081526020016100b8565b6100d461010436600461066b565b610256565b604051601281526020016100b8565b61012b610126366004610641565b61027a565b005b6100e861013b3660046106a7565b6001600160a01b031660009081526020819052604090205490565b6100ab610288565b6100d461016c366004610641565b610297565b6100e861017f3660046106c9565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6060600380546101b9906106fc565b80601f01602080910402602001604051908101604052809291908181526020018280546101e5906106fc565b80156102325780601f1061020757610100808354040283529160200191610232565b820191906000526020600020905b81548152906001019060200180831161021557829003601f168201915b5050505050905090565b60003361024a8185856102ad565b60019150505b92915050565b6000336102648582856102bf565b61026f858585610342565b506001949350505050565b61028482826103a1565b5050565b6060600480546101b9906106fc565b60006102a4338484610342565b50600192915050565b6102ba83838360016103d7565b505050565b6001600160a01b03838116600090815260016020908152604080832093861683529290522054600019811461033c578181101561032d57604051637dc7a0d960e11b81526001600160a01b038416600482015260248101829052604481018390526064015b60405180910390fd5b61033c848484840360006103d7565b50505050565b6001600160a01b03831661036c57604051634b637e8f60e11b815260006004820152602401610324565b6001600160a01b0382166103965760405163ec442f0560e01b815260006004820152602401610324565b6102ba8383836104ac565b6001600160a01b0382166103cb5760405163ec442f0560e01b815260006004820152602401610324565b610284600083836104ac565b6001600160a01b0384166104015760405163e602df0560e01b815260006004820152602401610324565b6001600160a01b03831661042b57604051634a1406b160e11b815260006004820152602401610324565b6001600160a01b038085166000908152600160209081526040808320938716835292905220829055801561033c57826001600160a01b0316846001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258460405161049e91815260200190565b60405180910390a350505050565b6001600160a01b0383166104d75780600260008282546104cc9190610736565b909155506105499050565b6001600160a01b0383166000908152602081905260409020548181101561052a5760405163391434e360e21b81526001600160a01b03851660048201526024810182905260448101839052606401610324565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b03821661056557600280548290039055610584565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516105c991815260200190565b60405180910390a3505050565b60006020808352835180602085015260005b81811015610604578581018301518582016040015282016105e8565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b038116811461063c57600080fd5b919050565b6000806040838503121561065457600080fd5b61065d83610625565b946020939093013593505050565b60008060006060848603121561068057600080fd5b61068984610625565b925061069760208501610625565b9150604084013590509250925092565b6000602082840312156106b957600080fd5b6106c282610625565b9392505050565b600080604083850312156106dc57600080fd5b6106e583610625565b91506106f360208401610625565b90509250929050565b600181811c9082168061071057607f821691505b60208210810361073057634e487b7160e01b600052602260045260246000fd5b50919050565b8082018082111561025057634e487b7160e01b600052601160045260246000fdfea2646970667358221220942f7eb37553c39e76a848d94c123384213433453d169fdc4b8430f64bcd862f64736f6c63430008180033",
  "deployedBytecode": "0x608060405234801561001057600080fd5b506004361061009e5760003560e01c806340c10f191161006657806340c10f191461011857806370a082311461012d57806395d89b4114610156578063a9059cbb1461015e578063dd62ed3e1461017157600080fd5b806306fdde03146100a3578063095ea7b3146100c157806318160ddd146100e457806323b872dd146100f6578063313ce56714610109575b600080fd5b6100ab6101aa565b6040516100b891906105d6565b60405180910390f35b6100d46100cf366004610641565b61023c565b60405190151581526020016100b8565b6002545b6040519081526020016100b8565b6100d461010436600461066b565b610256565b604051601281526020016100b8565b61012b610126366004610641565b61027a565b005b6100e861013b3660046106a7565b6001600160a01b031660009081526020819052604090205490565b6100ab610288565b6100d461016c366004610641565b610297565b6100e861017f3660046106c9565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6060600380546101b9906106fc565b80601f01602080910402602001604051908101604052809291908181526020018280546101e5906106fc565b80156102325780601f1061020757610100808354040283529160200191610232565b820191906000526020600020905b81548152906001019060200180831161021557829003601f168201915b5050505050905090565b60003361024a8185856102ad565b60019150505b92915050565b6000336102648582856102bf565b61026f858585610342565b506001949350505050565b61028482826103a1565b5050565b6060600480546101b9906106fc565b60006102a4338484610342565b50600192915050565b6102ba83838360016103d7565b505050565b6001600160a01b03838116600090815260016020908152604080832093861683529290522054600019811461033c578181101561032d57604051637dc7a0d960e11b81526001600160a01b038416600482015260248101829052604481018390526064015b60405180910390fd5b61033c848484840360006103d7565b50505050565b6001600160a01b03831661036c57604051634b637e8f60e11b815260006004820152602401610324565b6001600160a01b0382166103965760405163ec442f0560e01b815260006004820152602401610324565b6102ba8383836104ac565b6001600160a01b0382166103cb5760405163ec442f0560e01b815260006004820152602401610324565b610284600083836104ac565b6001600160a01b0384166104015760405163e602df0560e01b815260006004820152602401610324565b6001600160a01b03831661042b57604051634a1406b160e11b815260006004820152602401610324565b6001600160a01b038085166000908152600160209081526040808320938716835292905220829055801561033c57826001600160a01b0316846001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258460405161049e91815260200190565b60405180910390a350505050565b6001600160a01b0383166104d75780600260008282546104cc9190610736565b909155506105499050565b6001600160a01b0383166000908152602081905260409020548181101561052a5760405163391434e360e21b81526001600160a01b03851660048201526024810182905260448101839052606401610324565b6001600160a01b03841660009081526020819052604090209082900390555b6001600160a01b03821661056557600280548290039055610584565b6001600160a01b03821660009081526020819052604090208054820190555b816001600160a01b0316836001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516105c991815260200190565b60405180910390a3505050565b60006020808352835180602085015260005b81811015610604578581018301518582016040015282016105e8565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b038116811461063c57600080fd5b919050565b6000806040838503121561065457600080fd5b61065d83610625565b946020939093013593505050565b60008060006060848603121561068057600080fd5b61068984610625565b925061069760208501610625565b9150604084013590509250925092565b6000602082840312156106b957600080fd5b6106c282610625565b9392505050565b600080604083850312156106dc57600080fd5b6106e583610625565b91506106f360208401610625565b90509250929050565b600181811c9082168061071057607f821691505b60208210810361073057634e487b7160e01b600052602260045260246000fd5b50919050565b8082018082111561025057634e487b7160e01b600052601160045260246000fdfea2646970667358221220942f7eb37553c39e76a848d94c123384213433453d169fdc4b8430f64bcd862f64736f6c63430008180033",
  "linkReferences": {},
  "deployedLinkReferences": {}
}
