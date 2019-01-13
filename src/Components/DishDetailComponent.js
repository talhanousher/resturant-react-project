import React, { Component } from 'react';
import Moment from 'react-moment';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';
class DishDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        console.log('Dish Detail : ', this.props.selectedDish)
        let comments;
        if (this.props.selectedDish) {
            comments = this.props.selectedDish.comments.map((comment, index) => {
                return (
                    <div key={index}>
                        <p>{comment.comment}</p>
                        <p>--{comment.author} <Moment format="YYYY/MM/DD">{comment.date}</Moment></p>
                    </div>
                )
            })
        }

        if (this.props.selectedDish != null) {
            return (
                <div className='row'>
                    <div className="col-12 col-md-5 m-1">
                        <Card>
                            <CardImg top src={this.props.selectedDish.image} alt={this.props.selectedDish.name} />
                            <CardBody>
                                <CardTitle>{this.props.selectedDish.name}</CardTitle>
                                <CardText>{this.props.selectedDish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h1>Comments</h1>
                        <ul className='list-unstyled'>
                            {comments !== null ? comments : <div></div>}
                        </ul>
                    </div>
                </div>
            );
        } else {
            return <div></div>
        }
    }
}

export default DishDetail;