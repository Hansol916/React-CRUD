import { useEffect } from "react";

const BASE_URL = "https://69185d8021a96359486fd01b.mockapi.io/movies";

function UpdateModal({ show, setShow, id, editForm, setEditForm, refresh }) {
  const updateItem = async () => {
    await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...editForm,
        year: Number(editForm.year),
        rating: Number(editForm.rating),
      }),
    });

    alert("수정 완료");
    setShow(false);
    refresh();
  };

  // ESC 키로 모달 닫기
  useEffect(
    () => {
      if (!show) return;

      const handleEsc = (e) => {
        if (e.key === "Escape") {
          setShow(false);
        }
      };
      window.addEventListener("keydown", handleEsc);
      return () => {
        window.removeEventListener("keydown", handleEsc);
      };
    },
    [show,setShow]
  );

  if (!show) return null;

  return (
    <div className="modal-bg" style={{ display: "flex" }}>
      <div className="modal-box">
        <span className="close-btn" onClick={() => setShow(false)}>
          ×
        </span>

        <div className="modal-title">영화 수정하기</div>

        <input
          placeholder="title"
          value={editForm.title}
          onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
        />
        <input
          placeholder="director"
          value={editForm.director}
          onChange={(e) =>
            setEditForm({ ...editForm, director: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="year"
          value={editForm.year}
          onChange={(e) => setEditForm({ ...editForm, year: e.target.value })}
        />
        <input
          type="number"
          step="0.1"
          placeholder="rating"
          value={editForm.rating}
          onChange={(e) => setEditForm({ ...editForm, rating: e.target.value })}
        />

        <button onClick={updateItem}>수정 완료</button>
      </div>
    </div>
  );
}

export default UpdateModal;
