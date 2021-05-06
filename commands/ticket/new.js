module.exports = {
	name: 'new',
	category: 'Ticket',
	description: 'Creates a new ticket.',
	aliases: [],
	usage: 'new',
	userperms: [],
	botperms: [],
	run: async (client, message, args, prefix) => {
		if(message.guild.channels.cache.find(channel => channel.name === `ticket-${message.author.id}`)) {
			return message.reply("vous avez déjà un ticket, veuillez d'abord fermer votre ticket existant avant d'en ouvrir un nouveau!");
		}

		message.guild.channels.create(`ticket-${message.author.id}`, {
			permissionOverwrites: [
				{
					id: message.author.id,
					allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
				},
				{
					id:  message.guild.roles.cache.find(role => role.id === '823276595460308997'),
					allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
				},
				{
					id: message.guild.roles.everyone,
					deny: ['VIEW_CHANNEL'],
				},
			],
			type: 'text',
		}).then(async channel => {
			message.reply(`vous avez créé un ticket avec succès! Veuillez cliquer sur ${channel} pour voir votre billet.`);
			channel.send(`Hey ${message.author}, Bienvenue sur votre billet! Veuillez patienter, nous serons avec vous sous peu. Si vous souhaitez fermer ce ticket, exécutez \`${prefix}close\``);
			let logchannel = message.guild.channels.cache.find(channel => channel.name === `ticket-logs`)
			if(logchannel) {
				logchannel.send(`Le ticket ${message.author.id} a été créé. Cliquez sur ce qui suit pour voir <#${channel.id}>`);
			}
		});
	},
};
