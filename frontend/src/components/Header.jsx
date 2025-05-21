import technovaLogo from "../assets/technova-logo-trans.png";

function Header() {
  return (
    <div className="inline">
      <a href="https://www.technovacollege.nl/" target="_blank">
        <img src={technovaLogo} className="logo" alt="Technova logo" />
      </a>
      <h1 style={{ color: "purple" }}>PWA basis</h1>
    </div>
  );
}

export default Header;
