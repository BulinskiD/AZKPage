import axios from 'axios';
import {apiUrl} from '../api/CONSTANTS';




const updatePic= async (file, urlCase, token)=>{
    const axiosSendHeader= {headers: {'Authorization': "bearer " + token,
    'Content-Type': 'multipart/form-data'}};



    let fileInForm = new FormData();
    fileInForm.append("File", file);
    let url = '';
    switch(urlCase){
        case 'styles':
        url=`${apiUrl}/style/addimage`;
        break;
        case 'paints':
        url=`${apiUrl}/paint/addimage`;
        break;
        default:
        url=`${apiUrl}/paint/addimage`;
    }

    await axios.post(url , fileInForm, axiosSendHeader).then(response=>{

    }).catch(error=>{
        console.log(error);
    });
}


export default updatePic;