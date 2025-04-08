import { z } from "zod";

export const loginMutateSchema = z.object({
    login: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .max(15, { message: "the max of characters are 15" }),
    password: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .max(30, { message: "the max of characters are 30" }),
});
