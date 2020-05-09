<template>
  <div class="boxConntent1 container flex-c">
    <div class="newWallet_box">
      <div class="newWallet_title flex-c">
        <h3 class="title">{{$t('title').CREATE_NEW_WALLET}}</h3>
      </div>

      <div class="createInfo_box">
        <div class="createInfo_input">
          <el-input type="password" class="" v-model="password" id="createInfoInput" @keyup="validPwd"></el-input>
        </div>
        <div class="createInfo_danger">{{$t('warn').w_9}}</div>
        <div class="createInfo_btn flex-c">
          <el-button type="primary" @click="changePwd">{{$t('btn').NEXT_STEP}}</el-button>
        </div>
        <hgroup class="createInfo_tip">
          <h1 class="h1">{{$t('CREATE_TIP').CREATE_TIP_0}}</h1>
          <h2 class="h2">{{$t('CREATE_TIP').CREATE_TIP_1}}</h2>
          <h3 class="h3">{{$t('CREATE_TIP').CREATE_TIP_2}}
            <br/>{{$t('CREATE_TIP').CREATE_TIP_3}}
          </h3>
        </hgroup>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.newWallet_box {
  width: 100%;max-width: size(600);margin: auto;
}
.newWallet_title{width:100%;height:size(138);}
.newWallet_title .title{font-size:size(30);color:#333;}

.createInfo_box{width:100%;padding:size(50) 0 size(30);}
.createInfo_danger{width: 100%;text-align:center;font-size:16px;font-weight:bold;color:#d86464;margin-top:12px;}
.createInfo_btn{width:100%;margin-top:42px;}
.createInfo_btn .btn{width:248px;height:40px;border-radius:0;background:#2f7cd7;color:#fff;font-size:16px;}
.createInfo_tip{width:100%;text-align:center;color:#999999;}
.createInfo_tip .h1{font-size:16px;line-height: 24px;margin-top:64px;}
.createInfo_tip .h2{font-size:16px;font-weight:bold;line-height:24px;}
.createInfo_tip .h3{font-size:14px;line-height:21px;margin-top:32px;}
</style>

<script>
export default {
  name: "createWallet",
  data () {
    return {
      password: "",
      walletInit: ""
    }
  },
  mounted () {
  },
  methods: {
    goSaveKeystore () {
      console.log(123)
      this.toUrl("/saveKeystore")
    },
    createKey (pwd) {
      this.walletInit = this.$$.wallet.generate(pwd)
    },
    changePwd () {
      if (this.password.length < 9) {
        this.msgError(this.$t('ERROR_TIP').TIP_0)
      } else {
        this.createKey()
        let walletJSON = this.walletInit.toV3(this.password, {
          kdf: "scrypt",
          n: 8192
        })
        let keyStoreURL = this.$$.getBlob("text/json;charset=UTF-8", walletJSON)
        this.$store.commit("setKsObj", {
          url: keyStoreURL,
          name: this.walletInit.getV3Filename()
        })
        this.goSaveKeystore()
      }
    },
    validPwd (e) {
      if (e.which === 13) {
        this.changePwd()
      }
    }
  }
}
</script>
