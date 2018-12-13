import React from 'react';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';

import './CoinSelector.css';

const CoinSelector = ({ availableCoins, coin, onCoinSelected }) => {
	const coins = availableCoins.map((coinName, key) => <DropdownItem onClick={event => onCoinSelected(event.currentTarget.textContent)} key={key}>{coinName}</DropdownItem>)
	return (
		<Dropdown size='medium'>
			<DropdownToggle caret color="blue-grey lighten-4">
				<span style={{ textTransform: 'uppercase' }}>{coin}</span>
			</DropdownToggle>
			<DropdownMenu >
				{coins}
			</DropdownMenu>
		</Dropdown>
	);
};

export default CoinSelector;
