import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Home from "../pages/Home/Home";
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

describe('<Home />', () => {
    it('should contain image and welcome text', () => {
    });
});