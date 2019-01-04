import React, { Component }from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle,
    Breadcrumb, BreadcrumbItem, Label, Col, Row ,
    Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, Form, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

//validators
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

/**
 * To render dishes
 * @param dish
 * @returns {XML}
 * @constructor
 */
const RenderDish = ({dish}) => {
    if (dish) {
        return(
            <div className="col-12 col-md-5 m-2">
                <FadeTransform
                    in
                    transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                    <Card>
                        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
            </div>
        );
    } else {
        return(
            <div></div>
        );
    }
};

/**
 * To render comments
 * @param comments
 * @returns {XML}
 * @constructor
 */
const RenderComments = ({comments, postComment, dishId}) => {
    if (comments) {
            const comment = comments.map((obj) => {
                return (
                    <Stagger in>
                        <div key={obj.id}>
                            <Fade in>
                                <li> {obj.comment} </li>
                                <br />
                                <li>-- {obj.author} , {new Intl.DateTimeFormat('en-US', {year:'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(obj.date)))} </li>
                                <br />
                            </Fade>
                        </div>
                    </Stagger>
                );
            });

        return(
            <div className="col-12 col-md-5 m-2">
                <h4>Comments</h4>
                <ul className = "list-unstyled">
                    {comment}
                    <li> <CommentForm dishId = { dishId } postComment = { postComment } /> </li>
                </ul>
            </div>
        );
    } else {
        return(
            <div></div>
        );
    }
};

/**
 * Function for dishdetails
 * @param props
 * @returns {XML}
 * @constructor
 */
const DishDetail = (props) => {

    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {
        return(
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
                <div className="row col-12">
                    <RenderDish dish = {props.dish} />
                    <RenderComments comments = {props.comment}
                                    postComment = {props.postComment}
                                    dishId = {props.dish.id}
                    />
                </div>
            </div>
        );
    }
};

/**
 * Comment Form Component
 */
class CommentForm extends Component {

    /**
     * CommentForm's Constructor
     * @param props
     */
    constructor(props) {
        super(props);
        this.state = {
            isCommentModalOpen: false
        };
        this.toggleCommentModal = this.toggleCommentModal.bind(this);
        this.submitComment = this.submitComment.bind(this);
    };

    /**
     * Function for toggling comment modal
     */
    toggleCommentModal = () => {
        this.setState({
            isCommentModalOpen: !this.state.isCommentModalOpen
        });
    };

    /**
     * Function to handle Submit Comments
     * @param values
     */
    submitComment = (values) => {
        console.log('Current State is: ' + JSON.stringify(values));
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    };

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleCommentModal}>
                    <span className="fa fa-pencil fa-lg">
                        Submit Comment
                    </span>
                </Button>

                <Modal isOpen={this.state.isCommentModalOpen}
                       toggle={this.toggleCommentModal}>

                    <ModalHeader toggle={this.toggleCommentModal}>
                        Submit Comment
                    </ModalHeader>

                    <ModalBody>
                        <div className="col-12">
                            <Form model="feedback" onSubmit={(values) => this.submitComment(values)}>

                                <Row className="form-group">
                                    <Label htmlFor="rating" md={12}>
                                        Rating
                                    </Label>
                                    <Col md={12}>
                                        <Control.select
                                            model=".rating"
                                            name="rating"
                                            id="rating"
                                            className="form-control">

                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </Control.select>
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Label htmlFor="author" md={12}>
                                        Your Name
                                    </Label>
                                    <Col md={12}>
                                        <Control.text
                                            model=".author"
                                            name="author"
                                            id="author"
                                            placeholder="Your Name"
                                            className="form-control"
                                            validators={{
                                                required,
                                                minLength : minLength(3),
                                                maxLength : maxLength(15)
                                            }}

                                        />
                                        <Errors
                                            model=".author"
                                            className="text-danger"
                                            show="touched"
                                            messages={{
                                                required : 'Required',
                                                minLength : 'Must be greater than 2 characters',
                                                maxLength : 'Must be 15 characters or less'
                                            }}
                                        />
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Label htmlFor="comment" md={12}>
                                        Comment
                                    </Label>
                                    <Col md={12}>
                                        <Control.textarea
                                            model=".comment"
                                            name="comment"
                                            id="comment"
                                            rows="6"
                                            className="form-control"/>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={12}>
                                        <Button type="submit" color="primary">
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        );
    };
}

export default DishDetail;