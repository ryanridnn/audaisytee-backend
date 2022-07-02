import { Sequelize } from "sequelize";

export const db = new Sequelize("db", "user", "pass", {
	dialect: "sqlite",
	host: "./db/db.sqlite",
});
