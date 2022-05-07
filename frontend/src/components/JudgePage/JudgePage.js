import React, { useEffect, useState } from 'react';
import BackendService from '../../assets/services/BackendService';
import AppNavbar from '../AppNavBar/AppNavbar';
import RiderService from "../../assets/services/RiderService";
import StarRatings from 'react-star-ratings';
import './JudgePage.css';


function JudgePage() {
    const smArr =  [1,2,3,4,5,6,7,9,10];
    const bigArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  const [state, setState] = useState({
      content: '',
      riderList: [],
      error: ''
  });
  const [rider, setRider] = useState({
      id : null,
  });

  const [rating, setRating] = useState(0);

  useEffect(() => {
    RiderService.getRiderList()
        .then(response => {
          const riderList = response.data;
          setState({content: riderList})
          for (let i = 0; i < 200; i++) {
            riderList.push({surname: "surname" + i, name: "name" + i, id: i});
          }
          // this.setState({riderList: response.data)})
          setState({riderList: riderList});
        }, error => {
          setState({error: error.toString()});
        });
  },[])

  const handleChangeSelect = (e) => setRider({id: e.target.value });
  const setNewRating = (count= 0, name) => {
      if (name === 'doubleRating') {
          setRating(rating + count)
      } else {
          setRating({[name]: count})
      }
  }
  return (
      <div>
          <AppNavbar/>
          <div className='container-fluid'>
               {state.riderList ? (
                    <div style={{marginTop: "20px"}}>
                        <div className="alert alert-info">
                            <form className='form-inline'>
                                <fieldset>
                                    <label className='d-flex gap-3 align-items-center fs-3'>
                                        <strong>Rider:</strong>
                                        <select
                                           className='form-select custom-select form-control'
                                           onChange={(e) => handleChangeSelect(e)}
                                        >
                                        {state.riderList.map(rider =>
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
                                {[1,2,3,4,5,6,7,8].map((unit, idx) =>
                                    <div className='d-flex gap-4 mt-3 justify-content-lg-start' key={idx}>
                                        <div className='d-flex fs-2 align-items-center'>
                                            <span className='width'>
                                                 {unit + "."}
                                            </span>
                                            <div className='ms-2'>
                                                {/*{smArr.map(row => <span className='text-center align-middle block star'><span className='upper fz-5'>{row}</span></span>)}*/}
                                                         <StarRatings
                                                            numberOfStars={smArr.length}
                                                            rating={rating}
                                                            name={unit}
                                                            ignoreInlineStyles={false}
                                                            changeRating={setNewRating(unit)}
                                                            starEmptyColor='snow'
                                                            starHoverColor='rgba(224, 194, 75, 1)'
                                                            starRatedColor='rgba(238, 164, 0, 1)'
                                                            starSpacing="6px"
                                                        />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <h3 className='fs-3 mt-5 d-flex'>Double Up <pre>x</pre>2</h3>
                                <StarRatings
                                    numberOfStars={bigArr.length}
                                    rating={rating}
                                    name='doubleRating'
                                    ignoreInlineStyles={false}
                                    changeRating={setNewRating('doubleRating')}
                                    starEmptyColor='snow'
                                    starHoverColor='rgba(224, 194, 75, 1)'
                                    starRatedColor='rgba(238, 164, 0, 1)'
                                    starSpacing="8px"
                                />
                                <p>Current rating is: {rating}</p>

                            </div>
                          </fieldset>
                        </form>
                      </div>
                    </div>
                ) : (
                    <div style={{marginTop: "20px"}}>
                      <div className='alert alert-danger'>
                        {state.error}
                      </div>
                    </div>
                )
              }
            </div>
      </div>
  );
}

export default JudgePage;
