const { CategoryChannel, PermissionFlagsBits } = require('discord.js');
const { ticketCategory, logChannel } = require('../config.json');
const { logTicketAction } = require('./logger');

async function createTicket(interaction, client) {
  const category = interaction.guild.channels.cache.find(c => c.name === ticketCategory && c.type === 'GUILD_CATEGORY');
  if (!category) return interaction.reply('Ticket category not found!');

  const ticketChannel = await interaction.guild.channels.create({
    name: `ticket-${interaction.user.username}`,
    type: 'GUILD_TEXT',
    parent: category.id,
    permissionOverwrites: [
      {
        id: interaction.guild.id,
        deny: [PermissionFlagsBits.ViewChannel],
      },
      {
        id: interaction.user.id,
        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.SendMessages, PermissionFlagsBits.ReadMessageHistory],
      },
    ],
  });

  await ticketChannel.send(`Ticket created by ${interaction.user}`);
  await interaction.reply({ content: 'Ticket created!', ephemeral: true });
  await logTicketAction(client, 'create', interaction.user, ticketChannel);
}

async function closeTicket(interaction, client) {
  const channel = interaction.channel;
  if (channel.parent && channel.parent.name === ticketCategory) {
    await channel.delete();
    await interaction.reply('Ticket closed!');
    await logTicketAction(client, 'close', interaction.user, channel);
  } else {
    await interaction.reply('This is not a ticket channel!');
  }
}

async function setupTicketSystem(interaction, client) {
  const category = await interaction.guild.channels.create({
    name: ticketCategory,
    type: 'GUILD_CATEGORY',
  });

  const log = await interaction.guild.channels.create({
    name: logChannel,
    type: 'GUILD_TEXT',
  });

  await interaction.reply(`Ticket system setup complete! Category: ${category.name}, Log Channel: ${log.name}`);
}

async function addMemberToTicket(interaction, client) {
  const user = interaction.options.getUser('user');
  const channel = interaction.channel;
  if (channel.parent && channel.parent.name === ticketCategory) {
    await channel.permissionOverwrites.create(user.id, {
      VIEW_CHANNEL: true,
      SEND_MESSAGES: true,
      READ_MESSAGE_HISTORY: true
    });
    await interaction.reply(`Added ${user.tag} to the ticket.`);
    await logTicketAction(client, 'add', interaction.user, channel, user);
  } else {
    await interaction.reply('This is not a ticket channel!');
  }
}

async function removeMemberFromTicket(interaction, client) {
  const user = interaction.options.getUser('user');
  const channel = interaction.channel;
  if (channel.parent && channel.parent.name === ticketCategory) {
    await channel.permissionOverwrites.delete(user.id);
    await interaction.reply(`Removed ${user.tag} from the ticket.`);
    await logTicketAction(client, 'remove', interaction.user, channel, user);
  } else {
    await interaction.reply('This is not a ticket channel!');
  }
}

module.exports = { createTicket, closeTicket, setupTicketSystem, addMemberToTicket, removeMemberFromTicket };
