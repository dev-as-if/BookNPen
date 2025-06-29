import React, { useEffect, useRef, useState } from "react";
import Header from "../components/header";
import Contact from "../components/contact";
import JsonData from "../data/data.json";

const texts = ["Book & Pen Public School", "From Pen to Progress"];

const Home = () => {
  const [landingPageData, setLandingPageData] = useState({});
  const indexRef = useRef(0);
  const typewriterIntervalRef = useRef(null);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);

  useEffect(() => {
    setLandingPageData(JsonData);

    const handleResize = () => setIsLargeScreen(window.innerWidth > 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const titleElement = document.querySelector(".typewriter-text");
    if (!titleElement) return;

    const typeWriter = () => {
      titleElement.innerHTML = "";
      const text = texts[indexRef.current];
      let charIndex = 0;

      const writeText = () => {
        if (charIndex < text.length) {
          titleElement.innerHTML += text.charAt(charIndex);
          charIndex++;
          setTimeout(writeText, 100);
        } else {
          clearTimeout(typewriterIntervalRef.current);
          typewriterIntervalRef.current = setTimeout(() => {
            indexRef.current = (indexRef.current + 1) % texts.length;
            typeWriter();
          }, 2000);
        }
      };

      writeText();
    };

    typeWriter();
    return () => clearTimeout(typewriterIntervalRef.current);
  }, []);

  // ✅ Force-start the carousel autoplay on mount (for browsers that need JS trigger)
  useEffect(() => {
    const bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");
    const carouselElement = document.querySelector("#schoolCarousel");
    if (carouselElement) {
      new bootstrap.Carousel(carouselElement, {
        interval: 3000,
        ride: "carousel",
        pause: false, // keep autoplay even on hover
        wrap: true,
      });
    }
  }, []);

  return (
    <div>
      {/* <Navigation /> */}
      <div className="carousel-container">
        <div
          id="schoolCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="3000"
        >
          <div className="carousel-inner">
            {landingPageData?.Header?.carouselImages?.map((img, i) => (
              <div
                className={`carousel-item ${i === 0 ? "active" : ""}`}
                key={i}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/${img}`}
                  className="d-block w-100 carousel-img"
                  alt={`slide-${i + 1}`}
                />
              </div>
            ))}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#schoolCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#schoolCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <div className="typewriter-container">
          <h2
            className="typewriter-text text-light display-5 fw-bold"
            aria-label={texts[indexRef.current]}
          > </h2>
        </div>
      </div>

      <div className="fade-in" style={{ marginTop: isLargeScreen ? "20rem" : "0" }}>
        <Header data={landingPageData.Header} />
      </div>
      {/*  NEW CONTENT STARTS HERE */}
      <section className="extra-section container py-5">
        <div className="row text-center">
            <h2 className="fw-bold">Our Mission & Vision</h2>
            <p className="text-black fw-bold fs-2">Inspiring hope, enabling dreams.</p>
        </div>

        <div className="card h-30 p-4 center">
            <h4 className="fw-bold fs-1">Mission</h4>
            <p className="text-black fs-3">
              To provide quality education through a scholarship-based model,
              ensuring that children from poor and needy backgrounds receive free
              education, while also welcoming those who can pay partially or
              fully—creating an inclusive learning environment where every child
              has the opportunity to succeed.
            </p>
        </div><br />
        <div className="card h-30 p-4 center">
            <h4 className="fw-bold fs-1">Vision</h4>
            <p className="text-black fs-3">
              At Book & Pen Public School, our vision is to create a brighter and more equitable future for every child in Bihar. We are committed to expanding our reach and making quality education accessible to the poorest and most vulnerable children across the state.

              We aspire to establish a branch of Book & Pen Public School in every district of Bihar, ensuring that no child is left behind due to poverty or circumstance. By building a network of schools dedicated to holistic development, we aim to empower thousands of children with the knowledge, skills, and confidence they need to transform their lives and communities.

            </p>
        </div>

      </section>
      <br /><hr />

      <section className="core-values-section py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">Core Values</h2>
          <div className="row gy-4">
            {[
              { title: "Inclusivity", desc: "Welcoming children from all backgrounds with dignity and respect." },
              { title: "Excellence", desc: "Striving for the highest standards in education and personal growth." },
              { title: "Compassion", desc: "Fostering empathy, kindness, and social responsibility." },
              { title: "Integrity", desc: "Upholding honesty, transparency, and ethics in every action." },
              { title: "Empowerment", desc: "Equipping students with confidence and skills for a better future." }
            ].map((val, idx) => (
              <div className="col-md-6 col-lg-4" key={idx}>
                <div className="value-card p-4 h-100 shadow-sm">
                  <h5 className="fw-semibold fs-3 text-black">{val.title}</h5>
                  <p className="text-muted mb-0 fs-5 text-black">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
            <br /><hr />
      <section className="commitment-section py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-4">Our Commitment</h2>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="card p-4 shadow-sm">
                <p className="fs-3 text-black">
                  At Book & Pen Public School, we are more than just an educational institution—we are a family and a community. We provide:
                </p>
                <ul className="list-unstyled ms-3">
                  <li className="fs-4">✔️ Books and uniforms</li>
                  <li className="fs-4">✔️ Life skills and vocational training</li>
                  <li className="fs-4">✔️ Counseling and mentorship programs</li>
                  <li className="fs-4">✔️ Opportunities for sports, arts, and cultural activities</li>
                </ul>
                <p className="mt-3 fs-3 text-black">
                  Together, we are opening doors to knowledge, breaking down barriers, and writing new stories of hope and achievement—one child at a time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*  NEW CONTENT ENDS HERE */}
      <Contact data={landingPageData.Contact} />
    </div>
  );
};

export default Home;