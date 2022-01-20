import { config } from 'dotenv';
config();
import { Client, CommandInteraction, Intents } from 'discord.js';
import { createZoomMeeting } from './api';

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.login(process.env.BOT_TOKEN);

client.on('ready', () => {
  console.log('Bot has logged in');
});

client.on('interactionCreate', async (interaction) => {
  console.log(interaction);
  if (interaction.type === 'APPLICATION_COMMAND') {
    const cmdInteraction = interaction as CommandInteraction;
    console.log('Command Application');
    if (cmdInteraction.commandName === 'zoom') {
      const topic =
        (cmdInteraction.options.get('create')?.value as string) ||
        `New Meeting Created By ${interaction.user.tag}`;

      const { data: meeting } = await createZoomMeeting(topic);

      console.log(meeting);
      cmdInteraction.reply({
        embeds: [
          {
            title: topic,
            description: 'New zoom meeting',
            color: 'DARK_AQUA',
          },
        ],
        components: [
          {
            type: 'ACTION_ROW',
            components: [
              {
                type: 'BUTTON',
                style: 'LINK',
                label: 'Join Meeting',
                url: meeting.join_url,
              },
            ],
          },
        ],
      });
    }
  }
});
