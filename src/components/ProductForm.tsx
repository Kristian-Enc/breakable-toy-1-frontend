import React, { useState } from 'react'

type Props = {
  onCancel: () => void;
  onSave: (product: {
    name: string;
    category: string;
    quantityInStock: number;
    unitPrice: number;
    expirationDate?: string;
  }) => void;
  existingCategories: string[];
  product?: {
    name: string;
    category: string;
    quantityInStock: number;
    unitPrice: number;
    expirationDate?: string;
  } | null;
};


const ProductForm = ({ onCancel, onSave, existingCategories, product }: Props) => {
  const [name, setName] = useState(product?.name ?? '');
  const [category, setCategory] = useState(product?.category ?? '');
  const [newCategory, setNewCategory] = useState('');
  const [stock, setStock] = useState(product?.quantityInStock ?? 0);
  const [price, setPrice] = useState(product?.unitPrice ?? 0);
  const [expirationDate, setExpirationDate] = useState(product?.expirationDate ?? '');
  
  return (
    <div className="modal-overlay">
      <div className="modal">
      <form>
        <div>
          <label>
            Name
            <input
              type="text"
              placeholder="Add name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Category
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select Category</option>
              {existingCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
              <option value="__new">Create new category</option>
            </select>

            {category === '__new' && (
              <input
                type="text"
                placeholder="Enter new category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
            )}
          </label>
        </div>

        <div>
          <label>
            Stock
            <input
              type="number"
              placeholder="Add Stock"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
            />


          </label>
        </div>

        <div>
          <label>
            Unit Price
            <input
              type="number"
              placeholder="Add unit price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />

          </label>
        </div>

        <div>
          <label>
            Expiration date
            <input
              type="date"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
            />

          </label>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              const finalCategory = category === '__new' ? newCategory : category;
              onSave({
                name,
                category: finalCategory,
                quantityInStock: stock,
                unitPrice: price,
                expirationDate: expirationDate || undefined,
              });
            }}
          >
            Save
          </button>

          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
      </div>
    </div>
  )
}

export default ProductForm