import React from "react";

export default function Search({ search }) {
  return (
    <div id="search_bar">
      <input id="query" type="text" defaultValue="Search beer by..."></input>
      <select name="filters" id="filters">
        <option value="beer_name">Beer name</option>
        <option value="yeast">Yeast strain</option>
        <option value="hops">Hop variety</option>
        <option value="malt">Malt type</option>
        <option value="food">Food pairing</option>
        <option value="brewed_before">Brewed before</option>
        <option value="brewed_after">Brewed after</option>
        <option value="abv_gt">ABV greater than</option>
        <option value="abv_lt">ABV lower than</option>
        <option value="ibu_gt">IBU greater than</option>
        <option value="ibu_lt">IBU lower than</option>
        <option value="ebc_gt">EBC greater than</option>
        <option value="ebc_lt">EBC lower than</option>
      </select>
      <button onClick={search}>Go</button>
    </div>
  );
}
