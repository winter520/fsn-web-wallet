<template>
  <div class="boxContent main-box">
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
        </ul>
      </div>
      <div class="flex-ec">
        <language></language>
        <div class="headerTop_serBox">
          <img src="@/assets/img/wifi.png" class="wifi">
          <i class="arrow"></i>
          <el-select v-model="network" @change="changNetwork" class="select">
            <el-option
              v-for="item in networkOPtion"
              :key="item.url"
              :label="item.name"
              :value="item.url"
              no-data-text="Custom"
            >
            </el-option>
          </el-select>
        </div>
      </div>
    </header>
    <section class="main-contain">
      <router-view></router-view>
      <footer>

      </footer>
    </section>
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
      ],
      newsActive: '',
      network: this.$$.serverURL
    }
  },
  components: {language},
  watch: {
    '$route' (cur) {
      this.newsView(cur)
    },
  },
  mounted () {
    this.changNetwork()
    this.newsView(this.$route)
  },
  methods: {
    changNetwork () {
      this.$$.web3.setProvider(this.network)
      localStorage.setItem('network', this.network)
    },
    newsView (cur) {
      if (cur.path.indexOf('register') !== -1) {
        this.newsActive = 'createWt'
      } else if (cur.path === '/') {
        this.newsActive = 'importWt'
      } else if (cur.path.indexOf('account') !== -1) {
        this.newsActive = 'account'
      } else {
        this.newsActive = 0
      }
    },
    openUrl (url) {
      this.$store.commit("setAddress", "")
      this.$store.commit("setKeystore", "")
      this.$store.commit("setWalletType", "")
      this.toUrl(url)
    }
  }
}
</script>