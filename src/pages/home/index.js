import React, { Component } from 'react';
import { composeWrapper } from '@/components/FetchWrapper';
import { withStorage } from '@/components/WithStorage'
import LoadingWrapper from '@/components/LoadingWrapper'
import ScrollIntoView from '@/components/ScrollIntoView';

function TargetTest(props) {
    console.log('props---', props);
    return (
        <img
            src={require("@/assets/test.png")}
            alt="image loaded failed，plase retry"
        />
        // <div>{'scroll test'}</div>
    )
}


class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static getDerivedStateFromProps(props, state) {
        return null;
    }

    handleClick = () => {
        import('@/utils/utils').then(funcs => {/** 按需加载 module */
            console.log('funcs', funcs.isNum(123))
        })
    }

    render() {
        // console.log('this.props---myComponent render', )

        return (
            <LoadingWrapper loading={this.props.loading}>
                <div id='scrollContainer'
                    style={{ height: 300, overflow: 'hidden', overflowY: 'auto' }}
                    onClick={this.handleClick}>
                    <p style={{ height: 300 }}> {'隔离副作用'} </p>
                    <p> {this.props.title} </p>
                    <p> {this.props.author} </p>
                    <ScrollIntoView
                        getScrollEle={() => document.getElementById("scrollContainer")}
                        limitValues={{ top: 0, bottom: 300 }}
                        target={(status) => <TargetTest status={status} />}
                    />
                </div>
            </LoadingWrapper>
        )

    }
}

function mapStateFunc(state) {
    return {
        title: state.home.title,
        author: state.home.author,
        loading: state.loading.effects['home/queryPageData']/** true:异步请求中 */
    }
}

function mapDispatchFunc(dispatch) {
    return {
        'fetch':
            () => dispatch({
                type: 'home/queryPageData',
                payload: null
            })
    }
}

const HomeComponent = composeWrapper(mapStateFunc, mapDispatchFunc, HomePage);
export default withStorage(HomeComponent);