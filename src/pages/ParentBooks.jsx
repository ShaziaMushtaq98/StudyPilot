import { useState } from "react";
import { FiBook, FiPlus, FiEye, FiEyeOff } from "react-icons/fi";
import AppShell from "../components/AppShell";
import { Card, Chip, PrimaryBtn, PageTitle } from "../components/ui";
import { subjects } from "../data/mockData";

export default function ParentBooks() {
  const [books, setBooks] = useState([
    ...subjects.map((s) => ({ id: s.id, title: s.book, chapters: s.chapters.length, visible: true })),
    { id: "english", title: "Class 5 English", chapters: 5, visible: false },
  ]);
  const [title, setTitle] = useState("");

  const toggle = (id) => setBooks((b) => b.map((x) => (x.id === id ? { ...x, visible: !x.visible } : x)));
  const add = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    setBooks([...books, { id: Date.now().toString(), title: title.trim(), chapters: 4, visible: true }]);
    setTitle("");
  };

  return (
    <AppShell role="parent">
      <PageTitle chip={<Chip Icon={FiBook}>Books</Chip>} title="Manage Ayesha's books" sub="Choose which textbooks Ayesha can see in her Subjects tab." />
      <div className="space-y-4">
        {books.map((b) => (
          <Card key={b.id} className="flex items-center gap-5 p-6">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-blue-50 text-xl text-[#4f8bff]"><FiBook /></span>
            <div className="flex-1"><p className="font-display text-lg font-bold">{b.title}</p><p className="text-sm text-slate-500">{b.chapters} chapters</p></div>
            <button onClick={() => toggle(b.id)} className={`flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-bold ${b.visible ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-500"}`}>
              {b.visible ? <><FiEye /> Visible to Ayesha</> : <><FiEyeOff /> Hidden</>}
            </button>
          </Card>
        ))}
      </div>
      <form onSubmit={add} className="mt-6 flex gap-3">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Class 5 Urdu" className="flex-1 rounded-2xl bg-white px-5 py-3.5 text-sm shadow outline-none focus:ring-2 focus:ring-[#4f8bff]/40" />
        <PrimaryBtn><FiPlus /> Add book</PrimaryBtn>
      </form>
    </AppShell>
  );
}