import React, { useState } from 'react'
import styles from './segment.module.scss'
import AddSegment from '../../components/addsegment';

const Segments = () => {
    const [open ,setOpen]=useState(false);
    const onClose=()=>{
        setOpen(false);
    }

    const openModal=()=>{
        setOpen(true)
    }

  return (
    <div className={styles.segmentWrapper}>
        <div className={styles.btn} onClick={openModal}>
            Segments
        </div>
        <AddSegment {...{open,onClose}}/>
    </div>
  )
}

export default Segments