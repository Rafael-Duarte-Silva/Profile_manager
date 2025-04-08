import { z } from "zod";

import { loginMutateSchema } from "../constants/loginMutateSchema";

export type LoginMutateSchema = z.infer<typeof loginMutateSchema>;
