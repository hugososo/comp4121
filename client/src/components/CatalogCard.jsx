import classes from "./CatalogCard.module.css";
import {Link} from "react-router-dom";

function CatalogCard(props) {
    // Countermeasure for the super accurate floating point calculation, i.e: 0.1 + 0.2 = 0.30000000000000004
    // Deal with it by rounding up to closest 1 decimal place
    const discountRate = Math.ceil((1 - props.discountRate) * 10) / 10;

    return (
        <Link to={'/Product?id=' + props.urlID} className={classes.productContainer}>
            <div className={classes.product}>
                <div className={classes.productImageContainer}>
                    <img src={props.image} alt="product"/>
                </div>
                <div className={classes.productInfo}>
                    <div className={classes.productName}>{props.name}</div>
                    {

                        props.isDiscounted && props.stock > 0 ? (
                            <>
                                <span className={classes.productPriceDiscounted}>
                                    HK$ {props.price}
                                </span>
                                <span className={classes.discountedPrice}>
                                    HK$ {props.price * discountRate}
                                </span>
                            </>
                        ) : props.stock === 0 ? (
                            <span className={classes.productPrice}>Out of Stock</span>
                        ) : (
                            <span className={classes.productPrice}>HK$ {props.price}</span>
                        )

                    }
                </div>
            </div>
        </Link>
    )
}

export default CatalogCard
