import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <>
            <div className="bg-[#E4EAF2]" style={{ margin: "20px", padding: "10px 20px" }}>
                <Navbar />
                <Outlet />
                <Footer />
            </div>
        </>
    )
}

export default Layout