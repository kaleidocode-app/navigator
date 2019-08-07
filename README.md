<div align="center">

<img align="center" height="50" src="https://user-images.githubusercontent.com/35271042/62659451-3f15dc00-b920-11e9-84fe-3901fe978237.png" />

<hr>

A Figma plugin to help find and apply color styles from your current document.

<br>

<img align="center" width="400" src="https://user-images.githubusercontent.com/35271042/62650237-3f57ac80-b90b-11e9-95b9-9ac4277710ff.png" />

</div>

## How to use
Navigator will look through all of the layers in your document and find the ones with color styles. Simply select the layer that you want to apply a color styles to, run Navigator, find your color and select it. You can apply a color style to any vector, line, frame or group.

Note: If you have a large amount of layers in your document, it might take a few seconds longer to load.

You can use this in conjunction with [Chroma](https://www.figma.com/c/plugin/739237058450529919/Chroma) or [Kaleidocode](https://www.figma.com/c/plugin/736060893363678891/Kaleidocode) to create your styles and can keep those frames hidden. Due to limitations with the Figma API, we can only find styles that are on the canvas.

![gif](https://user-images.githubusercontent.com/35271042/62650352-9198cd80-b90b-11e9-8b47-20ca95f32b9b.gif)


## Building from source
This plugin template uses Typescript. If you are familiar with Javascript, Typescript will
look very familiar. In fact, valid Javascript code is already valid Typescript code.

Typescript adds type annotations to variables. This allows code editors such as Visual Studio Code
to provide information about the Figma API while you are writing code, as well as help catch bugs
you previously didn't notice.

For more information, visit https://www.typescriptlang.org/

Using Typescript requires a compiler to convert Typescript (code.ts) into Javascript (code.js)
for the browser to run.

To get the TypeScript compiler working:

1. Download Visual Studio Code if you haven't already: https://code.visualstudio.com/.
2. Install the TypeScript compiler globally: `sudo npm install -g typescript`.
3. Open this directory in Visual Studio Code.
4. Compile TypeScript to JavaScript: Run the "Terminal > Run Build Task..." menu item,
    then select "tsc: watch - tsconfig.json". You will have to do this again every time
    you reopen Visual Studio Code.

That's it! Visual Studio Code will regenerate the JavaScript file every time you save.
