import PropTypes from "prop-types";
import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruck, faWarehouse} from '@fortawesome/free-solid-svg-icons'

import Image from 'react-bootstrap/Image';


import styles from "./ResultItem.module.css";


// https://stackoverflow.com/a/42992653
function formatter (n) {
  const precio =  n.toFixed(2).replace('.', ',').replace(/\d{3}(?=(\d{3})*,)/g, function (s) {
    return '.' + s
  });
  return precio.replace(",00","");
}

export default class ResultItem extends Component {
    render() {
        const {image, description, price, promoDiscount, brand} = this.props;
        return (
            <article className={styles.ResultItem}>
                <Image fluid  src={image} alt={`${brand} - ${description} `} />
                <div className={styles.detalles}>
                    <h3>{brand}</h3> <span>{description}</span>
                </div>
                <div className={styles.precio}>
                    {promoDiscount  !== 0 ?
                    <>
                        <div className={styles.currentPrice}>
                            <strong>$ {formatter(price * ((100-promoDiscount) /100) )}</strong> <div className={styles.descuento}>{promoDiscount}  %</div>
                        </div>
                        <div className={styles.oldPrice}>
                            $ {formatter(price)}
                        </div>
                    </> :
                     <div className={styles.currentPrice}>
                            <strong>$ {formatter(price)}</strong> 
                        </div>
                    }
                </div>
                <ul className={styles.tags}>
                    <li className={styles.despacho}>
                        <FontAwesomeIcon icon={faTruck} /> despacho
                    </li>
                    <li className={styles.retiro}>
                        <FontAwesomeIcon icon={faWarehouse} /> retiro
                    </li>
                </ul>
                <div className={styles.purchase}>
                    <button className={styles.botonAgregar}>Agregar</button>
                </div>
            </article>
        )
    }
}

ResultItem.propTypes = {
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  promoDiscount: PropTypes.number.isRequired
}
