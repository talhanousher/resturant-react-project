import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, CardBody, CardText } from 'reactstrap';

import DishDetail from './DishDetailComponent';
class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDish: null
        }
        console.log('Constructor');
    }

    onDishSelect(dish) {
        this.setState({ selectedDish: dish });
    }
    renderDish(dish) {
        if (dish != null)
            return (
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return (
                <div></div>
            );
    }

    componentDidMount() {
        console.log('Component Did Mount');
    }
    render() {
        console.log('Render');
        const menu = this.props.dishes.map((dish, index) => {
            return (
                <div key={index} className="col-12 col-md-5 m-1">
                    <Card onClick={() => this.onDishSelect(dish)}>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });
        console.log(menu);
        return (
            <div className='container'>
                <div className="row">
                    {menu}
                </div>

                <DishDetail selectedDish={this.state.selectedDish}></DishDetail>
                {/* <div className="col-12 col-md-5 m-1">
                        {this.renderDish(this.state.selectedDish)}
                    </div> */}
            </div>
        );
    }
}


export default Menu;