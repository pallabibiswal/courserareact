import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle} from 'reactstrap';

const RenderDish = ({dish}) => {
    if (dish) {
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

const RenderComments = ({dish}) => {
    if (dish) {
        if (dish.comments) {
            const comments = dish.comments.map((obj) => {
                return (
                    <div key={obj.id}>
                        <li> {obj.comment} </li>
                        <br />
                        <li>-- {obj.author} , {new Intl.DateTimeFormat('en-US', {year:'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(obj.date)))} </li>
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
            <div></div>
        );
    }
};
const DishDetail = (props) => {
    return(
        <div className="row col-12">
            <RenderDish dish = {props.dish} />
            <RenderComments dish = {props.dish} />
        </div>
    )
};

export default DishDetail;