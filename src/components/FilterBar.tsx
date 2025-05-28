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
        <div className="filter-bar">
            <div className="form-group">
                <label>Name</label>
                <input
                    type='text'
                    placeholder='Enter product name'
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)} />
            </div>

            <div className="form-group">
                <label>Category</label>
                <select
                    value={selectedCategory}
                    onChange={(e) => onCategoryChange(e.target.value)}
                >
                    <option value="All">All</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Availability</label>
                <select
                    value={selectedAvailability}
                    onChange={(e) => onAvailabilityChange(e.target.value)}
                >
                    <option value="All">All</option>
                    <option value="Available">Available</option>
                    <option value="Not Available">Not Available</option>
                </select>
            </div>

            <div className="form-group">
                <button type='button' onClick={() => onSearchByName(searchName)}>Search</button>
            </div>
        </div>
    );
}

export default FilterBar;
