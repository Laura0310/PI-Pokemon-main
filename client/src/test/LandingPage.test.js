import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import LandingPage from '../pages/Landingpage/LandingPage';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

describe('<LandingPage />', () => {
    it('should contain image and welcome text', () => {
        const wrapper = shallow(<LandingPage />);
        let img = wrapper.find('img')
        expect(img.length).to.equal(1)
        expect(wrapper.contains("Discover the world of pokemon")).equal(true)
    });
});


