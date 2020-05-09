import enLocale from 'element-ui/lib/locale/lang/en'
export default {
	...enLocale,
	error: {
	},
	warn: {
		w_1: 'Please select account',
		w_2: 'Data is empty!'
	},
	success: {
		s_1: 'Connection succeeded',
		s_2: 'Delete successfully!',
		s_3: 'Copy succeeded',
		s_4: 'Sending succeeded',
		s_5: 'Created successfully!'
	},
	btn: {
		confirm: 'Confirm',
		cancel: 'Cancel',
		apply: 'Apply',
		unlock: 'Unlock',
		copy: 'Copy',
		send: 'Send',
		newAdd: 'New address',
		createWt: 'Create Wallet',
		importWt: 'Import Wallet',
		edit: 'Edit',
		del: 'Delete',
		ledger: 'Connect to Ledger',
		trezor: 'Connect to TREZOR',
		GenerateSAN: 'Generate SAN'
	},
	loading: {
		l_1: 'Loading……'
	},
	nav: {
		createWt: 'Create Wallet',
		importWt: 'Import Wallet',
		assets: 'Assets',
	},
	title: {
		SELECT_WALLET_FILE: "Select Your Wallet File",
		PASTE_PRIVATE_KEY: "Paste Your Private Key",
	},
	label: {
		null: 'Null',
		coin: 'Coin',
		balance: 'Balance',
		action: 'Actions',
		address: 'Address',
		value: 'Value',
		timelock: 'Timelock',
		advance: 'Advance',
		startTime: 'Start Time',
		endTime: 'End Time',
		selectTime: 'Select Time',
		months: 'Months',
		forever: 'Forever',
	},
	state: {
	},
	action: {
	},
	tip: {
		net: 'U2F not supported in this browser. Please try using Google Chrome with a secure (SSL / HTTPS) connection!',
		selectAddr: 'Please select the address you would like to interact with.',
		addNode: 'IT LOOKS LIKE YOU DON’T HAVE A SHORT ACCOUNT NUMBER (SAN) YET. FUSION’S SAN IS AN 8 CHARACTER VERSION OF YOUR WALLET ADDRESS THAT’S AS EASY TO REMEMBER AS YOUR PHONE NUMBER. CLICK THE BUTTON BELOW TO GENERATE ONE.'
	}
}
