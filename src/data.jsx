import axios from 'axios';

//get data from url and return data for  initialstate in redux folder
export const getDataPending = async () => {
    const url =
    "https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list";
    return await axios.get(url).then((res) => {
        const pendingData = res.data.filter((item) => item.status === 0);
        return {
            pendingData,
           
        };
    });
    }

    export const getDataFinish = async () => {
        const url =
        "https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list";
        return await axios.get(url).then((res) => {
            const finishData = res.data.filter((item) => item.status === 1);
            return {
                finishData,
               
            };
        });
        }



