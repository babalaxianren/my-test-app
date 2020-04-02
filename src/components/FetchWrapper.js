import { connect } from 'dva'
import { compose, lifecycle } from 'recompose';

//https://juejin.im/post/5d52f42f51882505a87a7e1b
export function composeWrapper(mapStateFunc, mapDispatchFunc, myComponent) {
    return compose(
        connect(mapStateFunc, mapDispatchFunc),
        lifecycle({
            componentDidMount() {
                // console.log('this.props---wrapper didmount')
                this.props.fetch();
            }
        })
    )(myComponent)
}
/**
 * 高阶组件，隔离接口请求副作用。
 * 调用:
 * composeWrapper(mapStateFunc,mapDispatchFunc,myComponent)
 */