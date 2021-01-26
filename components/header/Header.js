import Logo from "./Logo";
import Navigation from "./Navigation";

const Header = () => {
  return (
    <>
      <header className="h-36">
        <nav>
          <Logo />
          <Navigation />
        </nav>
      </header>
    </>
  );
};

export default Header;
