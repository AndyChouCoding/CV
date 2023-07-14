import { Link } from "react-router-dom";

interface MainProps {
  children: React.ReactNode;
}

const Layout = ({ children }: MainProps) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};
export default Layout;

const Header = () => {
  return (
    <>
      <div className="">
        <div>Header</div>
        <div><Navbar /></div>
      </div>
      
    </>
  );
};
const Navbar = () => {
  return <>
    <Link to="/">Home</Link>
    <Link to="/swissKnife">SwissKnife</Link>
  </>;
};
const Main = ({ children }: MainProps) => {
  return <><div className="flex justify-center">{children}</div></>;
};
const Footer = () => {
  return <>
    <div>Footer</div>
  </>;
};
