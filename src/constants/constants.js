export const generatedPasswordLength = 12;

// time in ms for check balancess polling
export const timeBetweenCheckbalances = 180 * 1000;

/* Max gas for send transaction (not gas price) */
export const maxGasForEthSend = 25000;

/* Max gas for token send transaction (not gas price) */
export const maxGasForTokenSend = 60000;

export const Ether = (1.0e18).toString();
export const Gwei = (1.0e9).toString();

/* offline mode is special case of error */
export const offlineModeString = 'Offline';

/* Default network to connect after wallet creation (see network.js) */
export const defaultNetwork = 'Ropsten Testnet';

export const localStorageKey = 'ks';