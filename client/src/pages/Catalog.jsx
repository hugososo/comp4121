import classes from '../components/Catalog.module.css';
import {Button, Col, Dropdown, DropdownButton, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSliders} from "@fortawesome/free-solid-svg-icons";

import CatalogCard from "../components/CatalogCard.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import {useEffect, useState} from "react";
import config from "../config/config.js";

function Catalog() {
    const [products, setProducts] = useState([]);
    const [sortMethod, setSortMethod] = useState("Default");
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const getProducts = async () => {
            await fetch(config.development.catalogEndpoint, {
                method: "GET",
            }).then(async (res) => {
                const catalog = await res.json();
                console.log(catalog);

                // populate the catalog page with the products
                setProducts(catalog);
                setIsLoaded(true);
                document.title = "Catalog | MyPhoneCase";
            });
        }
        getProducts()
            .then(r => console.log("Catalog page loaded"))
            .catch(err => console.log(err));
    }, []);

    const sortProducts = (method) => {
        switch (method) {
            case 'Featured':
                products.sort((a, b) => b.isPromoted - a.isPromoted);
                break;
            case 'Best Seller':
                products.sort((a, b) => b.Stock - a.Stock);
                break;
            case 'Name - A-Z':
                products.sort((a, b) => a.productName.localeCompare(b.productName));
                break;
            case 'Name - Z-A':
                products.sort((a, b) => b.productName.localeCompare(a.productName));
                break;
            case 'Price - Low to High':
                products.sort((a, b) => a.Price - b.Price);
                break;
            case 'Price - High to Low':
                products.sort((a, b) => b.Price - a.Price);
                break;
            case 'Default':
                products.sort((a, b) => a.productID - b.productID);
                break;
            default:
                break;
        }
        setSortMethod(method);
    };

    return (
        <div className={classes.catalog}>
            {!isLoaded ? <LoadingSpinner/> : null}
            <div id='catalogContainer' hidden={!isLoaded}>
                <h1>Product Catalog</h1>
                <div className={classes.filterBarContainer}>
                    <Row>
                        <Col className='col-9'>
                            <div className={classes.filterButton}>
                                <FontAwesomeIcon icon={faSliders} className={classes.FAIcon}/>
                                <span className={classes.filterText}>Filter</span>
                            </div>
                        </Col>
                        <Col className='align-content-end'>
                        <span id='dropdownContainer' className={classes.dropdownContainer}>
                            <DropdownButton key='outline-light' variant='outline-light' title={`Sort By: ${sortMethod}`}
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
                                {products.length} Products
                            </Button>
                        </Col>
                    </Row>
                </div>

                <Row className={classes.productContainerRow}>
                    {
                        products?.map((product, idx) => {
                            return (
                                <Col className='col-4' key={idx}>
                                    <CatalogCard
                                        image={product.img_url_path}
                                        name={product.productName}
                                        isDiscounted={product.is_Discounted}
                                        price={product.Price}
                                        discountRate={product.discount_rate}
                                        urlID={product.productID}
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
