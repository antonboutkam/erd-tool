import { DagreEngine, PathFindingLinkFactory } from '@projectstorm/react-diagrams';
import * as React from 'react';
import { TopButton, TopButtonRight, WorkspaceWidget } from './helpers/WorkspaceWidget';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { CanvasContainerWidget } from './helpers/CanvasContainerWidget';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchMinus, faSearchPlus, faTable, faCogs } from '@fortawesome/free-solid-svg-icons';
import { Settings } from "./Settings";
import { Messenger } from "./helpers/Messenger";
/**
 * Tests auto distribution
 */
export class WorkspaceContainer extends React.Component {
    constructor(props) {
        super(props);
        this.autoDistribute = () => {
            this.engine.redistribute(this.props.model);
            // only happens if pathfing is enabled (check line 25)
            this.reroute();
            this.props.engine.repaintCanvas();
            this.props.engine.getModel().setZoomLevel(Settings.defaultZoomLevel);
        };
        this.engine = new DagreEngine({
            graph: {
                rankdir: 'LR',
                ranker: 'tight-tree',
                compound: true,
                nodesep: 10,
                edgesep: 10,
                ranksep: 5,
                marginx: 4,
                marginy: 4
            },
            includeLinks: true
        });
        WorkspaceContainer.staticEngine = this.engine;
        this.zoom = this.zoom.bind(this);
        this.zoomOut = this.zoomOut.bind(this);
        this.zoomIn = this.zoomIn.bind(this);
    }
    static getEngine() {
        return WorkspaceContainer.staticEngine;
    }
    componentDidMount() {
        setTimeout(() => {
            this.props.engine.zoomToFit();
            this.autoDistribute();
            setTimeout(() => {
                this.zoom(Settings.defaultZoomLevel);
            }, 500);
        }, 1000);
    }
    reroute() {
        this.props.engine
            .getLinkFactories()
            .getFactory(PathFindingLinkFactory.NAME)
            .calculateRoutingMatrix();
        setTimeout(() => {
            this.zoom(Settings.defaultZoomLevel);
        }, 500);
    }
    zoom(zoomDifference) {
        const enine = this.props.engine;
        const model = enine.getModel();
        console.log('factor: ' + zoomDifference + ', level: ' + model.getZoomLevel());
        let zoomLevel = model.getZoomLevel();
        model.setZoomLevel(zoomLevel + zoomDifference);
        enine.repaintCanvas();
    }
    zoomOut() {
        this.zoom(-1.1);
    }
    zoomIn() {
        this.zoom(1.1);
    }
    render() {
        const zoomInIcon = (React.createElement(FontAwesomeIcon, { icon: faSearchPlus }));
        const zoomOutIcon = (React.createElement(FontAwesomeIcon, { icon: faSearchMinus }));
        const modelIcon = (React.createElement(FontAwesomeIcon, { icon: faTable }));
        const cogsIcon = (React.createElement(FontAwesomeIcon, { icon: faCogs }));
        let buttons = (React.createElement(React.Fragment, null,
            React.createElement(TopButton, { onClick: this.autoDistribute }, " Re-distribute"),
            React.createElement(TopButton, { onClick: this.zoomIn },
                zoomInIcon,
                " Zoom in"),
            React.createElement(TopButton, { onClick: this.zoomOut },
                zoomOutIcon,
                " Zoom out"),
            React.createElement(TopButton, { onClick: () => Messenger.send('add_model', {}) },
                modelIcon,
                " Add model"),
            React.createElement(TopButtonRight, { onClick: () => Messenger.send('deploy', { deploy: true }) },
                cogsIcon,
                " Deploy")));
        return (React.createElement(WorkspaceWidget, { buttons: buttons },
            React.createElement(CanvasContainerWidget, null,
                React.createElement(CanvasWidget, { engine: this.props.engine }))));
    }
}
