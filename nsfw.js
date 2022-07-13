const axios = require("axios");
const tf = require('@tensorflow/tfjs-node')
const nsfw = require('nsfwjs')
const { banUser } = require("./utils");
const nsfwCheck = async (url) => {
    const pic = await axios.get(url, {
        responseType: 'arraybuffer',
    })
    const model = await nsfw.load() // To load a local model, nsfw.load('file://./path/to/model/')
    // Image must be in tf.tensor3d format
    // you can convert image to tf.tensor3d with tf.node.decodeImage(Uint8Array,channels)
    const image = await tf.node.decodeImage(pic.data,3)
    const predictions = await model.classify(image)
    image.dispose() // Tensor memory must be managed explicitly (it is not sufficient to let a tf.Tensor go out of scope for its memory to be released).
    return predictions
}

const photoNSFWCheck = (url, reaction = ()=>undefined)=>{
    console.log(url)
    let predict = ""
        nsfwCheck(url).then(async value => {
            predict = value[0].className
            console.log(predict)
            if (!["Neutral", "Drawing"].includes(predict)){
                await reaction(predict)
            }
        })
    return predict
}

module.exports = {
    photoNSFWCheck
}