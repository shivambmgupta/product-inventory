import React from 'react';
import styles from './style.module.css';
import sample from '../../assets/no_preview.png'
import Consts from '../../constants/consts'

export default (props) => {
    const { product } = props;
    return (
        <div className={styles.productCard}>
            <div className={styles.imageContainer}>
                <img className={styles.image} src={product.image ? product.image : sample} ></img>
            </div>
            <div style={{ fontSize: 30, textTransform: 'capitalize' }}><b>{product.name}</b></div>
            <div><i>{product.description}</i></div>
            <div className={styles.bottomRow}>
                <div>
                    <div className={styles.label}>
                        {Consts.PRICE}
                    </div>
                    <div className={styles.value}>
                        {
                            product.price
                        }
                    </div>
                </div>
                <div>
                    <div className={styles.label}>
                        {Consts.QUANTITY}
                    </div>
                    <div className={styles.value}>
                        {
                            product.quantity
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}