import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TextField from '@material-ui/core/TextField';
import LoginPage from '../components/LoginPage';

configure({adapter: new Adapter()});

describe('<LoginPage/>',() => {
    it('change handler working ', () => {
        const wrapper = shallow(<LoginPage/>);
        const instance = wrapper.instance();
     
        wrapper.find(TextField).at(0).simulate('change',{target: {name:'mailOrMobile',value: '9876543211'}})
        wrapper.find(TextField).at(1).simulate('change',{target: {name:'password',value: 'xxxY@123'}})
        expect(instance.state.fields.mailOrMobile).toBe('9876543211')
        expect(instance.state.fields.password).toBe('xxxY@123')
        expect(instance.state.isValid).toBe(true);
    })
});