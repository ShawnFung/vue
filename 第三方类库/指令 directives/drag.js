/**
 * 拖动
 */

export default {
  bind(el, binding) {
    const boxHeader = el.querySelector('.el-dialog__header')
    const dragElement = el.querySelector('.el-dialog')

    let disX = 0
    let disY = 0

    boxHeader.style.cssText += ';cursor:move;'

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null)
    const getStyle = (function() {
      if (window.document.currentStyle) {
        return (dom, attr) => dom.currentStyle[attr]
      } else {
        return (dom, attr) => getComputedStyle(dom)[attr]
      }
    })()

    boxHeader.onmousedown = function (e) {
      let ev = e || window.event;
      disX = ev.clientX - boxHeader.offsetLeft
      disY = ev.clientY - boxHeader.offsetTop

      let styleL = getStyle(dragElement, 'left')
      let styleT = getStyle(dragElement, 'top')

      //获取不带单位的值
      if (styleL.includes('%')) {
        styleL = +document.body.clientWidth * (+styleL.replace(/\%/g, '') / 100)
        styleT = +document.body.clientHeight * (+styleT.replace(/\%/g, '') / 100)
      } else {
        styleL = +styleL.replace(/\px/g, '')
        styleT = +styleT.replace(/\px/g, '')
      }

      document.onmousemove = function(e){
        let ev = e || window.event;

        let left = ev.clientX - disX
        let top = ev.clientY - disY

        dragElement.style.cssText += `;left:${left + styleL}px;top:${top + styleT}px;`
      }
      
      document.onmouseup = function () {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
}
