import React, { useContext, useEffect, useState } from 'react'
import { ProductsUserContext } from '../../../global/ProductsUserContext'
import { CartContext } from '../../../global/CartContext';
import { css } from "@emotion/react";
import PropagateLoader from "react-spinners/PropagateLoader";
import TicketCode from '../Ticket/TicketCode';
const override = css`
  display: block;
  margin: 0 auto;
  border-color: #8950FC;
`;
export const Products = () => {
    const { products } = useContext(ProductsUserContext);
    const { dispatch } = useContext(CartContext);
    const [loading] = useState(true);
    const [color] = useState("#8950FC");
    const [search, setSearch] = useState("");
    const [filtered, setFiltered] = useState([]);
    const [filtered1, setFiltered1] = useState([]);
    const [filtered2, setFiltered2] = useState([]);
    useEffect(() => {
        setFiltered(
            products.filter((info) =>
                info.ProductName.toLowerCase().includes(search.toLowerCase()),
            )
        );
    }, [search, products]);
    useEffect(() => {
        setFiltered1(
            filtered.filter((info) =>
                info.NameRegion.toLowerCase().includes("Huế".toLowerCase()),
            )
        );
        setFiltered2(
            filtered.filter((info) =>
                info.NameRegion.toLowerCase().includes("Đà Nẵng".toLowerCase()),
            )
        );
    }, [filtered])
    const handleSearch = e => {
        setSearch(e.target.value);
    }
    return (
        <>
            {localStorage.getItem('checked') !== 'true' ?
                <>
                    <div className="row">
                        <div className="col-xl-12" style={{ "height": "auto", "width": "670px", "margin": "auto" }}>
                            <div className="alert alert-custom alert-white alert-shadow fade show gutter-b mx-auto" role="alert">
                                <TicketCode />
                            </div>
                            <div className="card card-custom gutter-b card-stretch">
                                <img src="./assets/images/waiting.png" alt="IMG" style={{ "background-repeat": "no-repeat", "background-size": "100% 100%" }}></img>
                            </div>
                        </div>
                    </div>
                </>
                :
                <div className="d-flex flex-row">
                    <div className="flex-row-fluid">
                        <div className="card card-custom card-stretch gutter-b">
                            <div className="card-body">
                                <div className="card card-custom mb-12">
                                    <div className="card-body rounded p-0 d-flex" style={{ backgroundColor: '#DAF0FD' }}>
                                        <div className="d-flex flex-column flex-lg-row-auto w-auto w-lg-350px w-xl-450px w-xxl-500px p-10 p-md-20">
                                            <h1 className="font-weight-bolder text-dark mb-8">Search Product</h1>
                                            <form className="d-flex flex-center py-2 px-6 bg-white rounded">
                                                <span className="svg-icon svg-icon-lg svg-icon-primary">
                                                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                        <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                                            <rect x={0} y={0} width={24} height={24} />
                                                            <path d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z" fill="#000000" fillRule="nonzero" opacity="0.3" />
                                                            <path d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z" fill="#000000" fillRule="nonzero" />
                                                        </g>
                                                    </svg>
                                                </span>
                                                <input type="text" className="form-control border-0 font-weight-bold pl-2" placeholder="Search Product Name" onChange={handleSearch} />
                                            </form>
                                        </div>
                                        <div className="d-none d-md-flex flex-row-fluid bgi-no-repeat bgi-position-y-center bgi-position-x-left bgi-size-cover" style={{ backgroundImage: 'url(assets/media/svg/illustrations/progress.svg)' }} />
                                    </div>
                                </div>
                                {filtered.length !== 0 && <h1 className="h1-1">Product</h1>}
                                {filtered1.length !== 0 &&
                                    <div className="d-flex align-items-center mb-7 text-center">
                                        <h1 className="bg-light-info rounded-bottom p-2 mx-auto" style={{"width":"100px","color":"#8950FC"}}>Huế</h1>
                                    </div>
                                }
                                {filtered.length === 0 &&
                                    <div className="row">
                                        <PropagateLoader color={color} loading={loading} css={override} size={15} />
                                    </div>
                                }
                                <div className="scrolling-wrapper">
                                    <div className="product-list">
                                        {filtered1.map(product => (
                                            <div className="scrolling-wrapper card col-md-4" key={product.ProductID}>
                                                <section className="panel">
                                                    <div className="pro-img-box">
                                                        <img src={product.ProductImg} alt="" />
                                                        <button className="adtocart" onClick={() => { dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product: { ...product, ProductQty: 1 } }) }} >
                                                            <i className="fa fa-shopping-cart"/>
                                                        </button>
                                                    </div>
                                                    <div className="panel-body text-center">
                                                        <h4>
                                                            <a href="!#" className="pro-title">
                                                                {product.ProductName}
                                                            </a>
                                                        </h4>
                                                        <p className="price">{product.ProductPrice}đ</p>
                                                    </div>
                                                </section>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {filtered2.length !== 0 && <h1 className="h1-1"></h1>}
                                {filtered2.length !== 0 &&
                                    <div className="d-flex align-items-center mb-7 text-center">
                                        <h1 className="bg-light-info rounded-bottom p-2 mx-auto" style={{"width":"140px","color":"#8950FC"}}>Đà Nẵng</h1>
                                    </div>
                                }
                                <div className="scrolling-wrapper">
                                    <div className="product-list">
                                        {filtered2.map(product => (
                                            <div className="scrolling-wrapper card col-md-4" key={product.ProductID}>
                                                <section className="panel">
                                                    <div className="pro-img-box">
                                                        <img src={product.ProductImg} alt="" />
                                                        <button className="adtocart">
                                                            <i className="fa fa-shopping-cart" onClick={() => { dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product: { ...product, ProductQty: 1 } }) }} />
                                                        </button>
                                                    </div>
                                                    <div className="panel-body text-center">
                                                        <h4>
                                                            <a href="!#" className="pro-title">
                                                                {product.ProductName}
                                                            </a>
                                                        </h4>
                                                        <p className="price">{product.ProductPrice} VNĐ</p>
                                                    </div>
                                                </section>
                                            </div>

                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}







