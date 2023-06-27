
import { useState } from 'react'
import './App.css'
const uuid = require('uuid')

function Authenticate() {
    const [image, setImage] = useState('')
    const [uploadResultMessage, setUploadResultMessage] = useState('Please upload an image to authenticate')
    const [imgName, setImgName] = useState('placeholder.jpeg')
    const [isAuth, setAuth] = useState(false)

    function sendImage(e) {
        console.log(e)
        e.preventDefault()
        setImgName(image.name)
        const visitorImageName = uuid.v4()
        fetch(`https://z2v0uw0lud.execute-api.us-east-1.amazonaws.com/dev/vigya-visitor-images/${visitorImageName}.jpeg`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'image/jpeg'
            },
            body: image,
        }).then(async() => {
            const response = await authenticater(visitorImageName)
            console.log(response)
            if (response.Message === 'Success'){
                setAuth(true)
                setUploadResultMessage(`Hi ${response['firstName']} ${response['lastName']}, welcome to your workplace. Have a great day! `)
            } else {
                setAuth(false) 
                setUploadResultMessage('Authentication failed: This person is not an employee')
            }
        }).catch(err => {
            setAuth(false)
            setUploadResultMessage('There is an errror during the authentication process. Please try again')
            console.log(err)
        })
    }

    async function authenticater(visitorImageName){
        const requestUrl = `https://z2v0uw0lud.execute-api.us-east-1.amazonaws.com/dev/employee?` + new URLSearchParams({
            objectKey: `${visitorImageName}.jpeg`
        })
        console.log(requestUrl)
        return await fetch(requestUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log(response)
           return response.json()})
        .then((data) => {
            console.log(data)
            return data
        }).catch(err => console.log(err))
    }


    return (
        <div className='App'>
            <form onSubmit={sendImage}> 
                <input type='file' name='image' onChange={e => setImage(e.target.files[0])}></input>
                <button type='submit'>Authenticate</button>
            </form>
            <div className={isAuth ? 'success' : 'failure'}>{uploadResultMessage}</div>
            <h3>Please wait while the image is getting uploaded</h3>
        </div>
    )
}

export default Authenticate
