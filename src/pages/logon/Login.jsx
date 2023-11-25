import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { loginApi } from './../../api/adminUserApi';
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Input,
  Message,
  Segment,
} from 'semantic-ui-react';
import { addUserToSessionStorage } from '../../bundle/sessionStorage';
import { useRecoilState } from 'recoil';
import { adminUserState } from '../../atoms/adminUserState';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [user, setUser] = useRecoilState(adminUserState);
  const navigator = useNavigate();

  const { register, handleSubmit, setValue, formState } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
      phone: '',
    },
  });
  const { errors } = formState;

  const onSubmit = async (data) => {
    setUser({});
    const reqData = { ...data, userId: 'admin' };
    const res = await loginApi(reqData);
    if (res.code === 'Error') {
      alert(res.message);
      return;
    }
    const _userData = res.result;
    if (!_userData?.name) {
      alert('사용자가 아닙니다.');
      return;
    }
    if (_userData?.name) {
      addUserToSessionStorage(_userData);
      setUser(_userData);
    }
    // window.location.replace('/dashboard');
  };

  useEffect(() => {
    if (user?.name) {
      setTimeout(() => {
        navigator('/dashboard');
      }, 1000);
    }
  }, [user, navigator]);

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          <div className="display-inline-logo logo-space">
            <div>
              <Image src="./assets/cross.png" />
            </div>
            <div>
              <Header as="h3">내손안의 교회</Header>
            </div>
          </div>
        </Header>
        <Form size="large" onSubmit={handleSubmit(onSubmit)}>
          <Segment stacked>
            <Form.Field error={!!errors.email}>
              <Input
                fluid
                type="text"
                name="email"
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                {...register('email', {
                  required: true,
                })}
              />
            </Form.Field>
            <Form.Field error={!!errors.email}>
              <Input
                fluid
                type="text"
                name="phone"
                icon="phone"
                iconPosition="left"
                placeholder="Phone"
                {...register('phone', {
                  required: true,
                })}
              />
            </Form.Field>
            <Form.Field error={!!errors.password}>
              <Input
                fluid
                type="password"
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                {...register('password', {
                  required: true,
                })}
              />
            </Form.Field>

            <Button color="teal" fluid size="large" type="submit">
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <br />
          Contact Metelsoft CiH Team
        </Message>
      </Grid.Column>
    </Grid>
  );
}
