export default {
  walletRequirePass (ethjson) {
    let jsonArr
    try {
      jsonArr = JSON.parse(ethjson)
    } catch (err) {
      let errtxt1 = 'This is not a valid wallet file. '
      throw errtxt1
    }
    if (jsonArr.encseed != null) {
      return true
    } else if (jsonArr.Crypto != null || jsonArr.crypto != null) {
      return true
    } else if (jsonArr.hash != null && jsonArr.locked) {
      return true
    } else if (jsonArr.hash != null && !jsonArr.locked) {
      return false
    } else if (jsonArr.publisher === 'MyEtherWallet' && !jsonArr.encrypted) {
      return false
    } else {
      let errtxt2 = 'Sorry! We don\'t recognize this type of wallet file. '
      throw errtxt2
    }
  },
  fixPkey (key) {
    if (key.indexOf('0x') === 0) {
      return key.slice(2)
    }
    return key
  }
}