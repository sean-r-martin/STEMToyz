'use strict';

import React from 'react';
import { Link } from 'react-router';
import ProductsFilterContainer from '../containers/ProductsFilterContainer'
export default function (props) {
  return (
    <div className="row">
      <div className="col-xs-2">
        <ProductsFilterContainer allProducts={props.allProducts} />
      </div>
      <div className="col-xs-10">
        {
          props.filteredProducts.length
          ? props.filteredProducts.map(product => {
            return (
              <div className="col-md-2" key={ product.id }>
                <Link className="thumbnail product-section" to={`/products/${product.id}`}>
                <img src={`/img/${product.imageUrl}`} height="100" width="170" />
                <div>
                  <h4>{product.name}</h4>
                  <h5>Price: {product.price}</h5>
                  <p>Category: {product.category}</p>
                  <button className="btn btn-primary btn-outline-success my-2 my-sm-0" onClick={() => {
                      props.unAuthAddToCart(product)
                      props.toggleShoppingCart(props.showShoppingCart);
                    }}>
                    Add to cart
                  </button>
                </div>
              </Link>
              </div>
            );
          })
          : <h3>No Items found</h3>
        }
      </div>
    </div>
  )
}
