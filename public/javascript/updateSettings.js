import axios from "axios"
import { showAlert } from "./alerts"

export const updateData = async(AuthorName, Email, PhoneNumber)=>{
    try{
        const res = await axios({
            method: 'PUT',
            url: 'http://127.0.0.1:3000/authors/updateAccount',
            data: {
                AuthorName,
                Email,
                PhoneNumber
            }
        })
        if(res.statusText === 'OK'){
            showAlert('success','Data updated successfully')
            window.setTimeout(() => {
                location.assign('/api/me')
            }, 1500)
        }
    }catch(error){
        showAlert('error', error.response.data.message)
    
}
}
     