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
        console.log('Dish Detail : ', this.props.dish)
        let comments;
        if (this.props.dish) {
            comments = this.props.dish.comments.map((comment, index) => {
                return (
                    <div key={index}>
                        <p>{comment.comment}</p>
                        <p>--{comment.author} <Moment format="YYYY/MM/DD">{comment.date}</Moment></p>
                    </div>
                )
            })
        }

        if (this.props.dish != null) {
            return (
                <div className='row'>
                    <div className="col-12 col-md-5 m-1">
                        <Card>
                            <CardImg top src={this.props.dish.image} alt={this.props.dish.name} />
                            <CardBody>
                                <CardTitle>{this.props.dish.name}</CardTitle>
                                <CardText>{this.props.dish.description}</CardText>
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