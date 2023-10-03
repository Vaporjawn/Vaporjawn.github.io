import "./templeHeader.css";

const TempleHeader = () => {
  return (
    <div>
      <div className="Temple-App-header">
        <header>
          <h2 className="templeGlow">Temple University</h2>
        </header>
        <p className="templeBlerb">
          Attending{" "}
          <a
            href="https://temple.edu"
            target="_blank"
            className="temple2"
            rel="noreferrer"
          >
            Temple University
          </a>{" "}
          was one of the most proactive growing experiences of my life. I'll
          never forget the times I had there and all of the skills that I was
          able to pickup along the way; both inside and outside the classroom.{" "}
        </p>
      </div>
    </div>
  );
};

export default TempleHeader;
