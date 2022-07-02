import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import axios from "axios";
import { db } from "./db.js";
import { Diary } from "./models/diaryModel.js";

import "./models/diaryModel.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8080;
const API_KEY = process.env.API_KEY;
const UNITS = "imperial";

app.get("/all", async (req, res) => {
	try {
		const diaries = await Diary.findAll();

		return res.status(200).json({ diaries });
	} catch (e) {
		return res.status(500).json({ message: e });
	}
});

app.get("/diary/:id", async (req, res) => {
	try {
		const diary = await Diary.findOne({ where: { id: req.params.id } });
		return res.status(200).json({ diary });
	} catch (e) {
		return res.status(500).json({ message: e });
	}
});

app.post("/", async (req, res) => {
	try {
		const weather = await getWeather(
			req.body.location.lat,
			req.body.location.long
		);

		const diary = await Diary.create({
			content: req.body.content,
			text: req.body.text,
			feeling: req.body.feeling,
			location: weather.name,
			weather: weather.weather[0].description,
			temperature: weather.main.temp,
		});

		return res.status(200).json({ message: "Diary is created", diary });
	} catch (e) {
		return res.status(500).json({ message: e });
	}
});

app.delete("/:id", async (req, res) => {
	try {
		console.log(req.params.id);

		await Diary.destroy({
			where: {
				id: req.params.id,
			},
		});
		return res.status(200).json({ message: "Diary is deleted" });
	} catch (e) {
		return res.status(500).json({ message: e });
	}
});

const getWeather = async (lat, long) => {
	const res = await axios.get(
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=${UNITS}`
	);

	return res.data;
};

const setup = async () => {
	try {
		await db.sync();

		app.listen(PORT, async () => {
			console.log(`App is running on port ${PORT}`);
		});
	} catch (e) {
		console.log(e);
		process.exit(1);
	}
};

setup();
