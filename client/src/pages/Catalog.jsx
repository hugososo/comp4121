import classes from '../components/Catalog.module.css';
import {ButtonGroup, Col, DropdownButton, Row, Dropdown, Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSliders} from "@fortawesome/free-solid-svg-icons";

import CatalogCard from "../components/CatalogCard.jsx";
import {useEffect, useState} from "react";
import config from "../config/config.js";

function Catalog() {
    const [products, setProducts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect( () => {
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

    return (
        <div className={classes.catalog}>
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
                            <DropdownButton key='outline-light' variant='outline-light' title='Sort By: Default'
                                            menuVariant="dark">
                                <Dropdown.Item eventKey="1">Featured</Dropdown.Item>
                                <Dropdown.Item eventKey="2">Best Seller</Dropdown.Item>
                                <Dropdown.Item eventKey="3">Alphabetically: A-Z</Dropdown.Item>
                                <Dropdown.Item eventKey="4">Alphabetically: Z-A</Dropdown.Item>
                                <Dropdown.Item eventKey="5">Price: Low to High</Dropdown.Item>
                                <Dropdown.Item eventKey="6">Price: High to Low</Dropdown.Item>
                                <Dropdown.Divider></Dropdown.Divider>
                                <Dropdown.Item eventKey="7" active>Default</Dropdown.Item>
                            </DropdownButton>
                        </span>
                    </Col>
                    <Col className={`text-end`}>
                        <Button variant="outline-light" className={classes.totalCount} disabled>
                            Total: 3 Products
                        </Button>
                    </Col>
                </Row>
            </div>

            <Row className={classes.productContainerRow}>
                    {
                        products?.map((product, idx) => {
                            return (
                                <Col className='col-4'>
                                    <CatalogCard
                                        key={idx}
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
    )
}

export default Catalog
