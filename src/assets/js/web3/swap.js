const Web3 = require('web3')
let web3 = new Web3()


web3.extend({
  property: 'swap',
  methods: [
    {
      name: 'Swapin',
      call: 'swap.Swapin',
      params: 1,
      inputFormatter: [null],
      outputFormatter: null
    },
    {
      name: 'GetSwapin',
      call: 'swap.GetSwapin',
      params: 1,
      inputFormatter: [null],
      outputFormatter: null
    },
    {
      name: 'GetSwapinHistory',
      call: 'swap.GetSwapinHistory',
      params: 1,
      inputFormatter: [null],
      outputFormatter: null
    },
    {
      name: 'GetServerInfo',
      call: 'swap.GetServerInfo',
      params: 0,
      inputFormatter: [],
      outputFormatter: null
    }
  ]
})

export default web3