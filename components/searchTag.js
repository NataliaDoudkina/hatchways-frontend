import React from 'react';

const SearchTag=({searchByFilters})=>{
return (
    <div>
    <div>
    <input type="text" onChange={e=>searchByFilters({tag:e.target.value})} />
    </div>
    </div>)
}

export default SearchTag