<template>
  <div class="boxContent main-box">
    <header class="header-box flex-bc">
      <div class="flex-sc">
        <div class="logo"><img src="@/assets/img/logo/fsn-logo.svg"></div>
        <div>

        </div>
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
      network: this.$$.serverURL
    }
  },
  components: {language},
  mounted () {
    this.changNetwork()
  },
  methods: {
    changNetwork () {
      this.$$.web3.setProvider(this.network)
      localStorage.setItem('network', this.network)
    }
  }
}
</script>