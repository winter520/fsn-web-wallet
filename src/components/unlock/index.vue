<template>
  <div class="form-box HH100">
    <ul class="ul">
      <li class="item" v-if="walletType === 'ledger'">
        <label class="label">Ledger Wallet:</label>
        <div class="input-box">
          <el-button @click="ledgerToSign" class="WW100 btn-yellow" :loading="loading.btn" :loading-text="btnTxt" loading-type="spinner">{{$t('btn').ledger}}</el-button>
        </div>
      </li>
      <li class="item" v-if="walletType === 'trezor'">
        <label class="label">TREZOR:</label>
        <div class="input-box">
          <el-button @click="trezorToSign" class="WW100 btn-yellow" :loading="loading.btn" :loading-text="btnTxt" loading-type="spinner">{{$t('btn').trezor}}</el-button>
        </div>
      </li>
      <li class="item" v-if="walletType === 'keystore'">
        <label class="label">{{$t('label').password}}:</label>
        <div class="input-box">
          <input type="password" v-model="password" class="input-text HH100 WW100">
        </div>
      </li>
      <li class="item" v-if="walletType === 'privateKey'">
        <label class="label">{{$t('label').privateKey}}:</label>
        <div class="input-box">
          <input type="password" v-model="privateKey" class="input-text HH100 WW100">
        </div>
      </li>
      <li class="item" v-if="walletType === 'keystore' || walletType === 'privateKey'">
        <el-button type="primary" @click="ksAndPrivFn" class="WW100 btn-yellow" :disabled="password.length <= 0 && privateKey.length <= 0" :loading="loading.btn" :loading-text="btnTxt" loading-type="spinner">{{$t('btn').unlock}}</el-button>
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
import {toSign as trezor} from '@/assets/js/wallets/trezor/index.js'
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
      // return this.$store.state.walletType
      // return 'ledger'
      return 'trezor'
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
      if (walletType === 'ledger') {
        this.ledgerToSign()
      } else if (walletType === 'trezor') {
        this.trezorToSign()
      } else {
        this.ksAndPrivFn()
      }
    },
    ledgerToSign () {
      ledger(this.HDPath, this.txnsData).then(res => {
        this.getSign(res)
      })
    },
    trezorToSign () {
      delete this.txnsData.gas
      this.txnsData.chainId = this.$$.web3.utils.hexToNumber(this.txnsData.chainId)
      // this.txnsData.value = this.$$.web3.utils.hexToNumber(this.txnsData.value)
      // console.log(this.txnsData)
      trezor(this.HDPath, this.txnsData).then(res => {
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
      this.backSign()
    },
    ksAndPrivFn () {
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
          let tx = new Tx(this.txnsData)
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
