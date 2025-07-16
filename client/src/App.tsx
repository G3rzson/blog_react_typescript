import Footer from "./Components/Footer";
import Header from "./Components/Header/Header";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import routes from "./Components/Routes";
import { Suspense } from "react";
import Loading from "./Components/Loading";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Header />

        <main className="flex-grow">
          <Suspense
            fallback={
              <div className="w-full h-[calc(100vh-36px-40px)] flex items-center justify-center backdrop-blur-sm bg-black/30">
                <Loading />
              </div>
            }
          >
            <Routes>
              {routes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </Router>
    </div>
  );
}
