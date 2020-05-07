// const path = require("path").resolve(".")
// const pathLink = path

const Web3 = require('web3')
import config from '@/config/index'
// console.log(config)
let web3

try {
  web3 = new Web3(new Web3.providers.HttpProvider(config.serverURL))
} catch (error) {
  web3 = new Web3()
}

web3.extend({
  property: 'fsn',
  methods: [
    {
      name: 'getTimeLockBalance',
      call: 'fsn_getTimeLockBalance',
      params: 1,
      inputFormatter: [null],
      outputFormatter: null
    },
    {
      name: 'getAllTimeLockBalances',
      call: 'fsn_getAllTimeLockBalances',
      params: 2,
      inputFormatter: [null, null],
      outputFormatter: null
    },
    {
      name: 'genAsset',
      call: 'fsntx_genAsset',
      params: 1,
      inputFormatter: [null],
      outputFormatter: null
    },
    {
      name: 'sendAsset',
      call: 'fsntx_sendAsset',
      params: 1,
      inputFormatter: [null],
      outputFormatter: null
    },
    {
      name: 'getAllBalances',
      call: 'fsn_getAllBalances',
      params: 2,
      inputFormatter: [null, null],
      outputFormatter: null
    },
    {
      name: 'getLatestNotation',
      call: 'fsn_getLatestNotation',
      params: 1,
      inputFormatter: [null],
      outputFormatter: null
    },
    {
      name: 'genNotation',
      call: 'fsntx_genNotation',
      params: 1,
      inputFormatter: [null],
      outputFormatter: null
    },
    {
      name: 'getNotation',
      call: 'fsn_getNotation',
      params: 2,
      inputFormatter: [null, null],
      outputFormatter: null
    },
    {
      name: 'getAddressByNotation',
      call: 'fsn_getAddressByNotation',
      params: 2,
      inputFormatter: [null, null],
      outputFormatter: null
    },
    {
      name: 'getAsset',
      call: 'fsn_getAsset',
      params: 2,
      inputFormatter: [null, null],
      outputFormatter: null
    },
    {
      name: 'getBalance',
      call: 'fsn_getBalance',
      params: 3,
      inputFormatter: [null, null, null],
      outputFormatter: null
    },
    {
      name: 'getAddressByNotation',
      call: 'fsn_getAddressByNotation',
      params: 2,
      inputFormatter: [null, null],
      outputFormatter: null
    }
  ]
})



web3.extend({
  property: "fsntx",
  methods: [
    {
      name: "genAsset",
      call: "fsntx_genAsset",
      params: 1,
      inputFormatter: null
    },
    {
      name: "buildGenNotationTx",
      call: "fsntx_buildGenNotationTx",
      params: 1,
      inputFormatter: null
    },
    {
      name: "buildSendAssetTx",
      call: "fsntx_buildSendAssetTx",
      params: 1,
      inputFormatter: null
    },
    {
      name: "buildAssetToTimeLockTx",
      call: "fsntx_buildAssetToTimeLockTx",
      params: 1,
      inputFormatter: null
    },
    {
      name: "buildTimeLockToTimeLockTx",
      call: "fsntx_buildTimeLockToTimeLockTx",
      params: 1,
      inputFormatter: null
    },
    {
      name: "buildTimeLockToAssetTx",
      call: "fsntx_buildTimeLockToAssetTx",
      params: 1,
      inputFormatter: null
    },
    {
      name: "timeLockToTimeLock",
      call: "fsntx_timeLockToTimeLock",
      params: 1,
      inputFormatter: null
    },
    {
      name: "timeLockToAsset",
      call: "fsntx_timeLockToAsset",
      params: 1,
      inputFormatter: null
    },
    {
      name: "sendRawTransaction",
      call: "fsntx_sendRawTransaction",
      params: 1,
      inputFormatter: null
    },
  ]
})

export default web3