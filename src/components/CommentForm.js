import React, { Component } from 'react';
import { Label, Col, Row , Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';

//validators
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

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
        alert('Current State is: ' + JSON.stringify(values));
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
                            <LocalForm onSubmit={(values) => this.submitComment(values)}>

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
                            </LocalForm>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        );
    };
}

export default CommentForm;