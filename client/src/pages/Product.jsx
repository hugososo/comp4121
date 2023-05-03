import classes from '../components/Product.module.css';

import {useEffect, useState} from 'react';
import { Col, Row , ToggleButton  , ToggleButtonGroup} from "react-bootstrap";
import {Link , useSearchParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import config from "../config/config.js";
import {TextField} from "@mui/material";

const Product = () => {
    const [queryParameters] = useSearchParams()
    const id = queryParameters.get('id');

    const [productDetail, setProductDetail] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [showNoProduct, setShowNoProduct] = useState(false);

    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const getProduct = async () => {
            await fetch(config.development.catalogEndpoint + id,{
                method: 'GET',
            }).then(async (res)=>{
                const product = await JSON.parse(await res.json());
                console.log(await product);

                if (product.status===400 && product.message==='Product not found') {
                    setShowNoProduct(true);
                    setIsLoaded(true);
                    return;
                }
                setProductDetail(product.data.products[0]);
                setIsLoaded(true);
                document.title="Product | MyPhoneCase";
            })


        }
        getProduct()
            .then(r => console.log("Product fetched"))
            .catch(err => console.log(err));
    },[]);

    const mui_textField_styles = {
        "& .MuiInputLabel-root": {color: "white"},
        "& .MuiOutlinedInput-root.Mui-focused": {
            "& > fieldset": {
                color: "white",
                borderColor: "transparent"
            }
        },
        borderBottom: "1px solid white",
        input: {color: 'white'},
        width: '100%'
    }

    return (
        <div className={classes.productPage}>
            {!isLoaded ? (<LoadingSpinner/>) : null}
            <div id={'productContainer'} hidden={!isLoaded}>
                <h1>Product</h1>
                <div className={classes.productDetail}>
                    <Row>
                        <Col className='col-6'>
                            <img src={productDetail.img_url_path}/>
                        </Col>
                        <Col className='align-content-end'>
                            <h5>MYPHONECASE</h5>
                            <p className="fs-1">{productDetail.productName}</p>
                            {
                                productDetail.is_Discounted && productDetail.Stock > 0 ? (
                                    <div>
                                        <span className={classes.discountedPrice}>
                                        HK$ {Math.floor(productDetail.Price * (1 - productDetail.discount_rate)) }
                                        </span>
                                        <span className={classes.productPriceDiscounted}>
                                        HK$ {productDetail.Price}
                                        </span>

                                    </div>
                                    ) : productDetail.stock === 0 ? (
                                        <span className={productDetail.price}>Out of Stock</span>
                                    ) : (
                                        <span className={productDetail.price}>HK$ {productDetail.Price}</span>
                                    )
                            }
                            <h4>Tax included. Shipping calculated at checkout. </h4>
                            <div className={classes.productType}>
                                <ToggleButtonGroup type="radio" name="options" id="case-type" defaultValue={1}>
                                    <ToggleButton id="tbg-radio-1" variant={"outline-light"} value={1}>
                                        Iphone 14
                                    </ToggleButton>
                                    <ToggleButton id="tbg-radio-2" variant={"outline-light"} value={2}>
                                        Iphone 14 Max
                                    </ToggleButton>
                                    <ToggleButton id="tbg-radio-3" variant={"outline-light"} value={3}>
                                        Iphone 14 Pro
                                    </ToggleButton>
                                    <ToggleButton id="tbg-radio-4" variant={"outline-light"} value={4}>
                                        Iphone 14 Pro Max
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                            <TextField
                                label="Quantity"
                                type={'number'}
                                value={quantity}
                                sx={mui_textField_styles}
                                onChange={(e) => isNaN(e.target.value) ? setQuantity(0) : setQuantity(e.target.value)}
                            />
                            <div className={classes.addToCartButton}>
                                <Row>
                                    <button type="button" className="btn btn-outline-warning btn-lg btn-block">Add to Cart
                                    </button>
                                </Row>
                                <Row>
                                    <button type="button" className="btn btn-outline-primary btn-lg btn-block">Buy it now
                                    </button>
                                </Row>
                            </div>
                            <h5>
                                 Pickup available at Wuhu Street in 24 hours
                            </h5>
                            <h5>
                                designed with latest Aluminum alloy, customization is accepted
                            </h5>

                        </Col>
                    </Row>
                </div>
            </div>

        </div>
    );
}

export default Product;
