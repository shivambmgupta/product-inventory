import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Action from '../../redux/actions';
import styles from './style.module.css';
import { Button } from 'antd';
import AddProductModal from '../../modals/AddProductModal';
import FilterModal from '../../modals/FilterModal';
import Product from '../../components/Product';
import consts from '../../constants/consts';
import {FilterFilled} from '@ant-design/icons'

export default (props) => {
    const [addProductModalVisibility, toggleProductModalVisbility] = useState(false);
    const [filterModalVisibility, toggleFilterModalVisibility] = useState(false);
    const user = useSelector(store => store.user);
    const products = useSelector(store => store.products);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!user) props.history.push("/")
    }, [user]);
    const logout = () => {
        dispatch(Action.userLogout());
    }
    const handleAddProductModal = () => {
        toggleProductModalVisbility(true);
    }
    const handleFilterModal = () => {
        toggleFilterModalVisibility(true);
    }
    return (
        user
            ? <div className={styles.outerWrapper}>
                <div className={styles.innerWrapper}>
                    <div className={styles.header}>
                        <div className={styles.headerContent}>
                            <Button type="primary" shape="circle" size="large" >{user.username?.charAt(0)?.toUpperCase()}</Button>
                            <span style={{ fontWeight: 'bold', fontSize: 24, marginLeft: 10 }}>{`Hi, ${user.username?.substr(0, user.username?.indexOf('@'))}`}</span>
                        </div>
                        <div className={styles.headerContent}>
                            <Button type="primary" shape="round" size='large' onClick={logout} >
                                {consts.LOGOUT}
                            </Button>
                        </div>
                    </div>
                    <div className={styles.body}>
                        {
                            products?.length
                                ? <div className={styles.productList}>
                                    {
                                        products.map(product => <Product product={product} />)
                                    }
                                </div>
                                : <div className={styles.empty}>
                                    {consts.EMPTY_MESSAGE}
                                </div>
                        }
                    </div>
                </div>
                <div className={styles.addButton}>
                    {
                        products?.length >= 2 &&
                        <button className={`${styles.floatingButton} ${styles.filterButton}`} onClick={handleFilterModal}><FilterFilled style={{ fontSize: 20 }} /></button>
                    }
                    <button className={`${styles.floatingButton} ${styles.addProductButton}`} onClick={handleAddProductModal}>+</button>
                </div>
                <FilterModal visible={filterModalVisibility} toggleModalVisbility={toggleFilterModalVisibility} />
                <AddProductModal visible={addProductModalVisibility} toggleModalVisbility={toggleProductModalVisbility} />
            </div>
            : <div className={styles.blank} />
    );
}