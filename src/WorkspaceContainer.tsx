import {DagreEngine} from "@projectstorm/react-diagrams-routing/";
import {DiagramEngine, DiagramModel} from "@projectstorm/react-diagrams-core/";
import {PathFindingLinkFactory} from "@projectstorm/react-diagrams-routing/";


import * as React from 'react';
import { TopButton, TopButtonRight, WorkspaceWidget } from './helpers/WorkspaceWidget';
import { CanvasWidget } from '@projectstorm/react-canvas-core/';
import { CanvasContainerWidget } from './helpers/CanvasContainerWidget';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearchMinus, faSearchPlus, faTable, faCogs } from '@fortawesome/free-solid-svg-icons'
import { Settings } from "./Settings";
import {Messenger} from "./helpers/Messenger";
import {ErdDiagramModel} from "./nodes/ErdDiagramModel";
import {Renderer} from "./renderer";

/**
 * Tests auto distribution
 */
export class WorkspaceContainer extends React.Component<{ model: ErdDiagramModel; engine: DiagramEngine }, any> {
    engine: DagreEngine;

    constructor(props) {
        super(props);

        this.zoom = this.zoom.bind(this);
        this.zoomOut = this.zoomOut.bind(this);
        this.zoomIn = this.zoomIn.bind(this);
    }

    autoDistribute = () => {
        const distributeEngine = new DagreEngine({
            graph: {
                rankdir: 'LR',
                ranker: 'tight-tree',
                compound:true,
                nodesep:10,
                edgesep : 10,
                ranksep : 5,
                marginx: 4,
                marginy: 4
            },
            includeLinks: true
        });
        distributeEngine.redistribute(this.props.model);
        this.reroute();
        Renderer.done(this.props.model);
        /*
        this.engine.redistribute(this.props.model);

        // only happens if pathfing is enabled (check line 25)
        this.reroute();
        this.props.engine.repaintCanvas();
        this.props.engine.getModel().setZoomLevel(Settings.defaultZoomLevel);
        */
    };

    componentDidMount(): void {
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
            .getFactory<PathFindingLinkFactory>(PathFindingLinkFactory.NAME)
            .calculateRoutingMatrix();
        setTimeout(() => {
            this.zoom(Settings.defaultZoomLevel);
        }, 500);

    }

    private zoom(zoomDifference)
    {
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

    render()
    {
        const zoomInIcon = (<FontAwesomeIcon icon={faSearchPlus} />);
        const zoomOutIcon = (<FontAwesomeIcon icon={faSearchMinus} />);
        const modelIcon = (<FontAwesomeIcon icon={faTable} />);
        const cogsIcon = (<FontAwesomeIcon icon={faCogs} />);



        let buttons = (
            <React.Fragment>
                <TopButton onClick={this.autoDistribute}> Re-distribute</TopButton>
                <TopButton onClick={this.zoomIn}>{zoomInIcon} Zoom in</TopButton>
                <TopButton onClick={this.zoomOut}>{zoomOutIcon} Zoom out</TopButton>
                <TopButton onClick={() => Messenger.send('add_model', {})}>{modelIcon} Add model</TopButton>
                <TopButtonRight onClick={() => Messenger.send('deploy', {deploy : true})}>{cogsIcon} Deploy</TopButtonRight>

            </React.Fragment>
        );

        return (
            <WorkspaceWidget buttons={buttons}>
                <CanvasContainerWidget>
                    <CanvasWidget engine={this.props.engine} />
                </CanvasContainerWidget>
            </WorkspaceWidget>
        );
    }
}
