import { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";
const url = "https://course-api.com/react-tours-project";
function App() {
	const [loading, setloading] = useState(true);
	const [tours, setTours] = useState([]);

	const fetchTours = async () => {
		try {
			const response = await fetch(url);
			const tours = await response.json();
			setloading(false);
			setTours(tours);
		} catch (error) {
			setloading(false);
			console.log(error);
		}
	};

	useEffect(() => {
		fetchTours();
	}, []);

	return loading ? (
		<main>
			<Loading />
		</main>
	) : (
		<main>
			<Tours tours={tours} />
		</main>
	);
}

export default App;
