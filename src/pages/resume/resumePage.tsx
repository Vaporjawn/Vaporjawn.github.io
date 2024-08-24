import resume from "../../assets/Resume.pdf";

const ResumePage = () => {
  return (
    <div>
      {/* TODO: Fix this background color to work with light mode */}
      <embed src={resume} width="800px" height="2100px" />
    </div>
  );
};

export default ResumePage;
