import { NavLink } from "react-router-dom";
import pokeball from "../../img/769px-Pokebola-pokeball-png-0.png";
import greatball from "../../img/Great_Ball_Artwork.png";
import { useState } from "react";
import Result from "./Main";
import { useQuery } from "react-query";


export default function Header() {
  
  

  return (
    <>
      <nav>
        <header className={`banner banner-${localStorage.getItem("pokemon")?JSON.parse(localStorage.getItem("pokemon")).type :"fire"}`}>
          <img className={`icons icons-${localStorage.getItem("pokemon")?JSON.parse(localStorage.getItem("pokemon")).type :"fire"}`} src={pokeball} alt="" />
          <h1>Pokedex</h1>
          <img className={`icons icons-${localStorage.getItem("pokemon")?JSON.parse(localStorage.getItem("pokemon")).type :"fire"}`} src={greatball} alt="" />
        </header>
        
      </nav>
      
    </>
  );
}
