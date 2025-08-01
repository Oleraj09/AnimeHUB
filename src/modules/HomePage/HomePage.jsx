import { useEffect, useState } from "react";
import CurrentlyAiring from "./CurrentlyAiring";
import GoogleAds from "./GoogleAds";
import HeroSlider from "./HeroSlider";
import TodaysList from "./TodaysList";
import TrendingAnime from "./TrendingAnime";

const HomePage = () => {
  const [show, setShow] = useState([false, false]);
  useEffect(() => {
    const delays = [1500, 3000, 4500];
    const timers = [];

    delays.forEach((delay, index) => {
      const id = setTimeout(() => {
        setShow((prev) => {
          const updated = [...prev];
          updated[index] = true;
          return updated;
        });
      }, delay);
      timers.push(id);
    });
    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);
  return (
    <>
      <HeroSlider />
      <GoogleAds />
      <TrendingAnime />
      <GoogleAds />
      <CurrentlyAiring title="Currently Airing" index={1} items={9} url="https://api.jikan.moe/v4/seasons/now" page="page/season-now"/>
      {show[0] && <TodaysList title="Todays List" />}
      {show[1] && <CurrentlyAiring title="Upcoming Anime" items={6} url="https://api.jikan.moe/v4/seasons/upcoming" page="page/upcoming-anime"/>}
      {show[2] && <CurrentlyAiring title="Anime List" items={18} url="https://api.jikan.moe/v4/anime" page="page/anime-list"/>}
    </>
  );
};

export default HomePage;
