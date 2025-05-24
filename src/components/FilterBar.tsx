import React, { useState } from 'react';

type Props = {
    onSearchByName: (name: string) => void;
    categories: string[];
    selectedCategory: string;
    onCategoryChange: (selected: string) => void;
    selectedAvailability: string;
    onAvailabilityChange: (selected: string) => void;
};


const FilterBar = ({ 
    onSearchByName, 
    categories, 
    selectedCategory, 
    onCategoryChange,
    selectedAvailability,
    onAvailabilityChange
    }: Props) => {
    const [searchName, setSearchName] = useState('');

    return (
        <div>
            <h2>Search Product</h2>
            <div>
                <label>
                    Name
                    <input
                        type='text'
                        placeholder='Enter product name'
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)} />
                </label>
            </div>

            <div>
                <label>
                    Category
                    <select
                        value={selectedCategory}
                        onChange={(e) => onCategoryChange(e.target.value)}
                    >
                        <option value="All">All</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </label>
            </div>

            <div>
                <label>
                    Availability
                    <select
                        value={selectedAvailability}
                        onChange={(e) => onAvailabilityChange(e.target.value)}
                        >
    <option value="All">All</option>
    <option value="Available">Available</option>
    <option value="Not Available">Not Available</option>
                    </select>
                </label>
            </div>

            <div>
                <button type='button' onClick={() => onSearchByName(searchName)}>Search</button>
            </div>

        </div>
    )
}

export default FilterBar
