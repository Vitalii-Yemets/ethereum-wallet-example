import { from } from 'rxjs'
import { map } from 'rxjs/operators'
import Web3 from 'web3'
import { erc20Abi } from '../../contracts/abi'
import Network from '../../constants/networks'
import EthereumTx from 'ethereumjs-tx'
import * as Keythereum from "keythereum";
import { Key, Password } from '../../contracts/key-eth'
import { BigNumber } from 'bignumber.js'

const web3 = new Web3()
const decimals = 18

const loadNetwork = networkName => {
	web3.setProvider(Network[networkName].rpc)
}

const generateString = length => {
	const MAXLEN = length;
	const MINLEN = length;

	const genString = () => {
		let array = new Uint8Array(MAXLEN);
		window.crypto.getRandomValues(array);
		array = Array.apply([], array);
		array = array.filter((x) => (x > 32 && x < 127));
		return String.fromCharCode.apply(String, array);
	}

	let tmp = genString();
	while (tmp.length < MINLEN) {
		tmp += genString();
	}

	return tmp.substr(0, length);
}

const sendToken = async ({ from, to, amountToken, contractAddress, gasPrice }) => {
	debugger;

	const count = await web3.eth.getTransactionCount(from)
	const contract = new web3.eth.Contract(erc20Abi, contractAddress)
	const balance = await contract.methods.balanceOf(from).call()
	debugger
	const testAmount = (amountToken * 1e18).toString()
	const data = contract.methods.transfer(to, testAmount).encodeABI()
	debugger
	const txParams = {
		from,
		to: contractAddress,
		nonce: "0x" + count.toString(16),
		gasPrice,
		gas: 60000,
		value: "0x0",
		data,
		chainId: 0x03
	}

	const privateKey = Keythereum.recover(Password, Key)

	const tx = new EthereumTx(txParams)
	
	tx.sign(privateKey)
	const rawTransaction = '0x' + tx.serialize().toString('hex')

	web3.eth.accounts.signTransaction(txParams, privateKey).then(
		tt => {
			debugger
		}
	)
	var receipt = await web3.eth.sendSignedTransaction(rawTransaction)
	debugger
	return receipt
}

export { loadNetwork, sendToken }

// // Get private stuff from my .env file
// import {my_privkey, infura_api_key} from '../.env'

// // Need access to my path and file system
// import path from 'path'
// var fs = require('fs');

// // Ethereum javascript libraries needed
// import Web3 from 'Web3'
// var Tx = require('ethereumjs-tx');

// // Rather than using a local copy of geth, interact with the ethereum blockchain via infura.io
// const web3 = new Web3(Web3.givenProvider || `https://mainnet.infura.io/` + infura_api_key)

// // Create an async function so I can use the "await" keyword to wait for things to finish
// const main = async () => {
//   // This code was written and tested using web3 version 1.0.0-beta.26
//   console.log(`web3 version: ${web3.version}`)

//   // Who holds the token now?
//   var myAddress = "0x97...";

//   // Who are we trying to send this token to?
//   var destAddress = "0x4f...";

//   // If your token is divisible to 8 decimal places, 42 = 0.00000042 of your token
//   var transferAmount = 1;

//   // Determine the nonce
//   var count = await web3.eth.getTransactionCount(myAddress);
//   console.log(`num transactions so far: ${count}`);

//   // This file is just JSON stolen from the contract page on etherscan.io under "Contract ABI"
//   var abiArray = JSON.parse(fs.readFileSync(path.resolve(__dirname, './tt3.json'), 'utf-8'));

//   // This is the address of the contract which created the ERC20 token
//   var contractAddress = "0xe6...";
//   var contract = new web3.eth.Contract(abiArray, contractAddress, { from: myAddress });

//   // How many tokens do I have before sending?
//   var balance = await contract.methods.balanceOf(myAddress).call();
//   console.log(`Balance before send: ${balance}`);

//   // I chose gas price and gas limit based on what ethereum wallet was recommending for a similar transaction. You may need to change the gas price!
//   var rawTransaction = {
//       "from": myAddress,
//       "nonce": "0x" + count.toString(16),
//       "gasPrice": "0x003B9ACA00",
//       "gasLimit": "0x250CA",
//       "to": contractAddress,
//       "value": "0x0",
//       "data": contract.methods.transfer(destAddress, transferAmount).encodeABI(),
//       "chainId": 0x01
//   };

//   // Example private key (do not use): 'e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109'
//   // The private key must be for myAddress
//   var privKey = new Buffer(my_privkey, 'hex');
//   var tx = new Tx(rawTransaction);
//   tx.sign(privKey);
//   var serializedTx = tx.serialize();

//   // Comment out these three lines if you don't really want to send the TX right now
//   console.log(`Attempting to send signed tx:  ${serializedTx.toString('hex')}`);
//   var receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
//   console.log(`Receipt info:  ${JSON.stringify(receipt, null, '\t')}`);
