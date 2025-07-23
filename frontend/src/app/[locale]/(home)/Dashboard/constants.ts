import { UserData } from "@/interfaces/UserData";

export const userList: (keyof UserData)[] = [
    "status",
    "email",
    "phone",
    "job",
    "dateCreated",
];
