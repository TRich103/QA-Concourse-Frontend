import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme,{shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import UserHistory from '../user-history.component';

Enzyme.configure({adapter: new Adapter()})

let wrapper;
let props = {match:{params:{id: "5d0b629524eb545e4863b83e"}}};
let message

beforeEach(() => {
    wrapper = mount(<UserHistory {...props}/>);
});

describe('User History render tests', ()=>{
    it('renders correctly when there are no items', () => {
            expect(toJson(wrapper)).toMatchSnapshot();
        });
    
    it('checking that 2 divs of qasearchbar render to show search bar and table', () => {
        expect(wrapper.find('.QASearchBar')).toHaveLength(2);
    });

    it('checking that labels are all rendered', () => {
        expect(wrapper.find('label')).toHaveLength(1);
    });

    it('checking that SearchBar is rendered', () => {
        expect(wrapper.find('SearchBar')).toHaveLength(1);
    });

    it('checking that Modal component is rendered when true', () => {
        wrapper.setState({ modal : true});
        expect(wrapper.find('Modal')).toHaveLength(1);
    });

    it('checking that Modal Header component is rendered', () => {
        wrapper.setState({ modal : true});
        expect(wrapper.find('ModalHeader')).toHaveLength(1);
    });

    it('checking that Modal Body component is rendered', () => {
        wrapper.setState({ modal : true});
        expect(wrapper.find('ModalBody')).toHaveLength(1);
    });

    it('checking that Day Picker component is rendered', () => {
        wrapper.setState({ modal : true});
        expect(wrapper.find('DayPicker')).toHaveLength(1);
    });
})

describe('testing functions', () =>{

    it('check that componentDidMount has been called', () => {
        const spy = jest.spyOn(UserHistory.prototype, 'componentDidMount');
        const wrapper = mount(<UserHistory {...props}/>);
        wrapper.instance().componentDidMount();
        expect(spy).toBeCalled();
    })

    it('SearchBar function check that it works', () => {
        const app = shallow(<UserHistory {...props} />);
        const event = { replace: jest.fn(), length: 1 };
        const onInputSpy = jest.spyOn(app.instance(), "search");
    
        app.update();
        app.instance().forceUpdate();
    
        app.instance().search(event);
        expect(onInputSpy).toHaveBeenCalled();
    });

    it('check handle Days function changes values', () => {
        const wrapper = shallow(<UserHistory {...props}/>);
        const onClickSpy = jest.spyOn(wrapper.instance(), "handleDaysClicked");
        wrapper.instance().handleDaysClicked("Mon Jul 22 2019 12:00:00 GMT+0100 (British Summer Time)");
        expect(onClickSpy).toHaveBeenCalled();
    })

    it('checks handle reset click', () => {
        const onClickSpy = jest.spyOn(wrapper.instance(), "handleResetClick");
        wrapper.instance().handleResetClick();
        expect(onClickSpy).toHaveBeenCalled();
        expect(wrapper.state().range).toEqual({from: undefined, to: undefined});
    })

    it('checks toggle changes when function called', () => {
        const onClickSpy = jest.spyOn(wrapper.instance(), "toggle");
        wrapper.instance().toggle();
        expect(onClickSpy).toHaveBeenCalled();
    })

    it('testing ⭠ Back button', () => {
        wrapper.find('#cancelBtn').simulate('click');
    })

})



