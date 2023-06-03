import React, {useEffect, useState} from 'react';
import AppNavbar from '../AppNavBar/AppNavbar';
import RiderService from "../../services/RiderService";
import StarRatings from 'react-star-ratings';
import './JudgePage.css';
import {Button} from "react-bootstrap";
import JudgeService from "../../services/JudgeService";


function JudgePage() {
    const starCount = 11;
    const doubleUpStarsCount = 21;

    const [content, setContent] = useState({})
    const [riderList, setRiderList] = useState([])
    const [rider, setRider] = useState({id: null, surname: "", name: "", patronymic: null})
    const [error, setError] = useState('')
    const [doubleUpClick, setDoubleUpClick] = useState(false);
    const [countJump, setCountJump] = useState([1]);

    const [rating, setRating] = useState({
        "doubleUP": 1,
        "1": 1,
    });

    useEffect(() => {
        RiderService.getRiderList()
            .then(response => {
                const riderList = response.data;
                setContent(response.data)
                // this.setState({riderList: response.data)})
                setRiderList(riderList);
                setRider(riderList[0])
            }, error => {
                setError(error.toString());
            });
    }, [])

    const handleChangeSelect = (e) => setRider(riderList.filter(el => el.id === Number(e.target.value))[0]);


    const setNewRating = (count = 0, jumpNum) => {
        const jumpRanks = [...countJump];
        if (!doubleUpClick) {
            if (jumpNum === "doubleUP") {
                jumpRanks.pop()
                setDoubleUpClick(true);
            }
            if (jumpRanks.length <= jumpNum) {
                jumpRanks.push(jumpRanks.length + 1);
                setCountJump(jumpRanks);
                setRating(prev => ({
                    ...prev,
                    [jumpNum]: count,
                    [(1+Number(jumpNum))  + ""]: 1
                }))
            }
        } else {

            setRating(prev => ({
                ...prev, [jumpNum]: count
            }))
        }
        console.log(jumpNum, count, jumpRanks, rating)
    }

    const saveRank = () => {
        const userName = JSON.parse(localStorage.user).username
        const sendObject = {
            userName, rider,
            score: Object.keys(rating).map(el => rating[el] - 1)
        }

        JudgeService.setJudgeRating(sendObject).then(res => console.log(res.data))
    }

    return (
        <div>
            <AppNavbar/>
            <div className='container-fluid'>
                {content ? (
                    <div style={{marginTop: "20px"}}>
                        <div className="alert alert-info">
                            <form className='form-inline'>
                                {riderList.length > 0 &&
                                    <fieldset>
                                        <label className='d-flex gap-3 align-items-center fs-3'>
                                            <strong>Rider:</strong>
                                            <select
                                                className='form-select custom-select form-control'
                                                onChange={(e) => handleChangeSelect(e)}
                                            >
                                                {riderList.map(rider =>
                                                    <option
                                                        className='dropdown-item'
                                                        value={rider.id}
                                                        key={rider.id}
                                                    >
                                                        {rider.surname + " " + rider.name + (rider.patronymic ? " " + rider.patronymic : "")}
                                                    </option>
                                                )}
                                            </select>
                                        </label>
                                        <div className='container-fluid mt-5'>
                                            <h3 className='fs-3'>Score the trick:</h3>
                                            {countJump.map((jumpNumber, idx) =>
                                                <div className='d-flex gap-4 mt-3 justify-content-lg-start' key={idx}>
                                                    <div className='d-flex fs-2 align-items-center'>
                                                        <span className='width'>{idx + 1 + "."}</span>
                                                        <div className='ms-2'>
                                                            <StarRatings
                                                                numberOfStars={starCount}
                                                                rating={rating[jumpNumber + ""]}
                                                                name={jumpNumber + ""}
                                                                ignoreInlineStyles={false}
                                                                changeRating={setNewRating}
                                                                starEmptyColor='#adb5bd'
                                                                starHoverColor='rgba(224, 194, 75, 1)'
                                                                starRatedColor='rgba(238, 164, 0, 1)'
                                                                starDimension="60px"
                                                                starSpacing="0px"
                                                            />
                                                            <p style={{display: "inline"}}> {rating[jumpNumber + ""] - 1} </p>
                                                            <Button variant={"danger"}>bad</Button>
                                                            <Button variant={"warning"}>nice</Button>
                                                            <Button variant={"success"}>good</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <h3 className='fs-3 mt-5 d-flex'>Double Up <pre>x</pre>2</h3>
                                            <div className='d-flex gap-4 mt-3 justify-content-lg-start'
                                                 key={"doubleUp"}>
                                                <div className='d-flex fs-2 align-items-center'>
                                                    <span className='width'>{countJump.length + 1 + "."}</span>
                                                    <div className='ms-2' style={{width: 620}}>
                                                        <StarRatings
                                                            numberOfStars={doubleUpStarsCount}
                                                            rating={rating["doubleUP"]}
                                                            name='doubleUP'
                                                            ignoreInlineStyles={false}
                                                            changeRating={setNewRating}
                                                            starEmptyColor='#adb5bd'
                                                            starHoverColor='rgba(224, 194, 75, 1)'
                                                            starRatedColor='rgba(238, 164, 0, 1)'
                                                            starDimension="80px"
                                                            starSpacing="0px"
                                                        />
                                                    </div>
                                                    <p style={{display: "inline", "marginLeft": "50px"}}
                                                       className='width'>{rating["doubleUP"] - 1}</p>
                                                    <div>
                                                        <div>
                                                            <Button variant={"danger"}>bad</Button>
                                                            <Button variant={"warning"}>nice</Button>
                                                            <Button variant={"success"}>good</Button>
                                                        </div>
                                                        <Button> No double up</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                }
                                <Button variant="primary"
                                        onClick={saveRank}>Save</Button>
                            </form>
                        </div>
                    </div>
                ) : (
                    <div style={{marginTop: "20px"}}>
                        <div className='alert alert-danger'>
                            {error}
                        </div>
                    </div>
                )
                }
            </div>
        </div>
    );
}

export default JudgePage;
