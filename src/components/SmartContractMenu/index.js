import React from 'react';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';

import './SmartContractMenu.css';

const SmartContractMenu = ({ availableSmartContracts, smartContract, onSelectSmartContract }) => {
	const smartContracts = availableSmartContracts.map((smartContractName, key) => <DropdownItem onClick={event => onSelectSmartContract(event.currentTarget.textContent)} key={key}>{smartContractName}</DropdownItem>)
	return (
		<Dropdown size='medium'>
			<DropdownToggle caret color="blue-grey lighten-4">
				{smartContract}
			</DropdownToggle>
			<DropdownMenu >
				{smartContracts}
			</DropdownMenu>
		</Dropdown>
	);
};

export default SmartContractMenu;
