import logo from "./logo.svg";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// React
import { useEffect, useState } from "react";

// MATERIAL UI
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CloudIcon from "@mui/icons-material/Cloud";
import Button from "@mui/material/Button";

// External Libraries
import axios from "axios";
import moment from "moment";
import "moment/min/locales";
import { useTranslation } from "react-i18next";

moment.locale("ar");

const theme = createTheme({
	typography: {
		fontFamily: ["IBM-Regular"],
	},
});

let cancelAxios = null;
function App() {
	const { t, i18n } = useTranslation();

	// ====== state======= //
	const [dateAndTime, setDateAndTime] = useState("");
	const [temp, setTemp] = useState({
		number: null,
		description: "",
		min: null,
		max: null,
		icon: null,
	});
	const [locale, setLocale] = useState("ar");
	const direction = locale == "ar" ? "rtl" : "ltr";

	// ====== EVENT HANDLERS ======= //
	function handleLanguageClick() {
		if (locale == "en") {
			setLocale("ar");
			i18n.changeLanguage("ar");
			moment.locale("ar");
		} else {
			setLocale("en");
			i18n.changeLanguage("en");
			moment.locale("en");
		}

		setDateAndTime(moment().format("MMMM / Do / YYYY, h:mm:ss a"));
	}

	useEffect(() => {
		i18n.changeLanguage(locale);
	}, []);

	useEffect(() => {
		setDateAndTime(moment().format("MMMM / Do / YYYY, h:mm:ss a"));
		axios
			.get(
				"https://api.openweathermap.org/data/2.5/weather?lat=24.774265&lon=46.738586&appid=22f1934a2cdeb467d4c7e2c375af9200",
				{
					cancelToken: new axios.CancelToken((c) => {
						cancelAxios = c;
					}),
				}
			)
			.then(function (response) {
				// handle success
				const responseTemp = Math.round(response.data.main.temp - 273.15);
				const min = Math.round(response.data.main.temp_min - 273.15);
				const max = Math.round(response.data.main.temp_max - 273.15);
				const description = response.data.weather[0].description;
				const responseIcon = response.data.weather[0].icon;
				setTemp({
					number: responseTemp,
					min: min,
					max: max,
					description: description,
					icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`,
				});
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			});

		return () => {
			console.log("canceling");
			cancelAxios();
		};
	}, []);

	return (
		<div className='App'>
			<ThemeProvider theme={theme}>
				<Container maxWidth='sm' style={{}}>
					{/* CONTENT CONTAINER */}
					<div
						style={{
							height: "100vh",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							flexDirection: "column",
						}}>
						{/* CARD */}
						<div
							dir={direction}
							style={{
								width: "100%",
								background: "rgb(28 52 91 / 36%",
								color: "white",
								padding: "10px",
								borderRadius: "15px",
								boxShadow: "0px 11px 1px rgba(0, 0, 0, 0.05)",
							}}>
							{/*CONTENT */}
							<div>
								{/* CITY & TIME */}
								<div
									style={{
										display: "flex",
										alignItems: "end",
										justifyContent: "start",
									}}
									dir={direction}>
									<Typography variant='h3' style={{ marginRight: "20px" }}>
										{t("Riyadh")}
									</Typography>

									<Typography variant='h5' style={{ marginRight: "20px" }}>
										{dateAndTime}
									</Typography>
								</div>
								{/* === CITY & TIME === */}

								<hr />

								{/* CONTAINER OF DEGREE &CLOUD ICON */}
								<div
									style={{ display: "flex", justifyContent: "space-around" }}>
									{/* DEGREE &  DESCRIPTION*/}
									<div>
										{/* TEMP */}
										<div
											style={{
												display: "flex",
												justifyContent: "center",
												alignItems: "center",
											}}>
											<Typography variant='h1' style={{ textAlign: "right" }}>
												{temp.number}
											</Typography>

											<img src={temp.icon} />
										</div>
										{/*=== TEMP ===*/}

										<Typography variant='h6' style={{}}>
											{t(temp.description)}
										</Typography>

										{/* MIN & MAX*/}
										<div
											style={{
												display: "flex",
												justifyContent: "space-between",
												alignItems: "center",
											}}>
											<h5>
												{t("Min")} : {temp.min}{" "}
											</h5>
											<h5 style={{ margin: "0px 5px" }}> | </h5>
											<h5>
												{t("Max")} : {temp.max}{" "}
											</h5>
										</div>
										{/*== MIN & MAX ==*/}
									</div>
									{/* === DEGREE &  DESCRIPTION ===*/}

									<CloudIcon style={{ fontSize: "200px", color: "white" }} />
								</div>
								{/*=== CONTAINER OF DEGREE &CLOUD ICON ===*/}
							</div>
							{/* === CONTENT === */}
						</div>
						{/* === CARD === */}

						{/* TRANSLATION CONTAINER */}
						<div
							dir={direction}
							style={{
								display: "flex",
								justifyContent: "end",
								width: "100%",
								marginTop: "20px",
							}}>
							<Button
								style={{ color: "white" }}
								variant='text'
								onClick={handleLanguageClick}>
								{locale == "en" ? "Arabic" : "إنجليزي"}
							</Button>
						</div>
						{/* TRANSLATION CONTAINER */}
					</div>
					{/* === CONTENT CONTAINER === */}
				</Container>
			</ThemeProvider>
		</div>
	);
}

export default App;
