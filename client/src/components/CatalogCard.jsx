import classes from "./CatalogCard.module.css";
import {Link} from "react-router-dom";

function CatalogCard (props) {
    return (
        <Link to={'/Product?id=' + props.urlID} className={classes.productContainer}>
            <div className={classes.product}>
                <div className={classes.productImageContainer}>
                    {/* Placeholder of product image, to be replaced with the actual image*/}
                    <img src="https://picsum.photos/1080/1920" alt="product"/>
                </div>
                <div className={classes.productInfo}>
                    <div className={classes.productName}>{props.name}</div>
                    <span className={classes.productPrice}>HK$ {props.price}</span>
                    <span className={classes.discountedPrice}>HK$ {props.discountedPrice}</span>
                </div>
            </div>
        </Link>
    )
}

export default CatalogCard
