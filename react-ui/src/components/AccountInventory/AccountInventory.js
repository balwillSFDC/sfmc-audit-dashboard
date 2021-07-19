import React, { Component } from 'react';
import {
  PageHeader,
  IconSettings,
  Icon
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
} from '../../stateManagement/actions'


const mapStateToProps = (state) => {
  return {
    emailInventory: state.emailInventory,
    emailInventoryJob: state.emailInventoryJob,
    templateInventory: state.templateInventory,
    templateInventoryJob: state.templateInventoryJob,
    categories: state.categories,
    categoriesJob: state.categories,
    triggeredSends: state.triggeredSends,
    triggeredSendsJob: state.triggeredSendsJob,
    cloudPages: state.cloudPages,
    cloudPagesJob: state.cloudPagesJob,
    dataExtensions: state.dataExtensions,
    dataExtensionsJob: state.dataExtensionsJob,
    filterData: state.filterData,
    filterDataJob: state.filterDataJob,
    queries: state.queries,
    queriesJob: state.queriesJob,
    automations: state.automations,
    automationsJob: state.automationsJob,
    journeys: state.journeys,
    journeysJob: state.journeysJob
  };
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

class AccountInventory extends Component {
  componentDidMount() {
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


    setInterval(() => {
      if (Object.keys(this.props.emailInventory).length === 0 ) {
        this.props.dispatch(updateEmailInventoryJob(this.props.emailInventoryJob));
      } 

      if (Object.keys(this.props.templateInventory).length === 0 ) {
        this.props.dispatch(updateTemplateInventoryJob(this.props.templateInventoryJob));
      }
      
      if (Object.keys(this.props.categories).length === 0 ) {
        this.props.dispatch(updateCategoriesJob(this.props.categoriesJob));
      }

      if (Object.keys(this.props.triggeredSends).length === 0 ) {
        this.props.dispatch(updateTriggeredSendsJob(this.props.triggeredSendsJob));
      }

      if (Object.keys(this.props.cloudPages).length === 0 ) {
        this.props.dispatch(updateCloudPagesJob(this.props.cloudPagesJob));
      }

      if (Object.keys(this.props.dataExtensions).length === 0 ) {
        this.props.dispatch(updateDataExtensionsJob(this.props.dataExtensionsJob));
      }

      if (Object.keys(this.props.filterData).length === 0 ) {
        this.props.dispatch(updateFilterDataJob(this.props.filterDataJob));
      }

      if (Object.keys(this.props.queries).length === 0 ) {
        this.props.dispatch(updateQueriesJob(this.props.queriesJob));
      }

      if (Object.keys(this.props.automations).length === 0 ) {
        this.props.dispatch(updateAutomationsJob(this.props.automationsJob));
      }

      if (Object.keys(this.props.journeys).length === 0 ) {
        this.props.dispatch(updateJourneysJob(this.props.journeysJob));
      }
    }, 2000 )
  }
  
  render() {
    return (
      <div>
        <IconSettings iconPage="/icons/">
          <PageHeader
            icon={<Icon category="standard" />}
            title="Account Inventory"
            variant="object-home"
            className="AccountActivityHeader"
          />
        </IconSettings>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountInventory);
