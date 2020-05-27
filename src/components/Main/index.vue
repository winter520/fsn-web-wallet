<template>
  <div class="boxContent main-box" v-if="isReload">
    <header class="header-box flex-bc">
      <div class="flex-sc">
        <div class="logo"><img src="@/assets/img/logo/fsn-logo.svg"></div>
        <ul class="header-nav-box flex-sc">
          <li class="item flex-c" :class="newsActive === 'account' ? 'active' : ''" v-if="$store.state.address" @click="toUrl('/account')">
            {{$t('nav').assets}}
          </li>
          <li class="item flex-c" :class="newsActive === 'importWt' ? 'active' : ''" @click="openUrl('/')">
            {{$t('nav').importWt}}
          </li>
          <li class="item flex-c" :class="newsActive === 'createWt' ? 'active' : ''" @click="openUrl('/register')">
            {{$t('nav').createWt}}
          </li>
          <li class="item flex-c" :class="newsActive === 'test' ? 'active' : ''" @click="openUrl('/test')">
            Test
          </li>
        </ul>
      </div>
      <div class="flex-ec">
        <i class="el-icon-refresh-right mr-10 cursorP" @click="refresh"></i>
        <language @changeLang="refresh"></language>
        <div class="headerTop_serBox">
          <img src="@/assets/img/wifi.png" class="wifi">
          <i class="arrow"></i>
          <el-select v-model="network.id" @change="changNetwork" class="select">
            <el-option
              v-for="(item, index) in networkOPtion"
              :key="index"
              :label="item.name"
              :value="index"
              no-data-text="Custom"
            >
            </el-option>
            <!-- <el-option value="3">{{$t('label').custom}}</el-option> -->
          </el-select>
        </div>
      </div>
    </header>
    <section class="main-contain">
      <router-view></router-view>
      <footer>

      </footer>
    </section>

    <el-dialog :title="$t('title').custom" :visible.sync="eDialog.custom" width="300" :before-close="modalClick" :close-on-click-modal="false" :modal-append-to-body='false'>
      <div>
        <el-form>
          <el-form-item label="URL">
            <el-input v-model="network.url"></el-input>
          </el-form-item>
          <el-form-item label="ChainID">
            <el-input v-model="network.chainID"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" size="small" @click="cancelCustomNet">{{$t('btn').cancel}}</el-button>
        <el-button type="primary" size="small" @click="setNetWork">{{$t('btn').confirm}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style lang="scss">
$HeaderH: 60;
.main-box {
  padding-top: size($HeaderH);
}
.header-box {
  width: 100%;height: size($HeaderH);position: absolute;top:0;left: 0;right: 0;border-bottom: size(1) solid #ddd;padding: 0 size(15);
  .logo  {
    height: size($HeaderH);padding:size(10) size(0);
    img {
      height: 100%;
    }
  }
}
.header-nav-box {
  margin-left: size(20);height: 100%;
  .item {
    height: size($HeaderH);font-size:size(14);color: #666666;border-bottom: size(3) solid transparent;padding: size(3) size(15) 0;cursor:pointer;
    &.active {
      color: #409EFF;border-bottom: size(3) solid #409EFF;
    }
  }
}
.headerTop_serBox{
  width:215px;height:40px;position: relative;
  .wifi{width: 13px;height:10px;position: absolute;left:28px;top:16px;}
  .select{
    width:100%;height:100%;border-radius:20px;padding:0 52px;color:#666666;position: absolute;top:0;left: 0;background:none;border:1px solid #706e9f;
    .el-input__inner{border: none;height: 38px;padding:0;}
    .el-input__suffix{display:none}
  }
  .arrow{width:0;height:0;display:block;border-top:6.5px solid #706e9f;border-left:4px solid transparent;border-right:4px solid transparent;position: absolute;top:19px;right:40px;}
}
.main-contain {
  width: 100%;height: 100%;position: absolute;top:size($HeaderH);left: 0;right: 0;bottom: 0;overflow: auto;
}
</style>

<script>
import language from '@c/language/index.vue'
export default {
  name: 'mainPage',
  data () {
    return {
      networkOPtion: [
        {name: 'Mainnet', url: 'https://fsn.dev/api'},
        {name: 'Testnet', url: 'https://testnet.fsn.dev/api'},
        {name: 'Custom', url: ''},
      ],
      newsActive: '',
      network: {
        id: localStorage.getItem('networkID') ? Number(localStorage.getItem('networkID')) : 0,
        url: localStorage.getItem('network') ? localStorage.getItem('network') : this.$$.serverURL,
        chainID: localStorage.getItem('chainID') ? localStorage.getItem('chainID') : '32659',
      },
      isReload: true,
      eDialog: {
        custom: false
      }
    }
  },
  components: {language},
  watch: {
    '$route' (cur) {
      this.newsView(cur)
    },
    // networkUrl (nodeUrl) {
    //   let chainID = this.$$.web3.utils.toHex('32659')
    //   if ( nodeUrl === 'https://testnet.fsn.dev/api') {
    //     chainID = this.$$.web3.utils.toHex('46688')
    //   }
    //   this.$store.commit("setChainID", chainID)
    // }
  },
  computed: {
    networkUrl () {
      return this.$store.state.network
    }
  },
  mounted () {
    this.setNetWork()
    this.newsView(this.$route)
  },
  methods: {
    modalClick () {
      this.eDialog.custom = false
    },
    cancelCustomNet () {
      this.modalClick()
      this.network.id = 0
      this.changNetwork()
    },
    changNetwork () {
      if (this.network.id === 2) {
        this.eDialog.custom = true
      } else {
        this.network.url = this.networkOPtion[this.network.id].url
        let chainID = '32659'
        if ( this.network.url === 'https://testnet.fsn.dev/api') {
          chainID = '46688'
        }
        this.network.chainID = chainID
        this.setNetWork()
      }
    },
    setNetWork () {
      this.$$.web3.setProvider(this.network.url)
      localStorage.setItem('network', this.network.url)
      localStorage.setItem('networkID', this.network.id)
      localStorage.setItem('chainID', this.network.chainID)
      this.$store.commit("setNetwork", this.network.url)
      this.$store.commit("setChainID", this.$$.web3.utils.toHex(this.network.chainID))
      this.refresh()
      this.modalClick()
    },
    newsView (cur) {
      if (cur.path.indexOf('register') !== -1) {
        this.newsActive = 'createWt'
      } else if (cur.path === '/') {
        this.newsActive = 'importWt'
      } else if (cur.path.indexOf('account') !== -1) {
        this.newsActive = 'account'
      } else if (cur.path.indexOf('test') !== -1) {
        this.newsActive = 'test'
      } else {
        this.newsActive = 0
      }
    },
    openUrl (url) {
      this.$store.commit("setAddress", "")
      this.$store.commit("setKeystore", "")
      this.$store.commit("setWalletType", "")
      this.toUrl(url)
    },
    refresh () {
      this.isReload = false
      this.$nextTick(() => {
        this.isReload = true
      })
    }
  }
}
</script>