const wallet = require('../ethereum/wallet')
const HDKey = require('hdkey')
const hdk = new HDKey()


function walletCreate (publicKey, chainCode, walletType, path) {
  let moreAddr = []
  let wallets = []
  hdk.publicKey = new Buffer(publicKey, "hex")
  hdk.chainCode = new Buffer(chainCode, "hex")
  for (let i = 0; i < 5; i++) {
    let derivedKey = hdk.derive("m/" + i)
    if (walletType === 'ledger') {
      wallets.push(new wallet(undefined, derivedKey.publicKey, path + "/" + i, walletType))
    } else {
      wallets.push(new wallet(undefined, derivedKey.publicKey, path + "/" + i, walletType))
    }
    moreAddr.push({addr: wallets[i].getChecksumAddressString(), path: path + "/" + i})
  }
  return moreAddr
}

export default walletCreate