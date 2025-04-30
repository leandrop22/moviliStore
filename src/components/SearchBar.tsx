"use client";
import { FC, FormEvent, useState } from "react";

interface Props { onSearch: (text: string) => void; }

const SearchBar: FC<Props> = ({ onSearch }) => {
  const [q, setQ] = useState("");
  const submit = (e: FormEvent) => { e.preventDefault(); onSearch(q.trim()); };
  return (
    <form onSubmit={submit} className="search-bar">
      <input
        type="text"
        className="w-full p-2 border rounded"
        placeholder="Buscar modelo o marca..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
