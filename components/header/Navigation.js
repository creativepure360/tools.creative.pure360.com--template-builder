import Link from "next/link";
import { slide as Nav } from "react-burger-menu";

const Navigation = () => {
  const navStyles = {
    bmBurgerButton: {
      position: "fixed",
      width: "40px",
      height: "40px",
      right: "2rem",
      top: "2rem",
    },
    bmBurgerBars: {
      background: "#ff00ff",
    },
    bmBurgerBarsHover: {
      background: "#000",
    },
    bmCrossButton: {
      height: "40px",
      width: "40px",
      top: "2rem",
      right: "2rem",
    },
    bmCross: {
      background: "#000",
      width: "8px",
      height: "40px",
      left: "-10px",
      top: "-6px",
    },
    bmMenuWrap: {
      position: "fixed",
      height: "100%",
    },
    bmMenu: {
      background: "#FFF",
      padding: "2em",
      fontSize: "1.15em",
    },
    bmMorphShape: {
      fill: "#373a47",
    },
    bmItemList: {
      color: "#b8b7ad",
      padding: "0.8em",
    },
    bmItem: {
      display: "inline-block",
    },
    bmOverlay: {
      background: "rgba(0, 0, 0, 0.5)",
    },
  };
  return (
    <>
      <Nav right width="100%" styles={navStyles}>
        <Link href={`/products`}>
          <a className="block font-avant-garde-bold text-black text-5xl mb-6 hover:text-floss-pink transition duration-250">
            Products
          </a>
        </Link>
        <Link href={`/tools`}>
          <a className="block font-avant-garde-bold text-black text-5xl mb-6 hover:text-floss-pink transition duration-250">
            Tools
          </a>
        </Link>
        <Link href={`/`}>
          <a className="block font-avant-garde-bold text-black text-5xl mb-6 hover:text-floss-pink transition duration-250">
            Blog
          </a>
        </Link>
        <Link href={`/`}>
          <a className="block font-avant-garde-bold text-floss-pink text-5xl mb-6">
            New
          </a>
        </Link>
      </Nav>
    </>
  );
};

export default Navigation;
