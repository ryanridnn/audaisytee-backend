import { DataTypes } from "sequelize";
import { db } from "../db.js";

export const Diary = db.define("Diary", {
	content: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	text: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	date: {
		type: DataTypes.DATE,
		defaultValue: new Date(),
	},
	location: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	feeling: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	weather: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	temperature: {
		type: DataTypes.NUMBER,
		allowNull: false,
	},
});
