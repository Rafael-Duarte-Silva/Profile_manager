import { z } from "zod";

import { userMutateSchema } from "../constants/userMutateSchema";

export type UserMutateSchema = z.infer<typeof userMutateSchema>;
