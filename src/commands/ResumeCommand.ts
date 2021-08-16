import { isUserInTheVoiceChannel, isMusicPlaying, isSameVoiceChannel } from "../utils/decorators/MusicHelper";
import { DefineCommand } from "../utils/decorators/DefineCommand";
import { BaseCommand } from "../structures/BaseCommand";
import { createEmbed } from "../utils/createEmbed";
import { IMessage } from "../../typings";
import { satisfies } from "semver";

@DefineCommand({
    aliases: ["다시재생"],
    description: "다시 시작",
    name: "resume",
    usage: "{prefix}resume"
})
export class ResumeCommand extends BaseCommand {
    @isUserInTheVoiceChannel()
    @isMusicPlaying()
    @isSameVoiceChannel()
    public execute(message: IMessage): any {
        if (message.guild?.queue?.playing) {
            message.channel.send(createEmbed("error", "The music player is not paused")).catch(e => this.client.logger.error("RESUME_CMD_ERR:", e));
        } else {
            message.guild!.queue!.playing = true;
            message.guild?.queue?.connection?.dispatcher.resume();
            // This will be reverted
            if (satisfies(process.version, ">=14.17.0")) {
                message.guild?.queue?.connection?.dispatcher.pause();
                message.guild?.queue?.connection?.dispatcher.resume();
            }
            message.channel.send(createEmbed("info", "▶ **|** 다시 시작됨")).catch(e => this.client.logger.error("RESUME_CMD_ERR:", e));
        }
    }
}
