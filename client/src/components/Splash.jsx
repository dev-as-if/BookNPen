import Logo from "../assets/BPPS.jpg";

const Splash = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-white">
            <img src={Logo} alt="BPPS Logo" height="100" className="mb-3" />
            <h1 className="text-center fw-bold text-black">Book & Pen Public School</h1>
        </div>
    );
};

export default Splash;