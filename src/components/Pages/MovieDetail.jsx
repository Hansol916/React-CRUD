const BASE_URL = "https://69185d8021a96359486fd01b.mockapi.io/movies";

function MovieDetail({ id, setEditForm, setShowUpdate }) {
  const fetchDetail = async () => {
    if (!id) return alert("id 입력하세요.");

    const res = await fetch(`${BASE_URL}/${id}`);
    const data = await res.json();

    if (!data.title || !data.director) {
      return alert("Not Found");
    }
    alert("조회 성공!\n" + JSON.stringify(data));

    setEditForm({
      title: data.title || "",
      director: data.director || "",
      year: data.year || "",
      rating: data.rating || "",
    });

    // setShowUpdate(true);
  };

  return <button onClick={fetchDetail}>조회하기</button>;
}

export default MovieDetail;
