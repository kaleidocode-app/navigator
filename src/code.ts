figma.showUI(__html__, { width: 400, height: 250});

let ref = []
const nodes = figma.currentPage.findAll()

nodes.forEach(nodes => {
  let children = (nodes as VectorNode)
  if (children.fillStyleId){
    let styleId = (nodes as VectorNode).fillStyleId
    let styleName = figma.getStyleById(String(styleId)).name
    let styleParent = ""
    if (styleName.includes("/")){
      styleParent = styleName.substr(0, styleName.indexOf('/')); 
      styleName = styleName.substring(styleName.indexOf("/") + 1)
    }
    let colors = children.fills[0].color
    let styleColor = findTheHEX(colors.r, colors.g, colors.b)
    ref.push({name: styleName, color: styleColor, parent: styleParent})
  }
})

figma.ui.postMessage({ type: 'loadThemes', themes: [ref] })


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