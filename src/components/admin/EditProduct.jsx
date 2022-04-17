import React, { Component } from 'react'
import { storage, dbstore } from '../Firebase/firebase'
export default class EditProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ProductID: '',
            ProductName: '',
            ProductPrice: '',
            ProductImg: ''
        };

        this.state = { error: '' };
    }

    componentDidMount() {
        const ref = dbstore.collection('Products').doc(this.props.match.params.id);
        ref.get().then((doc) => {
            if (doc.exists) {
                const product = doc.data();
                this.setState({
                    ProductID: doc.id,
                    ProductName: product.ProductName,
                    ProductPrice: product.ProductPrice,
                    ProductImg: product.ProductImg
                });
            } else {
                console.log("No such document!");
            }
        });
    }
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState({ product: state });
    }
    productImgHandler = (e) => {
        const types = ['image/png', 'image/jpeg'];
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
            this.setState({
                ProductImg: selectedFile
            });
            this.setState({
                error: ''
            })
        }
        else {
            this.setState({
                ProductImg: null
            });
            this.setState({
                error: 'Please select a valid image type png or jpeg'
            });
        }
    }
    onSubmit = (e) => {
        e.preventDefault();

        const { ProductName, ProductPrice, ProductImg } = this.state;
        if (!!ProductImg === true) {
            const uploadTask = storage.ref(`product-images/${ProductImg.name}`).put(ProductImg);
            uploadTask.on('state_changed', snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(progress);
            }, err => {
                this.setState({
                    error: err.message
                })
            }, () => {
                //getting product url and if success then storing the product in db
                storage.ref('product-images').child(ProductImg.name).getDownloadURL().then(url => {
                    const updateRef = dbstore.collection('Products').doc(this.state.ProductID);
                    updateRef.set({
                        ProductName,
                        ProductPrice,
                        ProductImg: url
                    }).then(() => {
                        this.props.history.push("/productmanager")
                        window.location.reload()
                    })
                        .catch((error) => {
                            console.error("Error adding document: ", error);
                        });
                })
            })
        } else {
            const updateRef = dbstore.collection('Products').doc(this.state.ProductID);
            updateRef.update({
                ProductName,
                ProductPrice,
            }).then(() => {
                this.props.history.push("/productmanager")
                window.location.reload()
            })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                });
        }

    }
    cancel() {
        this.props.history.push('/productmanager');
    }
    render() {
        return (
            <div>
                <div className="d-flex flex-row">
                    <div className="flex-row-fluid ml-lg-8">
                        <div className="card card-custom card-stretch">
                            <div class="card-header py-3">
                                <div class="card-title align-items-start flex-column">
                                    <h3 class="card-label font-weight-bolder text-dark">Update Products</h3>
                                    <span class="text-muted font-weight-bold font-size-sm mt-1">Update Product Informaiton</span>
                                </div>
                            </div>
                            <form className="form" autoComplete="off" onSubmit={this.onSubmit}>
                                <div className="card-body">
                                    <div className="form-group row">
                                        <label className="col-xl-3 col-lg-3 col-form-label">Product Name</label>
                                        <div className="col-lg-9 col-xl-6">
                                            <input className="form-control form-control-lg form-control-solid" type="text" required
                                                value={this.state.ProductName} onChange={this.onChange} placeholder="Product Name" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-xl-3 col-lg-3 col-form-label">Product Price</label>
                                        <div className="col-lg-9 col-xl-6">
                                            <input className="form-control form-control-lg form-control-solid" type="text" required
                                                value={this.state.ProductPrice} onChange={this.onChange} placeholder="ProductPrice" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-xl-3 col-lg-3 col-form-label">Product Image</label>
                                        <div className="col-lg-9 col-xl-6">
                                            <div className="image-input image-input-outline" id="kt_profile_avatar">
                                                {/* <div className="image-input-wrapper"></div> */}

                                                {/* <label className="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" data-action="change" data-toggle="tooltip" title="" data-original-title="Change Product Image">
                                                <i className="fas fa-times"></i>
                                               
                                                <input type="file" name="profile_avatar" accept=".png, .jpg, .jpeg" />
                                                <input type="hidden" name="profile_avatar_remove" />
                                            </label> */}
                                                <input type="file" className='form-control' name="ProductImg" onChange={this.productImgHandler} id='file' />
                                            </div>
                                            <span className="form-text text-muted">Allowed file types: png, jpg, jpeg.</span>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div className="card-header py-3">
                                <div className="card-toolbar">
                                    <button type="submit" className="btn btn-info mr-2">Update</button>
                                    <button onClick={this.cancel.bind(this)} className="btn btn-secondary">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
