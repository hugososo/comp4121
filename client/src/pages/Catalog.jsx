import classes from '../components/Catalog.module.css';

import {useEffect, useState} from "react";
import {Button, Col, Dropdown, DropdownButton, Form, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSliders} from "@fortawesome/free-solid-svg-icons";
import {TextField} from "@mui/material";

import CatalogCard from "../components/CatalogCard.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import NoProducts from "../components/NoProductFound.jsx";
import config from "../config/config.js";

function Catalog() {
    const [productsList, setProductsList] = useState([]);
    const [fullBackupProductsList, setFullBackupProductsList] = useState([]);
    const [backupProductsList, setBackupProductsList] = useState([]);
    const [sortMethod, setSortMethod] = useState("Default");
    const [isLoaded, setIsLoaded] = useState(false);
    const [showFilterBar, setShowFilterBar] = useState(false);
    const [availFilter, setAvailFilter] = useState("All");
    const [priceFilter, setPriceFilter] = useState({min: 0, max: 0});
    const [showNoProducts, setShowNoProducts] = useState(false);

    useEffect(() => {
        const getProducts = async () => {
            await fetch(config.development.catalogEndpoint, {
                method: "GET",
            }).then(async (res) => {
                const catalog = await JSON.parse(await res.json());
                console.log(await catalog);

                // if there are no products, show the no products page
                if (catalog.status === 400 && catalog.message === "No products found") {
                    setShowNoProducts(true);
                    setIsLoaded(true);
                    return;
                }

                // populate the catalog page with the products
                setProductsList(catalog.data);
                setFullBackupProductsList(catalog.data);
                setBackupProductsList(catalog.data.products);
                setIsLoaded(true);
                document.title = "Catalog | MyPhoneCase";
            });
        }
        getProducts()
            .then(r => console.log("Catalog page loaded"))
            .catch(err => console.log(err));
    }, []);

    const sortProducts = (method) => {
        let productList = productsList.products.filter((product) => product.Stock > 0);
        let outOfStockList = productsList.products.filter((product) => product.Stock === 0);

        switch (method) {
            case 'Featured':
                productList.sort((a, b) => b.isPromoted - a.isPromoted);
                break;
            case 'Best Seller':
                productList.sort((a, b) => a.Stock - b.Stock);
                break;
            case 'Name - A-Z':
                productList.sort((a, b) => a.productName.localeCompare(b.productName));
                break;
            case 'Name - Z-A':
                productList.sort((a, b) => b.productName.localeCompare(a.productName));
                break;
            case 'Price - Low to High':
                productList.sort((a, b) => {
                    const discountRateA = Math.ceil((1 - a.discount_rate) * 10) / 10;
                    const discountRateB = Math.ceil((1 - b.discount_rate) * 10) / 10;

                    const aDiscountedPrice = a.is_Discounted ? a.Price * discountRateA : a.Price;
                    const bDiscountedPrice = b.is_Discounted ? b.Price * discountRateB : b.Price;
                    return aDiscountedPrice - bDiscountedPrice;
                });
                break;
            case 'Price - High to Low':
                productList.sort((a, b) => {
                    const discountRateA = Math.ceil((1 - a.discount_rate) * 10) / 10;
                    const discountRateB = Math.ceil((1 - b.discount_rate) * 10) / 10;

                    const aDiscountedPrice = a.is_Discounted ? a.Price * discountRateA : a.Price;
                    const bDiscountedPrice = b.is_Discounted ? b.Price * discountRateB : b.Price;
                    return bDiscountedPrice - aDiscountedPrice;
                });
                break;
            case 'Default':
                productList.sort((a, b) => a.productID - b.productID);
                break;
            default:
                console.log("Invalid sort method");
                return;
        }
        // Put out of stock items at the end of the list so that they are always at the end
        productList = productList.concat(outOfStockList);
        setProductsList({...productsList, products: productList})
        setSortMethod(method);
    };

    const handlePriceFilter = () => {
        let newMinPrice = Math.ceil(priceFilter.min), newMaxPrice = Math.ceil(priceFilter.max);
        let listMinPrice = Math.ceil(productsList.minPrice), listMaxPrice = Math.ceil(productsList.maxPrice);
        const productListBackup = backupProductsList;

        // set the input value to the min or max price if the input value is less than min or greater than max
        if (newMinPrice < listMinPrice)
            newMinPrice = listMinPrice;
        else if (newMinPrice > listMaxPrice)
            newMinPrice = listMaxPrice;

        if (newMaxPrice > listMaxPrice)
            newMaxPrice = listMaxPrice;
        else if (newMaxPrice < listMinPrice)
            newMaxPrice = listMinPrice;

        // filter the products list based on the price range
        let filteredList = productListBackup.filter((product) => {
            return product.Price >= newMinPrice && product.Price <= newMaxPrice;
        });

        // if the filtered list is empty, show the no products found message
        if (filteredList.length === 0) {
            setShowNoProducts(true);
        }

        setProductsList({...productsList, products: filteredList});
        setPriceFilter({...priceFilter, min: newMinPrice, max: newMaxPrice});
    };

    const handleAvailFilter = (event) => {
        const productListBackup = backupProductsList;
        let filteredList = [];

        switch (event.target.value) {
            case 'all':
                filteredList = productListBackup;
                break;
            case 'inStock':
                filteredList = productListBackup.filter((product) => product.Stock > 0);
                break;
            case 'outStock':
                filteredList = productListBackup.filter((product) => product.Stock === 0);
                break;
            default:
                filteredList = productListBackup;
                break;
        }

        setProductsList({ ...productsList, products: filteredList });
        setShowNoProducts(filteredList.length === 0);
        setAvailFilter(event.target.value);
    };

    const handleResetPriceFilter = () => {
        const productListBackup = backupProductsList;

        setPriceFilter({min: 0, max: 0});
        setProductsList({...productsList, products: productListBackup});
        setShowNoProducts(false);
    };

    const inputProps = {
        disableUnderline: true,
        inputProps: {min: 0, max: productsList.maxPrice}
    };

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
        <div className={classes.catalog}>
            {!isLoaded ? <LoadingSpinner/> : null}
            <div id='catalogContainer' hidden={ !isLoaded }>
                <h1>Product Catalog</h1>
                <div className={classes.filterBarContainer}>
                    <Row>
                        <Col className='col-9'>
                            <div className={classes.filterButton} onClick={() => setShowFilterBar(!showFilterBar)}>
                                <FontAwesomeIcon icon={faSliders} className={classes.FAIcon}/>
                                <span className={classes.filterText}>Filter</span>
                            </div>
                        </Col>
                        <Col className='align-content-end'>
                        <span id='dropdownContainer' className={classes.dropdownContainer}>
                            <DropdownButton key='outline-light' variant='outline-light'
                                            title={`Sort By: ${sortMethod} `}
                                            menuVariant="dark">
                                <Dropdown.Item onClick={() => sortProducts('Featured')}>
                                    Featured
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => sortProducts('Best Seller')}>
                                    Best Seller
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => sortProducts('Name - A-Z')}>
                                    Name: A-Z
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => sortProducts('Name - Z-A')}>
                                    Name: Z-A
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => sortProducts('Price - Low to High')}>
                                Price: Low to High
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => sortProducts('Price - High to Low')}>
                                    Price: High to Low
                                </Dropdown.Item>
                                <Dropdown.Divider/>
                                <Dropdown.Item onClick={() => sortProducts('Default')}>
                                    Default
                                </Dropdown.Item>
                            </DropdownButton>
                        </span>
                        </Col>
                        <Col className={`text-end`}>
                            <Button variant="outline-light" className={classes.totalCount} disabled>
                                {productsList.total} Products
                            </Button>
                        </Col>
                    </Row>
                    <div className={classes.filterBar} hidden={!showFilterBar}>
                        <Row>
                            <Col className='col-5'>
                                <div className={classes.priceFilterTitle}>Filter By Price</div>
                                <div className={classes.priceFilterSubtitle}>
                                    Input a price range to filter,
                                    valid range is from {Math.ceil(productsList.minPrice)} (Minimum price)
                                    to {productsList.maxPrice} (Maximum price)
                                </div>
                                <Row className={classes.priceFilterContent}>
                                    <Col className='col-3'>
                                        <TextField
                                            label="From"
                                            type={'number'}
                                            variant="standard"
                                            value={priceFilter.min === 0 ? '' : priceFilter.min}
                                            InputProps={inputProps}
                                            sx={mui_textField_styles}
                                            onChange={(e) =>
                                                setPriceFilter({...priceFilter, min: parseInt(e.target.value)})
                                            }
                                        />
                                    </Col>
                                    <Col className='col-3'>
                                        <TextField
                                            label="To"
                                            type={'number'}
                                            variant="standard"
                                            value={priceFilter.max === 0 ? '' : priceFilter.max}
                                            InputProps={inputProps}
                                            sx={mui_textField_styles}
                                            onChange={(e) =>
                                                setPriceFilter({...priceFilter, max: parseInt(e.target.value)})
                                            }
                                        />
                                    </Col>
                                    <Col className="col-3">
                                        <Button variant="outline-light" className={`w-100 ${classes.priceFilterButton}`}
												disabled={priceFilter.min === 0 || priceFilter.max === 0}
                                                onClick={() => {
                                                    handlePriceFilter()
                                                }}>
                                            Apply
                                        </Button>
                                    </Col>
                                    <Col className='col-3'>
                                        <Button variant="outline-light" className={`w-100 ${classes.priceFilterButton}`}
                                                onClick={() => {
                                                    handleResetPriceFilter()
                                                }}>
                                            Reset
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                            <Col className={`col-6 ${classes.priceFilterContainer}`}>
                                <div className={classes.priceFilterTitle}>Filter By Availability</div>
                                <div className={classes.priceFilterSubtitle}>
                                    Select an option below
                                </div>
                                <Row className={classes.priceFilterContent}>
                                    <Col className='col-3'>
                                        <Form.Check
                                            type="radio"
                                            value={'all'}
                                            label={`All (${productsList.total})`}
                                            checked={availFilter === 'all'}
                                            onChange={(e) => handleAvailFilter(e)}
                                        />
                                    </Col>
                                    <Col className='col-4'>
                                        <Form.Check
                                            type="radio"
                                            value={'inStock'}
                                            label={`In Stock (${productsList.inStock})`}
                                            checked={availFilter === 'inStock'}
                                            onChange={(e) => handleAvailFilter(e)}
                                        />
                                    </Col>
                                    <Col className='col-5'>
                                        <Form.Check
                                            type="radio"
                                            value={'outStock'}
                                            label={`Out of Stock (${productsList.outStock})`}
                                            checked={availFilter === 'outStock'}
                                            onChange={(e) => handleAvailFilter(e)}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </div>
                { showNoProducts ? <NoProducts/> : null }
                <Row className={classes.productContainerRow} hidden={showNoProducts}>
                    {
                        productsList.products?.map((product, idx) => {
                            return (
                                <Col className='col-4' key={idx}>
                                    <CatalogCard
                                        image={product.img_url_path}
                                        name={product.productName}
                                        isDiscounted={product.is_Discounted}
                                        price={product.Price}
                                        discountRate={product.discount_rate}
                                        urlID={product.productID}
                                        stock={product.Stock}
                                    />
                                </Col>
                            )
                        })
                    }
                </Row>
            </div>
        </div>
    )
}

export default Catalog
