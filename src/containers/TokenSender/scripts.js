import EthereumTx from 'ethereumjs-tx';

import { from, of } from 'rxjs';

const getGasLimit = () => of(`0x${(Number(21000).toString(16))}`);

const signTransaction = async (from, to, amount, privateKey) => {
	const txParams = {
		nonce: await getTransactionCount(from),
		gasPrice: await getGasPrice(),
		gasLimit: '0x' + (Number(21000).toString(16)),
		to: to,
		value: '0x' + (amount * 1e18).toString(16),
		data: '',
		chainId: 3
	};
	const tx = new EthereumTx(txParams);
	tx.sign(privateKey);
	return '0x' + tx.serialize().toString('hex');
}

const getTransactionCount = address => {
	const header = new Headers({
		'Access-Control-Allow-Origin': '*'
		, 'Content-Type': 'application/json'
	});
	const options = { method: 'GET', header };

	return from(fetch(`http://193.200.173.204/api/v4.2/ETH/getTransactionCount/${address}`, options)
		.then(response => response.json())
		.then(data => {
			return '0x' + Number(data.TransactionCount).toString(16);
		}));
}

const getGasPrice = () => {
	const header = new Headers({
		'Access-Control-Allow-Origin': '*'
		, 'Content-Type': 'application/json'
	});
	const options = { method: 'GET', header };

	return from(fetch('http://193.200.173.204/api/v4.2/ETH/getGasPrice/', options)
		.then(resp => resp.json())
		.then(data => data.gasPriceHex));
}

const sendRawTransaction = raw => {
	const header = new Headers({
		'Access-Control-Allow-Origin': '*'
		, 'Content-Type': 'application/json'
	});
	const options = { method: 'GET', header };

	return from(fetch(`http://193.200.173.204/api/v4.2/ETH/sendRawTransaction/${raw}`, options)
		.then(response => response.json())
		.then(data => data.hash));
}

const getTransactionByHash = hashTransaction => {
	const header = new Headers({
		'Access-Control-Allow-Origin': '*'
		, 'Content-Type': 'application/json'
	});
	const options = { method: 'GET', header };

	return fetch(`http://193.200.173.204/api/v4.2/ETH/getTransactionByHash/${hashTransaction}`, options)
		.then(response => response.json())
}

export {
	getGasPrice,
	getTransactionCount,
	getGasLimit,
	sendRawTransaction,
	getTransactionByHash,
	signTransaction
}