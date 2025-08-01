import SkeletonCard from '../../components/SkeletonCard';
import useFetch from '../../hooks/useFetch';
import { Link, useParams } from "react-router-dom";
const SingleAnime = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch({ url: `https://api.jikan.moe/v4/anime/${id}/full` });
  return (
    <>
      {data && (
        <>
          <h1 className='text-center my-10 mb-2 text-[40px] uppercase tracking-[5px] leading-none select-none'>[ Anime Details ]</h1>
          <p className='text-center mb-0 mt-0 leading-none'>{data?.data?.title_english}</p>
          <div className="flex justify-center mt-2">
            <button className="bg-[#2d50a7] px-2 rounded-full text-[17px] text-white mb-10 mt-0"> {data?.data?.status} </button>
          </div>
          <div className="video px-1 sm:px-10">
            {data?.data?.trailer?.embed_url && (
              <div className="w-full aspect-video">
                <iframe
                  src={data?.data?.trailer?.embed_url}
                  title="Anime Trailer"
                  frameBorder="0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            )}
          </div>
          <div className="flex flex-col xl:flex-row gap-[50px] px-1 sm:px-10 py-10">
            <div className="information w-full xl:w-2/3 flex flex-col gap-y-2">
              {/* Title block */}
              <div className="flex flex-col">
                <div className="flex items-top flex-col md:flex-row">
                  <span className="inline-block w-[160px] text-blue-600 uppercase text-[18px] font-semibold">
                    Title :
                  </span>
                  <h1 className="text-[18px]">{data?.data?.title_english ?? data?.data?.title}</h1>
                </div>
                <h1 className="text-[15px] italic md:ml-[160px]">{data?.data?.title}</h1>
              </div>

              {/* Season Info */}
              <div className="flex items-top flex-col md:flex-row">
                <span className="inline-block w-[160px] text-blue-600 uppercase text-[18px] font-semibold">
                  Season:
                </span>
                <h1 className="text-[18px] capitalize">{data?.data?.type} # {data?.data?.season} {data?.data?.year} </h1>
              </div>
              {/* Episod Time block */}
              <div className="flex items-top flex-col md:flex-row">
                <span className="inline-block w-[160px] text-blue-600 uppercase text-[18px] font-semibold">
                  Total:
                </span>
                <h1 className="text-[18px]">{data?.data?.episodes} Episode</h1>
              </div>
              <div className="flex items-top flex-col md:flex-row">
                <span className="inline-block w-[160px] text-blue-600 uppercase text-[18px] font-semibold">
                  Length:
                </span>
                <h1 className="text-[18px] capitalize">{data?.data?.duration}</h1>
              </div>

              {/* Status block */}
              <div className="flex items-top flex-col md:flex-row">
                <span className="inline-block w-[160px] text-blue-600 uppercase text-[18px] font-semibold">
                  Status :
                </span>
                <div className="stream-list flex gap-1">
                  <button className="bg-[#2d50a7] px-2 rounded-full text-[17px] text-white">
                    {data?.data?.status}
                  </button>
                </div>
              </div>

              {/* Aired block (conditionally rendered) */}
              {!data?.data?.airing && (
                <div className="flex items-top flex-col md:flex-row">
                  <span className="inline-block w-[160px] text-blue-600 uppercase text-[18px] font-semibold">
                    Aired :
                  </span>
                  <h1 className="text-[18px]">{data?.data?.aired?.string}</h1>
                </div>
              )}

              {/* Aired Time block */}
              {!data?.data?.airing && (<div className="flex items-top flex-col md:flex-row">
                <span className="inline-block w-[160px] text-blue-600 uppercase text-[18px] font-semibold">
                  Airing Time :
                </span>
                <p>
                  Day: {data?.data?.broadcast?.day}  //
                  Time: {data?.data?.broadcast?.time}  //
                  Timezone: {data?.data?.broadcast?.timezone}
                </p>
              </div>
              )}

              {/* Synopsis Time block */}
              <div className="flex items-top flex-col md:flex-row  flex-wrap">
                <span className="inline-block w-[160px] text-blue-600 uppercase text-[18px] font-semibold">
                  Synopsis:
                </span>
                <h1 className="text-[18px]">{data?.data?.synopsis}</h1>
              </div>

              {/* Genre block */}
              <div className="flex items-top flex-col md:flex-row">
                <span className="inline-block w-[160px] text-blue-600 uppercase text-[18px] font-semibold">
                  Genre :
                </span>
                <div className="stream-list flex gap-1 flex-col sm:flex-row  flex-wrap">
                  {data?.data?.genres?.map((genre) => (
                    <button key={genre.mal_id} className="bg-[#2d50a7] px-2 rounded-full text-[17px] text-white me-3 w-fit"> {genre.name} </button>
                  ))}
                </div>
              </div>

              {/* Ratting */}
              <div className="flex items-top flex-col md:flex-row">
                <span className="inline-block w-[160px] text-blue-600 uppercase text-[18px] font-semibold">
                  Sensorship :
                </span>
                <h1 className="text-[18px]">{data?.data?.rating}</h1>
              </div>

              {/* Score */}
              <div className="flex items-top flex-col md:flex-row">
                <span className="inline-block w-[160px] text-blue-600 uppercase text-[18px] font-semibold">
                  Ratting :
                </span>
                <div className="flex gap-x-10">
                  <h1 className="text-[18px]">&#10029; {data?.data?.score}</h1>
                  <h1 className="text-[18px]">&#9825;  {data?.data?.favorites}</h1>

                </div>
              </div>

              {/* Score */}
              <div className="flex items-top flex-col md:flex-row">
                <span className="inline-block w-[160px] text-blue-600 uppercase text-[18px] font-semibold">
                  Source :
                </span>
                <h1 className="text-[18px]">{data?.data?.source}</h1>
              </div>

              {/* Producer */}
              {data?.data?.streaming.producers > 0 && (
                <div className="flex items-top flex-col md:flex-row">
                  <span className="inline-block w-[160px] text-blue-600 uppercase text-[18px] font-semibold">
                    Producers :
                  </span>
                  <h1 className="text-[18px]"> {data?.data?.producers?.map((producer) => producer.name).join(", ")}</h1>
                </div>
              )}
              {/* Studio */}
              {data?.data?.streaming.studios > 0 && (
                <div className="flex items-top flex-col md:flex-row">
                  <span className="inline-block w-[160px] text-blue-600 uppercase text-[18px] font-semibold">
                    Studio :
                  </span>
                  {data?.data?.studios?.map((studios) => (
                    <h1 className="text-[18px] me-3">{studios.name}</h1>
                  ))}
                </div>
              )}

              {/* Streaming */}
              {data?.data?.streaming.length > 0 && (
                <>
                  <div className="flex items-top flex-col md:flex-row">
                    <span className="inline-block w-[160px] text-blue-600 uppercase text-[18px] font-semibold">
                      Streaming On :
                    </span>
                    <div className="stream-list flex gap-1 flex-col sm:flex-row  flex-wrap">
                      {data?.data?.streaming?.map((streaming) => (
                        <Link to={streaming.url}>
                          <button key={streaming.mal_id} className="bg-[#AA336B] px-2 rounded-full text-[17px] text-white cursor-pointer "> {streaming.name}</button>
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
            {/* Image Section) */}
            <div className="images w-full xl:w-1/3">
              <img className='xl:w-fit w-full h-full' src={data?.data?.images?.jpg?.large_image_url} alt={data?.data?.title_english} />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default SingleAnime;