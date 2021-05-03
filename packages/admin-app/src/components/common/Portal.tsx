import React from "react";
import ReactDOM from "react-dom";

export class Portal extends  React.Component<{children: any}>
{
    _portal: HTMLDivElement;
    constructor(props: any)
    {
        super(props);
        this._portal = document.createElement("div");
    }

    render()
    {
        return ReactDOM.createPortal(this.props.children,  this._portal);
    }

    componentDidMount()
    {
        document.body.appendChild(this._portal);
    }

    componentWillUnmount()
    {
        document.body.removeChild(this._portal);
    }
}