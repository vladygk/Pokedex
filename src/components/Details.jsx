import pokeball from "../../img/769px-Pokebola-pokeball-png-0.png";
import greatball from "../../img/Great_Ball_Artwork.png";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Particle from "./Particle";
import Header from "./Header";
import {colors,typesImg} from "../imports";

export default function Details() {


  const [localData, setLocalData] = useState(
    JSON.parse(localStorage.getItem("pokemon"))
  );
  const [description, setDescription] = useState();

  const { data, status } = useQuery("key", () => {
    return fetch(`https://pokeapi.co/api/v2/pokemon-species/${localData.id}`)
      .then((res) => res.json())
  
      .then(data=>setDescription(processData(data)))
      .catch((e) => console.log(e));
  });

  function processData(data){
    const fte = data["flavor_text_entries"].filter(x=> x.language.name === "en");
    return fte;
  }
  useEffect(() => {
    if (status === "success") {
     
      
    }
  }, [status]);

  return (
    <>
      <Header/>
      <div className={`search-bar search-bar-${localStorage.getItem("pokemon")?JSON.parse(localStorage.getItem("pokemon")).type :"fire"}`}></div>
      <div className={`details-container details-container-${localStorage.getItem("pokemon")?JSON.parse(localStorage.getItem("pokemon")).type :"fire"}`}>
        <div className={`name-type name-type-${localStorage.getItem("pokemon")?JSON.parse(localStorage.getItem("pokemon")).type :"fire"}`}>
          <h2>{localData ? localData.name.toUpperCase() : ""}</h2>
          <img className={`type type-${localStorage.getItem("pokemon")?JSON.parse(localStorage.getItem("pokemon")).type :"fire"}`} src={localStorage.getItem("pokemon")
              ? typesImg[JSON.parse(localStorage.getItem("pokemon")).type]:greatball} />
        </div>
        <div className={`moves-evolutions moves-evolutions-${localStorage.getItem("pokemon")?JSON.parse(localStorage.getItem("pokemon")).type :"fire"}`}>
          <div className={`moves-container moves-container-${localStorage.getItem("pokemon")?JSON.parse(localStorage.getItem("pokemon")).type :"fire"}`}>
            <h2>Moves</h2>
            <ul>
              {localData
                ? localData.moves.slice(0, 10).map((x) => <li key={x}>{x.toUpperCase()}</li>)
                : "#"}
            </ul>
          </div>
          <img
            className={`details-img details-img-${localStorage.getItem("pokemon")?JSON.parse(localStorage.getItem("pokemon")).type :"fire"}`}
            src={localData ? localData.sprites[1] : pokeball}
            alt=""
          />
          <div className={`moves-container moves-container-${localStorage.getItem("pokemon")?JSON.parse(localStorage.getItem("pokemon")).type :"fire"}`}>
          <h2>Stats</h2>
            <ul>
              {localData
                ? localData.stats.map((x) => {
                    return <li key={x}>{`${x[0]}: ${x[1]}`}</li>;
                  })
                : "#"}
            </ul>
          </div>
        </div>
        {description && (
          <div className={`description description-${localStorage.getItem("pokemon")?JSON.parse(localStorage.getItem("pokemon")).type :"fire"}`}>
          <p >
            {
              description[Math.floor(Math.random() * description.length)][
                "flavor_text"
              ]
            }
          </p>
          </div>
        )}
        <div className={`btn-container btn-container-${localStorage.getItem("pokemon")?JSON.parse(localStorage.getItem("pokemon")).type :"fire"}`}>
          <Link to="/" className={`details-btn details-btn-${localStorage.getItem("pokemon")?JSON.parse(localStorage.getItem("pokemon")).type :"fire"}`}>
            Return
          </Link>
        </div>
      </div>
      <Particle color={localStorage.getItem("pokemon")
                ? colors[JSON.parse(localStorage.getItem("pokemon")).type]:""}/>
    </>
  );
}
//}
