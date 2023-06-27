
import { useState, useEffect } from 'react'
import  './App.css'


const Register = () => {
    const [image, setImage] = useState('')
    const [imgName, setImgName] = useState('placeholder.jpeg')
    const [uploadResultMessage, setUploadResultMessage] = useState('Please upload an image of the employee to be registered')
    const [isAuth, setAuth] = useState(false)

    useEffect(() => {
        if (image) {
            setImgName(image.name);
        }
    }, [image]);

    function sendImage(e) {
        console.log(e)
        e.preventDefault()
            fetch(`https://3x24st6o9e.execute-api.us-east-1.amazonaws.com/dev/vigya-employee-images/${imgName}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'image/jpeg'
                },
                body: image,
            }).then(response => {
                setAuth(true)
                const first_name = imgName.split("_")[0]
                const last_name = imgName.split("_")[1]
                setUploadResultMessage(`The image of employee ${first_name} ${last_name} has been registered. `)
                console.log(response)
            }).catch(err => {
                setAuth(false)
                setUploadResultMessage(`The image of the employee could not be registered. Please try again`)
                console.error(err)
            })
    
    }

  return (
    <div className='App'>
            <form onSubmit={sendImage}> 
                <input type='file' name='image' onChange={e => setImage(e.target.files[0])}></input>
                <button type='submit'>Upload</button>
            </form>
            <div className={isAuth ? 'success' : 'failure'}>{uploadResultMessage}</div>
            <img src={require(`./employees/${imgName}`)} alt='visitor'
                 height={250} width={250}
            />
    </div>
  )
}
export default Register