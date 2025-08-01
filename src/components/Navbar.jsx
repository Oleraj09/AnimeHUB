import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faUpwork, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { useEffect, useState } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
const Navbar = () => {
    const [filterData, setFilterData] = useState({});
    const currentYear = new Date().getFullYear();
    const [menuOpen, setMenuOpen] = useState(false);
    const startYear = 1980;
    const navigate = useNavigate();
    const pages = [
        { label: "Home", path: "home" },
        { label: "Season Now", path: "page/season-now" },
        { label: "Top Anime", path: "page/top-anime" },
        { label: "Airing Today", path: "page/airing-now" },
        { label: "Upcoming Anime", path: "page/upcoming-anime" },
        { label: "Scheduled", path: "page/scheduled" },
        { label: "Anime List ALL", path: "page/anime-list" },
    ];
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFilterData((prevData) => {
            if (name === "season" || name === "year") {
                return {
                    ...prevData,
                    [name]: value,
                    search: ""
                };
            } else if (name === "search") {
                return {
                    ...prevData,
                    [name]: value,
                    season: "",
                    year: ""
                };
            } else {
                return {
                    ...prevData,
                    [name]: value
                };
            }
        });
    };
    const handleFilter = () => {
        const params = new URLSearchParams();
        if (filterData.search) params.append("q", filterData.search);
        if (filterData.season && filterData.year) {
            if (filterData.season) params.append("season", filterData.season);
            if (filterData.year) params.append("year", filterData.year);
        }
        navigate(`/your-anime?${params.toString()}`);
    };
    return (
        <div className="navbar">
            <div className="header flex flex-col lg:flex-row items-center justify-between gap-y-5 px-0 md:px-4">
                <Link to="/">
                    <div className="full-logo text-center lg:text-left">
                        <div className="logo text-[18px] md:text-[32px] lg:text-[32px] xl:text-[35px] font-[600] uppercase tracking-[2px] leading-none">
                            <span className="text-[#069]">Anime</span>
                            <span className="text-[#51b8c6] font-[400]">Hub</span>
                            <span className="text-[#069]">Bangladesh</span>
                        </div>
                        <div className="slogan text-[12px] leading-none sm:text-[14px] lg:text-[14px] xl:text-[15px] text-[#069] uppercase tracking-[0.5px] mt-1">
                            Most Reliable Anime Information in Bangladeshi guys!
                        </div>
                    </div>
                </Link>
                <div className="search-filter ">
                    <form className='flex flex-wrap items-center justify-center gap-3 w-full lg:w-auto' onSubmit={(e) => {
                        e.preventDefault();
                        handleFilter();
                    }}>
                        <input
                            type="text"
                            placeholder="Search here..."
                            className="border outline-none border-[#2d50a7] text-[#2d50a7] px-4 h-[40px] rounded w-full sm:w-[160px] md:w-[180px]"
                            name="search"
                            value={filterData.search || ""}
                            onChange={handleChange}
                        />
                        <select
                            className="border outline-none border-[#2d50a7] px-4 h-[40px] rounded w-full sm:w-[120px] lg:w-[90px]"
                            name="season"
                            value={filterData.season || ""}
                            onChange={handleChange}
                        >
                            <option>Season</option>
                            <option>Spring</option>
                            <option>Summer</option>
                            <option>Fall</option>
                        </select>
                        <select
                            className="border outline-none border-[#2d50a7] px-4 h-[40px] rounded w-full sm:w-[120px] lg:w-[80px]"
                            name="year"
                            value={filterData.year || ""}
                            onChange={handleChange}
                        >
                            <option>Year</option>
                            {Array.from({ length: currentYear - startYear + 1 }, (_, i) => currentYear - i).map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                        <button
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    if (!(!filterData.search && (!filterData.season || !filterData.year))) {
                                        handleFilter();
                                    }
                                }
                            }}
                            className={`text-[#2d50a7] border border-[#2d50a7] hover:bg-[#2d50a7] hover:text-white h-[40px] px-5 rounded transition-all w-full sm:w-auto ${(!filterData.search && (!filterData.season || !filterData.year))
                                ? "opacity-50 cursor-not-allowed"
                                : "cursor-pointer"
                                }`}
                            disabled={!filterData.search && (!filterData.season || !filterData.year)}
                        >
                            {(filterData.season && filterData.year) ? "Filter" : "Search"}
                        </button>
                    </form>
                </div>
            </div>

            <div className="menu my-4 bg-[#2d50a7] text-white px-2 py-2">
                <div className="flex justify-between items-center h-[40px]">
                    <div className="lg:hidden px-1">
                        <button onClick={() => setMenuOpen(!menuOpen)}>
                            <FontAwesomeIcon icon={faBars} className="text-2xl" />
                        </button>
                    </div>
                    <div className="hidden lg:flex gap-x-[20px] uppercase tracking-[2px] text-[15px]">
                        {pages.map((item, index) => (
                            <li
                                key={index}
                                className="hidden lg:flex gap-x-[20px] uppercase tracking-[2px] text-[15px] cursor-pointer"
                                onClick={() => navigate(`/${item.path}`)}
                            >
                                {item.label}
                            </li>
                        ))}
                    </div>
                    <ul className="hidden lg:flex gap-x-[10px] uppercase tracking-[2px] text-[15px]">
                        <Link to="https://www.youtube.com/@animations-times"><FontAwesomeIcon icon={faYoutube} /></Link>
                        <Link to="https://www.facebook.com/oleraj.hossin"><FontAwesomeIcon icon={faFacebook} /></Link>
                        <Link to="https://www.fiverr.com/oleraj_mondol"><FontAwesomeIcon icon={faUpwork} /></Link>
                        <Link to="https://www.linkedin.com/in/oleraj-hossin/"><FontAwesomeIcon icon={faLinkedin} /></Link>
                    </ul>
                </div>

                {/* Mobile Menu (dropdown) */}
                {menuOpen && (
                    <div className="flex flex-col gap-y-2 lg:hidden text-sm uppercase px-2">
                        {pages.map((item, index) => (
                            <li
                                key={index}
                                className="list-none cursor-pointer tracking-[2px] cursor-pointer"
                                onClick={() => navigate(`/${item.path}`)}
                            >
                                <span className="text-[12px]">&#10148;</span> {item.label}
                            </li>
                        ))}
                        <div className="flex gap-x-4 mt-2 text-lg">
                            <Link to="https://www.youtube.com/@animations-times"><FontAwesomeIcon icon={faYoutube} /></Link>
                            <Link to="https://www.facebook.com/oleraj.hossin"><FontAwesomeIcon icon={faFacebook} /></Link>
                            <Link to="https://www.fiverr.com/oleraj_mondol"><FontAwesomeIcon icon={faUpwork} /></Link>
                            <Link to="https://www.linkedin.com/in/oleraj-hossin/"><FontAwesomeIcon icon={faLinkedin} /></Link>
                        </div>
                    </div>
                )}
            </div>
            <div className="menu my-4 py-1 border-[1px] border-[#8f8d8d] flex text-[#069] flex justify-between items-center px-2 tracking-[1px]">
                <div className="news"><span style={{ color: "black" }}> &#9760;  Recent: </span> ANIMEHUB BD provides news and updates only. Video links are not available. </div>
            </div>
        </div>
    )
}

export default Navbar;