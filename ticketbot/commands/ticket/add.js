const { SlashCommandBuilder } = require('@discordjs/builders');
const { addMemberToTicket } = require('../../utils/ticketUtils');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('add')
    .setDescription('Adds a member to the ticket')
    .addUserOption(option => option.setName('user').setDescription('User to add').setRequired(true)),
  async execute(interaction, client) {
    await addMemberToTicket(interaction, client);
  },
};
