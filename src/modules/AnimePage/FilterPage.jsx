import { Link, useSearchParams } from "react-router-dom";
import useFetch from '../../hooks/useFetch';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const FilterPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("q");
  const season = searchParams.get("season");
  const year = searchParams.get("year");
  const page = parseInt(searchParams.get("page") || "1");

  const urls = () => {
    if (search) {
      return `https://api.jikan.moe/v4/anime?q=${search.toLowerCase()}&page=${page}`;
    }
    if (season && year) {
      return `https://api.jikan.moe/v4/seasons/${year}/${season.toLowerCase()}?page=${page}`;
    }
    return "";
  };
  const { data, loading, error } = useFetch({ url: urls() });

  const goToPage = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    setSearchParams(params);
  };

  return (
    <>
      <div className="filter-page select-none">
        <div className="keyword flex gap-5">
          <h1>Search:</h1>
          {search && (<div className="key px-1 text-[#fff] bg-[red] rounded-full px-2 text-[16px] flex items-center justify-center">{search}</div>)}
          {season && (<div className="season px-1 text-[#fff] bg-[green] rounded-full px-2 text-[16px] flex items-center justify-center">{season}</div>)}
          {year && (<div className="key px-1 text-[#fff] bg-[blue] rounded-full px-2 text-[16px] flex items-center justify-center">{year}</div>)}
        </div>

        {data?.data?.length > 0 ? (
          <>
            <div className="current-card grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 pt-2 pb-4">
              {data.data.slice(0,25).map((anime, id) => (
                <Link to={`/details/${anime.mal_id}`} key={id} className='cursor-pointer'>
                  <div
                    className="flex flex-col sm:flex-row shadow p-4 rounded-[10px] gap-4 hover:shadow-xl duration-400 hover:cursor-pointer group"
                  >
                    <div className="running-anime-banner w-full sm:w-[170px] h-[230px] sm:h-full rounded overflow-hidden">
                      <img
                        className="rounded-[7px] w-full h-full md:h-[210px] object-cover object-top group-hover:scale-120 duration-400 transition-all"
                        src={anime.images.jpg.large_image_url}
                        alt={anime.title || anime.title_english}
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
                        {anime.type} - {(anime.title_english || anime.title)?.length > 35 ? `${(anime.title_english || anime.title).slice(0, 35)}...` : anime.title_english || anime.title}
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
              ))}
            </div>

            {/* Pagination Controls */}
            {data?.pagination && (
              <div className="flex justify-center items-center gap-4 mt-6 mb-12">
                <button
                  disabled={page <= 1}
                  onClick={() => goToPage(page - 1)}
                  className={`px-4 py-2 flex items-center h-[40px] rounded-full w-[40px] ${page <= 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue cursor-pointer'}`}
                >
                  <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
                </button>

                <span className="text-[16px] text-gray-600">
                  Page {page} of {data.pagination.last_visible_page}
                </span>

                <button
                  disabled={!data.pagination.has_next_page}
                  onClick={() => goToPage(page + 1)}
                  className={`px-4 py-2  flex items-center h-[40px] rounded-full w-[40px] ${!data.pagination.has_next_page ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue cursor-pointer'}`}
                >
                  <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="border-1 mt-5 mb-10 px-5 py-3 text-center">No Search Result Found!</div>
        )}
      </div >
    </>
  )
}

export default FilterPage;
