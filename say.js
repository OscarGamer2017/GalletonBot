const Discord = require("discord.js");
const client = new Discord.Client({ws: {Intents: new Discord.Intents(Discord.Intents.ALL)}});
const config = require("./config.json");
const fs = require("fs");
const fse = require("fs-extra");
const { disconnect } = require("cluster");
let prefix = config.prefix;

Array.prototype.romove = function(x){
    return this.filter(function(v){
     return v !== x;
    });
   };
   
   client.on("error", (e) => console.error(e));
   
   client.on("ready", () => {
      console.log(`say esta listo!,En ${client.user.tag}`)
   
});

client.on("message", function (message){

})


client.on("message", async message => {
         if(message.author.bot) return;
         if(!message.guild) return;
         if(!message.content.startsWith(config.prefix)) return;
         var fullmsg = message.content.split(" ");
         var command = fullmsg [0].replace(config.prefix, "");
         var args = fullmsg.romove(fullmsg[0]);
         console.log(`${command} ${args.join(" ")}`);
         if (!command) return; 
if(command ===  "say") { 
              if (!message.member.permissionsIn(message.channel).has('ADMINISTRATOR')) {
      return message.channel.send(`${message.author.username} , **no puedes hacer esto no eres moderador**`)}
   message.delete();
    if(!args[0]) return message.channel.send("Tambien escribe lo que quieres que diga");
    
const texto = args.map(p=>{

if (message.member.hasPermission('ADMINISTRATOR')) {
return p;

} else if (p=="@everyone"&&!message.member.hasPermission("MENTION_EVERYONE")) {
return "everyone";

} else if (p=="@here"&&!message.member.hasPermission("MENTION_EVERYONE")){
return "here";

} else if(p.startsWith("<@&")&& p.endsWith(">")) {

let rol = message.guild.roles.cache.get(p.substring(3, p.length-1));

if (!rol) {
 return p;

} else if (rol.mentionable) {
 return p;

} else {
 return rol.name;
}
} else {
return p;
}
});

if(!args[0].match(/<#(\d{17,19})>/)){
message.channel.send(texto.join(' '));

}else{

if(!args[1]) return message.channel.send("Tambien escribe lo que quieres que diga")

const canal = message.mentions.channels.first();

if (!canal) return message.channel.send("Canal no encontrado");

canal.send(texto.slice(1).join(' '));}}
});
client.login(config.token);