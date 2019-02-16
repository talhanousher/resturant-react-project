import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';

import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import DishDetail from './DishDetailComponent.js';
import About from './AboutUsComponent';
import { addComment, fetchDishes, fetchComments, fetchPromos } from '../Redux/ActionCreators';

class Main extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
        }
    }
    render() {
        const HomePage = () => {
            return (
                <Home
                    dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading={this.props.dishes.isLoading}
                    dishesErr={this.props.dishes.err}
                    promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                    promosLoading={this.props.promotions.isLoading}
                    promosErr={this.props.promotions.errMess}
                    leader={this.props.leaders.filter((leader) => leader.featured)[0]}
                />
            );
        }

        const DishWithId = (props) => {
            console.log(this.props);
            return (<DishDetail
                dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(props.match.params.dishId, 10))[0]}
                isLoading={this.props.dishes.isLoading}
                err={this.props.dishes.err}
                comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(props.match.params.dishId, 10))}
                commentsErrMess={this.props.comments.errMess}
                addComment={this.props.addComment}
            ></DishDetail>)
        }

        return (
            <div>
                <Header></Header>
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
                    <Route path='/menu/:dishId' component={DishWithId} />
                    <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
                    <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
                    <Redirect to='/home' />
                </Switch>
                <Footer></Footer>
            </div>
        );
    }

    componentDidMount() {
        console.log('Component Did Mount')
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
    }
}


const mapDispatchToProps = dispatch => {
    console.log('Maps Dispatch To Props')
    return ({
        addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
        fetchDishes: () => { dispatch(fetchDishes()) },
        resetFeedbackForm: () => { dispatch(actions.reset('feedback')) },
        fetchComments: () => { dispatch(fetchComments()) },
        fetchPromos: () => { dispatch(fetchPromos()) }
    })
};

const mapStateToProps = (state) => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));