import { z } from "zod";

export const signInSchema = z.object({
    //we wrote indentifier instead of username or email, in prod they called as indentifier
    identifier: z.string(),
    password: z.string()

})