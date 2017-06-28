import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from "react-router-dom"
import Portal from 'react-portal';
import classNames from 'classnames'

import { Button, Modal } from 'semantic-ui-react'

import './styles.scss'

import NodeSearch from '../../containers/NodeSearch'

import {
    createNode,
    addNodeToCollection,
} from '../../actions/async'

class AddNodeWindow extends React.Component {
    constructor(props) {
        super(props)

        this.addExistingNode = this.addExistingNode.bind(this)
        this.addNewNode = this.addNewNode.bind(this)
    }

    addExistingNode(esResult) {
        // add existing node to the graph
        console.log('called addExistingNode', node);
        const node = esResult._source
    }

    addNewNode(label) {
        // add a new node to the graph
        console.log('called addNewNode', label);

        if (!label) {
            return;
        }

        const { collection } = this.props

        const createPromise = this.props.createNode({ name: label })
            .then(action => action.response.result)

        if (collection) {
            createPromise.then(id => this.props.addNodeToCollection(collection.id, id))
        }
    }

    render() {
        const { opened } = this.props

        const containerClass = classNames('addNodeWindow', { visible: opened })

        // TODO: disable when disabled prop is true - 2017-06-28
        return (
            <Portal isOpened={true}>
                <div className={ containerClass }>
                    <div className="addNodeWindow-container">
                        <div className="addNodeWindow-input">
                            <NodeSearch 
                                disabled={this.props.disabled}
                                onSearchClick={this.addExistingNode}
                                onEnter={this.addNewNode}
                                onClick={this.addNewNode}
                            />
                        </div>
                    </div>
                </div>
            </Portal>
        )
    }
}

export default connect(null, {
    createNode,
    addNodeToCollection,
})(AddNodeWindow);
