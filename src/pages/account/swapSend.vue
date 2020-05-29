<template>
  <div class="boxConntent1 container" v-loading="loading.init" element-loading-text="Loading...">
    <div class="form-box HH100 pt-30">
      <ul class="ul">
        <li class="item">
          <label class="label">
            {{$t('label').address}}:
            <span class="font12 color_99 ml-10" style="font-weight:normal;">（{{Number(this.urlParams.sendType) ? 'FSN Address' : 'BTC Address'}}）</span>
          </label>
          <div class="input-box relative">
            <!-- <el-input type="text" v-model="formData.to" class=""></el-input> -->
            <input type="text" v-model="formData.to" class="input-text H40 WW100 plr10">
          </div>
        </li>
        <li class="item">
          <label class="label">{{$t('label').value}}:</label>
          <div class="input-box">
            <!-- <el-input type="number" v-model="formData.value" class=""></el-input> -->
            <input type="number" v-model="formData.value" class="input-text H40 WW100 plr10">
          </div>
          <span class="flex-sc font12 color_99">{{$t('label').balance}}：{{balance}} {{urlParams.coinType}}</span>
        </li>
        <li class="item mt-30">
          <el-button type="primary" @click="openPwd" class="WW100 btn-yellow" :disabled="false">{{$t('btn').send}}</el-button>
        </li>
      </ul>
    </div>

    <!-- 签名 start -->
    <el-dialog :title="$t('btn').unlock" :visible.sync="prop.pwd" width="300" :before-close="cancel" :close-on-click-modal="false" :modal-append-to-body='false'>
      <unlock v-if="prop.pwd" :txnsData='dataPage' @setPrviKey="getSignData"></unlock>
    </el-dialog>
    <!-- 签名 end -->

    <!-- 发送确认 start -->
    <el-dialog :title="$t('tip').selectAddr" :visible.sync="prop.confirm" width="300" :before-close="cancel" :close-on-click-modal="false" :modal-append-to-body='false'>
      <div class="confirm-box">
        <h3>{{$t('label').send}}</h3>
        <ul class="ul">
          <li class="item">
            <p>From:</p> <p>{{address}}</p>
          </li>
          <li class="item">
            <p>To:</p> <p>{{formData.to}}</p>
          </li>
          <li class="item">
            <p>Value:</p> <p>{{formData.value}}</p>
          </li>
          <li class="item">
            <p>MaxFee:</p> <p>{{maxFee}}</p>
          </li>
        </ul>
        <div class="mt-30">
          <el-button type="primary" @click="sendTxns" class="WW30 btn-yellow">{{$t('btn').send}}</el-button>
          <el-button @click="cancel" class="WW30 ml-20 btn-radius">{{$t('btn').cancel}}</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 发送确认 end -->
  </div>
</template>

<style lang="scss">
@import './scss/send.scss';
</style>

<script>

import {swapTokenContract} from './js/swapContract'
export default {
  name: 'swapOut',
  data () {
    return {
      formData: {
        to: '',
        value: ''
      },
      prop: {
        pwd: false,
        confirm: false
      },
      urlParams: {},
      balance: 0,
      maxFee: 0,
      signTx: '',
      dataPage: {},
      loading: {
        init: true
      },
      TokenContract: '',
      swapInfo: ''
    }
  },
  computed: {
    address () {
      return this.$store.state.address
    },
    chainId () {
      return this.$store.state.chainID
    }
  },
  mounted () {
    this.init()
    // this.toSign()
  },
  methods: {
    ...swapTokenContract,
    cancel () {
      // this.formData = {}
      this.prop.confirm = false
      this.prop.pwd = false
    },
    init () {
      this.urlParams = this.$route.query
      this.balance = this.$$.fromWei(this.urlParams.balance, this.urlParams.coinType)
      this.getCrossChain()
    },
    getCrossChain () {
      let url = 'http://47.92.168.85:12556/rpc'
      this.getSwapContract(url).then(res => {
        console.log(res)
        this.swapInfo = res.swapInfo
        this.TokenContract = res.contract
        this.loading.init = false
      })
    },
    openPwd () {
      if (!this.formData.to) {
        this.msgWarning(this.$t('warn').w_2)
        return
      }
      if (!this.formData.value || Number(this.formData.value) === 0) {
        this.msgWarning(this.$t('warn').w_3)
        return
      }
      if (Number(this.swapInfo.MinimumSwap) > Number(this.formData.value)) {
        this.msgError('Min value is:' + this.swapInfo.MinimumSwap)
        return
      }
      if (Number(this.swapInfo.MaximumSwap) < Number(this.formData.value)) {
        this.msgError('Max value is:' + this.swapInfo.MaximumSwap)
        return
      }
      if (Number(this.formData.value) > Number(this.balance)) {
        this.msgError(this.$t('warn').w_11)
        return
      }
      this.loading.init = true
      this.formData.to = this.formData.to.replace(/\s/, '')
      // this.prop.pwd = true
      this.toSign()
    },
    toSign () {
      let data = {
        chainId: this.chainId,
        from: this.address,
        gas: '',
        gasPrice: "",
        nonce: "",
        to: this.swapInfo.ContractAddress,
        value: "0x0"
      }
      let count = 0, time = Date.now()
      console.log(data)
      const batch = new this.$$.web3.BatchRequest()
      // batch.add(this.$$.web3.eth.estimateGas.request({to: this.swapInfo.ContractAddress}, (err, res) => {
      batch.add(this.$$.web3.eth.estimateGas.request({to: this.swapInfo.DcrmAddress}, (err, res) => {
        if (err) {
          console.log(err)
        } else {
          // console.log(1)
          data.gas = this.$$.web3.utils.toHex(res * 6)
          count ++
        }
      }))
      batch.add(this.$$.web3.eth.getTransactionCount.request(this.address, (err, res) => {
        if (err) {
          console.log(err)
        } else {
          // console.log(2)
          data.nonce = this.$$.web3.utils.toHex(res)
          count ++
        }
      }))
      batch.add(this.$$.web3.eth.getGasPrice.request((err, res) => {
        if (err) {
          console.log(err)
        } else {
          // console.log(3)
          data.gasPrice = this.$$.web3.utils.toHex(res)
          count ++
        }
      }))
      batch.execute()
      // console.log(data)
      let getDataIntervel = setInterval(() => {
        if (count >= 3 && ( (Date.now() - time) <= 30000 )) {
          this.dataPage = data
          this.getInputData()
          clearInterval(getDataIntervel)
        } else if (count < 3 && ( (Date.now() - time) > 30000 )) {
          this.msgError('Error')
          this.loading.init = false
          clearInterval(getDataIntervel)
        }
      }, 1000)
    },
    getInputData () {
      try {
        let value = this.$$.toWei(this.formData.value, this.urlParams.coinType)
        // let value = this.formData.value
        if (Number(this.urlParams.sendType) === 0) {
          this.dataPage.input = this.TokenContract.methods.Swapout(value, this.formData.to).encodeABI()
        } else {
          this.dataPage.input = this.TokenContract.methods.transfer(this.formData.to, value).encodeABI()
        }
        this.maxFee = this.$$.web3.utils.hexToNumber(this.dataPage.gasPrice) * this.$$.web3.utils.hexToNumber(this.dataPage.gas)
        this.maxFee = this.$$.web3.utils.fromWei(this.maxFee.toString(), 'ether')
        console.log(this.dataPage)
        this.loading.init = false
        this.prop.pwd = true
      } catch (error) {
        console.log(error)
        this.msgError(error.toString())
        this.loading.init = false
      }
    },
    getSignData (data) {
      this.prop.pwd = false
      if (data.msg === 'Success') {
        this.signTx = data.info
        this.prop.confirm = true
      } else {
        this.msgError(data.error)
      }
    },
    sendTxns () {
      this.$$.web3.eth.sendSignedTransaction(this.signTx, (err, hash) => {
        this.cancel()
        if (err) {
          this.msgError(err.toString())
        } else {
          console.log(hash)
          this.msgSuccess(this.$t('success').s_4 + 'Hash:' + hash)
        }
        this.prop.confirm = false
        this.toUrl('/account')
      })
    }
  }
}
</script>