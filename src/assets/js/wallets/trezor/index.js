import walletCreate from './public/walletCreate.js'
const TrezorConnect = require("trezor-connect").default
const Tx  = require("ethereumjs-tx")

function getAddressArr (HDPath) {
  return new Promise(resolve => {
    TrezorConnect.getPublicKey({ path: HDPath }).then(res => {
      console.log(res)
      let addressArr = []
      if (res.success) {
        addressArr = walletCreate(res.payload.publicKey, res.payload.chainCode, 'trezor', HDPath)
      }
      resolve(addressArr)
    })
  })
}

function sanitizeHex (hex) {
  hex = hex.substring(0, 2) == '0x' ? hex.substring(2) : hex
  if (hex == "") return ""
  hex = hex.length % 2 != 0 ? '0' + hex : hex
  return '0x' + hex
}

function toSign (HDPath, rawTx) {
  return new Promise(resolve => {
    let data = { msg: 'Error', info: ''}
    TrezorConnect.ethereumSignTransaction({
      path: HDPath,
      transaction: rawTx
    }).then((res) => {
      console.log(res)
      console.log(rawTx)
      if (!res.success) {
        data = { error: res}
      } else {
        let resPayload = res.payload,
          v = resPayload.v,
          r = resPayload.r,
          s = resPayload.s;
        // check the returned signature_v and recalc signature_v if it needed
        // see also https://github.com/trezor/trezor-mcu/pull/399
        if (v <= 1) {
          console.log(v)
          // for larger chainId, only signature_v returned. simply recalc signature_v
          v += 2 * rawTx.chainId + 35
        }
        // v = parseInt(v, 16)
        // v = v.toString(16)
        console.log(v)
        rawTx.v = sanitizeHex(v)
        rawTx.r = sanitizeHex(r)
        rawTx.s = sanitizeHex(s)
        // console.log(rawTx)
        var eTx = new Tx(rawTx)
        console.log(eTx)
        rawTx.rawTx = JSON.stringify(rawTx)
        rawTx.signedTx = sanitizeHex(eTx.serialize().toString("hex"))
        rawTx.isError = false
        data = { msg: 'Success', info: rawTx}
      }
      resolve(data)
    })
  })
}

export {
  getAddressArr,
  toSign
}