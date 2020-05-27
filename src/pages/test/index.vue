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
    })
    const abi = swapABI
    // const currentAccount = '0x46cbe22b687d4b72c8913e4784dfe5b20fdc2b0e'
    const currentAccount = '0xE000E632124aa65B80f74E3e4cc06DC761610583'
    const contractId = '0x309f6c1ebff14a7231e7d9ff78a5199b6810d946'
    // let contractId = '0xE000E632124aa65B80f74E3e4cc06DC761610583';
    let TokenContract = new swapWeb3.eth.Contract(abi, contractId, {
      from: currentAccount, // default from address
      gasPrice: '10000000000' // default gas price in wei, 10 gwei in this case
    })
    console.log(TokenContract)
    swapWeb3.eth.getBalance(currentAccount).then(res => {
      console.log(res)
    })
    TokenContract.methods.balanceOf(contractId).call({from: currentAccount}, (err, res) => {
      console.log(err)
      console.log(res)
    })
    // TokenContract.methods.name().call({from: currentAccount}, (err, res) => {
    //   console.log(err)
    //   console.log(res)
    // })
    // TokenContract.methods.symbol().call({from: currentAccount}, (err, res) => {
    //   console.log(err)
    //   console.log(res)
    // })
    // TokenContract.methods.totalSupply().call({from: currentAccount}, (err, res) => {
    //   console.log(err)
    //   console.log(res)
    // })
    // console.log(TokenContract.methods.transfer('0xE000E632124aa65B80f74E3e4cc06DC761610583', '1000').encodeABI())
    // TokenContract.methods.transfer('0xE000E632124aa65B80f74E3e4cc06DC761610583', '1000').call().then(res => {
    //   console.log(res)
    // })
    // let mytt = TokenContract.at(contractId);

    // // 查询余额
    // let ret = mytt.balanceOf("0xE000E632124aa65B80f74E3e4cc06DC761610583");
    // console.log(ret)
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