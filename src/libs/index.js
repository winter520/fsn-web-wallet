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
export default {
  ...config,
  web3,
  ...tools
}