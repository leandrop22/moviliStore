"use client";
import { FC, FormEvent, useState } from "react";

interface Props {
  onSearch: (text: string) => void;
}

const SearchBar: FC<Props> = ({ onSearch }) => {
  const [q, setQ] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(q.trim());
  };

  const clearSearch = () => {
    setQ("");
    onSearch("");
  };

  return (
    <form onSubmit={submit} className="search-bar">
      <input
        type="text"
        className="search-bar__input"
        placeholder="Buscar modelo o marca..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      {q && (
        <button
          type="button"
          onClick={clearSearch}
          className="search-bar__button"
        >
          Limpiar
        </button>
      )}
    </form>
  );
};

export default SearchBar;
