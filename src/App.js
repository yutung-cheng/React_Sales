import React, { Component } from "react";
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  FormGroup,
  FormControl,
  MenuItem,
  Grid,
  Row,
  Col
} from "react-bootstrap";
import { Link, Switch, Redirect, Route, withRouter } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import Sales from "./Sales";
import Sale from "./Sale";
import NotFound from "./NotFound";
import "./App.css";

class App extends Component {
  state = {
    recentlyViewed: [],
    searchId: ""
  };

  viewedSale = id => {
    const notInArray = this.state.recentlyViewed.indexOf(id) === -1;
    if (notInArray)
      this.setState(({ recentlyViewed }) => ({
        recentlyViewed: [...recentlyViewed, id]
      }));
  };

  updateSearchId = e => this.setState({ searchId: e.target.value });

  render() {
    if (this.props.location.pathname === "/")
      return <Redirect exact push to="/Sales" />;

    return (
      <div>
        <Navbar inverse collapseOnSelect staticTop>
          <Navbar.Header>
            <LinkContainer to="/">
              <Navbar.Brand>React - Sales</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/Sales">
                <NavItem>All Sales</NavItem>
              </LinkContainer>
              <NavDropdown title="Previously Viewed" id="basic-nav-dropdown">
                {this.state.recentlyViewed.length > 0 ? (
                  this.state.recentlyViewed.map((id, index) => (
                    <LinkContainer to={`/Sale/${id}`} key={index}>
                      <MenuItem>Sale: {id}</MenuItem>
                    </LinkContainer>
                  ))
                ) : (
                  <MenuItem>...</MenuItem>
                )}
              </NavDropdown>
            </Nav>
            <Navbar.Form pullRight>
              <FormGroup>
                <FormControl
                  type="text"
                  onChange={this.updateSearchId}
                  placeholder="Sale ID"
                />
              </FormGroup>{" "}
              <Link
                className="btn btn-default"
                to={"/Sale/" + this.state.searchId}
              >
                Search
              </Link>
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>

        <Grid>
          <Row>
            <Col md={12}>
              <Switch>
                <Route exact path="/" />
                <Route path="/Sales" component={Sales} />
                <Route
                  path="/Sale/:id"
                  render={props => (
                    <Sale
                      id={props.match.params.id}
                      viewedSale={this.viewedSale}
                    />
                  )}
                />
                <Route render={() => <NotFound />} />
              </Switch>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default withRouter(App);
