import React, { Suspense, lazy } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import { Switch, Route } from "react-router-dom";

// import Home from "./pages/Home";
// import History from "./pages/History";
// import About from "./pages/About";

//路由懒加载
const Home = lazy(() => import("./pages/Home"));
const History = lazy(() => import("./pages/History"));
const About = lazy(() => import("./pages/About"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

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
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
          </Switch>
        </Suspense>
      </main>

      <Footer />
    </>
  );
}

export default App;
