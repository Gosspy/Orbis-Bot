const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch')
const prefix = '='
const {BOT_PREFIX} = '='
require('dotenv').config();
const config = require("./config.json");
const keepAlive = require('./server');
const { Client, Collection, Intents } = require('discord.js');

const antispam = require('better-discord-antispam'); // Requiring this module.  

client.commands = new Collection();
client.aliases = new Collection();

client.on('ready', () => {
  // Module Configuration Constructor
   antispam(client, {
        limitUntilWarn: 3, // The amount of messages allowed to send within the interval(time) before getting a warn.
        limitUntilMuted: 5, // The amount of messages allowed to send within the interval(time) before getting a muted.
        interval: 2000, // The interval(time) where the messages are sent. Practically if member X sent 5+ messages within 2 seconds, he get muted. (1000 milliseconds = 1 second, 2000 milliseconds = 2 seconds etc etc)
        warningMessage: "if you don't stop from spamming, I'm going to punish you!", // Message you get when you are warned!
        muteMessage: "was muted since we don't like too much advertisement type people!", // Message sent after member X was punished(muted).
        maxDuplicatesWarning: 7,// When people are spamming the same message, this will trigger when member X sent over 7+ messages.
        maxDuplicatesMute: 10, // The limit where member X get muted after sending too many messages(10+).
        ignoredRoles: ["Admin"], // The members with this role(or roles) will be ignored if they have it. Suggest to not add this to any random guys. Also it's case sensitive.
        ignoredMembers: ["Mavis#2389"], // These members are directly affected and they do not require to have the role above. Good for undercover pranks.
		mutedRole: "muted", // Here you put the name of the role that should not let people write/speak or anything else in your server. If there is no role set, by default, the module will attempt to create the role for you & set it correctly for every channel in your server. It will be named "muted".
		timeMuted: 1000 * 600, // This is how much time member X will be muted. if not set, default would be 10 min.
		logChannel: "antispam-logs" // This is the channel where every report about spamming goes to. If it's not set up, it will attempt to create the channel.
      });
      
  // Rest of your code
});


['command', 'event'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

keepAlive();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`)
    
    welcome(client)
});

client.on('message', message => {
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase()

    if (message.content.includes('discord.gg/') || message.content.includes('discordapp.com/invite/')|| message.content.includes('https://')) { //if it contains an invite link
      if (!message.member.hasPermission("KICK_MEMBERS")) {
        message.delete() //delete the message
        message.channel.send('interdit de mettre des liens')
      }
    }

    if (command === 'help') {
        if (!message.member.roles.cache.has('835624322210988083')) {
            message.channel.send('Oups... Vous n\avez pas la permission d\'exécuter cette commande')
            } else {
                var help = new Discord.MessageEmbed()
                .setColor("#8e4dff")
                .setTitle(`**HELP**`)
                .setDescription(`Pour utiliser le bot, vous devez avoir le role **Staff. Le prefix est =**`)
                .addField('Pour créer un ticket', 'veuillez utilisez la commande suivant ```=new```')
                .addField('Pour voir l\'ip du serveur', 'veuillez utilisez la commande suivant ```=ip```')
                .addField('Pour voir le top-server', 'veuillez utilisez la commande suivant ```=topserver```')
                .setAuthor('Orbis Roleplay')
                message.channel.send(help)
            }
    }
});


client.on('message', message => {
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase()

  if (command === 'staffhelp') {
    if (!message.member.roles.cache.has('835624302522531882')) {
        message.channel.send('Oups... Vous n\avez pas la permission d\'exécuter cette commande')
        } else {
            var help = new Discord.MessageEmbed()
            .setColor("#8e4dff")
            .setTitle(`**STAFF HELP**`)
            .setDescription(`Pour utiliser le bot, vous devez avoir le role **Equipe Staff. Le prefix est =**`)
            .addField('Pour annoncer un reboot', 'veuillez utilisez la commande suivant ```=reboot```')
            .addField('Pour dire que le serveur a reboot', 'veuillez utilisez la commande suivant ```=reboot```')
            .addField('Pour suprimmer des messages', 'veuillez utilisez la commande suivant ```=clear {NOMBREDEMESSAGE}```')
            .addField('Pour fermer un ticket', 'veuillez utilisez la commande suivant ```=close```')
            .addField('Pour suprimmer un ticket', 'veuillez utilisez la commande suivant ```=delete```')
            .addField('Pour ajouter une personne a un ticket', 'veuillez utilisez la commande suivant ```=add {@NOM#0000}```')
            .addField('Pour ban, kick', 'veuillez utilisez la commande suivant ```=kick/ban {@NOM#0000}```')
            .setAuthor('Steepoy, YorkHost CC')
            message.channel.send(help)
        }
}
});


client.on('message', message => {
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase()

  if (command === 'servon') {
      if (!message.member.roles.cache.has('823276595460308997')) {
          message.channel.send('Oups... Vous n\avez pas la permission d\'exécuter cette commande')
          } else {
              var help = new Discord.MessageEmbed()
              message.channel.send("**Serveur Redémarrer ! Vous pouvez vous connecter ! ```connect 45.158.77.182:30120```** ||@everyone||");
          }
  }
});

client.on('message', message => {
  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase()

  if (command === 'reboot') {
      if (!message.member.roles.cache.has('823276595460308997')) {
          message.channel.send('Oups... Vous n\avez pas la permission d\'exécuter cette commande')
          } else {
              var help = new Discord.MessageEmbed()
              message.channel.send("**Reboot imminent ! Déconnecter vous !** ||@everyone||");
          }
  }
});




client.on("message", message => {
  if(message.author.bot) return;


  if(message.content == prefix + "ip"){
      message.channel.send("**Voici l'ip : ```connect play.orbisrp.fr``` Bon jeux ** " + message.author.username);
      
  }

  if(message.content == prefix + "topserver"){
    message.channel.send("**Voici notre top-server : https://top-serveurs.net/gta/vote/orbis-roleplay ** " + message.author.username);

  } 

});



client.on('message', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
  
    const args = message.content
      .toLowerCase()
      .slice(prefix.length)
      .trim()
      .split(/\s+/);
    const [command, input] = args;
  
    if (command === 'clear' || command === 'c') {
      if (!message.member.hasPermission('MANAGE_MESSAGES')) {
        return message.channel
          .send(
            "You cant use this command since you're missing `manage_messages` perm",
          );
      }
  
      if (isNaN(input)) {
        return message.channel
          .send('enter the amount of messages that you would like to clear')
          .then((sent) => {
            setTimeout(() => {
              sent.delete();
            }, 2500);
          });
      }
  
      if (Number(input) < 0) {
        return message.channel
          .send('enter a positive number')
          .then((sent) => {
            setTimeout(() => {
              sent.delete();
            }, 2500);
          });
      }
  
      // add an extra to delete the current message too
      const amount = Number(input) > 100
        ? 101
        : Number(input) + 1;
  
      message.channel.bulkDelete(amount, true)
      .then((_message) => {
        message.channel
          // do you want to include the current message here?
          // if not it should be ${_message.size - 1}
          .send(`Bot cleared \`${_message.size}\` messages :broom:`)
          .then((sent) => {
            setTimeout(() => {
              sent.delete();
            }, 10000);
          });
      });
    }
  });


  client.on("message", async (message) => {
    if (
        !message.content.startsWith(config.prefix) ||
        message.author.bot ||
        message.channel.type === "dm"
    )
        return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    const amount = args.join(" ");
    const member = message.mentions.members.first();
    
  // EMBED CONSTS
  const modCheckEmbed = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle("You must be moderator to use this command!")
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({format: "png"}), "https://xwass.github.io/AncientResurge")
    .setTimestamp()
    .setFooter("Created by xWass", "https://images-ext-2.discordapp.net/external/o4pf20HyK0u5557o_RzzfSVidwkKA4a30e8r63G_Pjw/%3Fsize%3D512/https/cdn.discordapp.com/avatars/431487139298017282/1452cddabb6ea77663a0d704ad3cb48a.png");    
    
    const botCheckEmbed = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle("I do not have the correct permissions to do this!")
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({format: "png"}), "https://xwass.github.io/AncientResurge")
    .setTimestamp()
    .setFooter("Created by xWass", "https://images-ext-2.discordapp.net/external/o4pf20HyK0u5557o_RzzfSVidwkKA4a30e8r63G_Pjw/%3Fsize%3D512/https/cdn.discordapp.com/avatars/431487139298017282/1452cddabb6ea77663a0d704ad3cb48a.png");    
  
    const welcomeEmbed = new Discord.MessageEmbed()
    .setColor("#0fff4b")
    .setTitle("Welcome to the server!")
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({format: "png"}), "https://xwass.github.io/AncientResurge")    .setDescription("Welcome to the server! Navigate about the server to find anything you may need relating to Ancient Resurge.")
    .addFields(
      { name: "Official Server:", value: "https://discord.gg/r7NSkFQ" }
    )
    .setImage("https://images-ext-2.discordapp.net/external/Chkd3qt-yN-qEspd_KUhwAT14GJn2-mk8Emg5eSILMA/%3Fsize%3D1024/https/cdn.discordapp.com/icons/746364860392013854/afce46e5c8ae4080d4f829992db2375d.webp")
    .setTimestamp()
    .setFooter("Created by xWass", "https://images-ext-2.discordapp.net/external/o4pf20HyK0u5557o_RzzfSVidwkKA4a30e8r63G_Pjw/%3Fsize%3D512/https/cdn.discordapp.com/avatars/431487139298017282/1452cddabb6ea77663a0d704ad3cb48a.png");    
  
    const muteEmbed = new Discord.MessageEmbed()
    .setColor("#ffd400")
    .setTitle("User Muted")
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({format: "png"}), "https://xwass.github.io/AncientResurge")    .setDescription(`${member} has been muted.`)
    .setTimestamp()
    .setFooter("Created by xWass", "https://images-ext-2.discordapp.net/external/o4pf20HyK0u5557o_RzzfSVidwkKA4a30e8r63G_Pjw/%3Fsize%3D512/https/cdn.discordapp.com/avatars/431487139298017282/1452cddabb6ea77663a0d704ad3cb48a.png");
  
    const unmuteEmbed = new Discord.MessageEmbed()
	  .setColor("#0fff4b")
    .setTitle("User Unuted")
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({format: "png"}), "https://xwass.github.io/AncientResurge")    .setDescription(`${member} has been unmuted.`)
    .setTimestamp()
    .setFooter("Created by xWass", "https://images-ext-2.discordapp.net/external/o4pf20HyK0u5557o_RzzfSVidwkKA4a30e8r63G_Pjw/%3Fsize%3D512/https/cdn.discordapp.com/avatars/431487139298017282/1452cddabb6ea77663a0d704ad3cb48a.png");
  
    const commandsEmbed = new Discord.MessageEmbed()
	  .setColor("#000001")
	  .setTitle("How to use this bot:")
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({format: "png"}), "https://xwass.github.io/AncientResurge")	  
	  .addFields(
		  { name: "Moderation Commands", value: "Use !ban <@user> to ban a user. \nUse !unban <userid> to unban a user. \nUse !mute <@user> to mute a user. \nUse !unmute <@user> to unmute a user. \nUse !kick <@user> to kick a user. \nUse !warn <@user> to warn a user." },
	//	{ name: "\u200B", value: "\u200B" },
  		{ name: "Misc Commands", value: "Use !commands to see this response. \nUse !ping to check your ping. \nUse !welcome to welcome a new user.", inline: true },
	  )
	  .setTimestamp()
    .setFooter("Created by xWass", "https://images-ext-2.discordapp.net/external/o4pf20HyK0u5557o_RzzfSVidwkKA4a30e8r63G_Pjw/%3Fsize%3D512/https/cdn.discordapp.com/avatars/431487139298017282/1452cddabb6ea77663a0d704ad3cb48a.png");
  
    const shutdownEmbed = new Discord.MessageEmbed()
	  .setColor("#000001")
	  .setTitle("Shutdown")
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({format: "png"}), "https://xwass.github.io/AncientResurge")	  
	  .setDescription("Bot Shutting Down...")
	  .setTimestamp()
    .setFooter("Created by xWass", "https://images-ext-2.discordapp.net/external/o4pf20HyK0u5557o_RzzfSVidwkKA4a30e8r63G_Pjw/%3Fsize%3D512/https/cdn.discordapp.com/avatars/431487139298017282/1452cddabb6ea77663a0d704ad3cb48a.png");

    const confirmedShutdownEmbed = new Discord.MessageEmbed()
	  .setColor("#000001")
	  .setTitle("Shutdown")
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({format: "png"}), "https://xwass.github.io/AncientResurge")	  
	  .setDescription("Your bot has been shut down")
	  .setTimestamp()
    .setFooter("Created by xWass", "https://images-ext-2.discordapp.net/external/o4pf20HyK0u5557o_RzzfSVidwkKA4a30e8r63G_Pjw/%3Fsize%3D512/https/cdn.discordapp.com/avatars/431487139298017282/1452cddabb6ea77663a0d704ad3cb48a.png");
   
    const denyShutdownEmbed = new Discord.MessageEmbed()
	  .setColor("#000001")
	  .setTitle("Shutdown")
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({format: "png"}), "https://xwass.github.io/AncientResurge")	  
	  .setDescription(`${message.author}, you must be the bot's owner to use this command.`)
	  .setTimestamp()
    .setFooter("Created by xWass", "https://images-ext-2.discordapp.net/external/o4pf20HyK0u5557o_RzzfSVidwkKA4a30e8r63G_Pjw/%3Fsize%3D512/https/cdn.discordapp.com/avatars/431487139298017282/1452cddabb6ea77663a0d704ad3cb48a.png");

    const kickEmbed = new Discord.MessageEmbed()
	  .setColor("#ff0000")
	  .setTitle("User Kicked")
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({format: "png"}), "https://xwass.github.io/AncientResurge")	  
	  .setDescription(`${member} has been kicked from the server.`)
	  .setTimestamp()
    .setFooter("Created by xWass", "https://images-ext-2.discordapp.net/external/o4pf20HyK0u5557o_RzzfSVidwkKA4a30e8r63G_Pjw/%3Fsize%3D512/https/cdn.discordapp.com/avatars/431487139298017282/1452cddabb6ea77663a0d704ad3cb48a.png");
  
    const banEmbed = new Discord.MessageEmbed()
	  .setColor("#ff0000")
	  .setTitle("User Banned")
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({format: "png"}), "https://xwass.github.io/AncientResurge")	  
    
    .setDescription(`${member} has been banned from the server.`)
    .setImage("https://gfycat.com/playfulfittingcaribou.gif")
	  .setTimestamp()
    .setFooter("Created by xWass", "https://images-ext-2.discordapp.net/external/o4pf20HyK0u5557o_RzzfSVidwkKA4a30e8r63G_Pjw/%3Fsize%3D512/https/cdn.discordapp.com/avatars/431487139298017282/1452cddabb6ea77663a0d704ad3cb48a.png");
  
    const unbanEmbed = new Discord.MessageEmbed()
	  .setColor("#0fff4b")
	  .setTitle("User Unbanned")
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({format: "png"}), "https://xwass.github.io/AncientResurge")	  
    .setDescription("User has been unbanned from the server.")
	  .setTimestamp()
    .setFooter("Created by xWass", "https://images-ext-2.discordapp.net/external/o4pf20HyK0u5557o_RzzfSVidwkKA4a30e8r63G_Pjw/%3Fsize%3D512/https/cdn.discordapp.com/avatars/431487139298017282/1452cddabb6ea77663a0d704ad3cb48a.png");
  
    const lockEmbed = new Discord.MessageEmbed()
    .setColor("#ff0000")
    .setTitle("Channel Locked")
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({format: "png"}), "https://xwass.github.io/AncientResurge")    
    .setDescription("This channel has been locked.")
    .setTimestamp()
    .setFooter("Created by xWass", "https://images-ext-2.discordapp.net/external/o4pf20HyK0u5557o_RzzfSVidwkKA4a30e8r63G_Pjw/%3Fsize%3D512/https/cdn.discordapp.com/avatars/431487139298017282/1452cddabb6ea77663a0d704ad3cb48a.png");
  
    const unlockEmbed = new Discord.MessageEmbed()
    .setColor("#0fff4b")
    .setTitle("Channel Unlocked")
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({format: "png"}), "https://xwass.github.io/AncientResurge")    
    .setDescription("This channel has been unlocked.")
    .setTimestamp()
    .setFooter("Created by xWass", "https://images-ext-2.discordapp.net/external/o4pf20HyK0u5557o_RzzfSVidwkKA4a30e8r63G_Pjw/%3Fsize%3D512/https/cdn.discordapp.com/avatars/431487139298017282/1452cddabb6ea77663a0d704ad3cb48a.png");
  
    const lockSpecifyEmbed = new Discord.MessageEmbed()
    .setColor("#000001")
    .setTitle("Please Specify On or Off")
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({format: "png"}), "https://xwass.github.io/AncientResurge")   
    .setTimestamp()
    .setFooter("Created by xWass", "https://images-ext-2.discordapp.net/external/o4pf20HyK0u5557o_RzzfSVidwkKA4a30e8r63G_Pjw/%3Fsize%3D512/https/cdn.discordapp.com/avatars/431487139298017282/1452cddabb6ea77663a0d704ad3cb48a.png");

    // COMMAND CODE

      // PING COMMAND
    if (command === "ping") {
      
      const pingEmbed = new Discord.MessageEmbed()
        .setColor("#0fff4b")
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({format: "png"}), "https://xwass.github.io/AncientResurge")   
        .setTimestamp()
        .setTitle(`Pinging...`)
        .setFooter("Created by xWass", "https://images-ext-2.discordapp.net/external/o4pf20HyK0u5557o_RzzfSVidwkKA4a30e8r63G_Pjw/%3Fsize%3D512/https/cdn.discordapp.com/avatars/431487139298017282/1452cddabb6ea77663a0d704ad3cb48a.png");
      
      const myMsg = await message.channel.send(pingEmbed)
    
      const pongEmbed = new Discord.MessageEmbed()
        .setColor("#0fff4b")
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({format: "png"}), "https://xwass.github.io/AncientResurge")   
        .setTimestamp()
        .setTitle(`Pong! Took ${myMsg.createdTimestamp - message.createdTimestamp}ms`)
        .setFooter("Created by xWass", "https://images-ext-2.discordapp.net/external/o4pf20HyK0u5557o_RzzfSVidwkKA4a30e8r63G_Pjw/%3Fsize%3D512/https/cdn.discordapp.com/avatars/431487139298017282/1452cddabb6ea77663a0d704ad3cb48a.png");
      myMsg.edit(pongEmbed)
      console.log(`User ${message.author.tag} pinged the bot: ${myMsg.createdTimestamp - message.createdTimestamp}ms`)
    }

    //WELCOME COMMAND
    if (command === `welcome`) {    
      message.channel.send(welcomeEmbed);
      return;
    }
    // HELP COMMAND
    if (command === `commands`) {
        message.channel.send(commandsEmbed);
          return;
    }
    // SHUTDOWN COMMAND
    if (command === `shutdown`) {
      if (message.author.id === " ") { // ADD YOUR OWN DISCORD ID IN THE EMPTY QUOTES
        await message.channel.send(shutdownEmbed).then(sent => {    
          sent.edit(confirmedShutdownEmbed);
        });
        console.log(`The bot has been shut down by ${message.author}`)
        process.exit()
        return;
      }
      else message.channel.send(denyShutdownEmbed)
      return;
    }
    // CHANNEL LOCK COMMAND
    if (command === `lock`) {
      if(!message.member.hasPermission("MANAGE_CHANNELS")) {
        return message.channel.send(modCheckEmbed)
      }
      const channel = message.channel
      if (args[0] === "on") {
            channel.updateOverwrite(message.guild.roles.everyone, {
                SEND_MESSAGES: false
            })
        return message.channel.send(lockEmbed);
      } else if (args[0] === "off") {
        channel.updateOverwrite(message.guild.roles.everyone, {
            SEND_MESSAGES: true
        })
        return message.channel.send(unlockEmbed);
      } else {
        message.channel.send(lockSpecifyEmbed);
        return;
          }
  }
  // MUTE COMMAND
    if (command ===`mute`) {
      message.guild.roles.cache.find(r => r.name === "Muted");
      if(!message.member.hasPermission("MANAGE_ROLES")){
        message.channel.send(modCheckEmbed);
        return;
      }
      if(!message.guild.me.hasPermission("MANAGE_ROLES")) {
        message.channel.send(botCheckEmbed);
        return;
      }
      const role = message.guild.roles.cache.find(r => r.name === "Muted");
      member.roles.add(role);
      message.channel.send(muteEmbed);
      console.log(`${member} has been muted by ${message.author}.`)
      return;
    }
    // UNMUTE COMMAND
    if (command ===`unmute`) {
      message.guild.roles.cache.find(r => r.name === "Muted");
      if(!message.member.hasPermission("MANAGE_ROLES")){
        message.channel.send(modCheckEmbed);
        return;
      }
      if(!message.guild.me.hasPermission("MANAGE_ROLES")) {
        message.channel.send(botCheckEmbed);
        return;
      }
      const role = message.guild.roles.cache.find(r => r.name === "Muted");
      member.roles.remove(role);
      message.channel.send(unmuteEmbed);
      console.log(`${member} has been unmuted by ${message.author}.`)
      return;
    }
    // WARN COMMAND
    if (command === `warn`) {
      const user = args[0];
      const userLength = user.length;
      const reason = args.join(" ").slice(userLength);
    const warnEmbed = new Discord.MessageEmbed()
	  .setColor("#ffff00")
	  .setTitle("User Warned")
	  .setAuthor(`${message.author.tag}`, "https://images-ext-2.discordapp.net/external/o4pf20HyK0u5557o_RzzfSVidwkKA4a30e8r63G_Pjw/%3Fsize%3D512/https/cdn.discordapp.com/avatars/431487139298017282/1452cddabb6ea77663a0d704ad3cb48a.png")
	  .setDescription(`${member} warned for ${reason}`)
	  .setTimestamp()
    .setFooter("Created by xWass", "https://images-ext-2.discordapp.net/external/o4pf20HyK0u5557o_RzzfSVidwkKA4a30e8r63G_Pjw/%3Fsize%3D512/https/cdn.discordapp.com/avatars/431487139298017282/1452cddabb6ea77663a0d704ad3cb48a.png");
    const warnDMEmbed = new Discord.MessageEmbed()
	  .setColor("#ffff00")
	  .setTitle(`You were warned by ${message.author.tag}`)
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({format: "png"}), "https://xwass.github.io/AncientResurge")	  
	  .setDescription(`You have been warned for ${reason}`)
	  .setTimestamp()
    .setFooter("Created by xWass", "https://images-ext-2.discordapp.net/external/o4pf20HyK0u5557o_RzzfSVidwkKA4a30e8r63G_Pjw/%3Fsize%3D512/https/cdn.discordapp.com/avatars/431487139298017282/1452cddabb6ea77663a0d704ad3cb48a.png");
    const warnProvideEmbed = new Discord.MessageEmbed()
	  .setColor("#ffff00")
	  .setTitle("Please provide a user to warn")
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({format: "png"}), "https://xwass.github.io/AncientResurge")	  
	  .setTimestamp()
    .setFooter("Created by xWass", "https://images-ext-2.discordapp.net/external/o4pf20HyK0u5557o_RzzfSVidwkKA4a30e8r63G_Pjw/%3Fsize%3D512/https/cdn.discordapp.com/avatars/431487139298017282/1452cddabb6ea77663a0d704ad3cb48a.png");
    const warnReasonEmbed = new Discord.MessageEmbed()
	  .setColor("#ffff00")
	  .setTitle("Please provide the reason you are warning the user.")
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({format: "png"}), "https://xwass.github.io/AncientResurge")	  
	  .setTimestamp()
    .setFooter("Created by xWass", "https://images-ext-2.discordapp.net/external/o4pf20HyK0u5557o_RzzfSVidwkKA4a30e8r63G_Pjw/%3Fsize%3D512/https/cdn.discordapp.com/avatars/431487139298017282/1452cddabb6ea77663a0d704ad3cb48a.png");
        if(!message.member.hasPermission("KICK_MEMBERS")) {
          return message.channel.send(modCheckEmbed)
        }
      if(!args[0]) return message.reply(warnProvideEmbed);
      if(!args[1]) return message.reply(warnReasonEmbed);
    member.send(warnDMEmbed);
      message.channel.send(warnEmbed).then(msg => msg.delete({ timeout: 5000 }))
        console.log(`${member} has been warned by ${message.author} for ${reason}`)
          return;
    }
    // KICK COMMAND
      //PERMCHECK
    if (command === `kick`) {
      if(!message.member.hasPermission("KICK_MEMBERS")) {
        return message.channel.send(modCheckEmbed)
      }
      if(!message.guild.me.hasPermission("KICK_MEMBERS")) {
        return message.channel.send(botCheckEmbed)
      }
        // Kick
        member
            .kick()
            .then((member) => {
                // Successmessage
                message.channel.send(kickEmbed);
                console.log(`${member} has been successfully kicked!`)
                return;
            })
            .catch(() => {
                // Failmessage
                message.channel.send(modCheckEmbed);
                return;
            });
    }
    // BAN COMMAND
      // Perm Check
    if (command === `ban`) {
      if(!message.member.hasPermission("BAN_MEMBERS")) {
        return message.channel.send(modCheckEmbed)
      }
      if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
        return message.channel.send(botCheckEmbed)
      }
        // ban
        member
            .ban()
            .then((member) => {
                // Successmessage
                message.channel.send(banEmbed);
                    console.log(`${member} has been successfully banned.`)
                return;
            })
            .catch(() => {
                // Failmessage
                message.channel.send(modCheckEmbed);  
                return;
            });
    }
    // UNBAN COMMAND
    if(command === "unban"){
        if(!message.member.hasPermission("BAN_MEMBERS")) {
          return message.channel.send(modCheckEmbed)
        }
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
          return message.channel.send(botCheckEmbed)
        }
        const userID = args[0]
          message.guild.fetchBans().then((bans) => {
              if (bans.size == null)
                return;
              const bUser = bans.find(b => b.user.id == userID);
              if (!bUser)
                return;
              message.guild.members.unban(bUser.user);
              message.channel.send(unbanEmbed);
              console.log(`${member} has been successfully unbanned by ${message.author}`)
            });
          };
});

client.login('ODI5NDU5OTYwMjkwMDgyODU2.YG4cyQ.-Om36dkBm-yfiYBLDBe9RYd2Ox4');