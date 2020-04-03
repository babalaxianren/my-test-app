import React, { Component, useContext } from 'react';
import { composeWrapper } from '@/components/FetchWrapper';
import { withStorage } from '@/components/WithStorage'
import LoadingWrapper from '@/components/LoadingWrapper'
import ScrollIntoView from '@/components/ScrollIntoView';
import { ThemeContext, AuthorizationContext } from '@/components/CustomContexts'

function TargetTest(props) {
    const theme = useContext(ThemeContext);
    // console.log('props---', props,theme);
    return (
        <img
            src={require("@/assets/shenzhen.png")}
            alt="image loaded failed，plase retry"
        />
    )
}
class Test extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {}
    }

    render() {
        console.log('context---', this.props);
        return (
            <div>
                Test
            </div>
        )
    }
}


class HomePage extends Component {
    constructor(props, context) {
        super(props, context);
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
        // console.log('this.props---myComponent render', this.context)

        return (
            <LoadingWrapper loading={this.props.loading}>
                <ThemeContext.Consumer>
                    {
                        (value) => {
                            console.log('value---', value)
                            return (
                                <div id='scrollContainer'
                                    style={{ height: 300, overflow: 'hidden', overflowY: 'auto' }}
                                    onClick={this.handleClick}>
                                    <p> {'隔离副作用'} </p>
                                    <p> {this.props.title} </p>
                                    <p> {this.props.author} </p>
                                    <ScrollIntoView
                                        getScrollEle={() => document.getElementById("scrollContainer")}
                                        limitValues={{ top: 0, bottom: 300 }}
                                        target={(status) => <TargetTest status={status} />}
                                    />
                                    <Test />
                                </div>
                            )
                        }
                    }
                </ThemeContext.Consumer>

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