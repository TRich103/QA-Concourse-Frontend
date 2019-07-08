    
import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import SearchBar from "./searchBar.component";
import SearchContainer from './searchContainer.component';
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

//SearchBar tests
describe("SearchBar component", () => {
  //Checks if search bar component renders
  test("renders", () => {
    const searchBar = shallow(<SearchBar />);

    expect(searchBar.exists()).toBe(true);
  });

  //Checks if user entered text is passed to the props
  test("Entered text is displayed in search bar", () => {
    //We pass an empty function for the search prop as the component expects a callback from the parent when text is entered
    const searchBar = shallow(<SearchBar search={() => {}} />);

    searchBar.find("input").simulate("change", {
      target: { value: "searchString" }
    });

    expect(searchBar.find("input").props().value).toEqual("searchString");
  });

  //Checks that the default onSubmit event is cancelled - just for coverage
  test("Default event onSubmit is cancelled", () => {
    const searchBar = shallow(<SearchBar />);
    let prevented = false;
    //changes prevented to true once preventDefault is called
    searchBar.find("form").simulate("submit", {
      preventDefault: () => {
        prevented = true;
      }
    });
    expect(prevented).toBe(true);
  });
});

//SearchContainer tests
describe("SearchContainer component", () => {

  //Checks if search container component renders
  test("renders", () => {
    const searchContainer = shallow(<SearchContainer />);

    expect(searchContainer.exists()).toBe(true);
  });

  //Checks to see if search bar component renders when search container renders
  test("renders SearchBar component", () => {
    const searchContainer = mount(<SearchContainer />);

    expect(searchContainer.find(SearchBar).length).toEqual(1);
  });

  //Checks search function updates state
  test("searching should update component state", () => {
    const mockData = [{'Name': 'John', 'Age': '22', 'Email': 'John@example.com'},
                      {'Name': 'Jane', 'Age': '26', 'Email': 'Jane@example.com'},
                      {'Name': 'Jack', 'Age': '24', 'Email': 'Jack@example.com'},
                      {'Name': 'Mary', 'Age': '23', 'Mobile': '07777888999'}]

    //Checks initial state matches mockData
    const searchContainer = mount(<SearchContainer data={mockData} />);
    expect(searchContainer.state().searchResults).toHaveLength(4);

    //Checks search function removes Mary
    const { search } = searchContainer.find(SearchBar).props()
    search('j')
    expect(searchContainer.state().searchResults).toHaveLength(3);

    //Checks empty searchString returns original state
    search('')
    expect(searchContainer.state().searchResults).toHaveLength(4);
  });

});