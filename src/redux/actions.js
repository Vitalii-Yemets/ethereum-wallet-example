import {
	SET_NETWORK_NAME,
	SET_SMART_CONTRACT_NAME,
	SET_NONCE,
	SET_FROM,
	SET_TO,
	SET_AMOUNT,
	SET_GAS_PRICE,
	SET_GAS_LIMIT,
	SET_TRANSACTION_RESULT,
	OPEN_TRANSACTION_RESULT_DIALOG,
	SELECT_COIN
} from './constants';

const setNetworkName = networkName => ({
	type: SET_NETWORK_NAME,
	payload: networkName
});

const setSmartContractName = smartContractName => ({
	type: SET_SMART_CONTRACT_NAME,
	payload: smartContractName
});

const setNonce = nonce => ({
	type: SET_NONCE,
	payload: nonce
});

const setFrom = from => ({
	type: SET_FROM,
	payload: from
});

const setTo = to => ({
	type: SET_TO,
	payload: to
});

const setAmount = amount => ({
	type: SET_AMOUNT,
	payload: amount
});

const setGasPrice = gasPrice => ({
	type: SET_GAS_PRICE,
	payload: gasPrice
});

const setGasLimit = gasLimit => ({
	type: SET_GAS_LIMIT,
	payload: gasLimit
});

const setTransactionResult = transactionResult => ({
	type: SET_TRANSACTION_RESULT,
	payload: transactionResult
});

const openTransactionResultDialog = isOpen => ({
	type: OPEN_TRANSACTION_RESULT_DIALOG,
	payload: isOpen
});

const selectCoin = coinName => ({
	type: SELECT_COIN,
	payload: coinName
})

export {
	setNetworkName,
	setSmartContractName,
	setNonce,
	setFrom,
	setTo,
	setAmount,
	setGasPrice,
	setGasLimit,
	setTransactionResult,
	openTransactionResultDialog,
	selectCoin
};