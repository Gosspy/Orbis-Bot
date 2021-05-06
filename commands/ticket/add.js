module.exports = {
	name: 'add',
	category: 'Ticket',
	description: 'Ajoute un membre à un ticket spécifié.',
	aliases: [],
	usage: 'add <member>',
	userperms: ['ADMINISTRATOR'],
	botperms: [],
	run: async (client, message, args, prefix) => {
		if(message.channel.name.includes('ticket-')) {
			const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username === args.slice(0).join(' ') || x.user.username === args[0]);
			if(!member) {
				return message.channel.send(`Utilisation incorrecte! Utilisation correcte: ${prefix} add @<member>`);
			}
			try{
				message.channel.updateOverwrite(member.user, {
					VIEW_CHANNEL: true,
					SEND_MESSAGES: true,
					ATTACH_FILES: true,
					READ_MESSAGE_HISTORY: true,
				}).then(() => {
					message.channel.send(`${Membre} a bien été ajouté à ${message.channel}`);
				});
			}
			catch(e) {
				return message.channel.send("Une erreur s'est produite, veuillez réessayer!");
			}
		}
	},
};