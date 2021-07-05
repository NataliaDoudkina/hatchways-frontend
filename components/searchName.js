import React from 'react';

const SearchName=({searchByFilters})=>{
return(
    <div>
    <input type="text" onChange={e=>searchByFilters({name:e.target.value})} />
    </div>
)
}
export default SearchName