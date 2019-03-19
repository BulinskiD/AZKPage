export default (error)=>{
    if (error.response) {
        switch(error.response.status){
            case 400:
            //Bad Request, probably fail on validation on backend side
            return 400;
            case 401:
            window.location.replace('/error');
            break;
            case 403: 
            //Forbidden
            window.location.replace('/error'); 
            break;
            case 404:
            //Not Found
            return 404
            default:
            window.location.replace('/error');
        }
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser
        window.location.replace("/error");
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
        return 'unknown';
    }
}