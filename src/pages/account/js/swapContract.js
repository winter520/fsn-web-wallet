import swapABI from '@/config/swapABI.js'

export const swapTokenContract = {
  getSwapContract (url) {
    return new Promise(resolve => {
      resolve({
        swapInfo: {
          BlockChain: "Fusion",
          Confirmations: 0,
          ContractAddress: "0x309f6c1ebff14a7231e7d9ff78a5199b6810d946",
          DcrmAddress: "0x3CC9072c7ddE719d03594af7915cc2d5B4d053cb",
          Decimals: 8,
          Description: "cross chain bridge BTC with mBTC",
          MaximumSwap: 100,
          MinimumSwap: 0.00001,
          Name: "SMPC Bitcoin",
          NetID: "Testnet",
          SwapFeeRate: 0.001,
          Symbol: "mBTC"
        },
        contract: new this.$$.web3.eth.Contract(swapABI, "0x309f6c1ebff14a7231e7d9ff78a5199b6810d946")
      })
      // this.$axios.post(url, {
      //   id:0,
      //   jsonrpc:"2.0",
      //   method:"swap.GetServerInfo",
      //   params:[]
      // }).then(res => {
      //   console.log(res)
      //   let data = res.data.result
      //   resolve({
      //     swapInfo: data.DestToken,
      //     contract: new this.$$.web3.eth.Contract(swapABI, data.DestToken.ContractAddress)
      //   })
      // })
    })
  }
}