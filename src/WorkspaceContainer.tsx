import createEngine, {
    DiagramModel,
    DagreEngine,
    DiagramEngine,
    PathFindingLinkFactory
} from '@projectstorm/react-diagrams';
import * as React from 'react';
import { TopButton, WorkspaceWidget } from './helpers/WorkspaceWidget';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { CanvasContainerWidget } from './helpers/CanvasContainerWidget';

/**
 * Tests auto distribution
 */
export class WorkspaceContainer extends React.Component<{ model: DiagramModel; engine: DiagramEngine }, any> {
    engine: DagreEngine;

    constructor(props) {
        super(props);
        this.engine = new DagreEngine({
            graph: {
                rankdir: 'LR',
                ranker: 'longest-path',
                compound:true,
                marginx: 20,
                marginy: 20
            },
            includeLinks: true
        });
    }

    autoDistribute = () => {
        this.engine.redistribute(this.props.model);

        // only happens if pathfing is enabled (check line 25)
        this.reroute();
        this.props.engine.repaintCanvas();
    };

    componentDidMount(): void {
        setTimeout(() => {
            this.autoDistribute();
        }, 500);
    }

    reroute() {
        this.props.engine
            .getLinkFactories()
            .getFactory<PathFindingLinkFactory>(PathFindingLinkFactory.NAME)
            .calculateRoutingMatrix();
    }

    render() {

        return (
            <WorkspaceWidget buttons={<TopButton onClick={this.autoDistribute}>Re-distribute</TopButton>}>
                <CanvasContainerWidget>
                    <CanvasWidget engine={this.props.engine} />
                </CanvasContainerWidget>
            </WorkspaceWidget>
        );
    }
}
