import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBars,
	faSearch,
	faShoppingCart,
	faAppleAlt,
	faChevronRight,
	faAngleLeft,
	faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

import urljoin from "url-join";
import styles from "./App.module.css";
import "./global.css";
import logo from "./logo.svg";

import ResultItem from "./components/ResultItem";

class App extends Component {
	timer = null;

	constructor(props) {
		super(props);
		this.state = {
			search: "",
			page: 0,
			pageCount: 0,
			data: [],
			showResults: false,
		};
	}

	getData = () => {
		const { search, page } = this.state;
		if (
			search.length === 0 ||
			(search.length <= 3 && Number.isNaN(Number(search)))
		) {
			this.setState({
				showResults: false,
			});
			return;
		}

		console.log("REACT_APP_BACKEND_URL", process.env.REACT_APP_BACKEND_URL);
		axios
			.get(urljoin(process.env.REACT_APP_BACKEND_URL, "search"), {
				params: {
					term: search,
					page,
				},
			})
			.then((response) => {
				this.setState({
					data: response.data.results,
					pageCount: response.data.pages,
					showResults: true,
				});
			})
			.catch((err) => {
				console.error(err);
				alert("Hubo un problema al procesar la solicitud");
			});
	};

	handleChange = (event) => {
		const { value } = event.target;
		this.setState({ search: value }, () => {
			// Para evitar request mientras escribe
			clearTimeout(this.timer);
			this.timer = setTimeout(this.getData, 300);
		});
	};

	// Gestor del paginado
	handlePageClick = (data) => {
		this.setState(
			{
				page: data.selected,
			},
			this.getData
		);
	};

	render() {
		const searchResults = [];
		const { data, search, showResults, pageCount } = this.state;
		data.forEach((element) => {
			searchResults.push(
				<li className="col-sm-4" key={element.id}>
					<ResultItem
						brand={element.brand}
						description={element.description}
						image={element.image}
						price={element.price}
						finalPrice={element.finalPrice}
					/>
				</li>
			);
		});
		return (
			<>
				<div>
					<section className={styles.beforeHeader}>
						<Container>
							Servicio al cliente de lider.cl: WhatsApp{" "}
							<a
								target="_blank"
								rel="noopener noreferrer"
								href="https://wa.me/56957211492"
							>
								+ 56957211492
							</a>{" "}
							| Horario: de lunes a viernes de 8:00 a 22:00 y
							sábado, domingos y festivos de 9:00 a 22:00
						</Container>
					</section>
					<header className={styles.Header}>
						<Container className="d-flex">
							<a href="/">
								<img src={logo} height="50" alt="Lider" />
							</a>
							<Row className="align-items-center">
								<Col xs="auto">
									<div className={styles.categories}>
										<FontAwesomeIcon
											icon={faBars}
											className={styles.mr10}
										/>
										Categorías
									</div>
								</Col>
								<Col xs="auto">
									<div className={styles.searchBar}>
										<FontAwesomeIcon icon={faSearch} />
										<input
											placeholder="¿Qué estás buscando?"
											onChange={this.handleChange}
											value={search}
										/>
									</div>
								</Col>
								<Col xs="auto">
									<div className={styles.cart}>
										<FontAwesomeIcon
											icon={faShoppingCart}
											className={styles.supermarketIcon}
										/>
										<div className={styles.quantity}>0</div>
									</div>
								</Col>
								<Col xs="auto">
									<div className={styles.btnSupermarket}>
										<FontAwesomeIcon
											icon={faAppleAlt}
											className={styles.mr10}
										/>
										Supermercado
									</div>
								</Col>
							</Row>
						</Container>
					</header>
					<section className={styles.content}>
						<Container>
							{!showResults ? (
								<p className={styles.buscar}>
									Ingresa al menos 4 letras o un código de
									producto para buscar
								</p>
							) : (
								<>
									<h2 className={styles.searchTitle}>
										Resultados para{" "}
										<strong>{search}:</strong>
									</h2>
									{data.length === 0 ? (
										<p className={styles.buscar}>
											Sin resultados para la búsqueda
										</p>
									) : (
										<>
											<ul
												className={styles.results}
												id="results"
											>
												{searchResults}
											</ul>
											<div id="paginado">
												<ReactPaginate
													previousLabel={
														<FontAwesomeIcon
															icon={faAngleLeft}
														/>
													}
													nextLabel={
														<FontAwesomeIcon
															icon={faAngleRight}
														/>
													}
													breakLabel="..."
													breakClassName="break-me"
													pageCount={pageCount}
													marginPagesDisplayed={2}
													pageRangeDisplayed={5}
													onPageChange={
														this.handlePageClick
													}
													containerClassName={
														styles.pagination
													}
													containerId
													subContainerClassName="pages pagination"
													activeClassName={
														styles.current
													}
												/>
											</div>
										</>
									)}
								</>
							)}
						</Container>
					</section>
				</div>
				<Container>
					<footer>
						<a href="/" className={styles.linkFooter}>
							Ver información legal
							<FontAwesomeIcon icon={faChevronRight} />
						</a>
					</footer>
				</Container>
			</>
		);
	}
}

export default App;
