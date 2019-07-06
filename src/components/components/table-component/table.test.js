import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme,{shallow, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import QATable from './qa-table.component';
import ReactTable from "react-table";
import toJson from 'enzyme-to-json';

Enzyme.configure({adapter: new Adapter()})

const tableData = {
                      Headers: ['Name', 'Age'],
                      Rows: [{'Name': 'John', 'Age': '23'},
                             {'Name': 'Jane', 'Age': '26'}]
                  }

describe('Table component', () =>{

  //Creates snapshot of desired table
  test('renders', () => {
    const table = shallow(      
      <ReactTable
        className="-striped -highlight"
        data= {[{'Name': 'John', 'Age': '23'},
                {'Name': 'Jane', 'Age': '26'}]}
        columns={[{'Header': 'Name', 'accessor': 'Name'}, {'Header': 'Age', 'accessor': 'Age'}]}
        showPagination={false}
        style={{
                height: "400px"
        }}
    />
  )
    expect(toJson(table)).toMatchSnapshot()
  })

  //Checks if QATable component matches desired table
  test('Populates data from props', () => {
    const table = shallow(<QATable data={tableData}/>);
    expect(toJson(table)).toMatchSnapshot()
  })

  //Checks if setting props updates table
  test('Updates table on prop change', () => {
    const blankTable = shallow(<QATable data={{Headers:[], Rows:[]}}/>);
    const filledTable = blankTable.setProps({data: tableData})
    expect(filledTable).toMatchSnapshot()
  })
})