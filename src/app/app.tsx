import { Routes, Route } from "react-router";
import { lazy, Suspense } from "react";
import { Navbar } from "../components/nav/navbar";
import { LoadingScreen } from "../components/ui/loading";

const Home = lazy(() => import("../pages/home"));
const Summoner = lazy(() => import("../pages/summoner"));
const Champions = lazy(() => import("../pages/champions"));
const Champion = lazy(() => import("../pages/champion"));
const Login = lazy(() => import("../pages/login"));
const Signup = lazy(() => import("../pages/signup"));
const Profile = lazy(() => import("../pages/profile"));
const About = lazy(() => import("../pages/about"));

export function App() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="summoner/:gameName/:tagLine" element={<Summoner />} />
          <Route path="champions" element={<Champions />} />
          <Route path="champions/:champName" element={<Champion />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="profile" element={<Profile />} />
          <Route path="about" element={<About />} />
        </Routes>
      </Suspense>
    </>
  );
}
