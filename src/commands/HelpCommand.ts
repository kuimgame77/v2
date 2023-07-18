import { DefineCommand } from "../utils/decorators/DefineCommand";
import { BaseCommand } from "../structures/BaseCommand";
import { createEmbed } from "../utils/createEmbed";
import { IMessage } from "../../typings";
import { MessageEmbed } from "discord.js";

@DefineCommand({
    aliases: ["help", "ehdna", "도움"],
    description: "명령어 목록을 보여줍니다",
    name: "도움",
    usage: "{prefix}도움 [명령어]"
})
export class HelpCommand extends BaseCommand {
    public execute(message: IMessage, args: string[]): void {
        const command = message.client.commands.get(args[0]) ??
            message.client.commands.get(message.client.commands.aliases.get(args[0])!);
        if (command && !command.meta.disable) {
            message.channel.send(
                new MessageEmbed()
                    .setColor(this.client.config.embedColor)
                    .setAuthor(`${command.meta.name}에 대해`, "https://raw.githubusercontent.com/zhycorp/disc-11/main/.github/images/question_mark.png")
                    .addFields({ name: "**이름**", value: command.meta.name, inline: true },
                        { name: "**정보**", value: command.meta.description, inline: true },
                        { name: "**같은 명령어**", value: `${Number(command.meta.aliases?.length) > 0 ? command.meta.aliases?.map(c => `${c}`).join(", ") as string : "None"}`, inline: true },
                        { name: "**사용법**", value: `**\`${command.meta.usage?.replace(/{prefix}/g, message.client.config.prefix) as string}\`**`, inline: true })
            ).catch(e => this.client.logger.error("HELP_CMD_ERR:", e));
        } else {
            message.channel.send(
                createEmbed("info", message.client.commands.filter(cmd => !cmd.meta.disable && cmd.meta.name !== "eval").map(c => `\`${c.meta.name}\``).join(" "))
                    .setAuthor("명령어 목록")
                    .setThumbnail(message.client.user?.displayAvatarURL() as string)
                    .setFooter(`${message.client.config.prefix}help <명령어 이름> 사용하여 더 자세한 내용 확인!`, "https://raw.githubusercontent.com/zhycorp/disc-11/main/.github/images/info.png")
            ).catch(e => this.client.logger.error("HELP_CMD_ERR:", e));
        }
    }
}
