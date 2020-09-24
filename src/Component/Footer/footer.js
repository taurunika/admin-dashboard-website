import React from 'react';
import classes from './footer.module.css';

function footer(){
    return(
        <div className={classes.footer}>
            <p className={classes.copyright}>Copyright © 2020 All rights reserved.</p>
        </div>  
    )
}

export default footer;