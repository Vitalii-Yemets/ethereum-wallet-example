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


const headerReducer = (state = null, action) => {
	switch (action.type) {
		case SET_NETWORK_NAME:
			const networkName = action.payload;
			return { ...state, networkName };

		default:
			return state;
	}
}

const tokenSenderReducer = (state = null, action) => {
	switch (action.type) {
		case SET_SMART_CONTRACT_NAME:
			const smartContract = action.payload;
			return { ...state, smartContract };

		case SET_NONCE:
			const nonce = action.payload;
			return { ...state, nonce };

		case SET_FROM:
			const from = action.payload;
			return { ...state, from };

		case SET_TO:
			const to = action.payload;
			return { ...state, to };

		case SET_AMOUNT:
			const amount = action.payload;
			return { ...state, amount };

		case SET_GAS_PRICE:
			const gasPrice = action.payload;
			return { ...state, gasPrice };

		case SET_GAS_LIMIT:
			const gasLimit = action.payload;
			return { ...state, gasLimit };

		case SET_TRANSACTION_RESULT:
			const transactionResult = action.payload;
			return { ...state, transactionResult };

		case OPEN_TRANSACTION_RESULT_DIALOG:
			const IsOpenTransactionResultDialog = action.payload;
			return { ...state, IsOpenTransactionResultDialog };

		case SELECT_COIN:
			const selectedCoinName = action.payload;
			return { ...state, selectedCoinName };

		default:
			return state;
	}
}

export {
	headerReducer,
	tokenSenderReducer
}