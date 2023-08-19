import { Outlet } from "react-router";
import Layout from "../components/layout";
import { Link } from "react-router-dom";

const SwissKnife = () => {
  return (
    <>
      <Layout>
        <div>
          <div className=" my-10 text-[20px] font-bold flex justify-around w-[800px]">
            <Link to="/swissKnife/ttt">TTT</Link>
            <Link to="/swissKnife/crud">CRUD</Link>
            <Link to="/swissKnife/weather">Weater</Link>
            <Link to="/swissKnife/trafficLight">TrafficLight</Link>
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </Layout>
    </>
  );
};
export default SwissKnife;
