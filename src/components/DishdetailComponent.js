import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';

/**
 * DishDetail class
 */
class DishDetail extends Component {

    constructor(props) {
        super(props);
    }

    /**
     * Render Dishes
     * @param dish
     * @returns {XML}
     */
    renderDish = (dish) => {
        if (dish !== null) {
            return(
                <div className="col-12 col-md-5 m-2">
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        } else {
            return(
                <div></div>
            );
        }
    };

    /**
     * Render Comments
     * @param dish
     * @returns {XML}
     */
    renderComments = (dish) => {
        if (dish !== null) {
            if (dish.comments) {
                const comments = dish.comments.map((obj) => {
                    return (
                        <div key={obj.id}>
                            <li> {obj.comment} </li>
                            <br />
                            <li>-- {obj.author} , {obj.date} </li>
                            <br />
                        </div>
                    );
                });
                return(
                    <div className="col-12 col-md-5 m-2">
                        <h4>Comments</h4>
                        <ul className = "list-unstyled">
                            {comments}
                        </ul>
                    </div>
                );
            } else {
                return(
                    <div></div>
                );
            }
        } else {
            return(
                <div>

                </div>
            );
        }
    };

    render() {
        return(
            <div className="row col-12">
                {this.renderDish(this.props.selectedDish)}
                {this.renderComments(this.props.selectedDish)}
            </div>
        )
    }
}

export default DishDetail;