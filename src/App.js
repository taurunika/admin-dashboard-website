import React from 'react'
import Topbar from './Component/Topbar/topbar'
import Footer from './Component/Footer/footer'
import './App.module.css'
import Account from './Containers/Accounts/account'
import Product from './Containers/Product/product';
import AddProduct from './Containers/AddProduct/addproduct'
import Login from './Containers/Login/login'
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import axios from 'axios';
import DashBoard from './Containers/Dashboard/dashboard';
import {connect} from 'react-redux';
import Hoc from './HOC/hoc';

class App extends React.Component{
  state={
    loginStatus: this.checkLogin(),
    active: 1,
    AllData: {}
  }

  shouldComponentUpdate(){
    return true
  }

  checkLogin(){
    if(window.localStorage.getItem('loginCheck') === null){
        window.localStorage.setItem("loginCheck", 'false')
        return "false"
    }
    else return window.localStorage.getItem('loginCheck')
  }

  ifLogin(){
    window.localStorage.setItem('loginCheck', 'true')
    this.setState({loginStatus: 'true'})
  }

  ifLogout(mop){
    window.localStorage.setItem('loginCheck', 'false')
    this.setState({loginStatus: 'false'})
    mop.push("/")
  }

  componentDidMount(){

    let funcAxios = async ()=>{
        await axios.get("https://reactmusicplayer-ab9e4.firebaseio.com/project-data.json")
        .then(response=>{
                this.setState({AllData: {...response.data}})
                this.props.updatedProData(response.data)

                let prodObj = {
                    categories: [...response.data.productsPage.categories],
                    products: []
                }
                let arr = response.data.productsPage.products.map((item,pos)=>{
                    item.id = pos+1;
                    item.isChecked = false;
                    return item
                })
                prodObj.products = arr
                this.props.ProductData(prodObj)
                this.props.accountData(response.data.accountsPage)

        })
        .catch(err=>{
            console.log(err)
        })
    }
    funcAxios();
  }


  render(){
        return (
        <Hoc hoc={this.props.projectData}>
            <div className="App">

                <BrowserRouter>
                    <Route path="/" render={(renderProps)=> <Topbar loginStatus={this.state.loginStatus} onlogClick={this.ifLogout.bind(this)} active={this.state.active} history={renderProps.history}/> }/>
                    <Switch>
                    <Route exact path="/" render={(renProps)=>{
                        return(
                        this.state.loginStatus==="true"?<DashBoard />:<Login forLogin={this.ifLogin.bind(this)} history={renProps.history}/>
                        )
                    }} />
                    <Route exact path={"/account"} component={this.state.loginStatus==="true"?Account:null}/>
                    <Route exact path={"/products"} component={this.state.loginStatus==="true"?Product:null}/>
                    <Route exact path={"/addProduct/:id"} component={AddProduct}/>
                    </Switch>
                </BrowserRouter>

                <Footer />
            </div>
        </Hoc>
        );
  }
}

const dispatchToGlobalStore = (dispatch)=>{
    return{
        updatedProData : (e)=> {
           return dispatch({type: "new-pro-data", newData: e})
        },
        ProductData : (e)=>{
            return dispatch({type: "PRODUCT-PAGE-UPDATE", productData: e})
        },
        accountData: (e)=>{
            return dispatch({type: "ACCOUNT-DATA-UPDATE", accountData: e})
        }
    }
}

const getDataFromGlobalStore = (globalStore)=>{
    return{
        projectData: globalStore.wholeData.projectData
    }
}



export default connect(getDataFromGlobalStore,dispatchToGlobalStore)(App);
