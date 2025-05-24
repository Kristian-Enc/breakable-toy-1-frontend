import React from 'react';

const FilterBar = () => {
  return (
    <div>
        <h2>Search Product</h2>
        <div>
            <label>
                Name
                <input type='text' placeholder='Enter product name'/>
            </label>            
        </div>

        <div>
            <label>
                Category 
                <select>
                    <option>All</option>
                    <option>Food</option>
                    <option>Fruit</option>
                    <option>Meat</option>
                </select>
            </label>
        </div>

        <div>
            <label>
                Availability 
                <select>
                    <option>All</option>
                    <option>Available</option>
                    <option>Not Available</option>
                </select>
            </label>
        </div>

        <div>
            <button type='button'>Search</button>
        </div>

    </div>
  )
}

export default FilterBar
