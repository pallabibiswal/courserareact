import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle,
    Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';

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

const RenderComments = ({comments}) => {
    if (comments) {
        const comment = comments.map((obj) => {
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
                    {comment}
                    <li> <CommentForm /> </li>
                </ul>
            </div>
        );
    } else {
        return(
            <div></div>
        );
    }
};
const DishDetail = (props) => {
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
                <RenderComments comments = {props.comment} />
            </div>
        </div>
    )
};

export default DishDetail;