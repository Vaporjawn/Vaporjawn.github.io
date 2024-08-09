const Footer = () => {
  return (
    <footer style={{ marginTop: "5rem" }}>
      {/* TODO: evenly change the background color of the header and footer, maybe do this in app.css */}
      <p>© {new Date().getFullYear()} Victor Williams</p>
    </footer>
  );
};

export default Footer;
