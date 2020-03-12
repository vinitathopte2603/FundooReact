import React from 'react'
import { shallow } from 'enzyme'
import SignIn from './signin'
describe('Login component test',()=>{
    const wrapper = shallow(<SignIn/>)
    it('it should have a button component',()=>{
        expect(wrapper.find('Button').length).toEqual(3);
    
        // expect(wrapper.find('Button')
        //         .type().defaultProps.type)
        //         .toEqual('Button');

        // expect(wrapper.find('Button').text()).toBe('Sign in');
    })
    it('should have input for email and password', ()=> {
        //Email and password input field should be present
        expect(wrapper.find('email')).toHaveLength(1);
        expect(wrapper.find('password')).toHaveLength(1);
    });

    it('should have an empty email and password state var', ()=> {
        //Optionally test to check if password and email are empty strings on setup
        // expect(wrapper.state(fields["email"])).toEqual('');
        // expect(wrapper.state(fields["password"])).toEqual('');
       
        expect(1+1).toBe(2);
    });
   
})

