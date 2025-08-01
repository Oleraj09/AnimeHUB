import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import SkeletonCard from '../../components/SkeletonCard';
const CurrentlyAiring = ({ title, items, index, url, page }) => {
    const navigate = useNavigate();
    const { data, loading, error } = useFetch({ url: url });
    return (
        <div className="running-anime mt-0 mb-16 select-none">
            <div className="anime-section-title flex flex-col sm:flex-row items-start sm:items-center justify-between px-1 gap-y-2">
                <h1 className="text-[#006699ff] text-[22px] sm:text-[28px] font-[600]">{title}</h1>
                <Link to={`/${page}`}>
                    <button className="text-[#2d50a7] text-sm sm:text-base cursor-pointer">
                        View More &#x2192;
                    </button>
                </Link>
            </div>

            <div className="current-card grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 pt-2 pb-4">
                {loading
                    ? Array(items).fill(0).map((_, idx) => <SkeletonCard key={idx} />)
                    : data?.data?.slice(index || 0, (index || 0) + items).map((anime, idx) => (
                        <Link to={`/details/${anime.mal_id}`} key={idx} className="cursor-pointer">
                            <div className="flex flex-col sm:flex-row shadow p-4 rounded-[10px] gap-4 hover:shadow-xl duration-400 hover:cursor-pointer group">
                                <div className="running-anime-banner w-full sm:w-[170px] h-[230px] sm:h-full rounded overflow-hidden">
                                    <img
                                        className="rounded-[7px] w-full h-full md:h-[210px] object-cover object-top group-hover:scale-120 duration-400 transition-all"
                                        src={anime.images.jpg.large_image_url}
                                        alt={anime.title}
                                    />
                                </div>

                                <div className="running-anime-information flex flex-col gap-y-2 flex-1 py-1">
                                    <div className="px-2 py-1 border rounded text-sm w-fit text-[#2d50a7]">{anime.status}</div>
                                    <p className="flex flex-wrap gap-x-[10px] text-[14px] sm:text-[16px]">
                                        <span className="capitalize">{(anime.season && anime.year) ? `${anime.season} ${anime.year}` : 'Announcement'}</span>
                                        &#8901;
                                        <span>{anime.episodes || 0} Episodes</span>
                                    </p>
                                    <h1 className="leading-snug pt-1 text-base sm:text-lg">
                                        {anime.type} - {anime.title.length > 35 ? `${anime.title.slice(0, 35)}...` : anime.title}
                                    </h1>
                                    <div className="rating flex gap-x-4 py-2 text-sm">
                                        <div className="stars">
                                            <div><span>&#9734;</span> {anime.score || 0}</div>
                                            <p>{anime.scored_by} Users</p>
                                        </div>
                                        <div className="rank">
                                            <div><span>#</span> {anime.rank || 0}</div>
                                            <p>Ranking</p>
                                        </div>
                                    </div>
                                    <div className="genre flex flex-wrap gap-2">
                                        {anime.genres && anime.genres.length > 2 ? (
                                            <>
                                                {anime.genres.slice(0, 2).map((genre, index) => (
                                                    <div key={index} className="button-tranparency px-2 py-1 border rounded-[7px] text-sm">
                                                        {genre.name.length > 12 ? genre.name.slice(0, 8) : genre.name}
                                                    </div>
                                                ))}
                                                <div className="button-tranparency px-2 py-1 border rounded-[7px] text-sm">
                                                    +{anime.genres.length - 2}
                                                </div>
                                            </>
                                        ) : (
                                            anime.genres?.map((genre, index) => (
                                                <div key={index} className="button-tranparency px-2 py-1 border rounded-[7px] text-sm">
                                                    {genre.name}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

export default CurrentlyAiring;
