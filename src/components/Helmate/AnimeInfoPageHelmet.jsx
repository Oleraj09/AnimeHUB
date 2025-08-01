import { Helmet } from 'react-helmet';
const AnimeInfoPageHelmet = () => {
    const siteUrl = "https://yourdomain.com/about";
    const title = "About Us - My Website";
    const description = "Learn more about our mission, values, and team.";
    const image = "https://yourdomain.com/images/about-preview.jpg";
    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={siteUrl} />
            <html lang="en" />

            {/* Open Graph Tags (for Facebook, LinkedIn, etc.) */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={siteUrl} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content="My Website" />

            {/* Twitter Card Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Optional Favicon */}
            <link rel="icon" href="/favicon.ico" />
        </Helmet>
    );
};

export default AnimeInfoPageHelmet;
