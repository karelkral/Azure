import * as React from "react";
import { Tab, TabBar, TabSize } from "azure-devops-ui/Tabs";
import { Header, TitleSize } from "azure-devops-ui/Header";
import { IHeaderCommandBarItem } from "azure-devops-ui/HeaderCommandBar";
import { Page } from "azure-devops-ui/Page";
import { FilterBar } from "azure-devops-ui/FilterBar";
import {
    InlineKeywordFilterBarItem,
    KeywordFilterBarItem
} from "azure-devops-ui/TextFilterBarItem";
import { IFilter, Filter } from "azure-devops-ui/Utilities/Filter";
import { DropdownSelection } from "azure-devops-ui/Utilities/DropdownSelection";
import { DropdownFilterBarItem } from "azure-devops-ui/Dropdown";
import MainGridTree from "./MainGridTree"

import "./MainGrid.css";
import { Button } from "azure-devops-ui/Button";
import { ButtonGroup } from "azure-devops-ui/ButtonGroup";
import "./maingvjs";
import { Redirect } from 'react-router-dom';


interface IPageWithTabBarExampleState {
    selectedTabId: string;
    redirect: boolean;
}





const commandBarItemsFor1: IHeaderCommandBarItem[] = [
    {
        id: "create",
        text: "Create Project",
        onActivate:  () => {

        },
        iconProps: {
            iconName: "Add"
        },
        isPrimary: true
    }
];

const commandBarItemsFor2 = [
    ...commandBarItemsFor1,
    {
        id: "otherAction",
        text: "Action",
        onActivate: () => {
            alert("Action 2");
        }
    }
];



export default class MainGrid extends React.Component<
    {},
    IPageWithTabBarExampleState
> {
    private filter: IFilter;

    constructor(props: {}) {
        super(props);
        this.state = {
            selectedTabId: "tab1",
            redirect: false,
        };
        this.filter = new Filter();
    }

     setRedirect = () => {
        this.setState({
          redirect: true
        })
      }

     renderRedirect  = () => {
        if (this.state.redirect) {
        return <Redirect to='/' />
        }
    }

    

    

    public render() {

        let commandBarItems = undefined;
        if (this.state.selectedTabId === "tab1") {
            commandBarItems = commandBarItemsFor1;
        } else if (this.state.selectedTabId === "tab2") {
            commandBarItems = commandBarItemsFor2;
        }
        return (

            <>

                

            {this.renderRedirect()}
            
            <Page className="sample-page flex-grow">

            

                <Header
                    title="Main Specification Grid"
                    titleSize={TitleSize.Large}
                    commandBarItems={commandBarItems}
                />
                <TabBar
                    
                    onSelectedTabChanged={this.onSelectedTabChanged}
                    selectedTabId={this.state.selectedTabId}
                    tabSize={TabSize.Tall}
                    renderAdditionalContent={this.renderFilterBarInTabBar}
                >
                    <Tab name="Specification" id="tab1" />
                    <Tab name="Details" id="tab2" />
                    <Tab name="Open" id="tab3" iconProps={{ iconName: "ReplyMirrored" }} />
                    <Tab name="Reuse" id="tab4" iconProps={{ iconName: "ProgressLoopOuter" }}  />
                    <Tab name="Column Option" id="tab5" iconProps={{ iconName: "AddTo" }}  />
                </TabBar>
                
                {this.renderFilterBarInContent()}
                {this.getPageContent()}
            </Page>

            </>
        );
    }

    private onSelectedTabChanged = (newTabId: string) => {
        this.setState({
            selectedTabId: newTabId
        });
    };

    private renderFilterBarInTabBar = () => {
        if (this.state.selectedTabId === "tab1") {
            return (
            <>
                 
                    
                    {/* <ButtonGroup>
                        <Button
                            text="Default button"
                            onClick={() => alert("Default button clicked!")}
                        />
                        <Button
                            text="Primary button"
                            primary={true}
                            onClick={() => alert("Primary button clicked!")}
                        />
                        <Button
                            text="Subtle button"
                            subtle={true}
                            onClick={() => alert("Subtle button clicked!")}
                        />
                        <Button
                            text="Danger button"
                            danger={true}
                            onClick={() => alert("Danger button clicked!")}
                        />
                    </ButtonGroup> */}
                    

                    
              <InlineKeywordFilterBarItem filter={this.filter} filterItemKey="keyword" />;
            </>
            )
        }
        return undefined;
    };

    private renderFilterBarInContent = () => {
        if (this.state.selectedTabId === "tab3") {
            return (
                <>
                
                <FilterBar filter={this.filter}>
                    <KeywordFilterBarItem filterItemKey="keyword" />
                    <DropdownFilterBarItem
                        filterItemKey="picklist"
                        filter={this.filter}
                        items={[{ id: "Item 1", text: "Item 1" }, { id: "Item 2", text: "Item 2" }]}
                        selection={new DropdownSelection()}
                        placeholder="Dropdown"
                    />
                </FilterBar>
                </>
            );
        }
        return null;
    };

    private getPageContent() {
        const { selectedTabId } = this.state;
        if (selectedTabId === "tab1") {
            return <div className={"page-content"}>
                <Button
                    id="goback"
                    text="Go Back"
                    onClick={() => {
                        this.setRedirect()
                    }}
                />
                <MainGridTree  />
            </div>;
        } else if (selectedTabId === "tab2") {
            return <div className={"page-content"}> Tab 2</div>;
        }
        return null;
    }
}


