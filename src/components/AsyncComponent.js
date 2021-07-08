//higher order component. A component that returns another component.
import React, { Component } from 'react';

export default function asyncComponent(importComponent) {
    class AsyncComponent extends Component {
        constructor(props) {
            super();
            this.state = {
                component: null
            }
        }

        async componentDidMount() {
            // this is using the shorthand deconstructor:
            // const { default: component } = await importComponent();
            // this.setState({
            //     component: component
            // })
            // this is not using the shorthand
            const component = await importComponent();
            this.setState({
                component: component.default
            })
        }

        render() {
            const Component = this.state.component;
            return Component ? <Component {...this.props} /> : null;
        }
    }

    return AsyncComponent;
}