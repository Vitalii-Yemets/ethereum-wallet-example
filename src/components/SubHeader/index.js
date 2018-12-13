import React from 'react';

import { Button } from 'mdbreact';

import './SubHeader.css';

const SubHeader = ({ onGenerateWallet, onShowRestoreWallet }) => {
	return (
		<div className='SubHeader'>
			<Button color="blue-grey" size="large" onClick={onGenerateWallet}>
				New wallet
	    	</Button>
			<Button color="mdb" size="large" onClick={onShowRestoreWallet}>
				Restore wallet
    		</Button>
		</div>
	);
}

export default SubHeader;