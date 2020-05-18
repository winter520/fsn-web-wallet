<template>
  <div class="boxConntent1 container flex-c"  v-loading.fullscreen.lock="loading.init" element-loading-text="Loading...">
    <div class="tab-box">
      <el-tabs tab-position="left" v-model="activeTabs" @tab-click="modalClick">
        <el-tab-pane label="Ledger Wallet" name="ledger">
          <hgroup class="selectType_contTitle">
            <h3 class="title">Ledger Hardware Wallet</h3>
          </hgroup>
          <div class="selectType_contentBox">
            <div class="createInfo_btn flex-c" v-if="!isShowTip">
              <el-button class="W240 mt-10" @click="eDialog.path = true" type="primary">{{$t('btn').ledger}}</el-button>
            </div>
          </div>
          <div class="selectType_contTip" v-if="isShowTip">
            {{$t('tip').net}}
          </div>
        </el-tab-pane>
        <el-tab-pane label="TREZOR" name="trezor">
          <hgroup class="selectType_contTitle">
            <h3 class="title">TREZOR Hardware Wallet</h3>
          </hgroup>
          <div class="selectType_contentBox">
            <div class="createInfo_btn flex-c">
              <el-button class="W240 mt-10" @click="eDialog.path = true" type="primary">{{$t('btn').trezor}}</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Keystore / JSON File" name="keystore">
          <hgroup class="selectType_contTitle">
            <h3 class="title">{{$t('title').SELECT_WALLET_FILE}}</h3>
          </hgroup>
          <div class="selectType_contentBox">
            <div class="selectType_KSbtn">
              <p class="p" id="fileName">{{$t('btn').SELECT_WALLET_FILE}}</p>
              <input type="file" class="file" id="fileUpload" @change="fileUpChange">
            </div>
            <p id="testid"></p>
            <div class="selectType_contTnput mt-30" v-if="showPwdBtn">
              <input type="password" :placeholder="$t('PLACEHOLDER').ENTER_PASSWORD" class="input-text  input" v-model="password" @keyup="changePwd">
            </div>

            <div class="createInfo_btn flex-c" v-if="showPwdBtn">
              <el-button class="W240 mt-30" @click="inputFileBtn" type="primary">{{$t('btn').unlock}}</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Private Key" name="privateKey">
          <hgroup class="selectType_contTitle">
            <h3 class="title">{{$t('title').PASTE_PRIVATE_KEY}}</h3>
          </hgroup>
          <div class="selectType_contentBox">
            <div class="selectType_contTnput">
              <input type="password" :placeholder="$t('PLACEHOLDER').ENTER_PRIVATE_KEY" class="input-text input pwdChange" v-model="privateKey" @keyup="changePrv">
            </div>
            <div class="createInfo_btn flex-c">
              <el-button class="W240 mt-30" @click="inputPwdBtn" type="primary">{{$t('btn').unlock}}</el-button>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-dialog :title="$t('tip').selectPath" :visible.sync="eDialog.path" width="300" :before-close="modalClick" :close-on-click-modal="false" :modal-append-to-body='false'>
      <div>
        <p>{{$t('tip').selectAddr}}</p>
        <el-input v-model="HDPath"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" size="small" @click="modalClick">{{$t('btn').cancel}}</el-button>
        <el-button type="primary" size="small" @click="openHDwallet">{{$t('btn').confirm}}</el-button>
      </span>
    </el-dialog>

    <el-dialog :title="$t('tip').selectAddr" :visible.sync="eDialog.addr" width="300" :before-close="modalClick" :close-on-click-modal="false" :modal-append-to-body='false'>
      <div class="selectAddr_type">
        <el-radio-group v-model="selectAddr">
          <el-radio :label="item.addr" v-for="(item, index) in addrList" :key="index" class="WW100 mb-20">{{item.addr}}</el-radio>
        </el-radio-group>
        <div class="page">
          <i class="el-icon-arrow-left cursorP" @click="prevPage" :class="!page ? 'opacity3' : ''"></i>
          <i class="el-icon-arrow-right cursorP ml-10" @click="nextPage"></i>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" size="small" @click="modalClick">{{$t('btn').cancel}}</el-button>
        <el-button type="primary" size="small" @click="selectAddress">{{$t('btn').confirm}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style lang="scss">
.tab-box {
  width: 100%;max-width: size(800);
  .el-tabs__header {
    width: 30%;max-width: size(240);
    .el-tabs__item {
      height: size(60);text-align: left;font-weight: bold;
    }
  }
}
.selectType_contTitle {
  margin-bottom: size(30);
  .title {
    text-align: center;font-size: size(24);font-weight: bold;color:#333;
  }
}
.selectType_contTip {
  width: 80%;padding: 10px;border: 1px solid #ea4b40;background: rgba(255,68,8,.1);color: #ea4b40;margin: auto;
}
.selectAddr_type{
  width:100%;
}

.selectType_contentBox {
  $inputH: 40;padding: 0 size(15);
  .selectType_KSbtn{
    width:100%;height:size($inputH);position:relative;text-align:center;line-height: size($inputH);background:#409EFF;cursor: pointer;border-radius: size(4);margin:auto;
    .p{color:#fff;font-size:size(14);font-weight:bold;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;padding:0 15px;}
    .file{position:absolute;top:0;left:0;width:100%;height:100%;opacity: 0;cursor: pointer;}
  }
  .selectType_contTnput {
    width:100%;height:size($inputH);line-height: size($inputH);
    .input{width:100%;height:100%;font-size:16px;font-weight:bold;text-align:center;border-radius: size(4);}
  }
}
</style>

<script>
import wallet from '@/assets/js/wallets/ethereum/wallet'
import {getAddressArr as ledger} from '@/assets/js/wallets/ledger/index.js'
import {getAddressArr as trezor} from '@/assets/js/wallets/trezor/index.js'
export default {
  name: 'login',
  data () {
    return {
      activeTabs: 'ledger',
      loading: {
        init: false
      },
      eDialog: {
        addr: false,
        path: false
      },
      addrList: [],
      password: '',
      privateKey: '',
      walletInfo: '',
      fileData: '',
      selectAddr: '',
      page: 0,
      isShowTip: true,
      showPwdBtn: false,
      HDPath: "m/44'/46688'/0'/0"
      // ledgerPath: "m/44'/60'/0",
      // trezorPath: "m/44'/60'/0'/0",
      // trezorTestnetPath: "m/44'/1'/0'/0",
      // trezorTestnetPath: "m/44'/46688'/0'/0",
      // trezorTestnetPath: "m/44'/46688'/1'/0",
      // trezorTestnetPath: "m/44'/1'/0'/0",
    }
  },
  mounted () {
    if (location.protocol === 'https:' && navigator.userAgent.indexOf('Chrome') !== -1) {
      this.isShowTip = false
    }
  },
  methods: {
    modalClick () {
      this.eDialog.addr = false
      this.eDialog.path = false
      this.page = 0
      this.addrList = []
      this.password = ''
      this.privateKey = ''
      this.walletInfo = ''
      this.fileData = ''
      this.showPwdBtn  = false
      this.selectAddr = ''
      document.getElementById("fileName").innerHTML = this.$t('btn').SELECT_WALLET_FILE
      document.getElementById("fileUpload").value = ''
    },
    openHDwallet () {
      if (this.activeTabs === 'ledger') {
        this.inputLEDGERBtn()
      } else if (this.activeTabs === 'trezor') {
        this.inputTREZORBtn()
      }
    },
    inputLEDGERBtn () {
      this.loading.init = true
      ledger(this.HDPath, this.page).then(res => {
        this.eDialog.path = false
        this.setAddr(res)
      })
    },
    inputTREZORBtn () {
      this.loading.init = true
      trezor(this.HDPath, this.page).then(res => {
        this.eDialog.path = false
        this.setAddr(res)
      })
    },
    prevPage () {
      if (!this.page) return
      this.page --
      this.changeAddr()
    },
    nextPage () {
      this.page ++
      this.changeAddr()
    },
    changeAddr () {
      if (this.activeTabs === 'ledger') {
        this.inputLEDGERBtn()
      } else if (this.activeTabs === 'trezor') {
        this.inputTREZORBtn()
      }
    },
    setAddr (res) {
      console.log(res)
      if (res.msg === 'Success') {
        this.addrList = res.info
        this.eDialog.addr = true
      } else {
        this.msgError(res.error)
      }
      this.loading.init = false
    },
    selectAddress () {
      if (!this.selectAddr) {
        this.msgError(this.$t('warn').w_2)
        return
      }
      for (let obj of this.addrList) {
        if (obj.addr === this.selectAddr) {
          this.$store.commit("setHDPath", obj.path)
          break
        }
      }
      this.unlockWallet(this.selectAddr)
    },
    fileUpChange (event) {
      let reader = new FileReader()
      let fileNameID = document.getElementById("fileName")
      this.password = ""
      let fileName = event.target.files[0].name
      reader.onload = onLoadEvent => {
        this.fileData = onLoadEvent.currentTarget.result
        this.showPwdBtn = this.$$.walletRequirePass(this.fileData)
        if (this.showPwdBtn) {
          fileNameID.innerHTML = fileName
        } else {
          fileNameID.innerHTML = this.$t('btn').SELECT_WALLET_FILE
        }
      }
      reader.readAsText(event.target.files[0])
    },
    inputFileBtn () {
      try{
        this.walletInfo = wallet.getWalletFromPrivKeyFile(
          this.fileData,
          this.password
        )
        console.log(this.walletInfo.getPrivateKeyString())
        this.$store.commit("setKeystore", this.fileData)
        this.unlockWallet(this.walletInfo.getChecksumAddressString())
      } catch (e) {
        this.msgError(e)
      }
    },
    inputPwdBtn () {
      try {
        this.walletInfo = new wallet(new Buffer(this.$$.fixPkey(this.privateKey), "hex"))
        this.unlockWallet(this.walletInfo.getChecksumAddressString())
      } catch (e) {
        this.msgError(e)
      }
    },
    unlockWallet (address) {
      this.$store.commit("setAddress", address)
      this.$store.commit("setWalletType", this.activeTabs)
      this.toUrl('/account')
    },
    changePrv (e) {
      this.showPwdBtn = true
      if (e.which === 13) {
        this.inputPwdBtn()
      }
    },
    changePwd (e) {
      this.showPwdBtn = true
      if (e.which === 13) {
        this.inputFileBtn()
      }
    },
  }
}
</script>