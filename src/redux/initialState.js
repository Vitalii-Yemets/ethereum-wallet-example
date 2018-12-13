import Network from '../constants/networks';
// import SmartContracts from '../constants/smart-contracts';
import Coins from '../constants/coins';

const initialHeaderState = {
	networkName: 'Ropsten Testnet',
	network: Network['Ropsten Testnet'],
	availableNetworks: Object.keys(Network),
}

const initialTokenSenderState = {
	// smartContract: 'ZRX',
	// smartContractAddress: SmartContracts.ZRX,
	// availableSmartContracts: Object.keys(SmartContracts),

	selectedCoinName: 'zrx',
	availableCoins: Object.keys(Coins),


	nonce: '',
	from: '0xb4016d8ca33ab5970b1acdc3fb9a63a123a30638',
	to: '',
	amount: '',
	gasPrice: '',
	gasLimit: '',
	
	IsOpenTransactionResultDialog: false,
	transactionResult: {}
}

const initialAppState = {
	headerState: initialHeaderState,
	tokenSenderState: initialTokenSenderState
}

export { initialAppState };