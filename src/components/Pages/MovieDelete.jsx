const BASE_URL = "https://69185d8021a96359486fd01b.mockapi.io/movies";

function MovieDelete({ id, movies, refresh }) {
  const deleteItem = async () => {
    if (!id) return alert("id 입력하세요.");

    if (!movies || movies.length === 0) {
      return alert("먼저 목록을 불러오세요.");
    }

    const exist = movies.some((m) => m.id === id);
    if (!exist) {
      return alert("존재하지 않는 id입니다.");
    }

    await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    alert("삭제 완료");
    refresh();
  };

  return <button onClick={deleteItem}>삭제하기</button>;
}

export default MovieDelete;
