import { localStorageUtils, cookieUtils } from '@/utils/storage'

export function withStorage(WrappedComponent) {
    return (props) => (
        <WrappedComponent
            storageUtils={localStorageUtils}
            cookieUtils={cookieUtils}
            {...props}
        />
    );
}

/**
 * 高阶组件，隔离本地存储副作用
 * 调用:
 * withLocalStorage(MyComponent)
 */