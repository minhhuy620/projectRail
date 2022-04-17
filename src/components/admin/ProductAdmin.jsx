import React, { useContext, useEffect, useState } from 'react'
import { ProductsContext } from './../../global/ProductsContext'
import { dbstore } from './../Firebase/firebase'
import { Link } from 'react-router-dom';
import { css } from "@emotion/react";
import PropagateLoader from "react-spinners/PropagateLoader";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: #8950FC;
`;
export const ProductAdmin = () => {
    const [search, setSearch] = useState("");
    const { products } = useContext(ProductsContext);
    const [filtered, setFiltered] = useState([]);
    const [loading] = useState(true);
    const [color] = useState("#8950FC");
    // console.log(products);
    useEffect(() => {
        setFiltered(
            products.filter((info) =>
                info.ProductName.toLowerCase().includes(search.toLowerCase()),
            )
        );
    }, [search, products]);
    const handleSearch = e => {
        setSearch(e.target.value);
    }
    const onChangeDelete = (id) => {
        dbstore.collection('Products').doc(id).delete().then(() => {
            window.location.reload()
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }
    return (
        <>
            <div className="card card-custom">
                <div className="card-header flex-wrap py-5">
                    <div className="card-title">
                        <h3 className="card-label">List Product
                            {/* <div className="text-muted pt-2 font-size-sm">custom colu rendering</div> */}
                        </h3>
                    </div>
                    <div className="card-toolbar">
                        <Link to="/addproducts" className="btn btn-primary font-weight-bolder">
                            <span className="svg-icon svg-icon-md">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                        <rect x="0" y="0" width="24" height="24" />
                                        <circle fill="#000000" cx="9" cy="15" r="6" />
                                        <path d="M8.8012943,7.00241953 C9.83837775,5.20768121 11.7781543,4 14,4 C17.3137085,4 20,6.6862915 20,10 C20,12.2218457 18.7923188,14.1616223 16.9975805,15.1987057 C16.9991904,15.1326658 17,15.0664274 17,15 C17,10.581722 13.418278,7 9,7 C8.93357256,7 8.86733422,7.00080962 8.8012943,7.00241953 Z" fill="#000000" opacity="0.3" />
                                    </g>
                                </svg>
                            </span>Add Product
                        </Link>
                    </div>
                </div>
                <div className="card-body">
                    <div className="mb-7">
                        <div className="row align-items-center">
                            <div className="col-lg-9 col-xl-8">
                                <div className="row align-items-center">
                                    <div className="col-md-4 my-2 my-md-0">
                                        <div className="input-icon">
                                            <input type="text" className="form-control" placeholder="Search..." onChange={handleSearch} />
                                            <span>
                                                <i className="flaticon2-search-1 text-muted"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th className="text-center">Product Name</th>
                                    <th className="text-center">Price</th>
                                    <th className="text-center">Actions</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length === 0 &&
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td>
                                            <PropagateLoader color={color} loading={loading} css={override} size={15} />
                                        </td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                }
                                {filtered.map(product => (
                                    <tr key={product.ProductID}>
                                        <td className="d-flex align-items-center">
                                            <div className="symbol symbol-60 flex-shrink-0 mr-4">
                                                <img src={product.ProductImg} className="symbol-label" alt="not found" />

                                            </div>
                                        </td>
                                        <td className="text-center align-middle">
                                            {product.ProductName}

                                        </td>

                                        <td className="text-center align-middle">
                                            {product.ProductPrice} VNĐ

                                        </td>
                                        <td className="text-center align-middle">

                                            <Link to={`/editproduct/${product.ProductID}`} className="navi-text text-muted text-hover-primary mr-3" title="Update">
                                                <i className="fas fa-edit" />
                                            </Link>
                                            <span className="navi-text text-muted text-hover-primary" title="Delete">
                                                <i className="far fa-trash-alt" onClick={onChangeDelete.bind(this, product.ProductID)}></i>
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
