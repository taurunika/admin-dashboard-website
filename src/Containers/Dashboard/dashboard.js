import React from 'react';
import classes from './dashboard.module.css';
import PieChart from '../../Component/Charts/pieChart';
import LineChart from '../../Component/Charts/lineChart';
import BarChart from '../../Component/Charts/barChart';
import 'chartjs-plugin-datalabels';
import {connect} from 'react-redux';

class dashboard extends React.Component{
    constructor(props){
        super(props);
        this.barCanvas = React.createRef();
    }

    handleClassSpan(){

    }

    render(){
        let propT = this.props.allData.dasbhoardPage
        let torenderNotification = [];
        let toRenderOrderList = [];
        if(propT!==undefined){
            for(let i=0; i<3; i++){
            let newArr = propT.notifications.map(item=>{
                return(
                    <div className={classes.testDiv}>
                        <img src={item.pic} className={classes.image}/>
                        <div className={classes.descDiv}>
                            <p className={classes.desc}>{item.message}</p>
                            <p className={classes.time}>{item.time} ago.</p>
                        </div>
                    </div>
                )
            })
            torenderNotification.push(...newArr)
            }

            toRenderOrderList = propT.orders.map(item=>{
                return (
                    <tr>
                        <td className={classes.orderNo}>{`#${item.orderNo}`}</td>
                        <td className={classes.status}><p className={`${classes.spanPara} ${classes[item.status]}`}></p>{item.status}</td>
                        <td className={classes.oper}>{item.operators}</td>
                        <td className={classes.location}>{item.location}</td>
                        <td className={classes.distance}>{item.distance}</td>
                        <td className={classes.data}>{item.startDate}</td>
                        <td className={classes.est}>{item.deliveryDate}</td>
                    </tr>
                )
            })

        }

        return(
            <div className={classes.mainDiv}>
                <div className={classes.lineChartWrapper}>
                    <h3 className={classes.chartHead}>Latest Hits</h3>
                    <LineChart data={this.props.allData.dasbhoardPage}/>
                </div>
                <div className={classes.barChartWrapper}>
                    <h3 className={classes.chartHead}>Performance</h3>
                    <BarChart data={this.props.allData.dasbhoardPage}/>
                </div>
                <div className={classes.chartWrapper}>
                    <h3 className={classes.chartHead}>Storage Information</h3>
                    <PieChart data={this.props.allData.dasbhoardPage}/>
                </div>
                <div className={classes.chartWrapper}>
                    <h3 className={classes.chartHead}>Notification Lists</h3>
                    <div className={classes.notificationDivWrapper}>
                        <div className={classes.notificationDiv}>
                            {torenderNotification}
                        </div>
                    </div>
                </div>
                <div className={classes.orderListmainWrapper}>
                    <h3>Order List</h3>
                    <div className={classes.orderTableDiv}>
                    <table className={classes.mainTable} cellSpacing="0">
                        <tr className={classes.headingRow}>
                            <th>order no.</th>
                            <th>status</th>
                            <th>operators</th>
                            <th>location</th>
                            <th>distance</th>
                            <th>start data</th>
                            <th>est delivery date</th>
                        </tr>
                        {toRenderOrderList}
                    </table>
                    </div>
                </div>
            </div>
        );
        }
}

let getData = (globalStore)=>{
    return{
        allData: globalStore.wholeData.projectData
    }
}

export default connect(getData)(dashboard);