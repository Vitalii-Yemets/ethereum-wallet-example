import React, { Component } from 'react';

import { combineLatest, of } from 'rxjs';

import { tap, switchMap, map, withLatestFrom } from 'rxjs/operators';

import { connect } from 'react-redux';

import {
	setSmartContractName,
	setFrom,
	setTo,
	setAmount,
	setGasPrice,
	setGasLimit,
	setTransactionResult,
	openTransactionResultDialog,
	selectCoin
} from '../../redux/actions';

import {
	getGasPrice,
	getTransactionCount,
	getGasLimit,
	sendRawTransaction,
	getTransactionByHash
} from './scripts';

import { loadNetwork, sendToken } from './web3-scripts';
import Coins from '../../constants/coins'

import EthereumTx from 'ethereumjs-tx';
import * as Keythereum from "keythereum";

import { Input, Button } from 'mdbreact';
import { Key, Password } from '../../contracts/key-eth';

import TransactionResult from '../../components/TransactionResult';
import CoinSelector from '../../components/CoinSelector';

import './TokenSender.css';

class TokenSender extends Component {
	componentWillMount = () => {
		this.initial();
	}

	initial = () => {
		const { onGasPriceChange, onGasLimitChange } = this.props;

		combineLatest(getGasPrice(), getGasLimit(), (gasPrice, gasLimit) => ({ gasPrice, gasLimit })
		).pipe(
			tap(onGasPriceChange),
			tap(onGasLimitChange)
		).subscribe();
	}

	
	onSend = () => {
		const {
			gasPrice,
			gasLimit,
			to,
			from,
			amount,
			onSetTransactionResult,
			openTransactionResultDialog,
			networkName,
			selectedCoinName
		} = this.props;

		loadNetwork(networkName);

		const contractAddress = Coins[selectedCoinName].contractAddress;
		sendToken({ from, to, amountToken: 10, contractAddress, gasPrice })

	}

	// onSend = () => {
	// 	const {
	// 		gasPrice,
	// 		gasLimit,
	// 		to,
	// 		from,
	// 		amount,
	// 		onSetTransactionResult,
	// 		openTransactionResultDialog
	// 	} = this.props;

	// const txparams$ = of({
	// 	gasPrice,
	// 	gasLimit,
	// 	to,
	// 	from,
	// 	value: '0x' + (amount * 1e18).toString(16),
	// 	data: ''
	// });
	// const transactionCount$ = getTransactionCount(from);

	// transactionCount$.pipe(
	// 	withLatestFrom(txparams$),
	// 	map(([nonce, initializeTransaction]) => ({ ...initializeTransaction, nonce })),
	// 	map(txParams => {
	// 		const privateKey = Keythereum.recover(Password, Key);
	// 		const tx = new EthereumTx(txParams);
	// 		tx.sign(privateKey);
	// 		const rawTransaction = '0x' + tx.serialize().toString('hex');
	// 		return rawTransaction;
	// 	}),
	// 	switchMap(sendRawTransaction),
	// 	switchMap(getTransactionByHash),
	// 	tap(onSetTransactionResult)
	// ).subscribe(() => openTransactionResultDialog(true));
	//	}

	render = () => {
		const {
			from,
			to,
			amount,
			gasPrice,
			gasLimit,

			onFromChange,
			onToChange,
			onAmountChange,
			onGasPriceChange,
			onGasLimitChange,

			openTransactionResultDialog,
			transactionResult,
			IsOpenTransactionResultDialog,

			availableCoins,
			onCoinSelected,
			selectedCoinName
		} = this.props;

		const transactionResultProps = {
			IsOpenTransactionResultDialog,
			transactionResult,
			openTransactionResultDialog
		};

		const coinSelectorProps = {
			availableCoins,
			onCoinSelected,
			coin: selectedCoinName
		};

		return (
			<div className='TokenSender'>
				<TransactionResult {...transactionResultProps} />
				<CoinSelector {...coinSelectorProps} />
				<Input label="From" value={from} onChange={onFromChange} size="sm" />
				<Input label="To" value={to} onChange={onToChange} size="sm" />
				<Input label="Amount" value={amount} onChange={onAmountChange} size="sm" />
				<Input label="Gas price" value={toDec(gasPrice)} onChange={onGasPriceChange} size="sm" />
				<Input label="Gas limit" value={toDec(gasLimit)} onChange={onGasLimitChange} size="sm" />
				<Button onClick={this.onSend} color="blue-grey" size='large'>
					Send
				</Button>
			</div>
		);
	}
}

const toDec = item => Number(item).toString(10);
const toHex = item => Number(item).toString(16);

const mapStateToProps = state => ({
	availableSmartContracts: state.tokenSenderState.availableSmartContracts,
	smartContract: state.tokenSenderState.smartContract,
	nonce: state.tokenSenderState.nonce,
	from: state.tokenSenderState.from,
	to: state.tokenSenderState.to,
	amount: state.tokenSenderState.amount,
	gasPrice: state.tokenSenderState.gasPrice,
	gasLimit: state.tokenSenderState.gasLimit,
	IsOpenTransactionResultDialog: state.tokenSenderState.IsOpenTransactionResultDialog,
	transactionResult: state.tokenSenderState.transactionResult,
	availableCoins: state.tokenSenderState.availableCoins,
	selectedCoinName: state.tokenSenderState.selectedCoinName,
	networkName: state.headerState.networkName
});

const mapDispatchToProps = dispatch => ({
	onSelectSmartContract: smartContractName => dispatch(setSmartContractName(smartContractName)),
	onFromChange: evt => {
		if (evt !== undefined && evt.preventDefault) evt.preventDefault();
		dispatch(setFrom(evt.currentTarget.value));
	},
	onToChange: evt => {
		if (evt !== undefined && evt.preventDefault) evt.preventDefault();
		dispatch(setTo(evt.currentTarget.value));
	},
	onAmountChange: evt => {
		if (evt !== undefined && evt.preventDefault) evt.preventDefault();
		dispatch(setAmount(evt.currentTarget.value));
	},
	onGasPriceChange: evt => {
		if (evt !== undefined && evt.preventDefault) evt.preventDefault();
		if (evt !== undefined && evt.currentTarget) dispatch(setGasPrice(evt.currentTarget.value));
		else if (evt !== undefined && evt.gasPrice) dispatch(setGasPrice(evt.gasPrice))
		else dispatch(setGasPrice(evt))
	},
	onGasLimitChange: evt => {
		if (evt !== undefined && evt.preventDefault) evt.preventDefault();
		if (evt !== undefined && evt.currentTarget) dispatch(setGasLimit(evt.currentTarget.value));
		else if (evt !== undefined && evt.gasLimit) dispatch(setGasLimit(evt.gasLimit));
	},
	onSetTransactionResult: evt => {
		if (evt !== undefined) {
			dispatch(setTransactionResult(evt));
		}
	},
	openTransactionResultDialog: evt => {
		dispatch(openTransactionResultDialog(evt))
	},
	onCoinSelected: evt => {
		dispatch(selectCoin(evt));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(TokenSender);