import { DefineCommand } from "../utils/decorators/DefineCommand";
import { BaseCommand } from "../structures/BaseCommand";
import { IMessage } from "../../typings";
import { MessageEmbed } from "discord.js";

@DefineCommand({
    aliases: ["ping"],
    description: "현재 봇에 핑을 확인합니다.",
    name: "핑",
    usage: "{prefix}핑"
})
export class PingCommand extends BaseCommand {
    public execute(message: IMessage): IMessage {
        message.channel.send("🏓").then((msg: IMessage) => {
            const latency = msg.createdTimestamp - message.createdTimestamp;
            const wsLatency = this.client.ws.ping.toFixed(0);
            const embed = new MessageEmbed()
                .setAuthor("🏓 퐁!", message.client.user?.displayAvatarURL())
                .setColor(this.searchHex(wsLatency))
                .addFields({
                    name: "📶 **|** API",
                    value: `**\`${latency}\`** ms`,
                    inline: true
                }, {
                    name: "🌐 **|** 웹서켓",
                    value: `**\`${wsLatency}\`** ms`,
                    inline: true
                })
                .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp();

            msg.edit("", { embed }).catch(e => this.client.logger.error("PROMISE_ERR:", e));
        }).catch(e => this.client.logger.error("PROMISE_ERR:", e));
        return message;
    }

    private searchHex(ms: string | number): string | number {
        const listColorHex = [
            [0, 20, "GREEN"],
            [21, 50, "GREEN"],
            [51, 100, "YELLOW"],
            [101, 150, "YELLOW"],
            [150, 200, "YELLOW"]
        ];

        const defaultColor = "RED";

        const min = listColorHex.map(e => e[0]);
        const max = listColorHex.map(e => e[1]);
        const hex = listColorHex.map(e => e[2]);
        let ret: string | number = "#000000";

        for (let i = 0; i < listColorHex.length; i++) {
            if (min[i] <= ms && ms <= max[i]) {
                ret = hex[i];
                break;
            } else {
                ret = defaultColor;
            }
        }
        return ret;
    }
}
