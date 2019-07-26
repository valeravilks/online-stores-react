import React from 'react';
import {observer, inject} from 'mobx-react';
import { urlBuilder } from '~/routes';

@inject('stores') @observer class Results extends React.Component{
    render(){
        let order = this.props.stores.order;

        let productsRows = order.lastOrderCache.map((product, i) => {
            return (
                <tr key={product.id}>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td>{product.cnt}</td>
                    <td>{product.price * product.cnt}</td>
                </tr>
            );
        });

        return (
            <div>
                <h2>Congratulations!</h2>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <td>Title</td>
                        <td>Price</td>
                        <td>Count</td>
                        <td>Total</td>
                    </tr>
                    </thead>
                    <tbody>
                    {productsRows}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Results;