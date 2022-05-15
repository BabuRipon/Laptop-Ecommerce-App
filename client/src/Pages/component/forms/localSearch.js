import React from 'react';

const LocalSearch=({keyword,setKeyword})=>(
    <form>
        <input 
           value={keyword}
           onChange={(e)=>setKeyword(e.target.value.toLowerCase())}
           className="form-control"
           placeholder="search"
        />
    </form>
)

export default LocalSearch;