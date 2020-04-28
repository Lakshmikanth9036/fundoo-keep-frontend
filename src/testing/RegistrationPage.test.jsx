import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RegistrationPage from '../components/RegistrationPage';
import TextField from '@material-ui/core/TextField';

configure({adapter: new Adapter()});

describe('<RegistrationPage/>',() => {
    it('should isAuth state should be false if fields are not filled properly', () => {
        const wrapper = shallow(<RegistrationPage/>);
        const instance = wrapper.instance();
     
        wrapper.find(TextField).at(0).simulate('change',{target: {name:'firstName',value: 'Abc'}})
        wrapper.find(TextField).at(1).simulate('change',{target: {name:'lastName',value: 'd'}})
        wrapper.find(TextField).at(2).simulate('change',{target: {name:'emailAddress',value: 'abc@gmail.com'}})
        wrapper.find(TextField).at(3).simulate('change',{target: {name:'mobile',value: '9876543211'}})
        wrapper.find(TextField).at(4).simulate('change',{target: {name:'password',value: 'Abc@123'}})
        expect(instance.state.fields.firstName).toBe('Abc')
        expect(instance.state.fields.lastName).toBe('d')
        expect(instance.state.fields.emailAddress).toBe('abc@gmail.com')
        expect(instance.state.fields.mobile).toBe('9876543211')
        expect(instance.state.fields.password).toBe('Abc@123')
        expect(instance.state.isValid).toBe(false);
    })
});