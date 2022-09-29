import { shallow } from "enzyme"
import Recat from "react"
import App from "./App"
import FileRotes from './components/FileRoutes';
describe("Given App", () =>{
  test("Check button click", () =>{
    const component = shallow(<App />)
    let wrapper = shallow(<FileRotes />);
   expect(wrapper.exists('.fileRoutes')).toEqual(true);
   
  })

})