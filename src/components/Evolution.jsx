import Header from "./Header";
import { useEffect, useState } from "react";
import { colors, typesImg } from "../imports";
import Particle from "./Particle";
import { Link } from "react-router-dom";
import eeveeImg from "../../img/eevee.png"
export default function Evolution() {
  const [localData, setLocalData] = useState(
    JSON.parse(localStorage.getItem("pokemon"))
  );
  const [url, setUrl] = useState("");
  const [evoInfo1, setEvoInfo1] = useState(null);
  const [evoInfo2, setEvoInfo2] = useState(null);
  const [evoInfo3, setEvoInfo3] = useState(null);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${localData.name}`
      );
      const data = await res.json();
      setUrl(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (url != "") {
        const res = await fetch(url["evolution_chain"].url);
        const data = await res.json();

        setEvoInfo1(data.chain.species.name);
        if (data.chain.evolves_to[0]) {
          setEvoInfo2(data.chain.evolves_to[0].species.name);
          if (data.chain.evolves_to[0].evolves_to[0]) {
            setEvoInfo3(data.chain.evolves_to[0].evolves_to[0].species.name);
          }
        }
      }
    };
    fetchData();
  }, [url]);
  useEffect(() => {
    const fetchData = async (urls) => {
        for(let i=0;i<urls.length;i++){
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${urls[i]}`);
            const data = await res.json();
            setPhotos((prevPhotos) => {
              return [...prevPhotos, data.sprites["front_default"]];
            });
        }
     
    };

    if (evoInfo1 && evoInfo2 && evoInfo3) {
      console.log(evoInfo1);
      fetchData([evoInfo1,evoInfo2,evoInfo3]);
    }else if (evoInfo1 && evoInfo2) {
      fetchData([evoInfo1,evoInfo2]);
    }
    else {
      fetchData([evoInfo1]);
    }
  }, [evoInfo1, evoInfo2, evoInfo3]);

  return (
    <>
      <Header />
      
      <div
        className={`search-bar search-bar-${
          localStorage.getItem("pokemon")
            ? JSON.parse(localStorage.getItem("pokemon")).type
            : "fire"
        }`}
      ></div>
      <div
        className={`details-container details-container-${
          localStorage.getItem("pokemon")
            ? JSON.parse(localStorage.getItem("pokemon")).type
            : "fire"
        }`}
      >
        <div
          className={`name-type name-type-${
            localStorage.getItem("pokemon")
              ? JSON.parse(localStorage.getItem("pokemon")).type
              : "fire"
          }`}
        >
          <h2>Evolution chain</h2>
          <img
            className={`type type-${
              localStorage.getItem("pokemon")
                ? JSON.parse(localStorage.getItem("pokemon")).type
                : "fire"
            }`}
            src={
              localStorage.getItem("pokemon")
                ? typesImg[JSON.parse(localStorage.getItem("pokemon")).type]
                : greatball
            }
          />
        </div>
        {['glaceon','eevee','vaporeon','flareon','jolteon','espeon','umbreon','leafeon','sylveon'].includes(localData.name)? <div className="eevee-img-container" ><img className="eevee-img"src={eeveeImg} alt="" /></div> : <div
          className={`moves-evolutions moves-evolutions-${
            localStorage.getItem("pokemon")
              ? JSON.parse(localStorage.getItem("pokemon")).type
              : "fire"
          }`}
        >
          {evoInfo1&&<div
            className={`evo-container evo-container-${
              localStorage.getItem("pokemon")
                ? JSON.parse(localStorage.getItem("pokemon")).type
                : "fire"
            }`}
          >
            <div className="evo-name"> {evoInfo1.toUpperCase()}</div>
            <div className="evo-img">
              <img src={photos[0]} alt="" />
            </div>
          </div>}
          {evoInfo2&&<div
            className={`evo-container evo-container-${
              localStorage.getItem("pokemon")
                ? JSON.parse(localStorage.getItem("pokemon")).type
                : "fire"
            }`}
          >
            <div className="evo-name"> {evoInfo2.toUpperCase()}</div>
            <div className="evo-img">
              <img src={photos[1]} alt="" />
            </div>
          </div>}

          {evoInfo3&&<div
            className={`evo-container evo-container-${
              localStorage.getItem("pokemon")
                ? JSON.parse(localStorage.getItem("pokemon")).type
                : "fire"
            }`}
          >
            <div className="evo-name"> {evoInfo3.toUpperCase()}</div>
            <div className="evo-img">
              <img src={photos[2]} alt="" />
            </div>
          </div>}
        </div>}

        <div
          className={`btn-container btn-container-${
            localStorage.getItem("pokemon")
              ? JSON.parse(localStorage.getItem("pokemon")).type
              : "fire"
          }`}
        >
          <Link
           to={'/'}
            className={`details-btn details-btn-${
              localStorage.getItem("pokemon")
                ? JSON.parse(localStorage.getItem("pokemon")).type
                : "fire"
            }`}
          >
            Return
          </Link>
        </div>
      
      <Particle
        color={
          localStorage.getItem("pokemon")
            ? colors[JSON.parse(localStorage.getItem("pokemon")).type]
            : ""
        }
      />
      </div>
</>
  );
}
