
const VkBot = require('node-vk-bot-api')
const {photoNSFWCheck} = require("./nsfw");
const { banUser } = require("./utils");


let banWord = /nigger|пидор|pidor|черные|чёрные|ч([её])рный|негр|гей|геи|дмитрий|рофл|глад валакас|55205/g

const bot = new VkBot("");

const defaultReactionNSFW = async(ctx, predict) => await banUser(ctx, bot,`Я ВИЖУ ЗДЕСЬ КАКУЮ-ТО ЕБЛЮ, СЪЕБИ В БАРАК ЧУЧЕЛО ${predict}`)

bot.use(async (ctx, next) => {
    if (banWord.test(ctx.message.text)){
        await banUser(ctx,bot)
    }
    if (ctx.message.attachments !== []){
        for (let i = 0; i < ctx.message.attachments.length; i++) {
            if (ctx.message.attachments[i].type === "photo"){
                const url = ctx.message.attachments[i].photo.sizes[ctx.message.attachments[i].photo.sizes.length-1].url
                photoNSFWCheck(url, (predict)=>defaultReactionNSFW(ctx, predict))
            } else if (ctx.message.attachments[i].type === "video"){
                const url = ctx.message.attachments[i].video.image[ctx.message.attachments[i].video.image.length-1].url
                photoNSFWCheck(url, (predict)=>defaultReactionNSFW(ctx, predict))
            }
        }
    }
    try {
        await next();
    } catch (e) {
        console.error(e);
    }
})

bot.startPolling();