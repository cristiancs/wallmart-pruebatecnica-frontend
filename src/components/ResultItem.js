import PropTypes from "prop-types";
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faWarehouse } from "@fortawesome/free-solid-svg-icons";

import Image from "react-bootstrap/Image";

import styles from "./ResultItem.module.css";

import currencyFormater from "../helpers/currencyFormater";

export default function ResultItem (props) {
	const { image, description, price, finalPrice, brand } = props;
	return (
		<article data-testid="result-item" className={styles.ResultItem}>
			<Image
				fluid
				src={image.startsWith("http") ? image : `https://${  image}`}
				alt={`${brand} - ${description} `}
			/>
			<div className={styles.details}>
				<h3>{brand}</h3> <span>{description}</span>
			</div>
			<div className={styles.precio}>
				{price !== finalPrice ? (
					<>
						<div
							data-testid="discounted-price"
							className={styles.currentPrice}
						>
							<strong>
								$ {currencyFormater(finalPrice)}
							</strong>{" "}
							<div className={styles.discount}>50 %</div>
						</div>
						<div className={styles.oldPrice}>
							$ {currencyFormater(price)}
						</div>
					</>
				) : (
					<div
						data-testid="full-price"
						className={styles.currentPrice}
					>
						<strong>$ {currencyFormater(price)}</strong>
					</div>
				)}
			</div>
			<ul className={styles.tags}>
				<li className={styles.shipment}>
					<FontAwesomeIcon icon={faTruck} /> despacho
				</li>
				<li className={styles.pickup}>
					<FontAwesomeIcon icon={faWarehouse} /> retiro
				</li>
			</ul>
			<div className={styles.purchase}>
				<button type="button" className={styles.addButton}>Agregar</button>
			</div>
		</article>
	);
}

ResultItem.propTypes = {
	description: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	brand: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	finalPrice: PropTypes.number.isRequired,
};
