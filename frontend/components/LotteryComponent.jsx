import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import LotteryAbi from '../contractsdata/Lottery.json';

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const CLOSING_TIME_INTERVAL = 86400; // 24 hours

function createWeb3Provider() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  provider.getNetwork().then((network) => {
    console.log('network:', network);
  });
  return provider;
}

export default function LotteryC() {
  const [contract, setContract] = useState(null);
  const [ethAmount, setEthAmount] = useState('');
  const [tokenAmount, setTokenAmount] = useState('');
  const [betAmount, setBetAmount] = useState(1);
  const [betsOpen, setBetsOpen] = useState(false);

  useEffect(() => {
    const connectToContract = async () => {
      const provider = createWeb3Provider();
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        LotteryAbi.abi,
        signer
      );
      setContract(contract);

      // const isOpen = await contract.betsOpen();
      setBetsOpen(false);
    };

    connectToContract();
  }, []);

  const handlePurchaseTokens = async () => {
    try {
      const transaction = await contract.purchaseTokens({
        value: ethers.utils.parseEther(ethAmount),
      });

      await transaction.wait();
      console.log('Tokens purchased successfully.');
    } catch (error) {
      console.error('Error purchasing tokens:', error);
    }
  };

  const handlePlaceBet = async () => {
    try {
      let transaction;
      if (betAmount > 1)
        transaction = await contract.betMany(betAmount);
      else
        transaction = await contract.bet();

      await transaction.wait();
      console.log('Bet placed successfully.');
    } catch (error) {
      console.error('Error placing bet:', error);
    }
  };

  const handleCloseLottery = async () => {
    try {
      // const transaction = await contract.closeLottery();
      // await transaction.wait();
      setBetsOpen(false);
      console.log('Lottery closed successfully.');
    } catch (error) {
      console.error('Error closing lottery:', error);
    }
  };

  const handleWithdrawPrize = async () => {
    try {
      const transaction = await contract.prizeWithdraw(
        ethers.utils.parseEther(tokenAmount)
      );

      await transaction.wait();
      console.log('Prize withdrawn successfully.');
    } catch (error) {
      console.error('Error withdrawing prize:', error);
    }
  };

  const handleWithdrawOwnerFees = async () => {
    try {
      const transaction = await contract.ownerWithdraw(
        ethers.utils.parseEther(tokenAmount)
      );

      await transaction.wait();
      console.log('Owner fees withdrawn successfully.');
    } catch (error) {
      console.error('Error withdrawing owner fees:', error);
    }
  };

  const handleOpenBets = async () => {
    try {
      // const closingTime = Math.floor(Date.now() / 1000) + CLOSING_TIME_INTERVAL;
      // const transaction = await contract.openBets(closingTime);
      // await transaction.wait();
      setBetsOpen(true);
      console.log('Bets opened successfully.');
    } catch (error) {
      console.error('Error opening bets:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        {betsOpen ? (
          <div className="mb-4">
            <button
              onClick={handleCloseLottery}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close Lottery
            </button>

            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Place Bet</h2>
              <div className="flex items-center mb-2">
                <label className="mr-2">Number of Bets:</label>
                <input
                  type="number"
                  value={betAmount}
                  onChange={(e) => setBetAmount(Number(e.target.value))}
                  className="border rounded px-2 py-1 text-right w-16"
                />
              </div>
              <button
                onClick={handlePlaceBet}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Place Bet
              </button>
            </div>
          </div>
        ) : (
          <div className="mb-4">
            <button
              onClick={handleOpenBets}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Open Bets
            </button>
          </div>
        )}
        <h2 className="text-xl font-semibold mb-2">Purchase Tokens</h2>
        <div className="flex items-center mb-2">
          <label className="mr-4">ETH Amount:</label>
          <input
            type="number"
            value={ethAmount}
            onChange={(e) => setEthAmount(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <button
          onClick={handlePurchaseTokens}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Purchase Tokens
        </button>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Withdraw Prize/Owner Fees</h2>
        <div className="flex items-center mb-2">
          <label className="mr-2">Token Amount:</label>
          <input
            type="number"
            value={tokenAmount}
            onChange={(e) => setTokenAmount(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <div className="flex well-lg">
          <button
            onClick={handleWithdrawPrize}
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          >
            Withdraw Prize
          </button>
          <button
            onClick={handleWithdrawOwnerFees}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Withdraw Owner Fees
          </button>
        </div>
      </div>
    </div>
  );
}
