import walletCreate from '../public/walletCreate.js'

const ethUtil = require('ethereumjs-util')
ethUtil.Tx  = require("ethereumjs-tx")
const Ledger3 = require("./ledger3")
const LedgerEth = require("./ledger-eth")
const ledger = new Ledger3("w0w")
const app = new LedgerEth(ledger)

function getAddressArr (HDPath, page) {
  return new Promise(resolve => {
    let data = { msg: 'Error', info: []}
    app.getAddress(HDPath, (res, err) => {
      let addressArr = []
      if (err) {
        data.error = err.toString()
      } else {
        addressArr = walletCreate(res["publicKey"], res["chainCode"], "ledger", HDPath, page)
        data.msg = 'Success'
        data.info = addressArr
      }
      resolve(data)
    }, false, true)
  })
}

function signTxLedger (app, eTx, rawTx, HDPath, old) {
  return new Promise(resolve => {
    let data = { msg: 'Error', info: ''}
    eTx.raw[6] = rawTx.chainId
    eTx.raw[7] = eTx.raw[8] = 0
    let toHash = old ? eTx.raw.slice(0, 6) : eTx.raw
    let txToSign = ethUtil.rlp.encode(toHash)
    app.signTransaction(HDPath, txToSign.toString('hex'), (result, error) => {
      // console.log(result)
      // console.log(error)
      if (typeof error != "undefined") {
        error = error.errorCode ? u2f.getErrorByCode(error.errorCode) : error
        data = { error: error}
      } else {
        let v = result['v'].toString(16);
        if (!old) {
          // EIP155 support. check/recalc signature v value.
          let rv = parseInt(v, 16)
          let cv = rawTx.chainId * 2 + 35
          if (rv !== cv && (rv & cv) !== rv) {
            cv += 1 // add signature v bit.
            // console.log(cv)
          }
          v = cv.toString(16);
        }
        rawTx.v = "0x" + v;
        rawTx.r = "0x" + result['r'];
        rawTx.s = "0x" + result['s'];
        eTx = new ethUtil.Tx(rawTx);
        // rawTx.rawTx = JSON.stringify(rawTx);
        rawTx.signedTx = '0x' + eTx.serialize().toString('hex');
        rawTx.isError = false
        data = { msg: 'Success', info: rawTx}
      }
      resolve(data)
    })
  })
}

function toSign (HDPath, rawTx) {
  return new Promise(resolve => {
    let eTx = new ethUtil.Tx(rawTx)
    let EIP155Supported = false
    app.getAppConfiguration((result, error) => {
      // console.log(result)
      // console.log(error)
      if (typeof error != "undefined") {
        // this.$$.errTip(error)
        return
      }
      let splitVersion = result['version'].split('.');
      if (parseInt(splitVersion[0]) > 1) {
          EIP155Supported = true;
      } else if (parseInt(splitVersion[1]) > 0) {
          EIP155Supported = true;
      } else if (parseInt(splitVersion[2]) > 2) {
          EIP155Supported = true;
      }
      signTxLedger(app, eTx, rawTx, HDPath, !EIP155Supported).then(res => {
        resolve(res)
      })
    })
  })
}

export {
  getAddressArr,
  toSign
}