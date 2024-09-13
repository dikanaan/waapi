const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});


// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Client is ready!');
});

// When the client received QR-Code
client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
    //console.log('QR RECEIVED', qr);
});

client.on('message_create', message => {
	if (message.body === 'p') {
		// send back "pong" to the chat the message was sent in
		client.sendMessage(message.from, 'pong');
	}
});

client.on('message_create', message => {
	if (message.body === 'dik') {
		// send back "pong" to the chat the message was sent in
		client.sendMessage(message.from, 'pong');
	}
});

client.on('message_create', message => {
	if (message.body === 'Dik') {
		// send back "pong" to the chat the message was sent in
		client.sendMessage(message.from, 'pong');
	}
});

client.on('message_create', message => {
	if (message.body === 'P') {
		// send back "pong" to the chat the message was sent in
		client.sendMessage(message.from, 'pong');
	}
});


// Start your client
client.initialize();

const api = async (req, res) => {

    const token = "inisayapunyatoken";
    let tokenku = req.query.token || req.body.token;
    
    let nohp = req.query.nohp || req.body.nohp;
    const pesan = req.query.pesan || req.body.pesan;

    if ( tokenku !== token) {
        return res.status(400).json({status: "gagal", pesan: "token invalid"})
    }

    
try {
    if (nohp.startsWith("0")) {
    nohp= "62" + nohp.slice(1) + "@c.us";
}
    else if (nohp.startsWith("62")) {
    nohp = nohp + "@c.us";
}
    else {
    nohp = "62" + nohp + "@c.us";
}


    const user = await client.isRegisteredUser(nohp);
    if (user) {
        client.sendMessage(nohp, pesan);
        res.json({status: "terkirim", pesan});
    }
    else {
        res.json({ status: "gagal", pesan: "nomor tidak ada"});
    }



    //console.log(nohp)
    //console.log(pesan)
    //res.json({ nohp, pesan})
} catch (error) {
    console.log(error);
    res.status(500).json({status: "error", pesan: "server error"});

}

};

module.exports = api;