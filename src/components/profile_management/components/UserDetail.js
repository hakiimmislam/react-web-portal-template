import React, { Component } from 'react';
import { Form, Input, Button, Modal, Spin } from 'antd';
import { getUser } from '../../../helpers/AdminController';

const success = Modal.success;
const FormItem = Form.Item;

class UserDetail extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            page_loading: true
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.user();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    user() {
        var access_token = sessionStorage.getItem('access_token');
        getUser(access_token)
            .then(result => {
                if (result.result === 'GOOD') {
                    if(this._isMounted) this.setState({ user: result.data, page_loading: false });
                }
            })
    }

    // handleSubmit() {
    //     const form = this.props.form;
    //     var access_token = sessionStorage.getItem('access_token');

    //     form.validateFields((err, values) => {
    //         if (err) {
    //             return;
    //         }

    //         this.setState({ loading: true });
    //         getUser(values.current_password, values.password, values.password_confirmation, access_token)
    //             .then(result => {
    //                 if (result.result === 'GOOD') {
    //                     this.setState({ loading: false });
    //                     success({
    //                         title: 'Success',
    //                         content: 'You have sucessfully reset you password.'
    //                     });
    //                     form.resetFields();
    //                 }
    //             })
    //     });
    // }

    render() {
        const { page_loading, loading, user } = this.state;
        const { getFieldDecorator } = this.props.form;

        return (
            <div>
                <h1>User Information</h1>

                <Spin spinning={page_loading} size="large">
                    <Form layout="vertical">
                        <FormItem label="Name">
                            {getFieldDecorator('name', {
                                initialValue: user.name,
                                rules: [{ required: true, message: 'Please input the name!'}]
                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem label="Username">
                            {getFieldDecorator('username', {
                                initialValue: user.username,
                                rules: [{ required: true, message: 'Please input the username!' }]
                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem label="Email">
                            {getFieldDecorator('email', {
                                initialValue: user.email,
                                rules: [{ required: true, message: 'Please input the email!' }]
                            })(
                                <Input />
                            )}
                        </FormItem>

                        <FormItem className="margin-bottom-0">
                            <Button loading={loading} type="primary" onClick={() => this.handleSubmit()}>
                                Save
                            </Button>
                        </FormItem>
                    </Form>
                </Spin>
            </div>
        );
    }
}

export default Form.create()(UserDetail);