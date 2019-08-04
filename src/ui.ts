import './ui.css'
import './list'
// import * as FriendCard from module("./FriendCardJs");

const themeRoot = document.getElementById("styles")

onmessage = (event) => {

    const pluginMessage = event.data.pluginMessage

    if (pluginMessage.type == 'loadThemes') {
        console.log(pluginMessage.themes[0].length)
        pluginMessage.themes[0].forEach(themes => {
            let name = themes.name
            let color = themes.color
            let parent = themes.parent
            let newItem = '<li><a href="#"><div class="color" style="background-color: #'+ color +'"></div><div class="name">'+ name +'</div><div class="parent">'+ parent +'</div></a></li>'
            themeRoot.innerHTML += newItem;
            // themeRoot.parentNode.insertBefore(node, themeRoot.nextSibling)
        })
        // let themeName = 
    }

}

document.getElementById("search").focus()


function search() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    ul = document.getElementById("styles");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        console.log(filter)
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}


document.addEventListener('keyup', function (event) {
    search()
})