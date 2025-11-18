function MovieList({ movies }) {
  return (
    <div>
      {movies.map((m) => (
        <div className="div_list" key={m.id}>
          {m.id} : {m.title} / {m.director} ({m.year}) [{m.rating}]
        </div>
      ))}
    </div>
  );
}

export default MovieList;
