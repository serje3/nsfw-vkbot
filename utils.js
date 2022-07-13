const Markup = require("node-vk-bot-api/lib/markup");

const keyboard = Markup.keyboard([
    [
        Markup.button('nigger', 'negative')
    ]
])

const banUser = async (ctx, bot, reason = "пошла нахуй шавка")=>{
    await ctx.reply(reason, null, keyboard);
    try {
        await bot.execute('messages.removeChatUser',{
            chat_id: ctx.message.peer_id%2000000000,
            user_id: ctx.message.from_id
        })
    } catch (e){
        console.error(e)
        await ctx.reply("сосись")
    }
}

module.exports = {
    banUser
}