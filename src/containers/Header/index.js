import React from 'react';

import { connect } from 'react-redux';
import { setNetworkName } from '../../redux/actions';

import { Navbar, /*NavItem,*/ NavbarBrand, /*NavbarNav*/ } from 'mdbreact';

// import NetworkMenu from '../../components/NetworkMenu';

import './Header.css';

const Header = (/*{ availableNetworks, networkName, onSelectNetwork }*/) => {
	// const networkMenuProps = { availableNetworks, networkName, onSelectNetwork };
	return (
		<Navbar className='Header' color="blue-grey lighten-4" light>
			<NavbarBrand tag="span">
				Test wallet
    		</NavbarBrand>
			{/* <NavbarNav right>
				<NavItem>
					<NetworkMenu {...networkMenuProps} />
				</NavItem>
			</NavbarNav> */}
		</Navbar>
	);
};

const mapStateToProps = state => ({
	availableNetworks: state.headerState.availableNetworks,
	networkName: state.headerState.networkName
});

const mapDispatchToProps = dispatch => ({
	onSelectNetwork: networkName => dispatch(setNetworkName(networkName))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
