import axios from 'axios';
import { FETCH_FINISH_DATA, FETCH_PENDING_DATA } from './types';

//get data from url and return data for  initialstate in redux folder
export const fetchPendingData = () => async dispatch => {

    const url =
    "https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list";
    return await  axios.get(url).then((res) => {
        const pendingData = res.data.filter((item) => item.status === 0);
        //set data to local storage and get the data from local storage
        localStorage.setItem('pendingData', JSON.stringify(pendingData));
        const pendingDataFromLocalStorage = JSON.parse(localStorage.getItem('pendingData'));




        dispatch({
            type: FETCH_PENDING_DATA,
            payload: pendingDataFromLocalStorage,
        });
    }).catch((err) => {
        console.log(err);
    }).finally(() => {
        console.log("fetchPendingData");
        const pendingDataFromLocalStorage = JSON.parse(localStorage.getItem('pendingData'));
        dispatch({
            type: FETCH_FINISH_DATA,
            payload: pendingDataFromLocalStorage,
        });
        })
   
    }

    export const fetchFinishData = () => async dispatch => {
        const url =
        "https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list";
        return await  axios.get(url).then((res) => {
            const finishData = res.data.filter((item) => item.status === 1);

            //set data to local storage and get the data from local storage
            localStorage.setItem('finishData', JSON.stringify(finishData));
        const finishDataFromLocalStorage = JSON.parse(localStorage.getItem('pendingData'));

            dispatch({
                type: FETCH_FINISH_DATA,
                payload: finishDataFromLocalStorage,
            });
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            console.log('fetch finish data');
            const finishDataFromLocalStorage = JSON.parse(localStorage.getItem('finishData'));

            dispatch({
                type: FETCH_FINISH_DATA,
                payload: finishDataFromLocalStorage,


            })
        });
        }



