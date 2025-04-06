import { Client, Account } from "appwrite";

const client = new Client().setEndpoint("https://cloud.appwrite.io/v1").setProject("67f230270013948aba3a");

export const OAuthConnection = new Account(client);
