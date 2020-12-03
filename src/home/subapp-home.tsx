import { React, loadSubApp } from "subapp-react";
import electrodePng from "../../static/electrode.png";
import "./style.css";

const Home = () => {
  return (
    <h1 className="color">
      Hello from{" "}
      <a href="https://www.electrode.io">
        Electrode <img src={electrodePng} />
      </a>
    </h1>
  );
};

export default loadSubApp({ Component: Home, name: "Home" });
