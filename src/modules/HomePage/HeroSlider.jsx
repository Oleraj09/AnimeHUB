import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './HomePage.css';
import useFetch from '../../hooks/useFetch';
import { Link, useNavigate } from 'react-router-dom';
const HeroSlider = () => {
  const navigate = useNavigate();
  const { data, loading, error } = useFetch({ url: 'https://api.jikan.moe/v4/seasons/now' });
  const [isSmOrAbove, setIsSmOrAbove] = useState(window.innerWidth >= 768);
  useEffect(() => {
    const handleResize = () => setIsSmOrAbove(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true}
      className="w-full h-[500px] sm:h-[700px] select-none"
    >
      {data?.data?.slice(1, 11).map((anime, id) => (
        <SwiperSlide key={id}>
          <Link to={`/details/${anime.mal_id}`} className='cursor-pointer'>
            <div className="relative bg-[#222] flex flex-col md:flex-row justify-between h-full text-white gap-4 py-10" style={{ backgroundImage: isSmOrAbove ? `none` : `url(${anime.images.jpg.large_image_url})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
              <div className="absolute bg-[#222] h-full w-full left-0 top-0 opacity-80"></div>
              <div className="flex-2 flex flex-col justify-center px-12 z-1">
                <p className="text-sm uppercase text-yellow-200">#{anime.type} #{anime.status}</p>
                <h1 className="text-4xl font-bold pt-8 pb-2">{anime.title}</h1>
                <div className="flex gap-4 text-sm text-gray-200 py-2">
                  <div className="release-date">📅  {anime.aired?.string.includes("?")
                    ? anime.aired.string.split("to ?")[0].trim()
                    : anime.aired.string}</div>
                  <div className="duration">⏱️ {anime.duration}</div>
                </div>
                <p className="text-sm leading-relaxed text-gray-100 max-w-xl py-6 tracking-[1px]">
                  {anime.synopsis?.length > 220 ? `${anime.synopsis.slice(0, 220)}...` : anime.synopsis}
                </p>
                <navigate to={`/details/${anime.mal_id}`} className='cursor-pointer'>
                  <button className="px-4 py-2 bg-transition border-1 text-[#2d50a7] font-semibold rounded-full hover:bg-gray-200 transition cursor-pointer">
                    More Details
                  </button>
                </navigate>
              </div>
              <div className="overlay-vertical flex-3 relative hidden md:block">
                <div className="overlay overflow-hidden h-full">
                  <img
                    src={anime.images.jpg.large_image_url}
                    alt={anime.title}
                    className="banner-img object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;
