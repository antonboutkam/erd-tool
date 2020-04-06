import * as React from 'react';
import styled from '@emotion/styled';
var S;
(function (S) {
    S.Toolbar = styled.div `
		padding: 5px;
		display: flex;
		flex-shrink: 0;
	`;
    S.Content = styled.div `
		flex-grow: 1;
		height: 100%;
	`;
    S.Container = styled.div `
		background: black;
		display: flex;
		flex-direction: column;
		height: 100%;
		border-radius: 5px;
		overflow: hidden;
	`;
})(S || (S = {}));
export const TopButton = styled.button `
	background: rgb(60, 60, 60);
	font-size: 14px;
	padding: 5px 10px;
	border: none;
	color: white;
	outline: none;
	cursor: pointer;
	margin: 2px;
	border-radius: 3px;

	&:hover {
		background: rgb(0, 192, 255);
	}
`;
export const TopButtonRight = styled.button `
	background: rgb(60, 60, 60);
	font-size: 14px;
	padding: 5px 10px;
	border: none;
	color: white;
	outline: none;
	cursor: pointer;
	margin: 2px;
	border-radius: 3px;

	&:hover {
		background: rgb(0, 192, 255);
	}
`;
export class WorkspaceWidget extends React.Component {
    render() {
        return (React.createElement(S.Container, null,
            React.createElement(S.Toolbar, null, this.props.buttons),
            React.createElement(S.Content, null, this.props.children)));
    }
}
