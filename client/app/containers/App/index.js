import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Switch, Route, IndexRedirect, Redirect} from "react-router-dom"

import { isLoggedIn } from '../../utils/login.js'

import Topbar from "../../components/Topbar";

import Dialogs from '../../containers/Dialogs'
import Errors from '../../containers/Errors'

// import getMuiTheme from 'material-ui/styles/getMuiTheme';
import getMuiTheme from '../../containers/App/muitheme.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { HotKeys } from 'react-hotkeys'


import CollectionOverview from "../CollectionOverview"
import CollectionOverviewEditor from "../CollectionOverviewEditor"
import NodeView from '../NodeView'
import CollectionDetailEditor from '../CollectionDetailEditor'
import NodeExploreEditor from '../NodeExploreEditor'
import InboxSidebar from '../InboxSidebar'

import EditCollectionOverlay from '../EditCollectionOverlay'

const keyMapping = {
    'explore': 'ctrl+alt+e',
    'addRelation': 'ctrl+alt+r',
    'duplicate': 'ctrl+alt+d',
    'trash': 'ctrl+alt+g',
    'addCollection': 'ctrl+alt+c',
    'focusSearch': 'ctrl+alt+f',

}

class App extends React.Component {
    constructor(props) {
        super(props)

    }

    componentWillMount() {
        if (window.ga) {
            this.props.history.listen((location) => {
                window.ga('set', 'page', location.pathname + location.search);
                window.ga('send', 'pageview')
            })
        }
    }

    render() {
        const { match, location, isLoggedIn } = this.props

        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <HotKeys keyMap={keyMapping} style={{height: '100%'}}>
                    <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
                        <Dialogs 
                            params={match.params} 
                            location={location} 
                        />
                        <EditCollectionOverlay />
                        <Errors />
                        <Topbar />

                        <InboxSidebar />

                        <Switch>

                            { /* The overview graph showing explicit collection links */ }
                            <Route exact path={'/app/collections/:id?'} component={CollectionOverview}/>

                            { /* same component to allow for smooth transitions */ }
                            <Route exact path={'/app/nodes/:nodeId?'} component={NodeView}/>
                            <Route exact path={'/app/collections/:collectionId/nodes/:nodeId?'} component={NodeView}/>

                            <Route path={'/app/collections/:id/edit'} component={CollectionOverviewEditor}/>
                            <Route path={'/app/nodes/:id/edit'} component={NodeExploreEditor}/>
                            <Route path={'/app/collections/:id/nodes/:nodeId/edit'} component={CollectionDetailEditor}/>
                            <Redirect from={'/app/'} to={'/app/collections'}/>
                        </Switch>
                        {
                            /*
                    <Route path="explore/collections" component={CollectionExplore}/>
                    <Route path="explore/collections/:id" component={CollectionExplore}/>
                    */
                        }
                    </div>
                </HotKeys>
            </MuiThemeProvider>
        )   
    }
}

function mapStateToProps(state, props) {
    return {
        isLoggedIn: isLoggedIn(),
    }
}

export default connect(mapStateToProps, {})(withRouter(App))

