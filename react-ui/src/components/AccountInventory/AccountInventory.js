import React, { Component } from 'react';
import {
  PageHeader,
  IconSettings,
  Icon,
  DataTable,
  DataTableColumn,
  DataTableCell,
  Spinner,
  Card,
  Button,
  MediaObject
} from '@salesforce/design-system-react';
import { connect } from 'react-redux';
import { 
  addEmailInventoryJob, 
  updateEmailInventoryJob,
  addTemplateInventoryJob,
  updateTemplateInventoryJob,
  addCategoriesJob,
  updateCategoriesJob,
  addTriggeredSendsJob,
  updateTriggeredSendsJob,
  addCloudPagesJob,
  updateCloudPagesJob,
  addDataExtensionsJob,
  updateDataExtensionsJob,
  addFilterDataJob,
  updateFilterDataJob,
  addQueriesJob,
  updateQueriesJob,
  addAutomationsJob,
  updateAutomationsJob,
  addJourneysJob,
  updateJourneysJob,
  addBusinessUnitsJob,
  updateBusinessUnitsJob,
  addAccountUsersJob,
  updateAccountUsersJob,
  addRolesJob,
  updateRolesJob,
  changeAccountInventorySelected,
  clearAccountInventorySelected
} from '../../stateManagement/actions'
import './AccountInventory.css'
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { store } from '../../stateManagement/store' // importing to dispatch action outside component scope


const mapStateToProps = (state) => {
  return {
    emailInventory: state.emailInventory,
    emailInventoryJob: state.emailInventoryJob,
    emailInventoryJobState: state.emailInventoryJobState,
    templateInventory: state.templateInventory,
    templateInventoryJob: state.templateInventoryJob,
    templateInventoryJobState: state.templateInventoryJobState,
    categories: state.categories,
    categoriesJob: state.categoriesJob,
    categoriesJobState: state.categoriesJobState,
    triggeredSends: state.triggeredSends,
    triggeredSendsJob: state.triggeredSendsJob,
    triggeredSendsJobState: state.triggeredSendsJobState,
    cloudPages: state.cloudPages,
    cloudPagesJob: state.cloudPagesJob,
    cloudPagesJobState: state.cloudPagesJobState,
    dataExtensions: state.dataExtensions,
    dataExtensionsJob: state.dataExtensionsJob,
    dataExtensionsJobState: state.dataExtensionsJobState,
    filterData: state.filterData,
    filterDataJob: state.filterDataJob,
    filterDataJobState: state.filterDataJobState,
    queries: state.queries,
    queriesJob: state.queriesJob,
    queriesJobState: state.queriesJobState,
    automations: state.automations,
    automationsJob: state.automationsJob,
    automationsJobState: state.automationsJobState,
    journeys: state.journeys,
    journeysJob: state.journeysJob,
    journeysJobState: state.journeysJobState,
    businessUnits: state.businessUnits,
    businessUnitsJob: state.businessUnitsJob,
    businessUnitsJobState: state.businessUnitsJobState,
    accountUsers: state.accountUsers,
    accountUsersJob: state.accountUsersJob,
    accountUsersJobState: state.accountUsersJobState,
    roles: state.roles,
    rolesJob: state.rolesJob,
    rolesJobState: state.rolesJobState
  };
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

// Handles the logic for changing the details if User selects a different item or clearing it if they select the same item 
const handleClick = (e) => {
  let state = store.getState()
  if (state.accountInventorySelected === e.target.innerText) {
    store.dispatch(clearAccountInventorySelected())
  } else {
    store.dispatch(changeAccountInventorySelected(e.target.innerText))
  }
}

const CustomDataTableCell = ({ children, ...props }) => (
  <DataTableCell {...props}>
    <Link onClick={handleClick}>
      {children}
    </Link>
  </DataTableCell>
)
CustomDataTableCell.displayName = DataTableCell.displayName;


class AccountInventory extends Component {
  constructor(props) {
    super(props);

  }
  
  componentDidMount() {
    if (
      this.props.emailInventoryJobState === '' &&
      this.props.templateInventoryJobState === '' &&
      this.props.categoriesJobState === '' &&
      this.props.triggeredSendsJobState === '' &&
      this.props.cloudPagesJobState === '' &&
      this.props.dataExtensionsJobState === '' &&
      this.props.filterDataJobState === '' &&
      this.props.queriesJobState === '' &&
      this.props.automationsJobState === '' &&
      this.props.journeysJobState === '' && 
      this.props.businessUnitsJobState === '' &&
      this.props.accountUsersJobState === '' &&
      this.props.rolesJobState === ''
    ) {
      this.props.dispatch(addEmailInventoryJob())
      this.props.dispatch(addTemplateInventoryJob())
      this.props.dispatch(addCategoriesJob())
      this.props.dispatch(addTriggeredSendsJob())
      this.props.dispatch(addCloudPagesJob())
      this.props.dispatch(addDataExtensionsJob())
      this.props.dispatch(addFilterDataJob())
      this.props.dispatch(addQueriesJob())
      this.props.dispatch(addAutomationsJob())
      this.props.dispatch(addJourneysJob())
      this.props.dispatch(addBusinessUnitsJob())
      this.props.dispatch(addAccountUsersJob())
      this.props.dispatch(addRolesJob())

      setInterval(() => {
        if (this.props.emailInventoryJobState !== 'completed') {
          this.props.dispatch(updateEmailInventoryJob(this.props.emailInventoryJob));
        } 

        if (this.props.templateInventoryJobState !== 'completed') {
          this.props.dispatch(updateTemplateInventoryJob(this.props.templateInventoryJob));
        }
        
        if (this.props.categoriesJobState !== 'completed') {
          this.props.dispatch(updateCategoriesJob(this.props.categoriesJob));
        }

        if (this.props.triggeredSendsJobState !== 'completed') {
          this.props.dispatch(updateTriggeredSendsJob(this.props.triggeredSendsJob));
        }

        if (this.props.cloudPagesJobState !== 'completed') {
          this.props.dispatch(updateCloudPagesJob(this.props.cloudPagesJob));
        }

        if (this.props.dataExtensionsJobState !== 'completed') {
          this.props.dispatch(updateDataExtensionsJob(this.props.dataExtensionsJob));
        }

        if (this.props.filterDataJobState !== 'completed') {
          this.props.dispatch(updateFilterDataJob(this.props.filterDataJob));
        }

        if (this.props.queriesJobState !== 'completed') {
          this.props.dispatch(updateQueriesJob(this.props.queriesJob));
        }

        if (this.props.automationsJobState !== 'completed') {
          this.props.dispatch(updateAutomationsJob(this.props.automationsJob));
        }

        if (this.props.journeysJobState !== 'completed' ) {
          this.props.dispatch(updateJourneysJob(this.props.journeysJob));
        }

        if (this.props.businessUnitsJobState !== 'completed') {
          this.props.dispatch(updateBusinessUnitsJob(this.props.businessUnitsJob))
        }

        if (this.props.accountUsersJobState !== 'completed') {
          this.props.dispatch(updateAccountUsersJob(this.props.accountUsersJob))
        }

        if (this.props.rolesJobState !== 'completed') {
          this.props.dispatch(updateRolesJob(this.props.rolesJob))
        }

      }, 2000 )
    }
  }  


  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.emailInventoryJobState === 'completed' &&
      prevProps.templateInventoryJobState === 'completed' &&
      prevProps.categoriesJobState === 'completed' &&
      prevProps.triggeredSendsJobState === 'completed' &&
      prevProps.cloudPagesJobState === 'completed' &&
      prevProps.dataExtensionsJobState === 'completed' &&
      prevProps.filterDataJobState === 'completed' &&
      prevProps.queriesJobState === 'completed' &&
      prevProps.automationsJobState === 'completed' &&
      prevProps.journeysJobState === 'completed' && 
      prevProps.businessUnitsJobState === 'completed' &&
      prevProps.accountUsersJobState === 'completed' &&
      this.props.emailInventoryJobState !== 'completed' &&
      this.props.templateInventoryJobState !== 'completed' &&
      this.props.categoriesJobState !== 'completed' &&
      this.props.triggeredSendsJobState !== 'completed' &&
      this.props.cloudPagesJobState !== 'completed' &&
      this.props.dataExtensionsJobState !== 'completed' &&
      this.props.filterDataJobState !== 'completed' &&
      this.props.queriesJobState !== 'completed' &&
      this.props.automationsJobState !== 'completed' &&
      this.props.journeysJobState !== 'completed' && 
      this.props.businessUnitsJobState !== 'completed' &&
      this.props.accountUsersJobState !== 'completed'
    ) {
      setInterval(() => {
        if (this.props.emailInventoryJobState !== 'completed') {
          this.props.dispatch(updateEmailInventoryJob(this.props.emailInventoryJob));
        } 

        if (this.props.templateInventoryJobState !== 'completed') {
          this.props.dispatch(updateTemplateInventoryJob(this.props.templateInventoryJob));
        }
        
        if (this.props.categoriesJobState !== 'completed') {
          this.props.dispatch(updateCategoriesJob(this.props.categoriesJob));
        }

        if (this.props.triggeredSendsJobState !== 'completed') {
          this.props.dispatch(updateTriggeredSendsJob(this.props.triggeredSendsJob));
        }

        if (this.props.cloudPagesJobState !== 'completed') {
          this.props.dispatch(updateCloudPagesJob(this.props.cloudPagesJob));
        }

        if (this.props.dataExtensionsJobState !== 'completed') {
          this.props.dispatch(updateDataExtensionsJob(this.props.dataExtensionsJob));
        }

        if (this.props.filterDataJobState !== 'completed') {
          this.props.dispatch(updateFilterDataJob(this.props.filterDataJob));
        }

        if (this.props.queriesJobState !== 'completed') {
          this.props.dispatch(updateQueriesJob(this.props.queriesJob));
        }

        if (this.props.automationsJobState !== 'completed') {
          this.props.dispatch(updateAutomationsJob(this.props.automationsJob));
        }

        if (this.props.journeysJobState !== 'completed' ) {
          this.props.dispatch(updateJourneysJob(this.props.journeysJob));
        }

        if (this.props.businessUnitsJobState !== 'completed') {
          this.props.dispatch(updateBusinessUnitsJob(this.props.businessUnitsJob))
        }

        if (this.props.accountUsersJobState !== 'completed') {
          this.props.dispatch(updateAccountUsersJob(this.props.accountUsersJob))
        }

        // if (this.props.rolesJobState !== 'completed') {
        //   this.props.dispatch(updateRolesJob(this.props.rolesJob))
        // }

      }, 2000 )
    }
  }

  handleRefresh = () => {
    this.props.dispatch(addEmailInventoryJob())
    this.props.dispatch(addTemplateInventoryJob())
    this.props.dispatch(addCategoriesJob())
    this.props.dispatch(addTriggeredSendsJob())
    this.props.dispatch(addCloudPagesJob())
    this.props.dispatch(addDataExtensionsJob())
    this.props.dispatch(addFilterDataJob())
    this.props.dispatch(addQueriesJob())
    this.props.dispatch(addAutomationsJob())
    this.props.dispatch(addJourneysJob())
    this.props.dispatch(addBusinessUnitsJob())
    this.props.dispatch(addAccountUsersJob())
    // this.props.dispatch(addRolesJob())
  }


  render() {
    let displayResult;
    let inventoryItems;
    let info;

    if (
      this.props.emailInventoryJobState === 'completed' &&
      this.props.templateInventoryJobState === 'completed'
    ) {
      inventoryItems = [
        {
          object: 'Html Emails',
          count: this.props.emailInventory.htmlEmailData.count 
        },
        {
          object: 'Templated Emails',
          count: this.props.emailInventory.templateEmailData.count 
        },
        {
          object: 'Text Only Emails',
          count: this.props.emailInventory.textOnlyEmailData.count
        },
        {
          object: 'Templates',
          count: this.props.templateInventory.count
        },
        {
          object: 'Categories',
          count: this.props.categories.count
        },
        {
          object: 'Triggered Sends',
          count: this.props.triggeredSends.length
        },
        {
          object: 'Cloud Pages',
          count: this.props.cloudPages.count
        },
        {
          object: 'Data Extensions',
          count: this.props.dataExtensions.length
        },
        {
          object: 'Filters',
          count: this.props.filterData.length
        },
        {
          object: 'Queries',
          count: this.props.queries.length
        },
        {
          object: 'Automations',
          count: this.props.automations.length
        },
        {
          object: 'Journeys',
          count: this.props.journeys.count
        },
        // Might remove Business units if it only returns the BU the app runs in
        {
          object: 'Business Units',
          count: this.props.businessUnits.length
        },
        {
          object: 'Users',
          count: this.props.accountUsers.length
        },
      ]

      info = (
        <div className="slds-text-color_success">
          Finished - Results retrieved! 
        </div>
      )
    } else {
      info = (
        <div className="slds-text-color_weak">
          Retrieving results...
        </div>
      )
      inventoryItems = []    
    }

    let columns = [
      <DataTableColumn 
        key='object'
        label='Object'
        property='object'
      >
        <CustomDataTableCell />
      </DataTableColumn>,
      <DataTableColumn 
        key='count'
        label='Count'
        property='count'
      />
    ]

    return (
      <div className="AccountInventory-panel">
        <IconSettings iconPath='/icons/'>
          <div className='slds-grid slds-grid_vertical'>
            <Card
              id='ExampleCard'
              heading='Subscribers Summary'
              headerActions={
                <Button label="Refresh" onClick={this.handleRefresh} /> 
              }
              header={
                <MediaObject 
                  body={
                    <>
                      <div className='slds-text-heading_medium'>
                        Account Inventory
                      </div>
                      {info}
                    </>
                  }
                  figure={<Icon category="standard" name="account" />}
                  verticalCenter
                />
              }
            >
              <DataTable items={inventoryItems}>
                {columns}
              </DataTable>
            </Card>
          </div>
        </IconSettings>
      </div>
      
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountInventory);
