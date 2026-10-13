import { Routes, Route, Navigate } from "react-router-dom";
import { getSession } from "./utils/auth";
import Login from "./pages/Login";
import ParentPin from "./pages/ParentPin";
import Today from "./pages/Today";
import DiaryScanner from "./pages/DiaryScanner";
import Subjects from "./pages/Subjects";
import SubjectDetail from "./pages/SubjectDetail";
import Practice from "./pages/Practice";
import Progress from "./pages/Progress";
import Rewards from "./pages/Rewards";
import ParentOverview from "./pages/ParentOverview";
import ParentBooks from "./pages/ParentBooks";
import ParentActivity from "./pages/ParentActivity";

const Guard = ({ role, children }) => {
  const s = getSession();
  if (!s || s.role !== role) return <Navigate to={role === "parent" ? "/parent-pin" : "/"} replace />;
  return children;
};
const S = ({ children }) => <Guard role="student">{children}</Guard>;
const P = ({ children }) => <Guard role="parent">{children}</Guard>;

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/parent-pin" element={<ParentPin />} />
      <Route path="/today" element={<S><Today /></S>} />
      <Route path="/scan" element={<S><DiaryScanner /></S>} />
      <Route path="/subjects" element={<S><Subjects /></S>} />
      <Route path="/subjects/:sid" element={<S><SubjectDetail /></S>} />
      <Route path="/practice/:sid/:ch" element={<S><Practice /></S>} />
      <Route path="/progress" element={<S><Progress /></S>} />
      <Route path="/rewards" element={<S><Rewards /></S>} />
      <Route path="/parent" element={<P><ParentOverview /></P>} />
      <Route path="/parent/books" element={<P><ParentBooks /></P>} />
      <Route path="/parent/activity" element={<P><ParentActivity /></P>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}