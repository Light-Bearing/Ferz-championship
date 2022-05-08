import React, {useEffect, useState} from 'react';
import AppNavbar from '../AppNavBar/AppNavbar';
import RiderService from "../../assets/services/RiderService";
import StarRatings from 'react-star-ratings';
import './JudgePage.css';


function JudgePage() {
    const starCount = 11;
    const doubleUpStarsCount = 21;

    const [content, setContent] = useState({})
    const [riderList, setRiderList] = useState([])
    const [rider, setRider] = useState({id: null, surname: "", name: "", patronymic: null})
    const [error, setError] = useState('')


    const [rating, setRating] = useState({
        "doubleUP": 1,
        "1": 1,
        "2": 1,
        "3": 1,
        "4": 1,
        "5": 1,
        "6": 1,
        "7": 1,
        "8": 1,
    });

    useEffect(() => {
        RiderService.getRiderList()
            .then(response => {
                const riderList = response.data;
                setContent(response.data)
                // this.setState({riderList: response.data)})
                setRiderList(riderList);
            }, error => {
                setError(error.toString());
            });
    }, [])

    const handleChangeSelect = (e) => setRider({id: e.target.value});

    const setNewRating = (count = 0, name) => {
        console.log(count, name)
        setRating(prev => ({
            ...prev, [name]: count
        }))
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
                                                        key={Math.random()}
                                                    >
                                                        {rider.surname + " " + rider.name + (rider.patronymic ? " " + rider.patronymic : "")}
                                                    </option>
                                                )}
                                            </select>
                                        </label>
                                        <div className='container-fluid mt-5'>
                                            <h3 className='fs-3'>Score the trick:</h3>
                                            {[1, 2, 3, 4, 5, 6, 7, 8].map((unit, idx) =>
                                                <div className='d-flex gap-4 mt-3 justify-content-lg-start' key={idx}>
                                                    <div className='d-flex fs-2 align-items-center'>
                                                        <span className='width'>{unit + "."}</span>
                                                        <div className='ms-2'>
                                                            {/*{smArr.map(row => <span className='text-center align-middle block star'><span className='upper fz-5'>{row}</span></span>)}*/}
                                                            <StarRatings
                                                                numberOfStars={starCount}
                                                                rating={rating[unit + ""]}
                                                                name={unit + ""}
                                                                ignoreInlineStyles={false}
                                                                changeRating={setNewRating}
                                                                starEmptyColor='#adb5bd'
                                                                starHoverColor='rgba(224, 194, 75, 1)'
                                                                starRatedColor='rgba(238, 164, 0, 1)'
                                                                starSpacing="6px"
                                                            />
                                                            <p style={{display: "inline"}}> {rating[unit + ""] - 1}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            <h3 className='fs-3 mt-5 d-flex'>Double Up <pre>x</pre>2</h3>
                                            <div className='d-flex gap-4 mt-3 justify-content-lg-start'
                                                 key={"doubleUp"}>
                                                <div className='d-flex fs-2 align-items-center'>
                                                    <span className='width'>9.</span>
                                                    <div className='ms-2' style={{width: 730}}>

                                                        <StarRatings
                                                            numberOfStars={doubleUpStarsCount}
                                                            rating={rating["doubleUP"]}
                                                            name='doubleUP'
                                                            ignoreInlineStyles={false}
                                                            changeRating={setNewRating}
                                                            starEmptyColor='#adb5bd'
                                                            starHoverColor='rgba(224, 194, 75, 1)'
                                                            starRatedColor='rgba(238, 164, 0, 1)'
                                                            starSpacing="8px"
                                                        />
                                                    </div>
                                                    <p style={{display: "inline"}}
                                                       className='width'>{rating["doubleUP"] - 1}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                }
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
