const Discord = require("discord.js");
const client = new Discord.Client({ws: {Intents: new Discord.Intents(Discord.Intents.ALL)}});
const config = require("./config.json");
let prefix = config.prefix;

Array.prototype.romove = function(x){
    return this.filter(function(v){
     return v !== x;
    });
   };
   
   client.on("error", (e) => console.error(e));
   
   client.on("ready", () => {
      console.log(`afk esta listo!,En ${client.user.tag}`)
   
   });
client.on("message", async message => {
    if(message.author.bot) return;
    if(!message.guild) return;
    if(!message.content.startsWith(config.prefix)) return;
    var fullmsg = message.content.split(" ");
    var command = fullmsg [0].replace(config.prefix, "");
    var args = fullmsg.romove(fullmsg[0]);
    if (!command) return; 

    if (message.member.displayName.startsWith(`[AFK]`)) return;
  let user = message.author;
  let avatar = user.avatarURL({ dynamic: true, format: `png`, size: 2048 });
  let content = args.join(" ");
  if (!content) {
    content = "Ninguno";
  }
  
  if(command ===  `afk`) { 
            if (!message.member.permissionsIn(message.channel).has('ADMINISTRATOR')) {
      return message.channel.send(`${message.author.username} , **no puedes hacer esto no eres moderador**`)}
    const user = message.mentions.users.first() || message.author;
      const embed1 = new Discord.MessageEmbed()
      
      .setAuthor(`${user.username} estara afk`)
      .setDescription(`**Tiempo y Motivo:** \n ${content}`)
      .setThumbnail(user.avatarURL({ dynamic: true, format: `png`, size: 2048 }))
      .setFooter(`afk en ${message.guild.name}`)
      .setTimestamp()
      .setColor(0xff0000)
  message.channel.send(embed1);
  message.delete()
  var afk_user = await message.guild.members.cache.get(message.author.id);
  var nombre = afk_user.displayName;
  		if(nombre && `[AFK] ${nombre}`.length <= 32) {
			afk_user.setNickname(`[AFK] ${nombre}`).catch(()=>{});
		}
} });
client.login(config.token);