const Network = {
	Offline: { rpc: 'offline', tx_explorer: null },
	'Ropsten Testnet': {
		rpc: 'https://ropsten.infura.io/v3/b2fe6cbf64f14f1b988b8e4d5c50cd56',
		tx_explorer: 'https://ropsten.etherscan.io/tx/'
	},
	'Main Net': {
		rpc: 'https://mainnet.infura.io/v3/b2fe6cbf64f14f1b988b8e4d5c50cd56',
		tx_explorer: 'https://etherscan.io/tx/'
	},
};

export default Network;