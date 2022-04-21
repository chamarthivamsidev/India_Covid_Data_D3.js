import { geoMercator, geoPath } from "d3-geo";
import { select } from "d3-selection";
import geojson from "../geojson.json";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../App.css";
import { addData, setStateData } from "../Redux/actions";
import { BarChart, Bar, XAxis, YAxis } from "recharts";

export const IndiaCovid = () => {
  let { state, confirmedCases, discharged, deaths } = useSelector(
    (store) => store
  );
  const data = [
    { type: "Total Cases", quantity: confirmedCases },
    { type: "Discharged", quantity: discharged },
    { type: "Death", quantity: deaths },
  ];
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(addData());
  }, [dispatch]);

  const width = 1100;
  const height = width * 0.6;
  const projection = geoMercator().fitExtent(
    [
      [0, 0],
      [width * 0.9, height * 0.9],
    ],
    geojson
  );
  const path = geoPath().projection(projection);

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
                  dispatch(setStateData(geojson.features[i].properties.NAME_1));
                }}
                onMouseOut={(e) => {
                  select(e.target).attr("fill", "#eee");
                }}
              />
            ))}
          </g>
        </svg>
        <div id="right">
          <div id="dataDiv">
            <p>State : {state}</p>
            <p>Confirmed Cases : {confirmedCases}</p>
            <p>Discharged : {discharged}</p>
            <p>Deaths : {deaths}</p>
          </div>
          <div id="barDiv">
            <BarChart width={350} height={300} data={data}>
              <Bar dataKey="quantity" fill="#8884d8" />
              <XAxis dataKey="type" />
              <YAxis />
            </BarChart>
          </div>
        </div>
      </div>
    </>
  );
};
