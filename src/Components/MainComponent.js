import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Menu from './MenuComponent';

import { DISHES } from '../Shared/dishes';
import { COMMENTS } from '../Shared/comments';
import { PROMOTIONS } from '../Shared/promotions';
import { LEADERS } from '../Shared/leaders';
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
            dishes: DISHES,
            comments: COMMENTS,
            promotions: PROMOTIONS,
            leaders: LEADERS,
        }
    }
    render() {
        const HomePage = () => {
            return (
                <Home
                    dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                    promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.state.leaders.filter((leader) => leader.featured)[0]}
                />
            );
        }

        const DishWithId = (props) => {
            return (<DishDetail
                dish={this.state.dishes.filter((dish) => dish.id === parseInt(props.match.params.dishId, 10))[0]}
                comments={this.state.comments.filter((comment) => comment.dishId === parseInt(props.match.params.dishId, 10))}
            ></DishDetail>)
        }

        return (
            <div>
                <Header></Header>
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/menu' component={() => <Menu dishes={this.state.dishes} />} />
                    <Route path='/menu/:dishId' component={DishWithId} />
                    <Route exact path='/contactus' component={Contact} />
                    <Route exact path='/aboutus' component={() => <About leaders={this.state.leaders} />} />
                    <Redirect to='/home' />
                </Switch>
                <Footer></Footer>
            </div>
        );
    }
}

export default Main;