import * as React from "react";
import { Header, TitleSize } from "azure-devops-ui/Header";
import { Page } from "azure-devops-ui/Page";
import { commandBarItems } from "./LayoutData";
import { Tab, TabBar, TabSize } from "azure-devops-ui/Tabs";
import { FilterBar } from "azure-devops-ui/FilterBar";
import { IFilter, Filter } from "azure-devops-ui/Utilities/Filter";
import {
    InlineKeywordFilterBarItem,
    KeywordFilterBarItem
} from "azure-devops-ui/TextFilterBarItem"; 
import { ConditionalChildren } from "azure-devops-ui/ConditionalChildren";
import { DropdownSelection } from "azure-devops-ui/Utilities/DropdownSelection";
import { DropdownFilterBarItem } from "azure-devops-ui/Dropdown";
import ViewSpecs from '../ViewSpecs/ViewSpecs'
import "./Layout.css";
import { Button } from "azure-devops-ui/Button";
import "azure-devops-ui/Core/override.css";
import CreateSpecificationModal from "../CreateSpecificationPopup/CreateSpecification"
import NewFolderDialog from "../NewFolder/NewFolderView"
import { HeaderCommandBarWithFilter, IHeaderCommandBarItem } from "azure-devops-ui/HeaderCommandBar";
import { ButtonGroup } from "azure-devops-ui/ButtonGroup";



interface IPageWithTabBarExampleState {
    selectedTabId: string;
    createspecificationmodalpopup: boolean;
    newfolderpopup: boolean;

}


const tabBarCommands: IHeaderCommandBarItem[] = [
    {
        ariaLabel: "Home",
        id: "view-toggle",
        onActivate: () => {
            alert("Toggle View")
        },
        iconProps: {
            iconName: "Home"
        },
        important: true,
        subtle: true,
        tooltipProps: { text: "Home" }
    }
];



export default class Layout extends React.Component<{},IPageWithTabBarExampleState> {
    private filter: IFilter;

    constructor(props: {}) {
        super(props);
        this.state = {
            selectedTabId: "tab2",
            createspecificationmodalpopup: false,
            newfolderpopup: false,
        };
        this.filter = new Filter();
    }

  changestate = () => {
         this.setState({
            createspecificationmodalpopup: true,
            newfolderpopup: false
       })
   };


   changenewfolderpopupstate = () =>{
       this.setState({
        newfolderpopup: true,
        createspecificationmodalpopup: false
       })
   }

   

  
   

    public render() {

      
        
        


        return (

            <>
             

            <Page className="sample-page">
                <Header
                    title="View Specification Screen"
                    commandBarItems={commandBarItems}
                    titleSize={TitleSize.Large}
                />

                
                <TabBar
                    onSelectedTabChanged={this.onSelectedTabChanged}
                    selectedTabId={this.state.selectedTabId}
                    tabSize={TabSize.Compact}
                   // renderAdditionalContent={this.renderFilterBarInTabBar}
                    className="classfortab"
                >
                    
                
                

                    <Tab name="Favourites" id="tab1" />
                    <Tab name="All" id="tab2" />
                    <ButtonGroup>
                        <Button
                            text="Add Specification"
                            onClick={ () => this.changestate() }
                            iconProps={{ iconName: "Add" }}
                            subtle={true}
                        />
                        <Button
                            text="New Folder"
                            subtle={true}
                            iconProps={{ iconName: "FabricFolderFill" }}
                            onClick={() => this.changenewfolderpopupstate()}
                        />
                        <Button
                            text="Reuse"
                            subtle={true}
                            iconProps={{ iconName: "ProgressLoopOuter" }}
                            onClick={() => alert("Subtle button clicked!")}
                        />
                        <Button
                            text="Import From Cloud"
                            subtle={true}
                             iconProps={{ iconName: "Down" }}
                            onClick={() => alert("Danger button clicked!")}
                        />
                    </ButtonGroup>
                    {/* <Tab name="Add Specification" id="tab3" iconProps={{ iconName: "Add" }} />
                    <Tab name="New Folder" id="tab4"  iconProps={{ iconName: "FabricFolderFill" }} />
                    
                    <Tab name="Reuse" id="tab5" iconProps={{ iconName: "ProgressLoopOuter" }} />
                    <Tab name="Import from cloud" id="tab6" iconProps={{ iconName: "Down" }} /> */}
                </TabBar>
                
                {this.getPageContent()}

                
                <CreateSpecificationModal 
                     CSmodalpopup={this.state.createspecificationmodalpopup}
                    
                     onSelectedTabChanged={this.onSelectedTabChanged}
                />

                <NewFolderDialog
                    abv={this.state.newfolderpopup}
                    onSelectedTabChanged={this.onSelectedTabChanged}
                />
            </Page>


            </>

        );


       


    }

    private onSelectedTabChanged = (newTabId: string) => {
        this.setState({
            selectedTabId: newTabId,
            newfolderpopup: false,
            createspecificationmodalpopup: false
        });

        const { selectedTabId } = this.state;

    };

  



    

    private renderFilterBarInTabBar = () => {

        
        if (this.state.selectedTabId === "tab1" || this.state.selectedTabId === "tab2" ) {
            return(
                <>
                    
                    { <ButtonGroup>
                        <Button
                            text="Add Specification"
                            onClick={() => alert("Default button clicked!")}
                            iconProps={{ iconName: "Add" }}
                            subtle={true}
                        />
                        <Button
                            text="New Folder"
                            subtle={true}
                            iconProps={{ iconName: "FabricFolderFill" }}
                            onClick={() => alert('hh')}
                        />
                        <Button
                            text="Reuse"
                            subtle={true}
                            iconProps={{ iconName: "ProgressLoopOuter" }}
                            onClick={() => alert("Subtle button clicked!")}
                        />
                        <Button
                            text="Import From Cloud"
                            subtle={true}
                             iconProps={{ iconName: "Down" }}
                            onClick={() => alert("Danger button clicked!")}
                        />
                    </ButtonGroup>}
                    

                    </>

                );
                

        }
        return undefined;
    };

  
   
    
    

    // private renderFilterBarInContent = () => {
    //     if (this.state.selectedTabId === "tab3") {
    //         return (
    //             <FilterBar filter={this.filter}>
    //                 <KeywordFilterBarItem filterItemKey="keyword" />
    //                 <DropdownFilterBarItem
    //                     filterItemKey="picklist"
    //                     filter={this.filter}
    //                     items={[{ id: "Item 1", text: "Item 1" }, { id: "Item 2", text: "Item 2" }]}
    //                     selection={new DropdownSelection()}
    //                     placeholder="Dropdown"
    //                 />
    //             </FilterBar>
    //         );
    //     }
    //     return null;
    // };

    private getPageContent() {

        

        const { selectedTabId } = this.state;
        if (selectedTabId === "tab1") {
        return <div className={"page-content"}> <ViewSpecs/> </div>;
        } else if (selectedTabId === "tab2") {
            return <div className={"page-content"}> <ViewSpecs/> </div>;
        } else if (selectedTabId === "tab3") {
            return(
                <div className={"page-content"}> 
               

                </div>
            );
        }
        else if (selectedTabId === "tab4") {
            return(
                <div className={"page-content"}>
                   
                </div>
            );
        }
        else if (selectedTabId === "tab5") {
            return(
                <div className={"page-content"}> Tab 5</div>
            );
        }
        else if (selectedTabId === "tab6") {
            return(
                <div className={"page-content"}> Tab 6</div>
            );
        }
        
        return null;
    }
}

