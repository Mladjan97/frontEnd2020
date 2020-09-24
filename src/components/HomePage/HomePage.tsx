import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { faListAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CategoryType from '../../types/CategoryType';
import { Link, Redirect } from 'react-router-dom';
import api, { ApiResponse } from '../../api/api';
import RoledMainMenu from '../RoledMainMenu/RoledMainMenu';
import ApiCategoryDto from '../../dtos/ApiCategoryDto';


interface HomePageState {
  isAdministratorLoggedIn: boolean;
  categories: CategoryType[];
}

class HomePage extends React.Component {
  state: HomePageState;

  constructor(props: Readonly<{}>) {
   super(props);
    
   this.state = {
    isAdministratorLoggedIn: true,
     categories: [],
   };
  }

  componentWillMount() {
    this.getCategories();
  }

  private setLogginState(isLoggedIn: boolean) {
    this.setState(Object.assign(this.state, {
        isAdministratorLoggedIn: isLoggedIn,
    }));
  }

  private getCategories() {
    api('visitor/category/', 'get', {})
    .then( (res: ApiResponse) => {
      if (res.status === "error" || res.status === "login") {
        this.setLogginState(false);
        return;
      }
      this.putCategoriesInState(res.data);
    });
  }

   private putCategoriesInState(data: ApiCategoryDto[]) {
     const categories: CategoryType[] = data.map(category => {
      return {
        categoryId: category.categoryId,
        name: category.name,
        items: [],
      };
     });

     const newState = Object.assign(this.state, {
       categories: categories,
     });

     this.setState(newState);
   }

    render() {
      if(this.state.isAdministratorLoggedIn === false) {
        return(
          <Redirect to="/administrator/login" />
        );
      }

    return (
      <Container>
        <RoledMainMenu role="visitor" />
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <FontAwesomeIcon icon={ faListAlt } /> Categories
                        </Card.Title>
                      <Row>
                        { this.state.categories.map(this.singleCategory) }
                      </Row>
                    </Card.Body>
                </Card>
            </Container>
    );
  }

  private singleCategory(category: CategoryType) {
    return(
      <Col lg="3" md="4" sm="6" xs="12">
        <Card className="mb-3">
          <Card.Body>
          <Card.Title as="p">
            { category.name }
          </Card.Title>
            <Link to={ `/category/${ category.categoryId }` }
            className="btn btn-primary btn-block btn-sm">
              Open category
            </Link>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}

export default HomePage;
