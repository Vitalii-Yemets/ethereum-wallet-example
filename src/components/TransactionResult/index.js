import React from 'react';
import { Container, Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';

import './TransactionResult.css';

const TransactionResult = ({
	IsOpenTransactionResultDialog,
	transactionResult,
	openTransactionResultDialog
}) => {
	const transactionProperties = Object.keys(transactionResult)
		.map((propertyName, key) => (
			<li key={key}>
				<span>
					<strong>{`${propertyName}: `}</strong>
					{`${transactionResult[propertyName]}`}
				</span>
			</li>
		));
	return (
		<Container>
			<Modal isOpen={IsOpenTransactionResultDialog} className='TransactionResult' size="lg">
				<ModalHeader>Transaction result</ModalHeader>
				<ModalBody className='TransactionResult--body'>
					<ul>
						{transactionProperties}
					</ul>
				</ModalBody>
				<ModalFooter>
					<Button color="blue-grey" size='large' onClick={() => openTransactionResultDialog(false)}>
						Close
					</Button>
				</ModalFooter>
			</Modal>
		</Container>
	);
}

export default TransactionResult;