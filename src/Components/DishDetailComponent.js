import React, { Component } from 'react';
import Moment from 'react-moment';
import { Card, CardImg, CardBody, CardTitle, CardText, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../Shared/baseURL';
// import CommentForm from './CommentFormComponent';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        console.log('Values : ', values);
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return (
            <div className='container'>
                <ModalHeader>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <div>
                            <Label htmlFor="ratings">Rating</Label>
                            <Row>
                                <Col>
                                    <Control.select model=".rating" id="ratings" name="ratings"
                                        placeholder="Rating"
                                        className="form-control"
                                        defaultValue="1"
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Label htmlFor="name">Your Name</Label>
                            <Row>
                                <Col>
                                    <Control.text model=".author" id="authorname" name="authorname"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />

                                </Col>
                            </Row>
                            <Label htmlFor="feedback">Your Feedback</Label>
                            <Row>
                                <Col>
                                    <Control.textarea model=".comment" id="feedback" name="feedback"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row>
                                <Col >
                                    <Button type="submit" color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </div>
                    </LocalForm>
                </ModalBody>
            </div>
        );
    }
}

const RenderDish = (props) => {
    return (
        <Card>
            <CardImg top src={baseUrl + props.dish.image} alt={props.dish.name} />
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

class DishDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render() {
        if (this.props.dish != null) {
            return (
                <div className="container" >
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{this.props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={this.props.dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComments comments={this.props.comments} addComment={this.props.addComment}
                                dishId={this.props.dish.id} />
                            <Button outline onClick={this.toggleModal}><span className="fa fa-edit fa-lg"></span> Submit Comment</Button>
                        </div>
                    </div>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <CommentForm dishId={this.props.dish.id} addComment={this.props.addComment} ></CommentForm>
                    </Modal>
                </div>
            );
        } else {
            if (this.props.isLoading) {
                return (
                    <div className="container">
                        <div className="row">
                            <Loading />
                        </div>
                    </div>
                );
            } else {
                if (this.props.err) {
                    return (
                        <div className="container">
                            <div className="row">
                                <h4>{this.props.err}</h4>
                            </div>
                        </div>
                    );
                }
            }
        }
    }
}


export default DishDetail;