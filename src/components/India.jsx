import { geoMercator, geoPath } from "d3-geo";
import { select } from "d3-selection";
import geojson from "../geojson.json";
import * as d3 from "d3";
import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

export const India = () => {
  const [state, setState] = useState({
    state: "",
    confirmedCases: 0,
    discharged: 0,
    deaths: 0,
  });
  const [data, setData] = useState("");
  const width = 1200;
  const height = width * 0.5;
  const projection = geoMercator().fitExtent(
    [
      [0, 0],
      [width * 0.9, height * 0.9],
    ],
    geojson
  );
  const path = geoPath().projection(projection);

  useEffect(() => {
    axios
      .get("https://api.rootnet.in/covid19-in/stats/latest")
      .then((res) => setData(res.data.data.regional));
  }, []);
  return (
    <>
      <div id="container">
        <svg width={width} height={height}>
          <g className="geojson-layer">
            {geojson.features.map((d, i) => (
              <path
                key={i}
                d={path(d)}
                fill="#eee"
                stroke="#0e1724"
                strokeWidth="1"
                strokeOpacity="0.5"
                onMouseEnter={(e) => {
                  select(e.target).attr("fill", "#000");
                  // console.log(geojson.features[i].properties.NAME_1);
                  let x = data.filter(
                    (e) => e.loc === geojson.features[i].properties.NAME_1
                  );
                  setState({
                    state: x[0].loc,
                    confirmedCases: x[0].confirmedCasesIndian,
                    discharged: x[0].discharged,
                    deaths: x[0].deaths,
                  });
                }}
                onMouseOut={(e) => {
                  select(e.target).attr("fill", "#eee");
                  d3.select("#right").attr("display", "none");
                }}
              />
            ))}
          </g>
        </svg>
        <div id="right">
          <p>State : {state.state}</p>
          <p>Confirmed Cases : {state.confirmedCases}</p>
          <p>Deaths : {state.deaths}</p>
          <p>Discharged : {state.discharged}</p>
        </div>
      </div>
    </>
  );
};
