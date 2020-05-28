<template>
  <div class="boxConntent1 container" v-loading="loading.init" element-loading-text="Loading...">
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
                <div class="WW100 flex-bc H40 mb-20 mt-20" v-if="selectTimeType && activeName === 'b'">
                  <el-date-picker
                    class="WW100"
                    v-model="formData.timeArr"
                    type="daterange"
                    range-separator="-"
                    start-placeholder=""
                    end-placeholder=""
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    unlink-panels
                    :picker-options="pickerOptions">
                  </el-date-picker>
                </div>
                <div class="WW100 flex-bc H40 mt-20 mb-20" v-else>
                  <el-select type="text" v-model="formData.month" @change="confirmMonth" :placeholder="$t('label').selectTime" class="HH100 WW100" readonly>
                    <el-option v-for="item in ['1','2','3','4','5','6','7','8','9','10','11','12']" :key="item" :label="item" :value="item">
                      {{item + $t('label').months}}
                    </el-option>
                  </el-select>
                </div>
              </el-tab-pane>
              <el-tab-pane :label="$t('label').forever" name="c" v-if="sendType === '0' || urlParams.EndTime.toString().length > 13">
                <div class="flex-bc H40 mt-20 WW100 mb-20" v-if="refresh.beginTime">
                  <el-date-picker
                    v-model="formData.beginTime"
                    type="date"
                    placeholder=""
                    unlink-panels
                    value-format="yyyy-MM-dd"
                    format="yyyy-MM-dd"
                    :picker-options="pickerOptions"
                    @input="changeBeginTime"
                    class="WW45"> </el-date-picker>
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
export default {
  name: 'send',
  data () {
    return {
      dataPage: {},
      activeName: 'a',
      sendType: '0',
      selectTimeType: false,
      formData: {
        month: 3,
        timeArr: ['', '']
        // to: '0x014DC8Fd1221AA87C800A2fF8dB60130b333D410',
        // value: 0.00001
      },
      balance: 0,
      minDate: new Date(),
      maxDate: new Date('3333-12-30'),
      prop: {
        pwd: false,
        confirm: false,
      },
      loading: {
        init: true
      },
      assetId: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
      // chainId: this.$$.web3.utils.toHex('46688'),
      urlParams: '',
      maxFee: 0,
      isToAsset: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      signTx: '',
      refresh: {
        beginTime: true,
      }
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
    this.urlParams = this.$route.query
    this.assetId = this.urlParams.id
    this.balance = this.$$.web3.utils.fromWei(this.urlParams.balance, 'ether')
    this.sendType = this.urlParams.type
    if (this.sendType === '1') {
      let startTime = this.urlParams.StartTime.toString().length < 13 ? Number(this.urlParams.StartTime) * 1000 : Number(this.urlParams.StartTime)
      startTime = startTime > Date.now() ? startTime : Date.now()
      this.selectTimeType = true
      this.minDate = startTime
      this.activeName = 'b'
      this.maxDate = Number(this.urlParams.EndTime) * 1000
      this.formData.endTime = this.$$.timeChange({
        date: this.urlParams.EndTime,
        type: 'yyyy-mm-dd',
        format: '-'
      })
      this.formData.beginTime = this.formData.startTime = this.$$.timeChange({
        date: startTime,
        type: 'yyyy-mm-dd',
        format: '-'
      })
      // console.log(this.formData.startTime)
      if (this.urlParams.EndTime.toString().length > 13) {
        this.formData.endTime = ''
        this.maxDate = ''
        this.activeName = 'a'
        if (Number(this.urlParams.StartTime) * 1000 < Date.now()) {
          this.isToAsset = true
          this.formData.to = this.address
        } else {
          this.activeName = 'b'
        }
      }
      this.formData.timeArr = [this.formData.startTime, this.formData.endTime ? this.formData.endTime : this.formData.startTime]
      let minTime = this.minDate, maxTime = this.maxDate
      this.pickerOptions = {
        disabledDate (time) {
          let t = time.getTime() + 8.64e7, flag = true
          if (maxTime !== '') {
            flag = t < minTime || t > maxTime
          } else {
            flag = t <= minTime
          }
          // console.log(t)
          return flag
          // return (t < minTime || t > maxTime)
        }
      }
    }
    // console.log(this.formData.timeArr)
    // console.log(this.activeName)
    this.loading.init = false
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
    },
    selectAddr (addr) {
      this.formData.to = addr
      this.prop.address = false
    },
    confirmMonth (val) {
      this.formData.month = val
      this.prop.month = false
    },
    changeLevel () {
      if (this.selectTimeType) {
        this.cancel()
        this.formData.month = ''
      } else {
        this.formData.startTime = this.formData.endTime = ''
        this.formData.timeArr = ['', '']
      }
    },
    changeBeginTime (val) {
      console.log(val)
      this.refresh.beginTime = false
      this.$nextTick(() => {
        this.refresh.beginTime = true
      })
      // this.formData.endTime = val
    },
    openPwd () {
      this.formData.startTime = this.formData.timeArr[0]
      this.formData.endTime = this.formData.timeArr[1]
      if (!this.$$.web3.utils.isAddress(this.formData.to)) {
        this.msgWarning(this.$t('warn').w_1)
        return
      }
      if (!this.formData.to) {
        this.msgWarning(this.$t('warn').w_2)
        return
      }
      if (!this.formData.value || Number(this.formData.value) === 0) {
        this.msgWarning(this.$t('warn').w_3)
        return
      }
      if (this.activeName === 'b') {
        if (this.selectTimeType) {
          if (!this.formData.startTime || !this.formData.endTime) {
            this.msgWarning(this.$t('warn').w_4)
            return
          }
        } else {
          if (!this.formData.month) {
            this.msgWarning(this.$t('warn').w_5)
            return
          }
        }
      }
      if (this.activeName === 'c' && !this.formData.beginTime) {
        this.msgWarning(this.$t('warn').w_6)
        return
      }
      this.loading.init = true
      this.formData.to = this.formData.to.replace(/\s/, '')
      // this.prop.pwd = true
      this.toSign()
    },
    toSign (data) {
      if (this.sendType === '0') {
        if (this.activeName === 'a') {
          this.AssetToAssetSign()
        } else if (this.activeName === 'b') {
          this.AssetToTimeLockSign()
        } else {
          this.AssetToTimeLockSign('Forever')
        }
      } else {
        if (this.activeName === 'a') {
          this.TimeLockToAssetSign()
        } else if (this.activeName === 'b') {
          this.TimeLockToTimeLockSign()
        } else {
          this.TimeLockToTimeLockSign('Forever')
        }
      }
    },
    AssetToAssetSign () {
      this.buildTxnsAndSign('buildSendAssetTx')
    },
    AssetToTimeLockSign (type) {
      let endTime = '', startTime = ''
      if (type && type === 'Forever') {
        startTime = new Date(this.formData.beginTime).getTime()
        endTime = this.$$.web3.utils.toHex('18446744073709551615')
        // endTime = ''
      } else {
        if (this.selectTimeType) {
          startTime = new Date(this.formData.startTime).getTime()
          if (this.formData.startTime === this.formData.endTime) {
            endTime = new Date(this.formData.endTime + ' 23:59:59').getTime()
          } else {
            endTime = new Date(this.formData.endTime).getTime()
          }
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
      this.buildTxnsAndSign('buildAssetToTimeLockTx', startTime, endTime)
    },
    TimeLockToTimeLockSign (type) {
      let endTime = '', startTime = ''
      if (type && type === 'Forever') {
        startTime = new Date(this.formData.beginTime).getTime()
        endTime = this.$$.web3.utils.toHex('18446744073709551615')
        // endTime = ''
      } else {
        startTime = new Date(this.formData.startTime).getTime()
        if (this.formData.startTime === this.formData.endTime) {
          endTime = new Date(this.formData.endTime + ' 23:59:59').getTime()
        } else {
          endTime = new Date(this.formData.endTime).getTime()
        }
        // endTime = new Date(this.formData.endTime).getTime()
        endTime = parseInt(endTime / 1000)
        endTime = Number(this.urlParams.EndTime) <= endTime ? Number(this.urlParams.EndTime) : endTime
        endTime = this.$$.web3.utils.toHex(endTime)
      }
      startTime = parseInt(startTime / 1000)
      startTime = Number(this.urlParams.StartTime) >= startTime ? Number(this.urlParams.StartTime) : startTime
      startTime = this.$$.web3.utils.toHex(startTime)
      this.buildTxnsAndSign('buildTimeLockToTimeLockTx', startTime, endTime)
    },
    TimeLockToAssetSign () {
      let endTime = '', startTime = ''
      startTime = this.$$.timeChange({date: Date.now(), type: 'yyyy-mm-dd', format: '-'})
      startTime = new Date(startTime).getTime()
      startTime = parseInt(startTime / 1000)
      startTime = this.$$.web3.utils.toHex(startTime)
      endTime = this.$$.web3.utils.toHex('18446744073709551615')
      // endTime = ''
      this.buildTxnsAndSign('buildTimeLockToAssetTx', startTime, endTime)
    },
    buildTxnsAndSign (param, startTime, endTime) {
      // console.log(this.formData.value)
      let rawTx = {
        from: this.address,
        to: this.formData.to.replace(/\s/, ''),
        value: this.$$.web3.utils.toHex(this.$$.web3.utils.toWei(this.formData.value.toString(), 'ether')),
        asset: this.assetId,
      }
      if (startTime) {
        rawTx.start = startTime
      }
      if (endTime || endTime === '') {
        rawTx.end = endTime
      }
      console.log(rawTx)
      // console.log(rawTx)
      this.$$.web3.fsntx[param]({
        ...rawTx
      }).then(res => {
        this.maxFee = parseInt(res.gas) * parseInt(res.gasPrice)
        this.maxFee = this.$$.web3.utils.fromWei(this.maxFee.toString(), 'ether')
        res.chainId = this.chainId
        res.from = this.address
        res.to = this.formData.to
        console.log(res)
        this.dataPage = res
        // this.dataPage.gasLimit = res.gas
        this.loading.init = false
        this.prop.pwd = true
      }).catch(err => {
        this.msgError(err.toString())
        this.loading.init = false
      })
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