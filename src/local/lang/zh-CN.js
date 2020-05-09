import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
export default {
	...zhLocale,
	error: {
		e_1: ''
	},
	warn: {
		w_1: '请选择账户',
		w_2: '数据为空！'
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
		GenerateSAN: '生成短账号'
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
	},
	state: {
	},
	action: {
	},
	tip: {
		net: '此浏览器不支持U2F。请尝试使用带有安全（ssl/https）连接的Google Chrome！',
		selectAddr: '请选择您想要交互的地址。',
		addNode: '看起来您还没有一个短的帐号(SAN)。FUSION的SAN是一个8个字符的钱包地址，就像你的电话号码一样容易记住。单击下面的按钮生成一个。'
	}
}
