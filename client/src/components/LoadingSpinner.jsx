import classes from "./LoadingSpinner.module.css";
import {Spinner} from "react-bootstrap";

function LoadingSpinner() {
    return (
        <div className={`${classes.loadingWrapper} d-flex align-items-center justify-content-center`} id="loadingWrapper">
            <div className="row">
                <div className="col-lg-6 col-md-8 mx-auto">
                    <Spinner animation="border" role="status" className={classes.loadingSpinner}>
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            </div>
        </div>
    );
}

export default LoadingSpinner;
