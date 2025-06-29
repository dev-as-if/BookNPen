import React from "react"

const Footer = () => {
  return (
    // It should stick to the bottom of the page
    <footer className="footer">
      <div className="container text-center sticky-footer">
        <p className="text-white">
          &copy; 2025 Book & Pen Public School. Design by{" "}
          <a
            className="text-white"
            href="https://code-asif.github.io/MyPortfolio/"
            rel="nofollow"
          >
            &nbsp; Asif Alam
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;