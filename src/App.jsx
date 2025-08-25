import "./App.css";

import Header from "./components/Header/Header.jsx";
import Content from "./components/Content/Content.jsx";

export default function App() {
  return (
    <div className="form">
      <div className="form__inner">
        <Header />
        <Content />
      </div>
    </div>
  );
}
