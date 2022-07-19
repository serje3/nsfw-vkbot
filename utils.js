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

const deleteMessage = async (ctx, bot) => {
    try {
        await bot.execute('messages.delete',{
            peer_id: ctx.message.peer_id,
            cmids: ctx.message.conversation_message_id,
            delete_for_all: true
        })
    } catch (e){
        console.error(e)
    }
}

module.exports = {
    banUser,
    deleteMessage
}