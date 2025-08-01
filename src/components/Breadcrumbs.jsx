import { Link, useLocation } from 'react-router-dom';
const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  return (
    <nav className="text-[16px] text-gray-600 my-4">
      <ol className="list-none flex flex-wrap space-x-1">
        <li>
          <Link to="/" className="text-blue-600 hover:underline">Home</Link>
          <span className="mx-1">/</span>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = '/' + pathnames.slice(0, index + 1).join('/');
          const isLast = index === pathnames.length - 1;
          const label = decodeURIComponent(name.replace(/-/g, ' '));
          return (
            <li key={routeTo}>
              {isLast ? (
                <span className="font-semibold text-gray-800 capitalize">{label}</span>
              ) : (
                <>
                  <Link to={routeTo} className="text-blue-600 hover:underline capitalize">
                    {label}
                  </Link>
                  <span className="mx-1">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
