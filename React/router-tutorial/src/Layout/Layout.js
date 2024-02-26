import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  const goArticles = () => {
    navigate("/articles", { replace: true });
  };
  return (
    <div>
      <header style={{ background: "lightgray", padding: 16, fontSize: 24 }}>
        Header
      </header>
      <button onClick={goBack}>back</button>
      <button onClick={goArticles}>articles</button>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
