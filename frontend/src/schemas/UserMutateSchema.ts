import { z } from "zod";

export const userMutateSchema = z.object({
    email: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .email("Whoops, make sure it's an email"),
    username: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .max(15, { message: "the max of characters are 15" }),
    fullName: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .max(30, { message: "the max of characters are 30" }),
    password: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .max(30, { message: "the max of characters are 30" }),
    phone: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .max(15, { message: "the max of characters are 15" }),
    job: z
        .string()
        .min(1, { message: "This field has to be filled." })
        .max(30, { message: "the max of characters are 30" }),
});

export type UserMutateSchema = z.infer<typeof userMutateSchema>;
