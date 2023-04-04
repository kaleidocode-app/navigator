import './ui.css'
import './list'
// import * as FriendCard from module("./FriendCardJs");

const themeRoot = document.getElementById("styles")
let timer:any

onmessage = (event) => {

    const pluginMessage = event.data.pluginMessage

    if (pluginMessage.type == 'loadThemes') {

        document.getElementById("loader").remove()

        let counter = pluginMessage.themes[0].length

        pluginMessage.themes[0].forEach((themes:any, index:number) => {
            if(themes.color[0].type === "SOLID"){
                let name = themes.name
                let color = findTheHEX(themes.color[0].color.r, themes.color[0].color.g, themes.color[0].color.b)
                let parent = themes.parent
                let styleId = themes.styles
                let newItem = '<li data-id="' + styleId +'" class="style-item"><a href="#"><div class="color" style="background-color: #'+ color +'"></div><div class="name">'+ name +' </div><div class="parent">'+ parent +'</div></a></li>'
                themeRoot.innerHTML += newItem;
                if((index+1) === counter){
                    setTimeout(function(){
                        startListening()
                    }, 100)
                }
            }
        })


    } else if (pluginMessage.type == 'noLayerSelected'){
        clearTimeout(timer)
        let notification = document.getElementById('notification')
        notification.className = "show"
        timer = setTimeout(function(){
            notification.className = ""
        }, 3000)
    }

}

document.getElementById("search").focus()


document.addEventListener('keyup', function () {

    var input:any, filter:any, ul:any, li:any, a:any, i:any, txtValue:any;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    ul = document.getElementById("styles");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
})

function startListening(){
    document.getElementById("styles").addEventListener('click', function(e){
        let target = <HTMLElement>e.target
        let styleId = String(target.getAttribute('data-id'))

        parent.postMessage({ pluginMessage: { type: 'apply-styles', styleId }}, '*')

    })

}

function findTheHEX(red:any, green:any, blue:any) {
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