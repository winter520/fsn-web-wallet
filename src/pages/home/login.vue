<template>
  <div class="boxConntent1 container flex-c">
    <div class="tab-box">
      <el-tabs tab-position="left">
        <el-tab-pane label="Ledger Wallet">
          <hgroup class="selectType_contTitle">
            <h3 class="title">Ledger Hardware Wallet</h3>
          </hgroup>
          <div class="selectType_contentBox">
            <div class="createInfo_btn flex-c">
              <el-button class="W240 mt-10" @click="inputLEDGERBtn" type="primary">{{$t('btn').ledger}}</el-button>
            </div>
          </div>
          <div class="selectType_contTip" v-if="isShowTip">
            {{$t('tip').net}}
          </div>
        </el-tab-pane>
        <el-tab-pane label="TREZOR">
          <hgroup class="selectType_contTitle">
            <h3 class="title">TREZOR Hardware Wallet</h3>
          </hgroup>
          <div class="selectType_contentBox">
            <div class="createInfo_btn flex-c">
              <el-button class="W240 mt-10" @click="inputTREZORBtn" type="primary">{{$t('btn').trezor}}</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Keystore / JSON File">角色管理</el-tab-pane>
        <el-tab-pane label="Private Key">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
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
</style>

<script>
import {getAddressArr as ledger} from '@/assets/js/wallets/ledger/index.js'
export default {
  name: 'login',
  data () {
    return {
      isShowTip: true,
      HDPath: "m/44'/1'/0'/0"
    }
  },
  mounted () {
    if (location.protocol === 'https:' && navigator.userAgent.indexOf('Chrome') !== -1) {
      this.isShowTip = false
    }
  },
  methods: {
    inputLEDGERBtn () {
      ledger(this.HDPath).then(res => {
        console.log(res)
      })
    },
    inputTREZORBtn () {

    }
  }
}
</script>