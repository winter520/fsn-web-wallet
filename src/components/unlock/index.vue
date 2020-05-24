<template>
  <div class="form-box HH100">
    <ul class="ul">
      <li class="item" v-if="walletType === 'ledger'">
        <label class="label">Ledger Wallet:</label>
        <div class="input-box">
          <el-button @click="unlock" class="WW100 btn-yellow" :loading="loading.btn" :loading-text="btnTxt" loading-type="spinner">{{$t('btn').ledger}}</el-button>
        </div>
      </li>
      <li class="item" v-if="walletType === 'trezor'">
        <label class="label">TREZOR:</label>
        <div class="input-box">
          <el-button @click="unlock" class="WW100 btn-yellow" :loading="loading.btn" :loading-text="btnTxt" loading-type="spinner">{{$t('btn').trezor}}</el-button>
        </div>
      </li>
      <li class="item mb-20" v-if="walletType === 'keystore'">
        <label class="label">{{$t('label').password}}:</label>
        <div class="input-box">
          <el-input type="password" v-model="password" class="WW100"></el-input>
        </div>
      </li>
      <li class="item mb-20" v-if="walletType === 'privateKey'">
        <label class="label">{{$t('label').privateKey}}:</label>
        <div class="input-box">
          <el-input type="password" v-model="privateKey" class="WW100"></el-input>
        </div>
      </li>
      <li class="item" v-if="walletType === 'keystore' || walletType === 'privateKey'">
        <el-button type="primary" @click="unlock" class="WW100 btn-yellow" :disabled="password.length <= 0 && privateKey.length <= 0" :loading="loading.btn" :loading-text="btnTxt" loading-type="spinner">{{$t('btn').unlock}}</el-button>
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
// 
</style>

<script>
let Tx = require('ethereumjs-tx')
import {toSign as ledger} from '@/assets/js/wallets/ledger/index.js'
import {toSign as trezor, getRSV} from '@/assets/js/wallets/trezor/index.js'
export default {
  name: 'unlock',
  props: ['txnsData'],
  data () {
    return {
      password: '',
      privateKey: '',
      loading: {
        btn: false
      },
      signData: {msg: 'Error', info: ''},
      btnTxt: this.$t('btn').unlock
    }
  },
  computed: {
    walletType () {
      return this.$store.state.walletType
      // return 'ledger'
      // return 'trezor'
      // return 'privateKey'
    },
    address () {
      return this.$store.state.address
    },
    keystore () {
      return this.$store.state.keystore
    },
    HDPath () {
      return this.$store.state.HDPath
    }
  },
  mounted () {
    this.loading.btn = false
  },
  methods: {
    unlock () {
      this.loading.btn = true
      this.btnTxt = this.$t('btn').unlock + '...'
      
      let rawTx = {
        nonce: this.txnsData.nonce,
        gasPrice: this.txnsData.gasPrice,
        gasLimit: this.txnsData.gas,
        from: this.txnsData.from,
        to: this.txnsData.to,
        value: this.txnsData.value,
        data: this.txnsData.input,
        chainId: this.txnsData.chainId
      }
      console.log(this.txnsData)
      console.log(rawTx)
      if (this.walletType === 'ledger') {
        this.ledgerToSign(rawTx)
      } else if (this.walletType === 'trezor') {
        this.trezorToSign(rawTx)
      } else {
        this.ksAndPrivFn(rawTx)
      }
    },
    ledgerToSign (rawTx) {
      // console.log(rawTx)
      // console.log(this.$$.web3.utils.hexToNumber(rawTx.chainId))
      ledger(this.HDPath, rawTx).then(res => {
        this.getSign(res)
      })
    },
    trezorToSign (rawTx) {
      rawTx.chainId = this.$$.web3.utils.hexToNumber(rawTx.chainId)
      trezor(this.HDPath, rawTx).then(res => {
        this.getSign(res)
      })
    },
    getSign (res) {
      console.log(res)
      if (res.msg === 'Success') {
        this.signData.msg = 'Success'
        this.signData.info = res.info.signedTx
      } else {
        this.signData.error = res.error
      }
      this.loading.btn = false
      this.backSign()
    },
    ksAndPrivFn (rawTx) {
      if (!this.keystore && !this.privateKey) {
        this.$notify(this.$t('warn').w_7)
        return
      }
      try {
        if (this.keystore) {
          let walletInfo = this.$$.getWalletFromPrivKeyFile(
            this.keystore,
            this.password
          )
          this.privateKey = walletInfo.getPrivateKeyString()
        }
        let prvtKey = new Buffer(this.$$.fixPkey(this.privateKey), 'hex')
        const wallet = new this.$$.wallet(prvtKey)
        if (this.address.toString() !== wallet.getChecksumAddressString().toString()) {
          this.signData.error = this.$t('error').e_2
        } else {
          let tx = new Tx(rawTx)
          tx.sign(prvtKey)
          let signTx = tx.serialize().toString("hex")
          signTx = signTx.indexOf("0x") === 0 ? signTx : ("0x" + signTx)
          this.signData.msg = 'Success'
          this.signData.info = signTx
        }
        this.backSign()
        this.privateKey = ''
        this.password = ''
        prvtKey = ''
      } catch (err) {
        console.log(err)
        this.signData.error = err.toString()
        this.backSign()
        this.privateKey = ''
        this.password = ''
        this.loading.btn = false
        this.btnTxt = this.$t('btn').unlock
      }
    },
    backSign () {
      console.log(this.signData)
      this.$emit('setPrviKey', this.signData)
    }
  }
}
</script>
