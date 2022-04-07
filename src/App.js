import { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";
const url = "https://course-api.com/react-tours-project";
function App() {
	const [loading, setloading] = useState(true);
	const [tours, setTours] = useState([]);

	const removeTour = id => {
		setTours(tours.filter(tour => tour.id !== id));
	};

	const fetchTours = async () => {
		setloading(true);
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
	) : tours.length ? (
		<main>
			<Tours tours={tours} removeTour={removeTour} />
		</main>
	) : (
		<main>
			<div className="title">
				<h2>no tours left</h2>
				<button className="btn" onClick={fetchTours}>
					Refresh
				</button>
			</div>
		</main>
	);
}

export default App;
