import { Link } from "react-router-dom";

interface MainProps {
  children: React.ReactNode;
}

const Layout = ({ children }: MainProps) => {
  return (
    <>
      <div>
        <Header />
        <Main>{children}</Main>
        <Footer />
      </div>
    </>
  );
};
export default Layout;

const Header = () => {
  return (
    <>
      <div className="bg-amber-300 flex text-center">
        <div className="p-3 w-[1280px] mx-[auto] my-[0] flex justify-between align-middle">
          <div>AndyChou</div>
        </div>
        <div className="p-3">
          <Navbar />
        </div>
      </div>
    </>
  );
};
const Navbar = () => {
  return (
    <>
      <div>
        <Link to="/">Home</Link>
        <Link to="/swissKnife">SwissKnife</Link>
        <Link to="/project">Project</Link>
        <Link to="/">About</Link>
      </div>
    </>
  );
};
const Main = ({ children }: MainProps) => {
  return (
    <>
      <div className="flex justify-center">{children}</div>
    </>
  );
};
const Footer = () => {
  return (
    <>
      <div>Footer</div>
    </>
  );
};
