const { Alchemy, Network, Wallet, Utils } = require('alchemy-sdk');
require('dotenv').config();

const settings = {
    apiKey: process.env.TEST_API_KEY,
    network: Network.ETH_GOERLI
};

const alchemy = new Alchemy(settings);
let wallet = new Wallet(process.env.TEST_PRIVATE_KEY);

async function main() {
    const nonce = await alchemy.core.getTransactionCount(wallet.address, 'latest');

    let transaction = {
        to: "0x51b74e2525314b27227e023731525c7b35304bfc",
        value: Utils.parseEther('0.001'),
        gasLimit: '21000',
        maxPriorityFeePerGas: Utils.parseUnits('5', 'gwei'),
        maxFeePerGas: Utils.parseUnits('20', 'gwei'),
        nonce: nonce,
        type: 2,
        chainId: 5
    };

    let rawTransaction = await wallet.signTransaction(transaction);
    console.log("Raw TX : ", rawTransaction);
    let tx = await alchemy.core.sendTransaction(rawTransaction);
    console.log(`https://goerli.etherscan.io/tx/${tx.hash}`);
}

main();

