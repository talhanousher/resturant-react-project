import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import DishDetail from './DishDetailComponent.js';
import About from './AboutUsComponent';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() {
        const HomePage = () => {
            return (
                <Home
                    dish={this.props.dishes.filter((dish) => dish.featured)[0]}
                    promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.props.leaders.filter((leader) => leader.featured)[0]}
                />
            );
        }

        const DishWithId = (props) => {
            return (<DishDetail
                dish={this.props.dishes.filter((dish) => dish.id === parseInt(props.match.params.dishId, 10))[0]}
                comments={this.props.comments.filter((comment) => comment.dishId === parseInt(props.match.params.dishId, 10))}
            ></DishDetail>)
        }

        return (
            <div>
                <Header></Header>
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
                    <Route path='/menu/:dishId' component={DishWithId} />
                    <Route exact path='/contactus' component={Contact} />
                    <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
                    <Redirect to='/home' />
                </Switch>
                <Footer></Footer>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

export default withRouter(connect(mapStateToProps)(Main));