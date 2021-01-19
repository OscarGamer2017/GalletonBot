////////////////////////Pagina//////////////////////////////

const express = require('express');
const app = express();
const port = 3000;
app.get("/", function(request, response) {
  response.sendFile(__dirname + '/Pagina.html');
});
app.listen(port, () => console.log(`oficial bot activado`));

///////////////////////Bot y comandos///////////////////////

const { Discord, Client, MessageEmbed, MessageAttachment, RichEmbed, Collection, Guild, GuildChannel, GuildManager, GuildMember, Role, Message, TextChannel, UserMESSAGE, REACTION } = require("discord.js")
const client = new Client();
const config = require("./config.json");

const say = require(`./es/say.js`)
const poll = require(`./es/poll.js`)
const impostor = require(`./es/impostor.js`)
const afk = require(`./es/afk.js`)


const fs = require("fs");
const fse = require("fs-extra");
let prefix = config.prefix;

client.on("error", (e) => console.error(e));

client.on("ready", () => {
  console.log(`Estoy listo!, ${client.user.tag}`)

  client.user.setPresence({
    activity: {
      status: "idle",
      name: `${config.prefix}help | Estoy en desarrollo...`,
      type: "PLAYING",
    }
  });

});



client.setMaxListeners(200)



/////////////Comandos//////////////////////

client.on('message', message => {
  // Receiving the message
  console.log(message.content);


  ////////////Moderacion///////////////   

  if (!message.guild) return;

  if (message.content.startsWith(prefix + 'kick')) {
        if (!message.member.permissionsIn(message.channel).has('ADMINISTRATOR')) {
      return message.channel.send(`${message.author.username} , **no puedes hacer esto no eres moderador**`)}

    const user = message.mentions.users.first();

    if (user) {

      const member = message.guild.member(user);

      if (member) {

        member
          .kick('Expulsado por mala conducta')
          .then(() => {

            const embed = new MessageEmbed()
              .setTitle(`❕**Exito**❕`)
              .setDescription(`❌**perfectamente pude expulsar a esta persona **❌`)
              .setAuthor(message.author.username, message.author.displayAvatarURL())
              .setThumbnail(message.guild.iconURL({format:"png", dynamic:"true"}))
              .setColor(0xff0000)

              .setTimestamp()
            message.reply(embed);
          })
          .catch(err => {

            const embed = new MessageEmbed()
              .setTitle(`❕**Mis Permisos**❕`)
              .setDescription(`❌**A este usario no lo puedo expulsar**❌`)
              .setAuthor(message.author.username, message.author.displayAvatarURL())
              .setThumbnail(message.guild.iconURL({format:"png", dynamic:"true"}))
              .setColor(0xff0000)

              .setTimestamp()
            message.reply(embed);
            console.error(err);
          });
      } else {
        const embed = new MessageEmbed()
          .setTitle(`❕**usuario**❕`)
          .setDescription(`❌**Usuario no esta**❌`)
          .setAuthor(message.author.username, message.author.displayAvatarURL())
          .setThumbnail(message.guild.iconURL({format:"png", dynamic:"true"}))
          .setColor(0xff0000)

          .setTimestamp()
        message.reply(embed);
      }
    } else {
      const embed = new MessageEmbed()
        .setTitle(`❕**Menciona**❕`)
        .setDescription(`❌**${message.author.username} Menciona a la persona que quieres expulsar**❌`)
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setThumbnail(message.guild.iconURL({format:"png", dynamic:"true"}))
        .setColor(0xff0000)
        .setTimestamp()
      message.reply(embed);
    }
    message.delete()
  }

  if (!message.guild) return;


  if (message.content.startsWith(prefix + 'ban')) {
            if (!message.member.permissionsIn(message.channel).has('ADMINISTRATOR')) {
      return message.channel.send(`${message.author.username} , **no puedes hacer esto no eres moderador**`)}

    const user = message.mentions.users.first();

    if (user) {

      const member = message.guild.member(user);

      if (member) {

        member
          .ban({
            reason: 'Por mal comportamiento!',
          })
          .then(() => {

            const embed = new MessageEmbed()
              .setTitle(`❕**Exito**❕`)
              .setDescription(`❌**Perfectamente pude banear a ${user.tag}**❌`)
              .setAuthor(message.author.username, message.author.displayAvatarURL())
              .setThumbnail(message.guild.iconURL({format:"png", dynamic:"true"}))
              .setColor(0xff0000)

              .setTimestamp()
            message.reply(embed);
          })

          .catch(err => {

            const embed = new MessageEmbed()
              .setTitle(`❕**Mis Permisos**❕`)
              .setDescription(`❌**A este usario no lo puedo banear**❌`)
              .setAuthor(message.author.username, message.author.displayAvatarURL())
              .setThumbnail(message.guild.iconURL({format:"png", dynamic:"true"}))
              .setColor(0xff0000)

              .setTimestamp()
            message.reply(embed);

            console.error(err);
          });

      } else {

        const embed = new MessageEmbed()
          .setTitle(`❕**usuario**❕`)
          .setDescription(`❌**Usuario no esta**❌`)
          .setAuthor(message.author.username, message.author.displayAvatarURL())
          .setThumbnail(message.guild.iconURL({format:"png", dynamic:"true"}))
          .setColor(0xff0000)

          .setTimestamp()
        message.reply(embed);
      }
    } else {

      const embed = new MessageEmbed()
        .setTitle(`❕**Menciona**❕`)
        .setDescription(`❌**${message.author.username} Menciona a la persona que quieres banear**❌`)
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setThumbnail(message.guild.iconURL({format:"png", dynamic:"true"}))
        .setColor(0xff0000)

        .setTimestamp()
      message.reply(embed);
    }
    message.delete()
  }

  /////////////////Comandos Normales/////////////////

  

if (message.content === prefix + 'help') {
    const embed = new MessageEmbed()
      .setTitle('Mis Comandos')
      .setDescription('Son los comados que estan por ahora')
      .addField(`${config.prefix}moderacion`, 'comandos de moderación❌')
      .addField(`${config.prefix}comandos`, 'Comandos que voy creando los pongo aqui')
      .addField("Informacion Citada Por:", message.author.username)
      .setColor(0xff0000)
      .setTimestamp()
      .setThumbnail(message.guild.iconURL({format:"png", dynamic:"true"}))
    message.channel.send(embed)
    message.delete()
}

  

if (message.content === prefix + 'bot') {
    const embed = new MessageEmbed()
      .setTitle('Mi Información')
      .setDescription('Esta Es Mi Información')
      .addField('Mi Nombre', client.user.username)
      .addField('Mi Descripción', `Soy un Bot Oficial del Server de ${message.guild.name}`)
      .addField('Mi Versión', '0.2')
      .addField("mi creador","Oscar-Gamerඞ#7407")
      .addField("Informacion Citada Por:", message.author.username)
      .setTimestamp()
      .setColor(0xff0000)
      .setThumbnail(message.guild.iconURL({format:"png", dynamic:"true"}))
    message.channel.send(embed)
    message.delete()
}

 

if (message.content === prefix + 'comandos') {
    const embed = new MessageEmbed()
      .setTitle('Comandos')
      .setDescription("Aca Te Dejo Mis Comandos")
      .addField(`${config.prefix}server`, "Te Doy El Nombre Del Server Y El Numeros De Miembros")
      .addField(`${config.prefix}ping`,`te da latencia del bot`)
      .addField(`${config.prefix}bot`, "Te Doy Mi Información")
      .addField(`${config.prefix}avatar`, "Te Da Tu Avatar")
      .addField(`${config.prefix}nombre`, "prueba para ver que te sale")
      .addField(`${config.prefix}impostor`, "Te dara un impostor")
      .addField("Infromacion Citada Por:", message.author.username)
      .setTimestamp()
      .setColor(0xff0000)
      .setThumbnail(message.guild.iconURL({format:"png", dynamic:"true"}))

    message.channel.send(embed)
    message.delete()

}


  

if (message.content === prefix + 'server') {
    var valor = true;
    var owner;
    var count = 1;
    while (valor) {
      try {
        owner = message.guild.owner;
      } catch (e) { }
      if (owner || count === 3) {
        valor = false;
      } else count++;
    }
    if (!owner) owner = "usuario no encontrado";
    const embed = new MessageEmbed()
      .setTitle('Informacion Del Server')
      .setDescription('Informacion Actual Del Server')
      .addField('Nombre Del Server:', message.guild.name, true)
      .addField('id del server:', message.guild.id, true)
      .addField('Miembros Del Server:', message.guild.memberCount, true)
      .addField('Bot Oficial:', message.guild.me, true)
      .addField('Creado el server:', message.guild.createdAt, true)
      .addField(`creador del server:`, owner, true)
      .addField(`Region:`, message.guild.region, true)
      .setAuthor(client.user.username, client.user.avatarURL())
      .addField("Infromacion Citada Por:", message.author.username)
      .setTimestamp()
      .setColor(0xff0000)
      .setThumbnail(message.guild.iconURL({format:"png", dynamic:"true"}))
    message.channel.send(embed);
    message.delete()
  }
  const db = new Database()
  db.set("key", "value").then(() => { });
  db.get("key").then(value => { });
  db.delete("key").then(() => { });
  db.list().then(keys => { });
  db.list("prefix").then(matches => { });

if (message.content.startsWith(prefix + "avatar")) {

    const user = message.mentions.users.first() || message.author;
    const embed = new MessageEmbed()
      .setColor(0xff0000)
      .setImage(user.displayAvatarURL({ format: "png", dynamic: "true", size: 1024 }))
      .addField("📷**aca te dejo el avatar de**:", user.username)
      .addField(`**Link**:`, `[Has click en mi](${user.displayAvatarURL({ format: "png", dynamic: "true", size: 1024 })})`)
      .setAuthor(message.author.username, message.author.displayAvatarURL())
    message.channel.send(embed)
    message.delete()
}

  
if (message.content.startsWith(prefix + "nombre")) {

    const user = message.mentions.users.first() || message.author;
    const embed = new MessageEmbed()
      .setColor(0xff0000)
      .setThumbnail(message.guild.iconURL({format:"png", dynamic:"true"}))
      .setFooter(`${message.guild.name}`)
      .addField("🦅Segun los datos de la CIA tu nombre es:", `${user.username}👀`)
      .setAuthor(client.user.username, client.user.displayAvatarURL())
      .setThumbnail(`https://media.giphy.com/media/Vkf4dHHoV6tSkwofUx/giphy.gif`)
    message.channel.send(embed)
  }

  if (message.content === prefix + 'moderacion') {
    if (!message.member.permissionsIn(message.channel).has('ADMINISTRATOR')) {
      return message.channel.send(`${message.author.username},**no puedes ver estos comandos no eres administrador**`)
    }
    const embed = new MessageEmbed()
      .setAuthor(client.user.username, client.user.avatarURL())
      .setTitle('Ayuda a los moderadores')
      .setDescription('Comandos de moderación que e echo por ahorax⚔')
      .addField(`${config.prefix}kick`, 'expulsa al usuario mencionado❌')
      .addField(`${config.prefix}ban`, 'Banea al usuario mencionado❌')
      .addField(`${config.prefix}say`, 'Con esto puedes dar noticias📢')
      .setColor(0xff0000)
      .setFooter(message.guild.name)
      .setTimestamp()
      .setThumbnail(message.guild.iconURL({format:"png", dynamic:"true"}))
    message.channel.send(embed)
};


if(message.content.startsWith(prefix + 'ping')) { 
    let ping = Math.floor(message.client.ws.ping)
    const uwu = new MessageEmbed()
    .setAuthor(message.guild.name)
    .setThumbnail(message.guild.iconURL({format:"png", dynamic:"true"}))
    .setTitle(`Ping`)
    .setDescription(`Este es mi ping en el server de ${message.guild.name} es de:\n`+ ping + "ms")
    .setColor(0xff0000)
    .setTimestamp()
    .setFooter(message.author.username)
    message.channel.send(uwu)
    message.delete()
}

});





const Database = require("@replit/database")
client.login(config.token);

client.on("message", async message => {
  var config = require("./config.json");
  var prefix = config.prefix;
if (message.mentions.users.first() && message.mentions.users.first().id === client.user.id) {
    message.channel.send(`Este es mi prefix ${config.prefix}`)
}});