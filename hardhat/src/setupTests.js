 
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

import FileRotes from './components/FileRoutes';
import {shallow} from 'enzyme'

describe('Check first time', ()=>{
    let wrapper = shallow(<FileRotes />);
    expect(wrapper.exists('.fileRoutes')).toEqual(true);
})