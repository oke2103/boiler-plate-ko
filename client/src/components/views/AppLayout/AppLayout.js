import React from 'react';
import {Menu, Input} from 'antd';
import { Link } from 'react-router-dom';

const AppLayout = ({children}) =>{
    return (
        <div>
            <Menu mode="horizontal">
                <Menu.Item key="test" style = {{ float : 'left' }} >test</Menu.Item>
                
                <Menu.Item key="home" style = {{ float : 'right' }} ><Link to="/login">Login</Link></Menu.Item>
                <Menu.Item key="profile">프로필</Menu.Item>
                <Menu.Item key="mail">
                    <Input.Search enterButton style={{verticalAlign:'middle'}} />
                </Menu.Item>
            </Menu>
            {children}
        </div>
    );
};
export default AppLayout;