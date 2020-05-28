import swapABI from '@/config/swapABI.js'

export const swapTokenContract = {
  getSwapContract (url) {
    return new Promise(resolve => {
      this.$axios.post(url, {
        id:0,
        jsonrpc:"2.0",
        method:"swap.GetServerInfo",
        params:[]
      }).then(res => {
        // console.log(res)
        let data = res.data.result
        resolve({
          swapInfo: data.DestToken,
          contract: new this.$$.web3.eth.Contract(swapABI, data.DestToken.ContractAddress)
        })
      })
    })
  }
}