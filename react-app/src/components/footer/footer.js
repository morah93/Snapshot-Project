import React from "react";
import './footer.css'
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Footer = () => {

  return (
    <>
      <div className="footer">
        <div className="info">
        © 2023 Snapshot
        </div>
        {/* <div className="Privacy">

        </div>
        <div className="Terms">

        </div>
        <div className="SiteMap">

        </div>
        <div className="destination">

        </div> */}
      <div className="siteInfo">
        {/* <i id="globeIcon" className="fa fa-globe"></i> */}
          {/* <div id="language">English(US)</div> */}
          {/* <i id="dollarIcon" className="fa fa-dollar" ></i> */}
          {/* <i id="fbIcon" className="fa fa-facebook"></i> */}
          {/* <i id="twtIcon" className="fa fa-twitter"></i> */}
          <a href='https://github.com/morah93'><i id="liIcon" className="fa fa-linkedin"></i></a>

      </div>
      </div>
    </>
  )
}

export default Footer
