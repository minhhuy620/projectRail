import React, { useEffect, useState } from 'react';
import { db } from "../components/Firebase/firebase";
import TicketCode from '../components/user/Ticket/TicketCode';

export const LocalNews = () => {

    const [state, setState] = useState({ News: [] });

    useEffect(() => {
        db.ref("list-news").once('value', (res) => {
            const newState = [];
            res.forEach((change) => {
                newState.push({
                    idRegion: change.val().idRegion,
                    nameRegion: change.val().nameRegion,
                    title: change.val().title,
                    link: change.val().link,
                    img: change.val().img,
                    description: change.val().description
                })
            })
            setState({
                News: newState
            })
        });
    }, [])

    return (
        <>
            {localStorage.getItem('IdTicket') === null ?
                <>
                    <div className="row">
                        <div className="col-xl-12" style={{ "height": "auto", "width": "670px", "margin": "auto" }}>
                            <div className="alert alert-custom alert-white alert-shadow fade show gutter-b mx-auto" role="alert">
                                <TicketCode />
                            </div>
                            <div className="card card-custom gutter-b card-stretch">
                                <img src="./assets/images/waiting.png" alt="IMG" style={{ "background-repeat": "no-repeat", "background-size": "100% 100%" }}></img>
                            </div>
                        </div>
                    </div>
                </>
                :
                <div className="card card-custom gutter-b">
                    {
                        state.News.map(news => {
                            return (
                                <div className="card-body" key={news.nameRegion + "_" + news.link}>
                                    <div className="d-flex">

                                        <div className="flex-grow-1">
                                            <div className="d-flex align-items-center justify-content-between flex-wrap mt-2">
                                                <div className="mr-3">
                                                    <a href={news.link} className="d-flex align-items-center text-dark text-hover-primary font-size-h3 font-weight-bold mr-3">
                                                        {news.title}
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="d-flex align-items-center flex-wrap justify-content-between">
                                                <div className="flex-grow-1 font-weight-bold text-dark-50 py-2 py-lg-2 mr-5">{news.description}</div>
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0 mr-7">
                                            <div className="symbol symbol-50 symbol-lg-150">
                                                <img alt="Pic" src={news.img} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="separator separator-solid my-7" />

                                </div>
                            )
                        })
                    }
                </div>
            }
        </>
    )
}
