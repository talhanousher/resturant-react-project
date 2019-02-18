import React, { Component } from 'react';
import Moment from 'react-moment';
import { Card, CardImg, CardBody, CardTitle, CardText, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../Shared/baseURL';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
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
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
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
        <FadeTransform
            in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
            <Card>
                <CardImg top src={baseUrl + props.dish.image} alt={props.dish.name} />
                <CardBody>
                    <CardTitle>{props.dish.name}</CardTitle>
                    <CardText>{props.dish.description}</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
    );
}

const RenderComments = (props) => {
    console.log(props.comments);
    if (props.comments) {
        return (<Stagger in>
            {props.comments.map((comment) => {
                return (
                    <Fade in>
                        <div key={comment.id}>
                            <p>{comment.comment}</p>
                            <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
                        </div>
                    </Fade>
                );
            })}
        </Stagger>)
    } else {
        return <div></div>
    }
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
                            <RenderComments comments={this.props.comments} postComment={this.props.postComment}
                                dishId={this.props.dish.id} />
                            <Button outline onClick={this.toggleModal}><span className="fa fa-edit fa-lg"></span> Submit Comment</Button>
                        </div>
                    </div>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <CommentForm dishId={this.props.dish.id} postComment={this.props.postComment} ></CommentForm>
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
                if (this.props.errMess) {
                    return (
                        <div className="container">
                            <div className="row">
                                <h4>{this.props.errMess}</h4>
                            </div>
                        </div>
                    );
                }
            }
        }
    }
}


export default DishDetail;