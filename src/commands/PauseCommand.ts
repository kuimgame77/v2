import { isUserInTheVoiceChannel, isMusicPlaying, isSameVoiceChannel } from "../utils/decorators/MusicHelper";
import { DefineCommand } from "../utils/decorators/DefineCommand";
import { BaseCommand } from "../structures/BaseCommand";
import { createEmbed } from "../utils/createEmbed";
import { IMessage } from "../../typings";

@DefineCommand({
    aliases: ["dlfwlwjdwl", "일시중지"],
    description: "노래를 일시중지합니다",
    name: "pause",
    usage: "{prefix}pause"
})
export class PauseCommand extends BaseCommand {
    @isUserInTheVoiceChannel()
    @isMusicPlaying()
    @isSameVoiceChannel()
    public execute(message: IMessage): any {
        if (message.guild?.queue?.playing) {
            message.guild.queue.playing = false;
            message.guild.queue.connection?.dispatcher.pause();
            return message.channel.send(createEmbed("info", "⏸ **|** 음악 플레이어가 일시 중지되었습니다."));
        }
        message.channel.send(createEmbed("error", "The music player is already paused"))
            .catch(e => this.client.logger.error("PAUSE_CMD_ERR:", e));
    }
}
