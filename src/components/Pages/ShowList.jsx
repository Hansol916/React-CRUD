import React, { useState } from "react";
import MovieList from "./MovieList";
import MovieDetail from "./MovieDetail";
import MovieDelete from "./MovieDelete";
import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";

const BASE_URL = "https://69185d8021a96359486fd01b.mockapi.io/movies";

function ShowList() {
  const [movies, setMovies] = useState([]);
  const [id, setId] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [editForm, setEditForm] = useState({
    title: "",
    director: "",
    year: "",
    rating: "",
  });

  const fetchList = async () => {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    setMovies(data);
  };

  const openUpdateModal = () => {
    if (!id) return alert("id 입력하세요.");
    if (!movies || movies.length === 0) {
      return alert("먼저 목록을 불러오세요.");
    }
    const exist = movies.some((m) => m.id === id);
    if (!exist) return alert("존재하지 않는 id입니다.");
    const movie = movies.find((m) => m.id === id);
    setEditForm({
      title: movie.title,
      director: movie.director,
      year: movie.year,
      rating: movie.rating,
    });
    setShowUpdate(true);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Movie CRUD (React)</h1>

      <button onClick={fetchList}>목록 보기</button>
      <button onClick={() => setShowAdd(true)}>+ 영화 추가</button>

      <hr />

      <div>
        id:
        <input value={id} onChange={(e) => setId(e.target.value)} />
        <MovieDetail
          id={id}
          setEditForm={setEditForm}
          setShowUpdate={setShowUpdate}
        />
        <MovieDelete id={id} movies={movies} refresh={fetchList} />
        <button onClick={openUpdateModal}>수정하기</button>
      </div>

      <hr />

      <MovieList movies={movies} />

      <AddModal show={showAdd} setShow={setShowAdd} refresh={fetchList} />

      <UpdateModal
        show={showUpdate}
        setShow={setShowUpdate}
        id={id}
        editForm={editForm}
        setEditForm={setEditForm}
        refresh={fetchList}
      />
    </div>
  );
}

export default ShowList;
