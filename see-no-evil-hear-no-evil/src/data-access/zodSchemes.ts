import { z } from "zod";

const channelWithUserCountScheme = z.object({
    channelName:z.string(),
    id:z.string(),
    userCount: z.coerce.number()
})


export const channelsWithUserCountQueryScheme = z.array(channelWithUserCountScheme)