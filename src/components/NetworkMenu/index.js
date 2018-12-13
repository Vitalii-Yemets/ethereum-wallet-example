import React from 'react';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';

import './NetworkMenu.css';

const NetworkMenu = ({ availableNetworks, networkName, onSelectNetwork }) => {
	const networks = availableNetworks.map((networkName, key) => <DropdownItem onClick={event => onSelectNetwork(event.currentTarget.textContent)} key={key}>{networkName}</DropdownItem>)
	return (
		<Dropdown>
			<DropdownToggle caret color="blue-grey lighten-4">
				{networkName}
			</DropdownToggle>
			<DropdownMenu >
				{networks}
			</DropdownMenu>
		</Dropdown>
	);
};

export default NetworkMenu;
