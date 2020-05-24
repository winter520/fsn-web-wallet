<template>
  <div class="boxConntent1 container pt-50 pb-50 flex-bc" v-loading="loading.init" element-loading-text="Loading...">
    <div class="account-info-box">
      <div class="account-header-img"><img :src="headerImg"></div>
      <ul class="account-info-cont">
        <li class="item">
          <h6 class="h6">FUSION BALANCE</h6>
          <p class="p"><span class="font18 mr-10">≈ {{$$.thousandBit(fsnBalance, 8)}}</span>FSN</p>
        </li>
        <li class="item">
          <h6 class="h6">PUBLIC ADDRESS</h6>
          <p class="p cursorP" @click="copyTxt($store.state.address)">{{$store.state.address}}</p>
        </li>
        <li class="item">
          <h6 class="h6">SHORT ADDRESS</h6>
          <p class="p">{{addrNode ? addrNode : $t('tip').addNode}}</p>
          <p class="p mt-10" v-if="!addrNode">FEE 0.1 FSN</p>
        </li>
        <li class="item flex-sc flex-wrap">
          <el-button type="primary" class="mt-10 mr-5" size="mini" v-if="!addrNode" @click="createAddrNode">{{$t('btn').GenerateSAN}}</el-button>
          <el-button type="primary" class="mt-10 mr-5 ml-0" size="mini" @click="openQRcode">{{$t('btn').viewQRcode}}</el-button>
          <el-button class="mt-10 mr-5 ml-0" size="mini" @click="exitWallet">{{$t('btn').exit}}</el-button>
        </li>
      </ul>
    </div>

    <div class="account-data-box">
      <div class="account-data-bg">
        <div class="account-table">
          <h3 class="title">Assets</h3>
          <el-table :data="balanceData" style="width: 100%" :max-height="300" empty-text="Null">
            <el-table-column :label="$t('label').coin" align="left">
              <template slot-scope="scope">
                <div class="flex-sc">
                  <div class="coin-logo">
                    <img :src="getCoinInfo(formatAddr(scope.row.id)).logo" v-if="getCoinInfo(formatAddr(scope.row.id))">
                    <i class="null flex-c" v-else>0x</i>
                  </div>
                  <span :title="scope.row.id">{{formatAddr(scope.row.id).length > 10 ? $$.cutOut(scope.row.id, 4, 2) : formatAddr(scope.row.id)}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="ID" align="center">
              <template slot-scope="scope">
                {{$$.cutOut(scope.row.id, 8, 6)}}
              </template>
            </el-table-column>
            <el-table-column :label="$t('label').balance" align="center">
              <template slot-scope="scope">
                {{$$.thousandBit($$.web3.utils.fromWei(scope.row.balance.toString(), 'ether'), 'no')}}
              </template>
            </el-table-column>
            <el-table-column :label="$t('label').action" align="right">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="toUrl('/send', {id: scope.row.id, balance: scope.row.balance, type: '0'})">{{$t('btn').send}}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="account-table mt-30">
          <h3 class="title">Time-Locked Assets</h3>
          <div v-for="(items, indexs) in timelockData" :key="indexs" class="mb-30">
            <el-table :data="items.list" style="width: 100%" :max-height="300" size="mini" empty-text="Null">
              <el-table-column :label="$t('label').coin" align="left">
                <template>
                  <div class="flex-sc">
                    <div class="coin-logo">
                      <img :src="getCoinInfo(formatAddr(items.id)).logo" v-if="getCoinInfo(formatAddr(items.id))">
                      <i class="null flex-c" v-else>0x</i>
                    </div>
                    <span :title="items.id">{{formatAddr(items.id).length > 10 ? $$.cutOut(items.id, 4, 2) : formatAddr(items.id)}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="Start" align="center">
                <template slot-scope="scope">
                  {{
                    scope.row.StartTime.toString().length > 13 ? 'Forever' : $$.timeChange({date: scope.row.StartTime, type: 'yyyy-mm-dd', format: '-'})
                  }}
                </template>
              </el-table-column>
              <el-table-column label="End" align="center">
                <template slot-scope="scope">
                  {{
                    scope.row.EndTime.toString().length > 13 ? 'Forever' : $$.timeChange({date: scope.row.EndTime, type: 'yyyy-mm-dd', format: '-'})
                  }}
                </template>
              </el-table-column>
              <el-table-column :label="$t('label').balance" align="center">
                <template slot-scope="scope">
                  {{$$.thousandBit($$.web3.utils.fromWei(scope.row.Value.toString(), 'ether'), 'no')}}
                </template>
              </el-table-column>
              <el-table-column :label="$t('label').action" align="right">
                <template slot-scope="scope">
                  <!-- {{scope.row}} -->
                  <el-button type="primary" size="mini" @click="toUrl('/send', {id: items.id, balance: scope.row.Value, StartTime: scope.row.StartTime, EndTime: scope.row.EndTime, type: '1'})">{{$t('btn').send}}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>

    <!-- 签名 start -->
    <el-dialog :title="$t('btn').unlock" :visible.sync="prop.pwd" :before-close="cancel" :close-on-click-modal="false" :modal-append-to-body='false'>
      <unlock v-if="prop.pwd" :txnsData='dataPage' @setPrviKey="getSignData"></unlock>
    </el-dialog>
    <!-- 签名 end -->

    <el-dialog :title="$t('btn').unlock" :visible.sync="prop.qrCode" width="300px" :before-close="cancel" :close-on-click-modal="true" :modal-append-to-body='false'>
      <div class="flex-c">
        <div id="addressQRcode"></div>
      </div>
      <h6 class="font14 mt-20 color_gray">PUBLIC ADDRESS：</h6>
      <p class="cursorP" @click="copyTxt($store.state.address)">{{$store.state.address}}<span class="font12 ml-10" style="color:#0099ff;">(Click copy)</span></p>
    </el-dialog>
  </div>
</template>

<style lang="scss">
.account-info-box {
  width: 30%; height: 100%;background: #f8f8f8;padding: size(15) size(30);
  .account-header-img {
    width:size(64);height:size(64);margin: size(10) auto size(20);
    img {
      width: 100%;
    }
  }
  .account-info-cont {
    width: 100%;
    .item {
      font-size: size(14);color: #607d8b;margin-bottom: size(15);
      .p {
        padding: size(5);background: #e4e9f0;word-break: break-all;
      }
    }
  }
}
.account-data-box {
  width: 70%; height: 100%;padding-left:size(30);
  .account-data-bg {
    width: 100%;height: 100%;
  }
}
.account-table {
  width: 100%;
  .title {
    font-size: size(20);color: #666666;
  }
}
.coin-logo {
  width: 25px; height: 25px;margin-right: 10px;
  img {
    width: 100%;
  }
  .null {
    width: 100%;height: 100%;border:1px solid #e8be29;border-radius: 100%;font-size: 12px;color: #e8be29;
  }
}
</style>

<script>
import coinInfo from '@/config/coininfo.js'
export default {
  name: 'account',
  data () {
    return {
      headerImg: '',
      fsnBalance: '',
      balanceData: [],
      timelockData: [],
      addrNode: '',
      loading: {
        init: true
      },
      dataPage: {},
      prop: {
        pwd: false,
        qrCode: false
      },
      fsnId: '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
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
  },
  methods: {
    cancel () {
      this.prop.pwd = false
      this.prop.qrCode = false
    },
    exitWallet () {
      this.$store.commit("setAddress", '')
      this.$store.commit("setKeystore", '')
      this.toUrl('/')
      // history.go(0)
    },
    init () {
      this.getHeader()
      this.initData()
    },
    openQRcode () {
      this.prop.qrCode = true
      this.$nextTick(() => {
        this.$$.qrCode(this.$store.state.address, 'addressQRcode')
      })
    },
    createAddrNode () {
      this.$$.web3.fsntx.buildGenNotationTx({
        from: this.$store.state.address
      }).then(res => {
        console.log(res)
        res.chainId = this.chainId
        res.from = this.address
        // console.log(res)
        this.dataPage = res
        // this.dataPage.gasLimit = res.gas
        this.prop.pwd = true
      })
    },
    getSignData (data) {
      if (data.msg === 'Success') {
        this.$$.web3.eth.sendSignedTransaction(data.info, (err, hash) => {
          this.cancel()
          if (err) {
            this.msgError(err.toString())
          } else {
            console.log(hash)
            this.msgSuccess(this.$t('success').s_4 + 'Hash:' + hash)
          }
        })
      } else {
        this.msgError(data.error)
      }
    },
    getHeader () {
      this.headerImg = this.$$.createImg(this.$store.state.address)
    },
    initData () {
      if (!this.$store.state.address) return
      const batch = new this.$$.web3.BatchRequest()
      batch.add(this.$$.web3.fsn.getAllBalances.request( this.$store.state.address, 'latest', (err, res) => {
        this.balanceData = []
        if (err) {
          console.log(err)
          this.balanceData = [{
            id: this.fsnId,
            balance: '0'
          }]
          this.fsnBalance = 0
        } else {
          let fsnObj = {
            id: this.fsnId,
            balance: '0'
          }
          for (let obj in res) {
            if (obj === this.fsnId) {
              fsnObj = {
                id: obj,
                balance: res[obj]
              }
            } else {
              this.balanceData.push({
                id: obj,
                balance: res[obj]
              })
            }
          }
          this.balanceData.unshift(fsnObj)
          this.fsnBalance = this.$$.web3.utils.fromWei(fsnObj.balance, 'ether')
        }
      }))
      batch.add(this.$$.web3.fsn.getAllTimeLockBalances.request(this.$store.state.address, 'latest', (err, res) => {
        this.timelockData = []
        if (err) {
          console.log(err)
          this.timelockData = []
        } else {
          let fsnObj = {
            id: this.fsnId,
            list: []
          }
          for (let obj in res) {
            if (obj === this.fsnId) {
              fsnObj = {
                id: obj,
                list: res[obj].Items
              }
            } else {
              this.timelockData.push({
                id: obj,
                list: res[obj].Items
              })
            }
          }
          if (fsnObj.list.length > 0) {
            this.timelockData.unshift(fsnObj)
          }
        }
      }))
      batch.add(this.$$.web3.fsn.getNotation.request(this.$store.state.address, 'latest', (err, res) => {
        if (err) {
          console.log(err)
          this.addrNode = ''
        } else {
          this.addrNode = res
        }
        this.loading.init = false
      }))

      batch.execute()
    },
    formatAddr (addr) {
      let name = ''
      if (addr === this.fsnId) {
        name = 'FSN'
      } else if (addr === '0xf4798cc45b0fe0c6a27255745f6977166619bf9615d5d25a0f086e6fb24756aa') {
        name = 'Vote1'
      } else {
        name = addr
      }
      return name
    },
    getCoinInfo (coin) {
      if (typeof coinInfo[coin] !== 'undefined') {
        return coinInfo[coin]
      }
      return ''
    },
    qrcode (cont) {
      this.popup.qrcode = true
			this.$nextTick(() => {
        this.$$.qrCode(cont, "qrcode")
			})
    },
  }
}
</script>