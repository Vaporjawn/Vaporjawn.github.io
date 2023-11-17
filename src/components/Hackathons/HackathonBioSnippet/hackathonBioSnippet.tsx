import "./hackathonBioSnippet.css";

const HackathonBioSnippet = () => {
  return (
    <div className="hackathonBio">
      <h1 className="hackathonBioGlow tudev">
        <strong>TUDev</strong>
      </h1>
      <h4 className="large-font">
        TUDev is a community of{" "}
        <strong>designers, develoeprs, and hackers.</strong> We attend tons of
        hackathons throughout the year. We were ranked by
        <a href="https://mlh.io">
          {" "}
          <strong> Major League Hacking </strong>
        </a>{" "}
        as the 14th most active hacking community in North America for the
        Spring 2016 season.
      </h4>
      <p className="regular-font">
        We host bi-weekly Code@Nights on Wednesdays in SERC 358 (3rd floor
        student lounge). We get together, hang out, code, make friends, and have
        a good time. No coding experience required!
        <br /> We work with other student orgs and the CIS dept to get more
        students interested in coding and technology. We also host other events
        such as Local Hack Day to benefit others throughout Philly.
        <br /> Getting involved with TUDev means surrounding yourself with other
        smart, motivated hackers and a talented and growing alumni network,
        leading to more opportunities down the road
      </p>
      <h1 className="hackathonBioGlow">
        <strong>
          <span className="mlhm">M</span>
          <span className="mlhl">L</span>
          <span className="mlhh">H</span>
        </strong>
      </h1>
      <p className="large-font">
        Major League Hacking (MLH) is the official student hackathon league.
        Each year, we power over 200 weekend-long invention competitions that
        inspire innovation, cultivate communities and teach computer science
        skills to more than 65,000 students around the world. MLH is an engaged
        and passionate maker community, consisting of the next generation of
        technology leaders and entrepreneurs.
      </p>
    </div>
  );
};

export default HackathonBioSnippet;
