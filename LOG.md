# Development Log

## Project Setup

- `index.css` - global styles

## Loading Component

- create `Loading.js`

```jsx
const Loading = () => {
  return (
    <div className="loading">
      <h1>loading...</h1>
    </div>
  );
};

export default Loading;
```

## Fetch Data

- inside `App.js`, we have

```jsx
import { useState, useEffect } from "react";
import Loading from "./Loading";
const url = "https://course-api.com/react-tours-project";

function App() {
  const [loading, setloading] = useState(true);
  const [tours, setTours] = useState([]);

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
  ) : (
    <main>Tours</main>
  );
}

export default App;
```

## Display Tours

- create `Tours.js`

```jsx
import Tour from "./Tour";

const Tours = ({ tours }) => {
  return (
    <section>
      <div className="title">
        <h2>our tours</h2>
        <div className="underline"></div>
      </div>
      <div>
        {tours.map((tour) => (
          <Tour key={tour.id} {...tour} />
        ))}
      </div>
    </section>
  );
};

export default Tours;
```

- create `Tour.js`

```jsx
const Tour = ({ name, image, info, price }) => {
  return (
    <article className="single-tour">
      <img src={image} alt={name} />
      <footer>
        <div className="tour-info">
          <h4>{name}</h4>
          <h4 className="tour-price">${price}</h4>
        </div>
        <p>{info}</p>
        <button className="delete-btn">not interested</button>
      </footer>
    </article>
  );
};

export default Tour;
```

## Toggle Info

inside `Tour.js`, we update

```jsx
import { useState } from "react";

const Tour = ({ name, image, info, price }) => {
  const [readMore, setReadMore] = useState(false);
  return (
    // ...

    <p>
      {readMore ? info : info.substring(0, 200).concat("...")}
      <button
        onClick={() => {
          setReadMore(!readMore);
        }}
      >
        {readMore ? "Show Less" : "Read More"}
      </button>
    </p>

    // ...
  );
};

export default Tour;
```

## Remove and Refetch Tours

inside `App.js`, we update

```jsx
function App() {
  // ...

  const removeTour = (id) => {
    setTours(tours.filter((tour) => tour.id !== id));
  };

  // ...

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
```

inside `Tours.js`, we update

```jsx
const Tours = ({ tours, removeTour }) => {
  // ...

  <Tour key={tour.id} {...tour} removeTour={removeTour} />;

  // ...
};
```

inside `Tour.js`, we update

```jsx
const Tour = ({ id, name, image, info, price, removeTour }) => {
  // ...

  <button className="delete-btn" onClick={() => removeTour(id)}>
    not interested
  </button>;

  // ...
};

export default Tour;
```
