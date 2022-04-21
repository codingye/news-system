import React, { useEffect, useState } from 'react'
import {Form,Button,Input,Select,message} from 'antd'
import axios from 'axios';

export default function Register(props) {
  const [form] = Form.useForm();
  const [regionList,setregionList] = useState([])
  const [roleList,setroleList] = useState([])

  useEffect(() => {
    axios.get('/regions').then((res) => {
        setregionList(res.data)
    })
  },[])
  useEffect(() => {
    axios.get('/roles').then((res) => {
        setroleList(res.data)
    })
  },[])

  const onReset = () => {
    form.resetFields();
  };
  const onFinish = (values) => {
    console.log(values);
    delete values.roleName
    axios.post('/users',{
        ...values,
        roleId:3,
        "roleState": true,
        "default": false,
    }).then((res) => {
        message.success('用户注册成功',[1],()=>{
            //父传子
            // props.cancel(false)
            // form.resetFields()
            //子传父
            props.cancel2(form)
        })

    })
  }  

  return (
    <div>
      <Form
      name="basic"
      layout="vertical"
      form={form}
      onFinish={onFinish}
      initialValues={{
        roleName: "区域编辑",
      }}
      autoComplete="off"
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="角色"
        name="roleName"
      >
       <Select  onChange={(value) =>{}} disabled={true}>
           {
               roleList.map(item => {
                   return (
                       <Select.Option value={item.roleName} key={item.id}></Select.Option>
                   )
               })
           }
       </Select>
      </Form.Item>
      <Form.Item
        label="所属区域"
        name="region"
        rules={[{ required: true, message: 'Please input your region!' }]}
      >
       <Select onChange={(value) =>{}}>
           {
               regionList.map(item =>{
                   return (
                       <Select.Option value={item.value} key={item.id}></Select.Option>
                   )
               })
               }
       </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
        <Button htmlType="button" style={{float: 'right'}}  onClick={onReset}>
          重置
        </Button>
      </Form.Item>
    </Form>
    </div>
  )
}
