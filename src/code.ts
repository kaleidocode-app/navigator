
figma.showUI(__html__, { width: 400, height: 250});

let ref = []
let counter = []

setTimeout(function(){
  const nodes = figma.currentPage.findAll()
  nodes.forEach(nodes => {
    let children = (nodes as VectorNode)
    let styles = children.fillStyleId
    let stylesString = String(styles)
    if (styles && stylesString.startsWith('S:')) {
      let styleId = (nodes as VectorNode).fillStyleId
      let styleName = figma.getStyleById(String(styleId)).name
      let styleParent = ""
      if (styleName.includes("/")) {
        styleParent = styleName.substr(0, styleName.indexOf(' /'));
        styleName = styleName.substring(styleName.indexOf("/") + 2)
      }
      let colors = children.fills[0].color
      let styleColor = findTheHEX(colors.r, colors.g, colors.b)

      for (let [key, value] of Object.entries(ref)) {
        if (value.styles == styleId) {
          // ignore duplicates
          return
        }
      }
      ref.push({ name: styleName, color: styleColor, parent: styleParent, styles: styleId })
    }
  })

  // ref.sort(function (a, b) {
  //   return parseFloat(a.name) - parseFloat(b.name);
  // });
  // ref.sort((one, two) => (one > two ? -1 : 1));
  figma.ui.postMessage({ type: 'loadThemes', themes: [ref] })

}, 100)

figma.ui.onmessage = async msg => {

  if(msg.type === "apply-styles"){
    let styles = msg.styleId
    if(figma.currentPage.selection.length > 0){
      figma.currentPage.selection.forEach(node => {
        console.log(node)
        switch(node.type){
          case "VECTOR":
          case "RECTANGLE":
          case "TEXT":
          case "STAR":
          case "ELLIPSE":
          case "POLYGON":
            (node as VectorNode).fillStyleId = styles
            break;
          case "LINE":
            (node as LineNode).strokeStyleId = styles
            break;
          case "GROUP":
          case "FRAME":
            node.findAll().forEach(node => {
              switch (node.type) {
                case "VECTOR":
                case "RECTANGLE":
                case "TEXT":
                case "STAR":
                case "ELLIPSE":
                case "POLYGON":
                  (node as VectorNode).fillStyleId = styles
                  break;
                case "LINE":
                  (node as LineNode).strokeStyleId = styles
                  break;
              }
            })
            break;
          default:
            figma.ui.postMessage({ type: 'noLayerSelected', isEmpty: true })
            break;
        }
      })
    } else {
      // show notification
      console.log("No layer selected")
      figma.ui.postMessage({ type: 'noLayerSelected', isEmpty: true })
    }
  }
}


function findTheHEX(red: number, green: number, blue: number) {
  var redHEX = rgbToHex(red)
  var greenHEX = rgbToHex(green)
  var blueHEX = rgbToHex(blue)

  return redHEX + greenHEX + blueHEX
}

function rgbToHex(rgb:any) {
  rgb = Math.floor(rgb * 255)
  var hex = Number(rgb).toString(16)
  if (hex.length < 2) {
    hex = '0' + hex
  }
  return hex
}