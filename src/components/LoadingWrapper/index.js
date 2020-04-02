import React from 'react';
import { Icon } from 'antd-mobile'
import styles from './index.less'

export default function LoadingWrapper({ loading, children, ...rest }) {

    return (
        <div>
            {
                loading ? (
                    <div className={styles.page_loading}>
                        <Icon type={'loading'} size={'lg'} />
                    </div>
                ) : (children)
            }
        </div>
    )
}