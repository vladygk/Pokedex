import pokeball from "../../img/769px-Pokebola-pokeball-png-0.png";
import greatball from "../../img/Great_Ball_Artwork.png";
import { Link } from "react-router-dom";
import { useEffect, useLayoutEffect, useState } from "react";
import React from "react";
import typesImgs from "./imports";
import Particle from "./Particle"
export default function Main() {
  const [query, setQuery] = useState("");
  const [pokemon, setPokemon] = useState();
  const [data, setData] = useState();
  const [fetchedData, setFetchedData] = useState();
const colors = {fire:"#ed1515",water:"#360eea"}
  useEffect(() => {
    const getData = async () => {
      const result = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=900"
      );
      const resData = await result.json();
      setData(resData.results);
    };
    getData();
  }, []);

  function handleChange(event) {
    if (data) {
      const { value } = event.target;
      if (value !== "") {
        const rawData = data.find(
          (x) =>
            x.name.toUpperCase().split("-")[0] === value.toUpperCase() ||
            x.name.toUpperCase() === value.toUpperCase()
        );

        if (rawData !== undefined) {
          setPokemon(rawData);
        }
      }
      setQuery(value);
    }
  }

  async function findPokemon() {
    if (pokemon) {
      const result = await fetch(pokemon.url);
      const resData = await result.json();

      if (resData !== undefined) {
        const fData = {
          name: resData.name,
          type:resData.types[0].type.name,
          id: resData.id,
          moves: resData.moves
            .map((x) => x.move)
            .map((x) => x.name)
            .slice(0, 10),
          sprites: [
            resData.sprites["front_default"],
            resData.sprites["front_shiny"],
          ],
          stats: resData.stats.map((x) => [x.stat.name, x["base_stat"]]),
        };

        localStorage.setItem("pokemon", JSON.stringify(fData));
        setFetchedData(fData);
        console.log(fData);
      }
    }
  }

  function handleEnterClick(event) {
    if (event.key === "Enter") {
      findPokemon();
    }
  }

  return (
    <>
      <div className="search-bar">
        <input
          onKeyDown={handleEnterClick}
          onChange={handleChange}
          className="search-input"
          placeholder="Pika..."
          type="text"
          value={query}
        />
        <button onClick={findPokemon} className="btn">
          Search
        </button>
      </div>

      <div className="main-container">
        <div className="name-type">
          <h2 className="title">
            {localStorage.getItem("pokemon")
              ? JSON.parse(localStorage.getItem("pokemon")).name.toUpperCase()
              : ""}
          </h2>
          <h2>    
            {localStorage.getItem("pokemon")
              ? "#" + JSON.parse(localStorage.getItem("pokemon")).id
              : ""}
          </h2>
          <img className="type" src={localStorage.getItem("pokemon")
              ? typesImgs[JSON.parse(localStorage.getItem("pokemon")).type]:greatball} />
        </div>
        <div className="main-img-container">
          <img
            className="main-img"
            src={
              localStorage.getItem("pokemon")
                ? JSON.parse(localStorage.getItem("pokemon"))["sprites"][0]
                : pokeball
            }
            alt=""
          />
        </div>

        <div className="btn-container">
          <Link to="/details" className="details-btn">
            Details
          </Link>
        </div>
      </div>
      <Particle color={localStorage.getItem("pokemon")
                ? colors[JSON.parse(localStorage.getItem("pokemon")).type]:""}/>
    </>
  );
}
