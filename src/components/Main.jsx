import pokeball from "../../img/769px-Pokebola-pokeball-png-0.png";
import greatball from "../../img/Great_Ball_Artwork.png";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useLayoutEffect, useState } from "react";
import React from "react";
import { colors, typesImg } from "../imports";
import Particle from "./Particle";
import Header from "./Header";
import collect from "collect.js";
import data from "../data.json";
import Evolution from "./Evolution";

export async function findPokemon(name, setFunc, param) {
  if (name !== "") {
    const rawData = data.find(
      (x) => x.name.toUpperCase() === name.toUpperCase().trim()
    );

    if (rawData) {
      const result = await fetch(rawData.url);
      const resData = await result.json();

      if (resData !== undefined) {
        const fData = {
          name: resData.name,
          type: resData.types[0].type.name,
          id: resData.id,
          moves: collect(
            resData.moves.map((x) => x.move).map((x) => x.name)
          ).take(10),
          sprites: [
            resData.sprites["front_default"],
            resData.sprites["front_shiny"],
          ],
          stats: resData.stats.map((x) => [x.stat.name, x["base_stat"]]),
        };

        localStorage.setItem("pokemon", JSON.stringify(fData));
        if (param) {
          setFunc(fData);
        }
      }
    }
  }
}

export default function Main() {
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [pokemon, setPokemon] = useState();

  const [fetchedData, setFetchedData] = useState();

  function handleChange(event) {
    const { value } = event.target;

    setQuery(value.toUpperCase().trim());
  }

  function handleEnterClick(event) {
    if (event.key === "Enter") {
      findPokemon(query, setFetchedData,true);
    }
  }

  return (
    <>
      <Header />

      <div
        className={`search-bar search-bar-${
          localStorage.getItem("pokemon")
            ? JSON.parse(localStorage.getItem("pokemon")).type
            : "fire"
        }`}
      >
        <input
          onFocus={() => setQuery("")}
          onKeyDown={handleEnterClick}
          onChange={handleChange}
          className={`search-input search-input-${
            localStorage.getItem("pokemon")
              ? JSON.parse(localStorage.getItem("pokemon")).type
              : "fire"
          }`}
          placeholder="Pika?"
          type="text"
          value={query}
        />

        <button
          onClick={(event) => findPokemon(query, setFetchedData,true)}
          className={`btn btn-${
            localStorage.getItem("pokemon")
              ? JSON.parse(localStorage.getItem("pokemon")).type
              : "fire"
          }`}
        >
          Search
        </button>
      </div>
      <div className="suggestions">
        {query &&
          data
            .filter(
              (p) =>
                p.name.split("-")[0].toUpperCase().startsWith(query) &&
                p.name.split("-")[0].toUpperCase() !== query
            )
            .map((p) => (
              <div
                className={`singleSuggestion singleSuggestion-${
                  localStorage.getItem("pokemon")
                    ? JSON.parse(localStorage.getItem("pokemon")).type
                    : "fire"
                }`}
                onClick={(event) => {
                  const selectedPokemon = event.target.textContent;
                  setQuery(selectedPokemon);
                  findPokemon(selectedPokemon, setFetchedData,true);
                }}
                key={p.name}
              >
                {p.name.toUpperCase()}
              </div>
            ))
            .slice(0, 5)}
      </div>
      <div className="main-container">
        <div
          className={`name-type name-type-${
            localStorage.getItem("pokemon")
              ? JSON.parse(localStorage.getItem("pokemon")).type
              : "fire"
          }`}
        >
          <h2
            className={`title title-${
              localStorage.getItem("pokemon")
                ? JSON.parse(localStorage.getItem("pokemon")).type
                : "fire"
            }`}
          >
            {localStorage.getItem("pokemon")
              ? JSON.parse(localStorage.getItem("pokemon")).name.toUpperCase()
              : ""}
          </h2>
          <h2>
            {localStorage.getItem("pokemon")
              ? "#" + JSON.parse(localStorage.getItem("pokemon")).id
              : ""}
          </h2>
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
        <div
          className={`main-img-container main-img-container-${
            localStorage.getItem("pokemon")
              ? JSON.parse(localStorage.getItem("pokemon")).type
              : "fire"
          }`}
        >
          <img
            className={`main-img main-img-${
              localStorage.getItem("pokemon")
                ? JSON.parse(localStorage.getItem("pokemon")).type
                : "fire"
            }`}
            src={
              localStorage.getItem("pokemon")
                ? JSON.parse(localStorage.getItem("pokemon"))["sprites"][0]
                : pokeball
            }
            alt=""
          />
        </div>

        {localStorage.getItem("pokemon") && (
          <div
            className={`btn-container btn-container-${
              localStorage.getItem("pokemon")
                ? JSON.parse(localStorage.getItem("pokemon")).type
                : "fire"
            }`}
          >
            <Link
              to="/details"
              className={`details-btn details-btn-${
                localStorage.getItem("pokemon")
                  ? JSON.parse(localStorage.getItem("pokemon")).type
                  : "fire"
              }`}
            >
              Details
            </Link>
            <Link
              to="/evo"
              className={`details-btn details-btn-${
                localStorage.getItem("pokemon")
                  ? JSON.parse(localStorage.getItem("pokemon")).type
                  : "fire"
              }`}
            >
              Evolutions
            </Link>
          </div>
        )}
      </div>
      <Particle
        color={
          localStorage.getItem("pokemon")
            ? colors[JSON.parse(localStorage.getItem("pokemon")).type]
            : ""
        }
      />
    </>
  );
}
