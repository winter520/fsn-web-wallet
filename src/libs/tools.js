/**
 * @description 生成随机图片
 */
import Identicon from 'identicon.js'
/**
 * @description 二维码
 */
import QRCode from 'qrcodejs2'

export default {
  fromTime (timestamp) {
    if (timestamp.toString().length === 10) {
      timestamp = Number(timestamp) * 1000
    } else if (timestamp.toString().length > 13) {
      timestamp = timestamp.toString().substring(0, 13)
    }
    return Number(timestamp)
  },
  toTime (timestamp) {
    // console.log(timestamp.toString().length)
    if (timestamp.toString().length >= 13) {
      timestamp = timestamp.toString().substring(0, 10)
    }
    return Number(timestamp)
  },
  thousandBit (num, dec = 2) {
    let _num = num = Number(num)
    if (isNaN(num)) {
      num = 0
      num = num.toFixed(dec)
    } else {
      if (isNaN(dec)) {
        if (num.toString().indexOf('.') === -1) {
          num = Number(num).toLocaleString()
        } else {
          let numSplit = num.toString().split('.')
          numSplit[1] = numSplit[1].length > 9 ? numSplit[1].substr(0, 8) : numSplit[1]
          num = Number(numSplit[0]).toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').toLocaleString()
          num = num.toString().split('.')[0] + '.' + numSplit[1]
        }
      } else {
        num = num.toFixed(dec).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').toLocaleString()
      }
    }
    if (_num < 0 && num.toString().indexOf('-') < 0) {
      num = '-' + num
    }
    return num
  },
  timeChange (data) {
    // console.log(data)
    // let time = data.date ? new Date(data.date.toString().length > 10 ? data.date : (Number(data.date) * 1000)) : new Date()
    let time = data.date ? new Date(this.fromTime(data.date)) : new Date()
    let formatType = data.format ? data.format : '/'
    let Y = time.getFullYear()
    let M = (time.getMonth() + 1) < 10 ? ('0' + (time.getMonth() + 1)) : (time.getMonth() + 1)
    let D = time.getDate() < 10 ? ('0' + time.getDate()) : time.getDate()
    let h = time.getHours() < 10 ? ('0' + time.getHours()) : time.getHours()
    let m = time.getMinutes() < 10 ? ('0' + time.getMinutes()) : time.getMinutes()
    let s = time.getSeconds() < 10 ? ('0' + time.getSeconds()) : time.getSeconds()
    // console.log(Date.parse(data.date))
    // console.log(new Date(Date.parse(data.date)).getDate())
    if (data.type === 'yyyy-mm-dd') {
      time = Y + formatType + M + formatType + D
    } else if (data.type === 'yyyy-mm-dd hh:mm') {
      time = Y + formatType + M + formatType + D + ' ' + h + ':' + m
    } else if (data.type === 'yyyy-mm-dd hh:mm:ss') {
      time = Y + formatType + M + formatType + D + ' ' + h + ':' + m + ':' + s
    } else if (data.type === 'yyyy-mm-dd hh') {
      time = Y + formatType + M + formatType + D + ' ' + h
    } else if (data.type === 'yyyy-mm') {
      time = Y + formatType + M
    } else if (data.type === 'yyyy') {
      time = Y
    }
    return time
  },
  walletRequirePass (ethjson) {
    let jsonArr
    try {
      jsonArr = JSON.parse(ethjson)
    } catch (err) {
      let errtxt1 = 'This is not a valid wallet file. '
      throw errtxt1
    }
    if (jsonArr.encseed != null) {
      return true
    } else if (jsonArr.Crypto != null || jsonArr.crypto != null) {
      return true
    } else if (jsonArr.hash != null && jsonArr.locked) {
      return true
    } else if (jsonArr.hash != null && !jsonArr.locked) {
      return false
    } else if (jsonArr.publisher === 'MyEtherWallet' && !jsonArr.encrypted) {
      return false
    } else {
      let errtxt2 = 'Sorry! We don\'t recognize this type of wallet file. '
      throw errtxt2
    }
  },
  fixPkey (key) {
    if (key.indexOf('0x') === 0) {
      return key.slice(2)
    }
    return key
  },
  createImg (hex) {
    let imgData = new Identicon(hex).toString()
    let imgInfo = 'data:image/png;base64,' + imgData // 这就是头像的base64码
    return imgInfo
  },
  qrCode (cont, id) {
    document.getElementById(id).innerHTML = ''
    let qrcodeInit = new QRCode(id, {
      width: 200,
      height: 200, // 高度
      text: cont, // 二维码内容
      // render: "canvas" // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
      background: "none",
      correctLevel: 3
      // foreground: "#ff0"
    })
  },
  cutOut (str, start, end) {
    // console.log(str)
    if (!str) return ''
    var str1 = str.substr(0, start)
    var str2 = str.substr(str.length - end)
    return str = str1 + '…' + str2
  },
  getBlob (mime, str) {
    var _typeof = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol' ? function (obj) {
      return typeof obj
    } : function (obj) {
      return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj
    }
    var str1 = (typeof str === 'undefined' ? 'undefined' : _typeof(str)) === 'object' ? JSON.stringify(str) : str
    if (str1 == null) return ''
  
    let blob
    try {
      blob = new Blob([str1], {type: mime})
    } catch (e) {
      // TypeError old chrome and FF
      let BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder
      if (e.name === 'TypeError' && window.BlobBuilder) {
        blob = new BlobBuilder()
        blob.append([str1.buffer])
        blob = blob.getBlob(mime)
      } else {
        let tip = 'Browser does not support'
        alert(tip)
        throw tip
      }
    }
    return window.URL.createObjectURL(blob)
  }
}