let { WAConnection, MessageType, Mimetype} = require('@adiwajshing/baileys')
let qrcode = require('qrcode')
const fs = require('fs')

listjadibot = [];

const jadibot = async(reply,client,id) => {
	conn = new WAConnection()
    conn.logger.level = 'warn'
    conn.version = [2, 2123, 8]
    conn.browserDescription = [ 'Samu330', '', '3.0' ]
    conn.on('qr', async qr => {
    	let bot = await qrcode.toDataURL(qr, { scale: 8 })
    	let buffer = new Buffer.from(bot.replace('data:image/png;base64,', ''), 'base64')
bot = await client.sendMessage(id,buffer,MessageType.image,{caption:'*Escanea este QR para convertirte en bot temporal*\n\n*Como escanear:*\n1. *En la pantalla principal de WhatsApp, en la parte superior derecha, dale click a los 3 puntitos!!*\n2. *Selecciona WhatsApp Web (Dispocitivos Conectados)*\n3. *Otorga permiso a camara si te pide, y escanea el QR*\n\n*El QR expira en 30 segundos*\n\n\n_- By:	Samu330_'})
    	setTimeout(() => {
       	client.deleteMessage(id, bot.key)
       },30000)
    })
    conn.on('connecting', () => {
    })
    conn.on('open', () => {
    	reply(`*Conectado con WhatsApp* - mu.\n\n*Dispositivo*:\n\n ${JSON.stringify(conn.user,null,2)}`)
    })
    await conn.connect({timeoutMs: 30 * 1000})
    listjadibot.push(conn.user)
    conn.on('chat-update', async (message) => {
        require('../Samu330.js')(conn, message)
    })
}

const stopjadibot = (reply) => {
	conn = new WAConnection();
	conn.close()
reply('Okei')
conn.close()
}


module.exports = {
	jadibot,
	stopjadibot,
	listjadibot
}
