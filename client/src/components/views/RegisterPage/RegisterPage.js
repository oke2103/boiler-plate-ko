import { useDispatch } from 'react-redux'
import React , { useState } from 'react'
import { Button } from 'antd'
import { registerUser } from '../../../_actions/user_action'; 
import { withRouter } from 'react-router-dom';

function RegisterPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if(Password != confirmPassword){
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
        }

        let body = {
            email : Email,
            name : Name,
            password : Password,
        }

        dispatch(registerUser(body))
            .then(response => {
                if(response.payload.success){
                    alert('회원가입에 성공하였습니다.')
                    props.history.push('/login');
                }
                else{
                    if(response.payload.message){
                        alert(response.payload.message);
                    }
                    else{
                        alert('Fail to sign up');
                    }
                }
            })
    }
    return (
        <div style = {{ display : 'flex', justifyContent : 'center', alignItems : 'center'
        , width : '100%', height : '100vh' }}>
            <form style = {{ display : 'flex', flexDirection : 'column'}}
                onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}></input>

                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler}></input>

                <label>password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}></input>

                <label>Confirm password</label>
                <input type="password" value={confirmPassword} onChange={onConfirmPasswordHandler}></input>

                <br/>
                <button type = "submit">회원 가입</button>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage)
