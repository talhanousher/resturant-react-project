import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';


const RenderMenuItems = (props) => {
    console.log(props);
    return (
        <Card onClick={() => props.onClick(props.dish.id)}>
            <CardImg width="100%" src={props.dish.image} alt={props.dish.name} />
            <CardImgOverlay>
                <CardTitle>{props.dish.name}</CardTitle>
            </CardImgOverlay>
        </Card>
    );
}

const Menu = (props) => {
    console.log(props);
    const menu = props.dishes.map((dish, index) => {
        return (
            <div key={index} className="col-12 col-md-5 m-1">
                <RenderMenuItems dish={dish} onClick={props.onClick} />
            </div>
        );
    });
    console.log(menu);
    return (
        <div className='container'>
            <div className="row">
                {menu}
            </div>
        </div>
    );

};

export default Menu;