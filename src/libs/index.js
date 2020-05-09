/**
 * @description 配置文件
 */
import config from '@/config/index.js'
/**
 * @description web3
 */
import web3 from '@/assets/js/web3/index.js'
/**
 * @description tools
 */
import tools from './tools'
/**
 * @description 钱包
 */
import wallet from '@/assets/js/wallets/ethereum/wallet'
export default {
  ...config,
  web3,
  wallet,
  ...tools,
  getWalletFromPrivKeyFile (strjson, password) {
    var jsonArr = JSON.parse(strjson);
    if (jsonArr.encseed != null) return wallet.fromEthSale(strjson, password)
    else if (jsonArr.Crypto != null || jsonArr.crypto != null) return wallet.fromV3(strjson, password, true)
    else
      throw 'Keystore is error!'
  },
}