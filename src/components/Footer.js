import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer__addr">
          <h1 className="footer__logo">Ecom Dashboard</h1>

          <h2>Contact</h2>

          <address>
            5534 Somewhere In. The World 22193-10212
            <br />
            <a className="footer__btn" href="mailto:example@gmail.com">
              Email Us
            </a>
          </address>
        </div>

        <div className="legal">
          Made with <span className="heart">♥</span> SG
          <div className="legal__links">
            <span>
              <p>&copy; 2023 Something. All rights reserved.</p>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
