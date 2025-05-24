import React from 'react'

const ProductForm = () => {
  return (
    <div>
      <h2>Create / Edit a Product</h2>
      <form>
        <div>
          <label>
          Name
          <input type="text" placeholder='Add name' />
          </label>
        </div>

        <div>
          <label>
            Category
            <select>
              <option value="">Select Category</option>
              <option>Food</option>
              <option>Electronics</option>
              <option>Clothing</option>
            </select>
          </label>
        </div>

        <div>
          <label>
            Stock
            <input type="number" placeholder='Add Stock' />
          </label>
        </div>

        <div>
          <label>
            Unit Price
            <input type="number" placeholder='Add unit price' />
          </label>
        </div>

        <div>
          <label>
            Expiration date
            <input type="date"/>
          </label>
        </div>
        <div>
          <button type="button">Save</button>
          <button type="button">Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default ProductForm