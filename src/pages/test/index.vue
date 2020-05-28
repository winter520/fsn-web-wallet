<template>
  <div class="boxConntent1 container pt-50 pb-50 flex-c">
    <el-form class="WW50">
      <el-form-item label="RPC:">
        <el-input v-model="netUrl"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="test">Test connection</el-button>
      </el-form-item>
      <el-form-item label="Result:">
        {{result}}
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss">

</style>

<script>
import swapWeb3 from '@/assets/js/web3/swap.js'
import swapABI from '@/config/swapABI.js'
export default {
  name: 'test',
  data () {
    return {
      netUrl: 'http://47.92.168.85:12556/rpc',
      result: ''
    }
  },
  mounted () {
    swapWeb3.setProvider('https://testnet.fsn.dev/api')
    // swapWeb3.setProvider('https://fsn.dev/api')
    // console.log(swapABI)
    console.log(swapWeb3)
    // swapWeb3.eth.defaultAccount = "0xE000E632124aa65B80f74E3e4cc06DC761610583"
    this.$axios.post('http://47.92.168.85:12556/rpc', {
      id:0,
      jsonrpc:"2.0",
      method:"swap.GetServerInfo",
      params:[]
    }).then(res => {
      console.log(res)
      let data = res.data
      const contractId = data.result.DestToken.ContractAddress
      const abi = swapABI
      // const currentAccount = '0x46cbe22b687d4b72c8913e4784dfe5b20fdc2b0e'
      const currentAccount = '0xE000E632124aa65B80f74E3e4cc06DC761610583'
      let TokenContract = new swapWeb3.eth.Contract(abi, contractId)
      console.log(TokenContract)
      // swapWeb3.eth.getBalance(currentAccount).then(res => {
      //   console.log(res)
      // })
      TokenContract.methods.balanceOf(currentAccount).call({from: currentAccount}, (err, res) => {
        if (err) {
          console.log('balanceOf:', err)
        } else {
          console.log('balanceOf：', res)
        }
      })
      // TokenContract.methods.name().call({from: currentAccount}, (err, res) => {
      //   if (err) {
      //     console.log('name：', err)
      //   } else {
      //     console.log('name：', res)
      //   }
      // })
      // TokenContract.methods.symbol().call({from: currentAccount}, (err, res) => {
      //   if (err) {
      //     console.log('symbol：', err)
      //   } else {
      //     console.log('symbol:', res)
      //   }
      // })
      // TokenContract.methods.totalSupply().call({from: currentAccount}, (err, res) => {
      //   if (err) {
      //     console.log('totalSupply:', err)
      //   } else {
      //     console.log('totalSupply:', res)
      //   }
      // })
      // TokenContract.methods.owner().call({from: currentAccount}, (err, res) => {
      //   if (err) {
      //     console.log('owner:', err)
      //   } else {
      //     console.log('owner:', res)
      //   }
      // })
      // TokenContract.methods.transfer(currentAccount, '1000').call().then(res => {
      //   console.log('transfer:', res)
      // })
      console.log(TokenContract.methods.transfer(currentAccount, '1000').encodeABI())
      console.log(TokenContract.methods.Swapout('1000', 'n3NCJ3FgnHiQA4bZXetsgwp1B6V4dEc5g5').encodeABI())
    })
  },
  methods: {
    test () {
      swapWeb3.setProvider(this.netUrl)
      swapWeb3.swap.GetServerInfo().then(res => {
        console.log(res)
        this.result = res
        // this.swapInfo = res.SrcToken
      }).catch(err => {
        console.log(err)
        this.result = err
      })
    }
  }
}
</script>