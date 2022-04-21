import React,{useState} from 'react'
import { Form, Button, Input, message,Modal } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css'
import axios from 'axios'
import Register from '../../components/register/Register'

export default function Login(props) {
    const [isModalVisible,setisModalVisible] = useState(false)  
    const onFinish = (values) => {
        // console.log(values)
        axios.get(`/users?username=${values.username}&password=${values.password}&roleState=true&_expand=role`).then(res=>{
            console.log(res.data)
            if(res.data.length===0){
                message.error("用户名或密码不匹配")
            }else{
                localStorage.setItem("token",JSON.stringify(res.data[0]))
                props.history.push("/")
            }
        })
    }
    const showRegister = () => {
      setisModalVisible(true)
    }
    const handleCancel = (form) => {
      setisModalVisible(false)
    }
    const handleCancel2 = (form) => {
      setisModalVisible(false)
      form.resetFields()
    }


    return (
        <div style={{ background: 'rgb(35, 39, 65)', height: "100%",overflow:'hidden' }}>
            <div className="formContainer">
                <div className="logintitle">全球新闻发布管理系统</div>
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                      <div style={{display:'flex',justifyContent: 'space-between'}}>
                        <div>
                          <Button type="primary" htmlType="submit" className="login-form-button">
                              登录
                          </Button>
                        </div>
                        <div>
                          <Button type="primary" className="login-form-button" onClick={() => {showRegister()}}>
                                注册
                          </Button>
                        </div>               
                      </div>
                    </Form.Item>
                </Form>
            </div>
            <Modal title="用户注册" footer={null} visible={isModalVisible} onCancel={handleCancel}>
              <Register cancel={setisModalVisible} cancel2={handleCancel2}></Register>
            </Modal>
        </div>
    )
}
