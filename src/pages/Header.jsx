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
        <header className="banner">
          <img className="icons" src={pokeball} alt="" />
          <h1>Pokedex</h1>
          <img className="icons" src={greatball} alt="" />
        </header>
        
      </nav>
      
    </>
  );
}
