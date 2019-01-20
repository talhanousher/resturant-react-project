import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const RenderMenuItems = (props) => {
    console.log(props);
    return (
        <Card>
            <Link to={`/menu/${props.dish.id}`}>
                <CardImg width="100%" src={props.dish.image} alt={props.dish.name} />
                <CardImgOverlay>
                    <CardTitle>{props.dish.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}

const Menu = (props) => {
    console.log(props);
    const menu = props.dishes.map((dish, index) => {
        return (
            <div key={index} className="col-12 col-md-5 m-1">
                <RenderMenuItems dish={dish} />
            </div>
        );
    });
    console.log(menu);
    return (
        <div className='container'>
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Menu</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Menu</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                {menu}
            </div>
        </div>
    );

};

export default Menu;