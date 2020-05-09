import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
export default {
	...zhLocale,
	error: {
		e_1: ''
	},
	warn: {
		w_1: '地址不正确',
		w_2: '地址不能为空',
		w_3: '数量不能为空',
		w_4: '请选择时间！',
		w_5: '请选择月份！',
		w_6: '请选择开始时间',
		w_7: '登陆超时请重新登陆！',
		w_8: '您的密码必须至少9个字符。请确保它是一个强密码。',
		w_9: "* 不要忘记保存这个！",
		w_10: "你要申请DCRM地址吗"
	},
	success: {
		s_1: '连接成功！',
		s_2: '删除成功！',
		s_3: '复制成功！',
		s_4: '发送成功！',
		s_5: '创建成功！'
	},
	btn: {
		confirm: '确认',
		cancel: '取消',
		apply: '应用',
		unlock: '解锁',
		copy: '复制',
		send: '发送',
		newAdd: '新增地址',
		createWt: '创建钱包',
		importWt: '导入钱包',
		edit: '编辑',
		del: '删除',
		ledger: '连接到Ledger Wallet',
		trezor: '连接到TREZOR',
		SELECT_WALLET_FILE: "选择钱包文件...",
		GenerateSAN: '生成短账号',
		NEXT_STEP: "下一步",
		DOWNLOAD_KEYSTORE: "下载 密钥存储库 文件 (UTC / JSON)",
		DOWNLOAD_KEYSTORE1: "密钥存储库 文件 (UTC / JSON · Recommended · Encrypted)",
		UNDERSTAND_CONTINUE: "我明白了。继续下去",
	},
	loading: {
		l_1: '加载中……'
	},
	nav: {
		createWt: '创建钱包',
		importWt: '导入钱包',
		assets: '资产',
	},
	title: {
		SELECT_WALLET_FILE: "选择你的钱包文件",
		PASTE_PRIVATE_KEY: "私钥",
		CREATE_NEW_WALLET: "创建新钱包",
		SAVE_LEYSTORE_FILE: "保存你的 <span>密钥存储库</span> 文件.",
	},
	label: {
		null: '无',
		coin: '币种',
		balance: '余额',
		action: '操作',
		address: '地址',
		value: '数量',
		timelock: '时间锁',
		advance: '高级',
		startTime: '开始时间',
		endTime: '截止时间',
		selectTime: '选择时间',
		months: '个月',
		forever: '永远',
		password: '密码',
		privateKey: '私钥',
	},
	state: {
	},
	action: {
	},
	CREATE_TIP: {
		CREATE_TIP_0: "这个密码加密您的私钥。这不是生成键的种子。",
		CREATE_TIP_1: "你需要这个密码和你的私人钥匙才能解锁你的钱包",
		CREATE_TIP_2: "Fusion钱包不会帮你保管钥匙。我们无法访问帐户，恢复密钥，",
		CREATE_TIP_3: "重置密码，或反向事务。保护你的钥匙&总是检查你在正确的URL。你要对你的安全负责。"
	},
	SAVE_KEYSTORE_TIP: {
		SAVE_KEYSTORE_TIP_0: "**不要失去它!如果你把它弄丢了，就无法找回来。**不要分享!**如果您在恶意/钓鱼网站使用此文件，您的资金将被窃取。<br/>* *有备份!就像它有一天可能值几百万美元一样，好好保管它。",
		SAVE_KEYSTORE_TIP_1: "Fusion钱包不会帮你保管钥匙。我们不能访问帐户，恢复密钥，重置密码，或反向交易。保护你的钥匙&总是检查你在正确的URL。你要对你的安全负责。"
	},
	tip: {
		net: '此浏览器不支持U2F。请尝试使用带有安全（ssl/https）连接的Google Chrome！',
		selectAddr: '请选择您想要交互的地址。',
		addNode: '看起来您还没有一个短的帐号(SAN)。FUSION的SAN是一个8个字符的钱包地址，就像你的电话号码一样容易记住。单击下面的按钮生成一个。'
	}
}
