<template>
  <div class="boxConntent1 container">
    <div class="form-box HH100 pt-30">
      <ul class="ul">
        <li class="item">
          <label class="label">{{$t('label').address}}:</label>
          <div class="input-box relative">
            <el-input type="text" v-model="formData.to" class="" :disabled="isToAsset && sendType === '1' && activeName === 'a'"></el-input>
          </div>
        </li>
        <li class="item">
          <label class="label">{{$t('label').value}}:</label>
          <div class="input-box">
            <el-input type="number" v-model="formData.value" class=""></el-input>
          </div>
          <span class="flex-sc font12 color_99">{{$t('label').balance}}：{{balance}}</span>
        </li>
        <li class="item">
          <label class="label">{{$t('label').timelock}}:</label>
          <div class="WW100">
            <el-tabs v-model="activeName" @tab-click="onTabClick">
              <el-tab-pane :label="!isToAsset && sendType === '0' ? $t('label').null : 'To Assets'" name="a" :disabled="!isToAsset && sendType === '1'"></el-tab-pane>
              <el-tab-pane :label="$t('label').timelock" name="b">
                <div class="WW100" v-if="sendType === '0'">
                  <div class="flex-sc">
                    <span slot="title" class="flex-sc color_99 mr-20">
                      {{$t('label').advance}}
                    </span>
                    <el-switch v-model="selectTimeType" active-color="#e9bf29" inactive-color="#ff4949" @change="changeLevel">
                    </el-switch>
                  </div>
                </div>
                <div class="WW100 flex-bc H40 mt-20" v-if="selectTimeType">
                  <el-date-picker
                    class="WW100"
                    v-model="formData.date"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </div>
                <div class="WW100 flex-bc H40 mt-20 mb-20" v-else>
                  <el-select type="text" v-model="formData.month" @change="confirmMonth" :placeholder="$t('label').selectTime" class="HH100 WW100" readonly>
                    <el-option v-for="item in ['1','2','3','4','5','6','7','8','9','10','11','12']" :key="item" :label="item" :value="item">
                      {{item + $t('label').months}}
                    </el-option>
                  </el-select>
                </div>
                <!-- <div class="flex-bc H40 mt-20" v-if="selectTimeType">
                  <el-input type="text" v-model="formData.startTime" @click="prop.startTime = true; formTimeKey = 'startTime'" :placeholder="$t('label').startTime" class="" readonly></el-input>
                  <el-input type="text" v-model="formData.endTime" @click="prop.endTime = true; formTimeKey = 'endTime'" :placeholder="$t('label').endTime" class="" readonly></el-input>
                </div>
                <div class="WW100 flex-bc H40 mt-20" v-else>
                  <el-input type="text" v-model="formData.month" @click="prop.month = true; formTimeKey = 'month'" :placeholder="$t('label').selectTime" class="" readonly></el-input>
                  <p class="flex-c ml-10 font14" style="white-space:nowrap;">{{$t('label').months}}</p>
                </div> -->
              </el-tab-pane>
              <el-tab-pane :label="$t('label').forever" name="c" v-if="sendType === '0' || urlParams.EndTime.toString().length > 13">
                <div class="flex-bc H40 mt-20 WW100 mb-20">
                  <!-- <el-input type="text" v-model="formData.beginTime" @click="prop.beginTime = true; formTimeKey = 'beginTime'" :placeholder="$t('label').startTime" class="" readonly></el-input> -->
                  <el-date-picker v-model="formData.beginTime" type="date" placeholder="选择日期" class="WW45"> </el-date-picker>
                  <el-input type="text" :value="$t('label').forever" class="WW45 center" readonly></el-input>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </li>
        <li class="item mt-30">
          <el-button type="primary" @click="openPwd" class="WW100 btn-yellow" :disabled="false">{{$t('btn').send}}</el-button>
        </li>
      </ul>
    </div>

    <!-- 签名 start -->
    <el-dialog :title="$t('tip').selectAddr" :visible.sync="prop.pwd" width="300" :before-close="cancel" :close-on-click-modal="false" :modal-append-to-body='false'>
      <unlock v-if="prop.pwd" :keystore="keystore" :address="address" @setPrviKey="toSign"></unlock>
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
.form-box {
  width: size(600);padding:0 15px;margin:auto;
  .item {
    width: 100%;margin-bottom:20px;
    .label {
      width: 100%;text-align: left;display: block;margin-bottom: 10px;font-size: 14px;font-weight: bold;
    }
    .input-box {
      width: 100%;height: 40px;position: relative;font-size:12px;
    }
  }
}
.down-arrow {
  width: 40px;height: 40px;position: absolute;top:0;right:0;border-left: 1px solid #ddd;
}
.confirm-box {
  padding: 15px 15px;
  .ul {
    .item {
      text-align: left;font-size: 14px;border-bottom: 1px solid #ddd;margin-bottom: 10px;
    }
  }
}

</style>

<script>
let Tx = require('ethereumjs-tx')
export default {
  name: 'send',
  data () {
    return {
      activeName: 'a',
      sendType: '0',
      selectTimeType: false,
      formData: {
        beginTime: '',
        month: 3
        // to: '0x014DC8Fd1221AA87C800A2fF8dB60130b333D410',
        // value: 0.1
      },
      balance: 0,
      formTimeKey: '',
      minDate: new Date(),
      maxDate: new Date('3333-12-30'),
      prop: {
        startTime: false,
        endTime: false,
        beginTime: false,
        pwd: false,
        confirm: false,
        address: false,
        month: false
      },
      privateKey: '',
      password: '',
      signTx: '',
      assetId: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
      chainId: this.$$.web3.utils.toHex('46688'),
      urlParams: '',
      maxFee: 0,
      isToAsset: false
    }
  },
  computed: {
    address () {
      return this.$store.state.address
    },
    keystore () {
      return this.$store.state.keystore
    },
  },
  mounted () {
    this.urlParams = this.$route.query
    this.assetId = this.urlParams.id
    this.balance = this.$$.web3.utils.fromWei(this.urlParams.balance, 'ether')
    this.sendType = this.urlParams.type
    if (this.sendType === '1') {
      this.selectTimeType = true
      // this.activeName = 'b'
      this.minDate = new Date(Number(this.urlParams.StartTime) * 1000)
      this.maxDate = new Date(Number(this.urlParams.EndTime) * 1000)
      this.formData.endTime = this.$$.timeChange({
        date: this.urlParams.EndTime,
        type: 'yyyy-mm-dd',
        format: '-'
      })
      this.formData.beginTime = this.formData.startTime = this.$$.timeChange({
        date: this.urlParams.StartTime,
        type: 'yyyy-mm-dd',
        format: '-'
      })
      if (this.urlParams.EndTime.toString().length > 13) {
        this.formData.endTime = ''
        this.maxDate = new Date('3333-12-30')
        if (Number(this.urlParams.StartTime) * 1000 < Date.now()) {
          this.isToAsset = true
          this.formData.to = this.address
        } else  {
          this.activeName = 'b'
        }
      }

      // console.log(this.formData)
      console.log(this.activeName)
      // this.formData.endTime = new Date(this.urlParams.EndTime)
    }
    let nodeUrl = localStorage.getItem('network')
    if ( nodeUrl === 'https://testnet.fsn.dev/api') {
      this.chainId = this.$$.web3.utils.toHex('46688')
    } else {
      this.chainId = this.$$.web3.utils.toHex('32659')
    }
    // console.log(this.maxDate)
    // console.log(this.urlParams.type)
    // this.$$.isConnected().then(res => {
    //   this.$$.web3.fsn.getBalance(this.assetId, this.address, 'latest').then(res => {
    //     this.balance = this.$$.web3.utils.fromWei(res, 'ether')
    //   })
    // }).catch(err => {
    //   this.$notify('节点连接失败！')
    // })
  },
  methods: {
    onTabClick () {
      if (this.isToAsset && this.activeName === 'a' && this.sendType === '1') {
        this.formData.to = this.address
      } else if (this.isToAsset &&  this.sendType === '1') {
        this.formData.to = ''
      }
    },
    cancel () {
      // this.formData = {}
      this.prop.confirm = false
      this.prop.pwd = false
      this.prop.beginTime = false
      this.prop.endTime = false
      this.prop.startTime = false
      this.prop.month = false
      this.signTx = ''
      this.password = ''
      this.privateKey = ''
    },
    selectAddr (addr) {
      this.formData.to = addr
      this.prop.address = false
    },
    confirmMonth (val) {
      console.log(val)
      this.formData.month = val
      this.prop.month = false
    },
    changeLevel () {
      console.log(this.selectTimeType)
      if (this.selectTimeType) {
        this.cancel()
        this.formData.month = ''
      } else {
        this.formData.startTime = this.formData.endTime = ''
      }
    },
    changeTime (val) {
      let timestamp = Date.parse(val)
      this.formData[this.formTimeKey] = this.$$.timeChange({date: timestamp, type: 'yyyy-mm-dd', format: '-'})
      this.prop[this.formTimeKey] = false
      if (this.formTimeKey === 'startTime') {
        this.formData.endTime = ''
      }
    },
    openPwd () {
      if (!this.$$.web3.utils.isAddress(this.formData.to)) {
        this.$notify(this.$t('warn').w_1)
        return
      }
      if (!this.formData.to) {
        this.$notify(this.$t('warn').w_2)
        return
      }
      if (!this.formData.value || Number(this.formData.value) === 0) {
        this.$notify(this.$t('warn').w_3)
        return
      }
      if (this.activeName === 'b') {
        if (this.selectTimeType) {
          if (!this.formData.startTime || !this.formData.endTime) {
          // if (!this.formData.startTime) {
            this.$notify(this.$t('warn').w_4)
            return
          }
        } else {
          if (!this.formData.month) {
            this.$notify(this.$t('warn').w_5)
            return
          }
        }
      }
      if (this.activeName === 'c' && !this.formData.beginTime) {
        this.$notify(this.$t('warn').w_6)
        return
      }
      this.formData.to = this.formData.to.replace(/\s/, '')
      this.prop.pwd = true
    },
    toSign (data) {
      if (data.state) {
        if (this.sendType === '0') {
          if (this.activeName === 'a') {
            this.AssetToAssetSign(data.info)
          } else if (this.activeName === 'b') {
            this.AssetToTimeLockSign(data.info)
          } else {
            this.AssetToTimeLockSign(data.info, 'Forever')
          }
        } else {
          if (this.activeName === 'a') {
            this.TimeLockToAssetSign(data.info)
          } else if (this.activeName === 'b') {
            this.TimeLockToTimeLockSign(data.info)
          } else {
            this.TimeLockToTimeLockSign(data.info, 'Forever')
          }
        }
      } else {
        this.$notify(data.info)
      }
    },
    AssetToAssetSign (pwd) {
      this.buildTxnsAndSign(pwd, 'buildSendAssetTx')
    },
    AssetToTimeLockSign (pwd, type) {
      let endTime = '', startTime = ''
      if (type && type === 'Forever') {
        startTime = new Date(this.formData.beginTime).getTime()
        endTime = this.$$.web3.utils.toHex('18446744073709551615')
      } else {
        if (this.selectTimeType) {
          startTime = new Date(this.formData.startTime).getTime()
          endTime = new Date(this.formData.endTime).getTime()
        } else {
          startTime = this.$$.timeChange({date: Date.now(), type: 'yyyy-mm-dd', format: '-'})
          startTime = new Date(startTime).getTime()
          endTime = startTime + (1000 * 60 * 60 * 24 * 30 * Number(this.formData.month))
        }
        endTime = parseInt(endTime / 1000)
        endTime = this.$$.web3.utils.toHex(endTime)
      }

      startTime = parseInt(startTime / 1000)
      startTime = this.$$.web3.utils.toHex(startTime)
      this.buildTxnsAndSign(pwd, 'buildAssetToTimeLockTx', startTime, endTime)
    },
    TimeLockToTimeLockSign (pwd, type) {
      let endTime = '', startTime = ''
      if (type && type === 'Forever') {
        startTime = new Date(this.formData.beginTime).getTime()
        endTime = this.$$.web3.utils.toHex('18446744073709551615')
      } else {
        startTime = new Date(this.formData.startTime).getTime()
        endTime = new Date(this.formData.endTime).getTime()
        endTime = parseInt(endTime / 1000)
        endTime = Number(this.urlParams.EndTime) <= endTime ? Number(this.urlParams.EndTime) : endTime
        // console.log(endTime)
      //   this.minDate = new Date(Number(this.urlParams.StartTime) * 1000)
      // this.maxDate = new Date(Number(this.urlParams.EndTime) * 1000)
        endTime = this.$$.web3.utils.toHex(endTime)
      }
      startTime = parseInt(startTime / 1000)
      startTime = Number(this.urlParams.StartTime) >= startTime ? Number(this.urlParams.StartTime) : startTime
      // console.log(startTime)
      startTime = this.$$.web3.utils.toHex(startTime)
      // console.log(startTime)
      this.buildTxnsAndSign(pwd, 'buildTimeLockToTimeLockTx', startTime, endTime)
      // })
    },
    TimeLockToAssetSign (pwd) {
      let endTime = '', startTime = ''
      startTime = this.$$.timeChange({date: Date.now(), type: 'yyyy-mm-dd', format: '-'})
      startTime = new Date(startTime).getTime()
      startTime = parseInt(startTime / 1000)
      startTime = this.$$.web3.utils.toHex(startTime)
      endTime = this.$$.web3.utils.toHex('18446744073709551615')
      console.log(startTime)
      this.buildTxnsAndSign(pwd, 'buildTimeLockToAssetTx', startTime, endTime)
    },
    buildTxnsAndSign (pwd, param, startTime, endTime) {
      console.log(param)
      console.log(startTime)
      console.log(endTime)
      let rawTx = {
        from: this.address,
        to: this.formData.to.replace(/\s/, ''),
        value: this.$$.web3.utils.toHex(this.$$.web3.utils.toWei(this.formData.value.toString(), 'ether')),
        asset: this.assetId,
      }
      if (startTime) {
        rawTx.start = startTime
      }
      if (endTime) {
        rawTx.end = endTime
      }
      console.log(rawTx)
      this.$$.web3.fsntx[param]({
        ...rawTx
      }).then(res => {
        this.maxFee = parseInt(res.gas) * parseInt(res.gasPrice)
        this.maxFee = this.$$.web3.utils.fromWei(this.maxFee.toString(), 'ether')
        res.chainId = this.chainId
        res.from = this.address
        console.log(res)
        let tx = new Tx(res)
        tx.sign(pwd)
        this.signTx = tx.serialize().toString("hex")
        this.signTx = this.signTx.indexOf("0x") === 0 ? this.signTx : ("0x" + this.signTx)
        this.prop.confirm = true
        console.log(this.signTx)
      }).catch(err => {
        this.$notify(err.toString())
      })
    },
    sendTxns () {
      this.$$.web3.eth.sendSignedTransaction(this.signTx, (err, hash) => {
        this.cancel()
        if (err) {
          this.$notify(err.toString())
        } else {
          console.log(hash)
          this.$notify({ type: 'success', message: this.$t('success').s_4 + 'Hash:' + hash })
        }
      })
    }
  }
}
</script>