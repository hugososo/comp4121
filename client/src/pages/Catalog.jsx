import classes from '../components/Catalog.module.css';
import {Col, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSliders} from "@fortawesome/free-solid-svg-icons";

import CatalogCard from "../components/CatalogCard.jsx";

function Catalog() {
    return (
        <div className={classes.catalog}>
            <h1>Product Catalog</h1>
            <div className={classes.filterBarContainer}>
                <Row>
                    <Col className='col-3'>
                        <FontAwesomeIcon icon={faSliders} style={{color: "#e3fc02",}} className={classes.FAIcon}/>
                        <span className={classes.filterText}>Filter</span>
                    </Col>
                    <Col className='text-end col-9'>
                        <span className='viewType'> Sort By: </span>
                        <span className={classes.totalCount}>3 Items</span>
                    </Col>
                </Row>
            </div>

            <Row className={classes.productContainerRow}>
                <Col className='col-4'>
                    <CatalogCard image='' name='Name' price='100' discountedPrice='90' urlID='123'/>
                </Col>
            </Row>
        </div>
    )
}

export default Catalog
