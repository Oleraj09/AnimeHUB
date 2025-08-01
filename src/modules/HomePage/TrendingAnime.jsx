import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import useFetch from '../../hooks/useFetch';
import { Link } from 'react-router-dom';
const TrendingAnime = () => {
    const { data, loading, error } = useFetch({ url: 'https://api.jikan.moe/v4/top/anime' });
    return (
        <>
            <div className="tending-anime mt-0 mb-5 select-none">
                <div className="anime-section-title flex items-center justify-between px-1">
                    <h1 className="text-[#006699ff] text-[28px] font-[600]">Trending</h1>
                    <Link to="/page/top-anime">
                        <button className='text-[#2d50a7] cursor-pointer'>View More &#x2192;</button>
                    </Link>
                </div>
                <Swiper
                    spaceBetween={20}
                    slidesPerView={1.5}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 4,
                        },
                        1280: {
                            slidesPerView: 4,
                        },
                        1366: {
                            slidesPerView: 5,
                        },
                        1440: {
                            slidesPerView: 5,
                        },
                        1536: {
                            slidesPerView: 6,
                        },
                        1920: {
                            slidesPerView: 8,
                        },
                    }}
                    className="p-5"
                >
                    {data?.data?.slice(0, 8).map((trending, i) => (
                        <SwiperSlide key={i}>
                            <Link to={`/details/${trending.mal_id}`} className='cursor-pointer'>
                                <div className="h-[250px] bg-[#2d50a7] text-white flex flex-row items-center justify-center rounded hover:border-[7px] hover:border-[#fff] duration-150 cursor-pointer">
                                    <div className="trending-anime-serial flex flex-col gap-y-[10px] items-center h-full justify-end py-[20px] px-[5px]">
                                        <p className="vertical-title text-[16px] tracking-[0.8px] rotate-180 writing-vertical">
                                            {trending.title.length > 20 ? `${trending.title.slice(0, 20)}...` : trending.title}
                                        </p>
                                        <p className="text-[18px]">
                                            {(i + 1).toString().padStart(2, '0')}
                                        </p>
                                    </div>
                                    <div className="trending-anime-banner h-full w-full">
                                        <img
                                            style={{ height: '100%', width: '100%' }}
                                            src={trending.images.jpg.large_image_url}
                                            alt={trending.title}
                                        />
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
};

export default TrendingAnime;
