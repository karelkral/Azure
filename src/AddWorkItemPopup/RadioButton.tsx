import * as React from "react";
import { RadioButton, RadioButtonGroup } from "azure-devops-ui/RadioButton";
import { Card } from "azure-devops-ui/Card";
import "./AddWork.css";
import  "./CustomJS";
import { ObservableValue } from "azure-devops-ui/Core/Observable";
import { Dropdown } from "azure-devops-ui/Dropdown";
import { DropdownSelection } from "azure-devops-ui/Utilities/DropdownSelection";
import { dropdownItems } from "./Dropdowndata";
import { FormItem } from "azure-devops-ui/FormItem";
import { TextField, TextFieldWidth } from "azure-devops-ui/TextField";
import { workItemsInitialItems } from "../Treeview/TreeData";
import { IListBoxItem } from "azure-devops-ui/ListBox";


const Ids = new ObservableValue<string>("");
const TitleContains = new ObservableValue<string>("");
const worktype = new ObservableValue<string>("");
const selection = new DropdownSelection();
var query_selection = new ObservableValue<string>("");
var radioButton_selection = new ObservableValue<number>(0);

export const workitemsSearchValues = {
    selectedRadioButton: radioButton_selection,
    Query: query_selection,
    Ids: Ids,
    Title: TitleContains,
    Type: worktype,
}


export default class RadioButtonGroupExample extends React.Component {
    private selectedRadioButton = new ObservableValue<string>("");
    private selection = new DropdownSelection();
    
    state = {
        data:dropdownItems,
        workitemtype:dropdownItems,
        isRadioSelected: false,
        isRadioSelected1: true,
        isRadioSelected2: true,
        
      };
   
   
    setradiobtn(event: any) {
        let inputval = event.target.value;
         if(inputval == "option1"){
            this.setState({ isRadioSelected: false });
            this.setState({ isRadioSelected1: true });
            this.setState({ isRadioSelected2: true });
            radioButton_selection.value = 1;
            // alert('option1');

        }else if(inputval == "option2"){
            this.setState({ isRadioSelected: true });
            this.setState({ isRadioSelected1: false });
            this.setState({ isRadioSelected2: true });
            radioButton_selection.value = 2;
            //  alert('option2');
         }else if(inputval == "option3"){
            this.setState({ isRadioSelected: true });
            this.setState({ isRadioSelected1: true });
            this.setState({ isRadioSelected2: false });
            radioButton_selection.value = 3;
            // alert('option3');
        }

    }

    componentDidMount() {
    const apiUrl = 'https://localhost:44328/api/Specification/GetListOfWorkItemTypeCategoriesForUi';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((workitemtype) => {console.log('This is your workitemtype', workitemtype)
      this.setState({workitemtype})
      }).catch(e => console.log(e))

      const apiUrl2 = 'https://localhost:44328/api/Specification/GetListofQueriesForUI';
    fetch(apiUrl2)
      .then((response) => response.json())
      .then((data) => {console.log('This is your data', data)
      this.setState({data})
      }).catch(e => console.log(e))
  }


    public render() {


        return (

            
            <>
                    <div className="wrapper-element" onChange={this.setradiobtn.bind(this)}>
                        <div className="row">
                            <div className="item radio-btn-wrapper">
                               <label>
                                     <input  className="radiobtn"  id="radiobtn"  defaultChecked type="radio" name="radiobtn" value="option1"/>
                                     Query
                                </label>
                            </div>
                            <div className="item ">
                                <div style={{ margin: "8px 0px" }}>
                                    <Dropdown
                                        ariaLabel="Single select"
                                        className="example-dropdown"
                                        placeholder="Select an Option"
                                        items={this.state.data}
                                        onSelect={this.onQuerySelect}
                                        disabled={this.state.isRadioSelected}
                                       
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="item radio-btn-wrapper">
                            <label>
                                     <input id="radiobtn1"    type="radio" name="radiobtn" value="option2"/>
                                     IDs
                                </label>                            </div>
                            <div className="item" style={{ margin: "8px 0px" }}>
                                <TextField
                                    disabled={this.state.isRadioSelected1}
                                    value={Ids}
                                    onChange={(e, newValue) => (Ids.value = newValue)}
                                    placeholder="Search keyword"
                                    width={TextFieldWidth.auto}
                                    inputId="searchkeyword"
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="item radio-btn-wrapper">
                            <label>
                                     <input id="radiobtn2"  type="radio" name="radiobtn" value="option3"/>
                                     Title Contains
                                </label>                            </div>
                            <div className="" style={{ margin: "8px 0px" }}>
                                <TextField
                                            disabled={this.state.isRadioSelected2}
                                            value={TitleContains}
                                            onChange={(e, newValue) => (TitleContains.value = newValue)}
                                            placeholder="Search keyword"
                                            width={TextFieldWidth.auto}
                                        />
                            </div>
                        </div>

                        <div className="row">
                            <div className="item radio-btn-wrapper">
                                <FormItem label="and type">

                                </FormItem>
                            </div>
                            <div className="item" style={{ margin: "8px 0px" }}>
                            <Dropdown
                                        ariaLabel="Single select"
                                        className="example-dropdown"
                                        placeholder="Select an Option"
                                        items={this.state.workitemtype}
                                        selection={this.selection}
                                        disabled={this.state.isRadioSelected2}
                                       
                                    />
                            </div>
                        </div>
                        


                        </div>
                    
            </>
        );
    }

    private onQuerySelect = (event: React.SyntheticEvent<HTMLElement>, item: IListBoxItem<{}>) => {
        query_selection.value = item.id || "";
    };
}
