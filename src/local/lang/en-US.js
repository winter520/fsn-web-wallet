import enLocale from 'element-ui/lib/locale/lang/en'
export default {
	...enLocale,
	error: {
	},
	warn: {
		w_1: 'Incorrect address',
		w_2: 'Address cannot be empty',
		w_3: 'Value cannot be empty',
		w_4: 'Please select a time!',
		w_5: 'Please select a month!',
		w_6: 'Please select a start time',
		w_7: 'Login timeout, please login again!',
		w_8: 'Your password must be at least 9 characters. Please make sure it is a strong password.',
		w_9: "* Do NOT forget to save this!",
		w_10: "Do you request?"
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
		SELECT_WALLET_FILE: "Select Wallet File...",
		GenerateSAN: 'Generate SAN',
		NEXT_STEP: "Next step",
		DOWNLOAD_KEYSTORE: "Download Keystore File (UTC / JSON)",
		DOWNLOAD_KEYSTORE1: "Keystore File (UTC / JSON · Recommended · Encrypted)",
		UNDERSTAND_CONTINUE: "I understand. Continue.",
		viewQRcode: 'Address QR code',
		exit: 'Close Wallet'
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
		CREATE_NEW_WALLET: "Create New Wallet",
		SAVE_LEYSTORE_FILE: "Save your <span>Keystore</span> File.",
		custom: 'Custom Network'
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
		password: 'Password',
		privateKey: 'Private Key',
		custom: 'Custom'
	},
	state: {
	},
	action: {
	},
	CREATE_TIP: {
		CREATE_TIP_0: "This password encrypts your private key. This does not act as a seed to generate your keys.",
		CREATE_TIP_1: "You will need this password + your private key to unlock your wallet.",
		CREATE_TIP_2: "Fusion Wallet does not hold your keys for you. We cannot access accounts, recover keys, ",
		CREATE_TIP_3: "reset passwords, nor reverse transactions. Protect your keys & always check that you are on correct URL. You are responsible for your security."
	},
	SAVE_KEYSTORE_TIP: {
		SAVE_KEYSTORE_TIP_0: "**Do not lose it!** It cannot be recovered if you lose it.<br/>**Do not share it!** Your funds will be stolen if you use this file on a malicious/phishing site.<br/>**Make a backup!** Secure it like the millions of dollars it may one day be worth.",
		SAVE_KEYSTORE_TIP_1: "Fusion Wallet does not hold your keys for you. We cannot access accounts, recover keys,<br>reset passwords, nor reverse transactions. Protect your keys & always check that you are on correct URL. You are responsible for your security."
	},
	tip: {
		net: 'U2F not supported in this browser. Please try using Google Chrome with a secure (SSL / HTTPS) connection!',
		selectAddr: 'Please select the address you would like to interact with.',
		addNode: 'IT LOOKS LIKE YOU DON’T HAVE A SHORT ACCOUNT NUMBER (SAN) YET. FUSION’S SAN IS AN 8 CHARACTER VERSION OF YOUR WALLET ADDRESS THAT’S AS EASY TO REMEMBER AS YOUR PHONE NUMBER. CLICK THE BUTTON BELOW TO GENERATE ONE.'
	}
}
