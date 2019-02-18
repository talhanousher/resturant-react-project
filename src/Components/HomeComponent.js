import React from 'react';
import { FadeTransform } from 'react-animation-components';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../Shared/baseURL';

function RenderCard(props) {
    console.log('Error : ', props);
    if (props.isLoading) {
        return (
            <Loading />
        );
    } else {
        if (props.errMess) {
            return (
                <h4>{props.errMess}</h4>
            );
        } else {
            // console.log(baseUrl + item.image);
            return (
                <FadeTransform
                    in
                    transformProps={{
                        exitTransform: 'scale(0.5) translateY(-50%)'
                    }}>
                    <Card>
                        <CardImg src={baseUrl + props.item.image} alt={props.item.name} />
                        <CardBody>
                            <CardTitle>{props.item.name}</CardTitle>
                            {props.item.designation ? <CardSubtitle>{props.item.designation}</CardSubtitle> : null}
                            <CardText>{props.item.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
            );
        }
    }
}

function Home(props) {
    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish} isLoading={props.dishesLoading} errMess={props.dishesErr} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion} isLoading={props.promosLoading} errMess={props.promosErr} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader} />
                </div>
            </div>
        </div>
    );
}

export default Home;   