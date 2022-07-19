
const VkBot = require('node-vk-bot-api')
const {photoNSFWCheck} = require("./nsfw");
const { banUser, deleteMessage } = require("./utils");


let banWord = /nigger|пидор|pidor|пидр|женщина|ч([её])рные|ч([её])рный|негр|гей|геи|дмитрий|рофл|глад валакас|55205/g

const bot = new VkBot(proccess.env.TOKEN);

const defaultReactionNSFW = async(ctx, predict) => await banUser(ctx, bot,`Я ВИЖУ ЗДЕСЬ КАКУЮ-ТО ЕБЛЮ, СЪЕБИ В БАРАК ЧУЧЕЛО ${predict}`)

const banDeleteReactionNSFW = async(ctx, predict) => {
    await defaultReactionNSFW(ctx,predict)
    await deleteMessage(ctx,bot)
}

bot.use(async (ctx, next) => {
    if (banWord.test(ctx.message.text)){
        await banUser(ctx,bot)
    }
    if (ctx.message.attachments !== []){
        const attachments = ctx.message.attachments
        for (let i = 0; i < attachments.length; i++) {
            if (attachments[i].type === "photo"){
                const url = attachments[i].photo.sizes[attachments[i].photo.sizes.length-1].url
                photoNSFWCheck(url, (predict)=>banDeleteReactionNSFW(ctx, predict))
            } else if (attachments[i].type === "video"){
                const url = attachments[i].video.image[attachments[i].video.image.length-1].url
                photoNSFWCheck(url, (predict)=>banDeleteReactionNSFW(ctx, predict))
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