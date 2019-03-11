import * as admin from 'firebase-admin'

var serviceAccount = require("/Users/wakanayoshizawa/Documents/serviceAccountKey.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://famous-charge-231405.firebaseio.com"
});

;(async () => {
	await chat('pizzachat', 'Fear', "What heck is that?!")
	await chat('pizzachat', 'Joy',  "Who puts brocoli on pizza?!")
	await chat('pizzachat', 'Disgust', "That's it. I'm done.")
	await chat('pizzachat', 'Anger',   "Congratulations, San Francisco! You've ruined pizza")
	process.exit(0)
})()
.catch(err => { console.error(err) })

async function chat (room: string, name: string, text: string) {
	const messageRef = admin.database().ref('rooms').child(room).child('messages')
	await messageRef.push({ name, text })
	console.log(`${name}: ${text}`)
	await sleep(2000)
}

function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}