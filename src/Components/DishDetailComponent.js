import React from 'react';
import Moment from 'react-moment';
import { Card, CardImg, CardBody, CardTitle, CardText, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

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
    console.log(props.comments);
    return props.comments.map((comment, index) => {
        return (
            <div key={index}>
                <ul className='list-unstyled'>
                    <div>
                        <p>{comment.comment}</p>
                        <p>--{comment.author} <Moment format='YYYY/MM/DD'>{comment.date}</Moment></p>
                    </div>
                </ul>
            </div>
        );
    });
}

const DishDetail = (props) => {
    // console.log('Dish Detail : ', props.dish)
    // let comments;
    // if (props.dish) {
    //     comments = props.dish.comments.map((comment, index) => {
    //         return (
    //             <div key={index}>
    //                 <p>{comment.comment}</p>
    //                 <p>--{comment.author} <Moment format="YYYY/MM/DD">{comment.date}</Moment></p>
    //             </div>
    //         )
    //     })
    // }

    // if (props.dish != null) {
    //     return (
    //         <div className='row'>
    //             <div className="col-12 col-md-5 m-1">
    //                 <RenderDish dish={props.dish} />
    //             </div>
    //             <div className="col-12 col-md-5 m-1">
    //                 <RenderComments comments={comments} />
    //             </div>
    //         </div>
    //     );
    // } else {
    //     return <div></div>
    // }
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments} />
                </div>
            </div>
        </div>
    );
}


export default DishDetail;