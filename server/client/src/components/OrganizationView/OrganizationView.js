import './OrganizationView.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import {useHistory} from 'react-router-dom';
import { thunkAddComment, thunkOrgInit } from '../../redux/Thunk/ThunkOrganization';
import { ThunkInitVacantion } from '../../redux/Thunk/VacantionThunk';
import Icon from '@iconify/react';
import iosStar from '@iconify-icons/ion/ios-star';



const rating = ['','','','','']  //массив для отрисовки звезд в рейтинге

function OrganizationView() {

  const history = useHistory()
  const dispatch = useDispatch()
  const {id} = useParams()

  // const organization = useSelector(state => state.organization).filter(el => el._id === id)[0]
  const organizationInitial = useSelector(state => state.organization)
  const organization = organizationInitial.organization
  const comments = organizationInitial.comments
  
  // const activeVacantion = useSelector(state => state.vacantion).filter(el => el.relevance == true)
  // const archiveVacantion = useSelector(state => state.vacantion).filter(el => el.relevance == false)
  const student = useSelector(state => state.student._id)

  

  // const addres = /organizations/org/${organization._id}
  const [activeVacantion, setActiveVacantion] = useState([])
  const [archiveVacantion, setArchiveVacantion] = useState([])
  // const [comments, setComments] = useState([])
  
  // const activeVacantion = organization.vacantion.filter(el => el.relevance === true)
  // const archiveVacantion = organization.vacantion.filter(el => el.relevance === false)

    useEffect( () => {
    setActiveVacantion( organization?.vacantion.filter(el => el.relevance === true) )
  }, [organization])

    useEffect( () => {
    setArchiveVacantion( organization?.vacantion.filter(el => el.relevance === false) )
  }, [organization])

  // useEffect( () => {
  //   setComments( organization?.comment )
  // }, [organization])
 
  const [showArchiveFlag, setShowArchiveFlag] = useState(false)
  const [showCommentFlag, setShowCommentFlag] = useState(true)
  const [addCommentFlag, setAddCommentFlag] = useState(false)
  const [rate, setRate] = useState(0)
  const [newRateInComment, setNewRateInComment] = useState(0)
 
  // код для расчета среднего арифметического рейтинга из массива
  // const rating = organization?.rate.reduce( (a, b) => ( (a + b)  / organization?.rate.length ) )
 
  const showArchiveFunction = (event) => {
    event.preventDefault()
    setShowArchiveFlag(!showArchiveFlag)
  }

  const showCommentFunction = (event) => {
    event.preventDefault()
    setShowCommentFlag(!showCommentFlag)
  }

  const addCommentFunction = (event) => {
    event.preventDefault()
    setAddCommentFlag(!addCommentFlag)
  }


  // useEffect( () => {
  //   setRate( organization?.rate )
  // }, [organization])

  // console.log(organization?.rate);
  useEffect( () => {
      if (organization?.rate.length !== 0) {
        const currentRating = ( organization?.rate.reduce( (a, b) =>  (a + b) ) / organization?.rate.length  )
        setRate( currentRating )
      } else {
        setRate(0)
      }
    }, [organization])
  
 

  useEffect( () => {
    dispatch( thunkOrgInit(id) )
  }, [dispatch])

  useEffect( () => {
    dispatch( ThunkInitVacantion() )
  }, [dispatch])

  // useEffect( () => {
  //   dispatch( ThunkInitComment() )
  // }, [dispatch])

 

// обработка добавления отзыва и рейтинга
  const formCommentHandler = (event) => {
    event.preventDefault();
      dispatch(thunkAddComment(
        organization, 
        event.target.comment.value, 
        newRateInComment,
        student 
        ))
    
    setAddCommentFlag(!addCommentFlag)
    // history.push(`/organizations/org/${id}`)
    window.location.href=`/organizations/org/${id}`
  };


  if (organization) {
    setRateActiveWidth(rate)
  }

  // функция, отрисовывающая рейтинг звездами:
  function setRateActiveWidth(rate) {
    let ratingActive = document.querySelector('.ratingActive')
    const ratingActiveWidth = rate / 0.05
    ratingActive.style.width = `${ratingActiveWidth}%`
  }

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{organization?.name}</h4>
          <div className="card-text">Текущий рейтинг:&nbsp;

            {/* Блок для отрисовки рейтинга */}
            <div className='rating' >
              <div className='ratingBody'>
                <div className='ratingActive'></div>
                  <div className='ratingItems'>
                    <input type="radio" className='ratingItem' value='1' name="rating" />
                    <input type="radio" className='ratingItem' value='2' name="rating" />
                    <input type="radio" className='ratingItem' value='3' name="rating" />
                    <input type="radio" className='ratingItem' value='4' name="rating" />
                    <input type="radio" className='ratingItem' value='5' name="rating" />
                  </div>
                </div>
              <div className="ratingValue"></div>
            </div>

          </div>
        </div>

        <ul className="list-group list-group-flush">
          <li className="list-group-item">Последний отзыв:&nbsp;{comments?.comment[comments?.comment.length - 1]?.text}
             <p>  <button onClick={addCommentFunction}> {!addCommentFlag? <h6>оставить отзыв</h6> : <h6>скрыть</h6>  } </button> </p>

            {addCommentFlag
              ? <div className="organization container d-flex flex-column">
                <form method="POST" onSubmit={formCommentHandler}>

                    <p> Оцените организацию {rating.map((el,i) => {
                          return <Icon
                                    name={i}
                                    key={i}
                                    style={{color: (i+1) <= newRateInComment?"red":"initial"}}
                                    icon={iosStar} onClick={() => {setNewRateInComment(i+1);}} />
                          })}
                    </p>

                    <div className="form-floating">
                      <textarea className="form-control m-3" name="comment" ></textarea>
                      <label className="ms-2" htmlFor="floatingTextarea2">Ваше мнение об организации</label>
                    </div>

                    <button type="submit">Добавить</button>
                    </form>
                 </div>

                : null }
          </li>

          <li className="list-group-item">Активные вакансии:&nbsp;
            {activeVacantion?.map(el => {return <p key={el._id}> <a href={`http://localhost:3000/vacantion/${el._id}`}>  {el.vacantion} </a> </p> })}
          </li>
        </ul>

        <div className="card-body">
          <button onClick={showArchiveFunction} className="card-link">Архив вакансий</button>

          {
           showCommentFlag 
              ? <button onClick={showCommentFunction} className="card-link">Скрыть отзывы</button> 
              : <button onClick={showCommentFunction} className="card-link">Показать отзывы</button> 
          }

        </div>
      </div>

    {/* блок орисовки архивных вакансий */}
    {showArchiveFlag
      ?   archiveVacantion.length
            ? <div className='container '>
              Cписок неактивных вакансий:
              <h4>{archiveVacantion.map(el => {return <p key={el._id}> <a href={`http://localhost:3000/vacantion/${el._id}`}>  {el.vacantion} </a> </p> })}</h4>
             </div>
            : <h3>У текущей организации пока нет вакансий в архиве</h3>

      :null
    }
      {/* блок отрисовки всех комментариев */}
    {showCommentFlag
      ? <div>
        {comments?.comment
         ? <div> {comments?.comment.map(el => {return <div key={el._id}>{`${el.text}`} Автор отзыва {`${el.authorName}`}</div> } )}  </div> 
              
         : <p>Отзывов пока нет</p>
        }
          </div>
      : null
    }

    </>
  );
}

export default OrganizationView;