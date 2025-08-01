import Lottie from 'lottie-react';
import ghibliAnimation from '../assets/GibliTribute.json';
import { useEffect } from 'react';
const Loader = () => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);
    return (
        <div className="fixed h-screen w-screen top-0 left-0 z-100 bg-[#069] flex items-center justify-center flex-col">
            <Lottie
                animationData={ghibliAnimation}
                loop={true}
                autoplay={true}
                style={{ height: 250, width: 250 }}
            />
            <h1 className='text-white leading-none text-[18px] tracking-[1px]'>Please Wait...</h1>
        </div>
    );
};

export default Loader;
