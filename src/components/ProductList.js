import React, { Component } from 'react';
import axios from 'axios';

class ProductList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: {},
            checked: false,
            zip: 0,
            zipDefaultMessage: 'Enter ZIP to populate City and State',
            city: '',
            stateName: ''
        }
    }

    componentWillMount() {
        this._getProducts().then(res => this.setState({ items: { ...res } })).catch(err => console.log("error!", err));
    }

    _getProducts = async () => {
        const res = await fetch('/products');
        const body = await res.json();

        return body.response;
    }

    _getLocation = async () => {
        const { zip } = this.state;

        const res = await axios.post('/zipcode', { zip })
        if (res.data.response) {
            const { city, stateName } = res.data.response;
            this.setState({ stateName, city })
        }
    }

    _handleChecked = (index) => {
        this.setState({ checked: index });
    }

    _onZipCodeChange = (e) => {
        const { zip } = this.state;
        this.setState({ zip: e.target.value }, () => {
            this._getLocation(zip).then(res => console.log("res", res)).catch(err => this.setState({ zipDefaultMessage: err.statusMessage }));
        });

    }

    render() {
        const { items, checked, zipDefaultMessage, city, stateName } = this.state;
        console.log("iutem", items)
        return (
            <div>
                <div className="row">
                    <div className="col-sm-3" />
                    <div className="col-sm-6">
                        <div className="card">
                            <div className="card-header text-left"><span className="arrow-box">Step 1</span><span className="header-text" >Which Case Would You Like?</span></div>
                            <div className="card-body">
                                <p className="text-left" >
                                    Whatever you choose, we'll add in two bonus Cabs and two crystal glasses and you'll have the complete package - worth over $250 - for ONLY $69.99 (plus $19.99 shipping & and applicable tax; please allow 5-10 days for delivery, depending on shipping state.)
                                </p>
                                <ul>
                                    {Object.keys(items).length && items.mainItems.map((item, index) => (
                                        <div key={index} className="list-item-wrapper d-flex" >
                                            <input className="mr-2" checked={checked === index} type="radio" value={item} onChange={e => this._handleChecked(index)} />
                                            <li> <span>{item.product.name}</span> + 2 Bonus Bottles and Glasses <span>JUST {item.listPrice}</span> <a target="_blank" href="https://www.directwinesinc.com/" >view wines</a></li>
                                        </div>
                                    ))}
                                </ul>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="text-left form-group">
                                            <label className="control-label">Zip <span style={{ color: 'red' }} >*</span> </label>
                                            <div>
                                                <input onChange={this._onZipCodeChange} name="zip" type="text" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 d-flex justify-content-start align-items-center">
                                        {!city ? zipDefaultMessage : `${city}, ${stateName} `}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3" />
                </div>
            </div>
        );
    }
}

export default ProductList;