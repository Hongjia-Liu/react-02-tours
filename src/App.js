import { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tour";
const url = "https://course-api.com/react-tours-project";
function App() {
	const [loading, setloading] = useState(true);
	const [tours, setTours] = useState([]);

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
