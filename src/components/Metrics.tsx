import React from 'react'

const Metrics = () => {
  return (
    <div>
        <h2>Inventory Overview</h2>
        <table>
            <thead>
            <tr>
                <th></th>
                <th>Total Product in Stock</th>
                <th>Total Value in Stock</th>
                <th>Average Price in Stock</th>
            </tr>
            </thead>
            <tbody>

            <tr>
            <td>Food</td>
            <td>50</td>
            <td>$75.00</td>
            <td>$1.50</td>
          </tr>
          <tr>
            <td>Clothing</td>
            <td>100</td>
            <td>$4,500.00</td>
            <td>$45.00</td>
          </tr>
          <tr>
            <td>Electronics</td>
            <td>0</td>
            <td>$0.00</td>
            <td>$0.00</td>
          </tr>
          <tr>
            <td>Overall</td>
            <td>150</td>
            <td>$4,575.00</td>
            <td>$30.50</td>
          </tr>

            </tbody>
        </table>
    </div>
  )
}

export default Metrics
