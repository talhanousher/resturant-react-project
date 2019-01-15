import React from 'react';
import Moment from 'react-moment';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';
const RenderDish = (props) => {
    return (
        <Card>
            <CardImg top src={props.dish.image} alt={props.dish.name} />
            <CardBody>
                <CardTitle>{props.dish.name}</CardTitle>
                <CardText>{props.dish.description}</CardText>
            </CardBody>
        </Card>
    );
}

const RenderComments = (props) => {
    return (
        <div>
            <h1>Comments</h1>
            <ul className='list-unstyled'>
                {props.comments !== null ? props.comments : <div></div>}
            </ul>
        </div>
    );
}

const DishDetail = (props) => {
    console.log('Dish Detail : ', props.dish)
    let comments;
    if (props.dish) {
        comments = props.dish.comments.map((comment, index) => {
            return (
                <div key={index}>
                    <p>{comment.comment}</p>
                    <p>--{comment.author} <Moment format="YYYY/MM/DD">{comment.date}</Moment></p>
                </div>
            )
        })
    }

    if (props.dish != null) {
        return (
            <div className='row'>
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={comments} />
                </div>
            </div>
        );
    } else {
        return <div></div>
    }
}


export default DishDetail;