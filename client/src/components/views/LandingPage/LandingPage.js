import React, {useEffect} from 'react'
import axios from 'axios'
import { Button } from 'antd';
import { withRouter } from 'react-router-dom';
import AppLayout from '../AppLayout/AppLayout'

function LandingPage(props) {

    useEffect(() => {
        axios.get('/api/hello')
        .then(response => { console.log(response.data)});
    }, [])

    const onClickHandler = () => {
        axios.get('/api/user/logout')
            .then(response => {
                if(response.data.success){
                    props.history.push('/login');
                }else{
                    alert('로그아웃 하는데 실패');
                }
            })
    }

    return (
        <AppLayout>
            <div style = {{ display : 'flex', justifyContent : 'center', alignItems : 'center'
            , width : '100%', height : '100vh' }}>
                <h2>시작페이지</h2>
                <button onClick= {onClickHandler}>로그아웃</button>
            </div>
        </AppLayout>
    )
}

export default withRouter(LandingPage)
