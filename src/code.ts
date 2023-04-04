
figma.showUI(__html__, { width: 400, height: 250});

let ref = []
let counter = []

// Get all local paint styles
const paintStyles = figma.getLocalPaintStyles();

function separateString(str) {
  const parts = str.split("/");
  const var1 = parts[0];
  const var2 = parts[1];
  return [var1, var2];
}


// Log the names of all local paint styles
for (const style of paintStyles) {
  let styleParent
  let styleName
  if (style.name.includes("/")) {
    [styleParent, styleName] = separateString(style.name);
  } else {
    styleName = style.name
  }

  ref.push({
    name: styleName,
    parent: styleParent,
    color: style.paints,
    styles: style.id
  })
}

figma.ui.postMessage({ type: 'loadThemes', themes: [ref] })

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
          case "BOOLEAN_OPERATION":
            (node as VectorNode).fillStyleId = styles
            break;
          case "LINE":
            (node as LineNode).strokeStyleId = styles
            break;
          case "GROUP":
          case "FRAME":
          case "INSTANCE":
          case "COMPONENT":
            node.findAll().forEach(node => {
              switch (node.type) {
                case "VECTOR":
                case "RECTANGLE":
                case "TEXT":
                case "STAR":
                case "ELLIPSE":
                case "POLYGON":
                case "BOOLEAN_OPERATION":
                  (node as VectorNode).fillStyleId = styles
                  break;
                case "LINE":
                  (node as LineNode).strokeStyleId = styles
                  break;
              }
            })
            break;
          default:
            console.log(node)
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