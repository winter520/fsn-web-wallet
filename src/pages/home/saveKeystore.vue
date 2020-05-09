<template>
  <div class="boxConntent1 container flex-c">
    <div class="newwallet_box">
      <div class="contTip_box">
        <hgroup class="contTip_title flex-c">
          <h3 class="title" v-html="$t('title').SAVE_LEYSTORE_FILE"></h3>
        </hgroup>
        <div class="contTip_btn flex-c">
          <a class="btn flex-c cursorP" :download="ksObj.name" :href="ksObj.url" @click="downloadChange">{{$t('btn').DOWNLOAD_KEYSTORE}}</a>
        </div>
      </div>

      <div class="contTip_box">
        <hgroup class="contTip_title noborder">
          <p class="p" v-html="$t('SAVE_KEYSTORE_TIP').SAVE_KEYSTORE_TIP_0">
          </p>
        </hgroup>
        <div class="contTip_btn flex-c">
          <button class="btn flex-c red" @click="goBackupWallet" id="understandBtn" disabled="disabled">{{$t('btn').UNDERSTAND_CONTINUE}}</button>
        </div>
      </div>
      <div class="contTip_p">
        <p v-html="$t('SAVE_KEYSTORE_TIP').SAVE_KEYSTORE_TIP_1">
        </p>
      </div>
    </div>
  </div>
</template>

<style>
.contTip_box{width:100%;padding:30px;}
.contTip_title{text-align:center;padding:0px 0;}
.contTip_title .title{font-size:36px;color:#333;height:138px;width:100%;border-bottom: 2px solid #eee;}
.contTip_title .title span{color:#c7254e;background-color: #f9f2f4;padding:0 5px;}
.contTip_title .p{font-size:16px;color:#333;font-weight:300;text-align:center;}
.contTip_btn{margin-top:50px;}
.contTip_btn .btn{width:482px;height:40px;background:#2f7cd7;color:#fff;border-radius: 0;}
.contTip_btn .red{width:260px;background:#ea4b40;}
.contTip_p{font-size:14px;color:#999999;width:100%;text-align:center;padding:30px 0}
</style>

<script>
export default {
  name: "saveKeystore",
  data () {
    return {
    }
  },
  computed: {
    ksObj () {
      return this.$store.state.ksObj
    }
  },
  mounted () {
    if (!this.ksObj.url) {
      history.go(-1)
    }
  },
  methods: {
    goBackupWallet () {
      this.$router.push("/")
    },
    downloadChange () {
      document.getElementById("understandBtn").removeAttribute("disabled")
    }
  }
}
</script>
