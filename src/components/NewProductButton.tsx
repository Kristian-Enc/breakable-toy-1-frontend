import React from 'react';

type Props = {
  onClick: () => void;
};

const NewProductButton = ({ onClick }: Props) => {
  return (
    <div className="new-product-button-wrapper">
      <button className="new-product-button" type="button" onClick={onClick}>
        New Product
      </button>
    </div>
  );
};

export default NewProductButton;
