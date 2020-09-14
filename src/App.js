import React, { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css';


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSearch, faShoppingCart, faAppleAlt, faChevronRight ,faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons'

import styles from './App.module.css';
import './global.css';
import logo from './logo.svg';

import ResultItem from "./components/ResultItem";




 class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "abba"
    }
  }
  render() {

    return (
      <>
        <div>
        <section className={styles.PreHeader}>
          <Container>
          Servicio al cliente de lider.cl: WhatsApp <a target="_blank" rel="noopener noreferrer"  href="https://wa.me/56957211492">+ 56957211492</a> | Horario: de luens a viernes de 8:00 a 22:00 y sábado, domingos y festivos de 9:00 a 22:00
          </Container>
        </section>
        <header className={styles.Header}>
          <Container className="d-flex">
             <a href="/"><img src={logo} height="50" alt="Lider" /></a>
            <Row className="align-items-center">
             
              <Col xs="auto">
                  <div className={styles.categorias}>
                  <FontAwesomeIcon icon={faBars} className={styles.mr10} />
                  Categorías
                </div>
              </Col>
              <Col  xs="auto">
                  <div className={styles.searchBar}>
                    <FontAwesomeIcon icon={faSearch} />
                    <input placeholder="¿Qué estás buscando?" value={this.state.search} />
                  </div>
              </Col>
              <Col  xs="auto">
                <div className={styles.carro}>
                  <FontAwesomeIcon icon={faShoppingCart}  className={styles.iconoSupermercado } />
                  <div className={styles.quantity}>0</div>
                </div>
              </Col>
              <Col  xs="auto">
               <div className={styles.btnSupermarket}>
                  <FontAwesomeIcon icon={faAppleAlt} className={styles.mr10}  />
                  Supermercado
                </div>
              </Col>
            </Row>
          </Container>
        </header>
        <section className={styles.content}>
          <Container>
          {this.state.search === "" ? <p className={styles.buscar}> Ingresa un texto o código de producto para buscar </p> :
          
            <>
              <h2 className={styles.searchTitle}>Resultados para <strong>{this.state.search}:</strong></h2>
              <ul className={styles.results}>
                <li className="col-sm-4">
                 
                    <ResultItem brand="tzi xwakjgu"
                    description="zymart xqisc"
                    image="https://www.lider.cl/catalogo/images/tvIcon.svg"
                    price={10756}
                    promoDiscount={0} />
                </li>
                <li className="col-sm-4">
                    <ResultItem brand="tzi xwakjgu"
                    description="zymart xqisc"
                    image="https://www.lider.cl/catalogo/images/tvIcon.svg"
                    price={10756}
                    promoDiscount={50} />
                </li>
                <li className="col-sm-4">
                    <ResultItem brand="tzi xwakjgu"
                    description="zymart xqisc"
                    image="https://www.lider.cl/catalogo/images/tvIcon.svg"
                    price={10756}
                    promoDiscount={0} />
                </li>
                <li className="col-sm-4">
                    <ResultItem brand="tzi xwakjgu"
                    description="zymart xqisc"
                    image="https://www.lider.cl/catalogo/images/tvIcon.svg"
                    price={10756}
                    promoDiscount={50} />
                </li>
                <li className="col-sm-4">
                 
                    <ResultItem brand="tzi xwakjgu"
                    description="zymart xqisc"
                    image="https://www.lider.cl/catalogo/images/tvIcon.svg"
                    price={10756}
                    promoDiscount={0} />
                </li>
                <li className="col-sm-4">
                    <ResultItem brand="tzi xwakjgu"
                    description="zymart xqisc"
                    image="https://www.lider.cl/catalogo/images/tvIcon.svg"
                    price={10756}
                    promoDiscount={50} />
                </li>
              </ul>
            </>
            }
        
            <div className={styles.paginado}>
                
                <ul>
                  <li><FontAwesomeIcon icon={faAngleLeft}  /></li>
                  <li className={styles.current}>1</li>
                  <li><FontAwesomeIcon icon={faAngleRight}  /></li>
                </ul>
                
            </div>
          </Container>
        </section>
        </div>
        <Container>
          <footer>
            <a href="/" className={styles.linkFooter}>
              Ver información legal
              <FontAwesomeIcon icon={faChevronRight}  />
            </a>
          </footer>
        </Container>
        </>
    );
    }
}

export default App;
