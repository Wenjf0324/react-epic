import React, { Suspense, lazy } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import { Switch, Route } from "react-router-dom";

// import Home from "./pages/Home";
// import History from "./pages/History";
// import About from "./pages/About";

const Home = lazy(() => import("./pages/Home"));
const History = lazy(() => import("./pages/History"));
const About = lazy(() => import("./pages/About"));

console.log(Loading);

function App() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/history" exact component={History} />
            <Route path="/about" exact component={About} />
          </Switch>
        </Suspense>
      </main>

      <Footer />
    </>
  );
}

export default App;
