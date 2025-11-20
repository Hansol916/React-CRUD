import React, { useState } from "react";
import { useEffect } from "react";

const BASE_URL = "https://69185d8021a96359486fd01b.mockapi.io/movies";

function AddModal({ show, setShow, refresh }) {
  const [form, setForm] = useState({
    title: "",
    director: "",
    year: "",
    rating: "",
  });

  const addItem = async () => {
    if (Object.values(form).some((value) => value.trim() === "")) {
      return alert("모든 값을 입력하세용.");
    }
    await fetch(BASE_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...form,
        year: Number(form.year),
        rating: Number(form.rating),
        createdAt: new Date().toISOString(),
      }),
    });

    alert("추가 완료");
    setShow(false);

    // 폼 초기화
    setForm({ title: "", director: "", year: "", rating: "" });

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
    [show, setShow],
    
  );

  if (!show) return null;

  return (
    <div className="modal-bg" style={{ display: "flex" }}>
      <div className="modal-box">
        <span className="close-btn" onClick={() => setShow(false)}>
          ×
        </span>

        <div className="modal-title">영화 추가</div>

        <input
          placeholder="title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          placeholder="director"
          value={form.director}
          onChange={(e) => setForm({ ...form, director: e.target.value })}
        />
        <input
          type="number"
          placeholder="year"
          value={form.year}
          onChange={(e) => setForm({ ...form, year: e.target.value })}
        />
        <input
          type="number"
          step="0.1"
          placeholder="rating"
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: e.target.value })}
        />

        <button onClick={addItem}>저장</button>
      </div>
    </div>
  );
}

export default AddModal;
