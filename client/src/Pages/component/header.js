import React,{useState} from 'react';
import { Menu,Badge } from 'antd';
import { AppstoreOutlined,UserAddOutlined,ShoppingCartOutlined,ShopOutlined,UserOutlined,LogoutOutlined } from '@ant-design/icons';
import {Link, useHistory, withRouter}from 'react-router-dom';
import {auth}from '../../firebaseConfig'
// import { toast } from 'react-toastify';
import {useDispatch,useSelector}from 'react-redux';
import * as actionTypes from '../../redux/actionType';
import SearchIcon from './forms/searchIcon';


//useHistory hooks can be used

const { SubMenu } = Menu;

const Header=(props)=>{

    const [current,setCurrent]=useState('mail');
    const dispatch=useDispatch();
    const history=useHistory();
    const {user,cart} = useSelector(state => state);

    console.log(cart);

    const handleClick = e => {
        // console.log(e.key);
        setCurrent(e.key);
      };

    //   console.log(props);
    const onLogoutHandler=async()=>{  
        
            await auth.signOut()
            // toast.success('Logout successfully');
            dispatch({
                type:actionTypes.LOGGED_OUT_USER,
                payload:null
            })
            history.push('/login')

          
    }

    return(
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="home" icon={<AppstoreOutlined />}>
                <Link to='/'>Home</Link>
            </Menu.Item>

            <Menu.Item key="shop" icon={<ShopOutlined />}>
                    <Link to='/shop/filter'>Shop</Link>
            </Menu.Item>
            <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
                <Badge count={cart.length} offset={[9,0]}>
                   <Link to='/cart'>Cart</Link>
                </Badge>
            </Menu.Item>

            {!user&&
            <Menu.Item key="register"icon={<UserAddOutlined />} className="float-right">
                <Link to='/register'>Register</Link>
            </Menu.Item>}

            {
                !user &&
                <Menu.Item key="login" icon={<UserOutlined />} className="float-right" >
                    <Link to='/login'>Login</Link>
                </Menu.Item>
            }
            
        
            {
                user &&
               ( 
        
                    <SubMenu className="float-right" 
                    key="username" 
                    title={user?.email.split('@')[0]}
                    >
                        <Menu.ItemGroup >
                            <Menu.Item  icon={<LogoutOutlined />}>
                                {user.role==='admin'?
                                <Link to="/admin/dashboard">Dashboard</Link>
                                :
                                <Link to="/user/history">Dashboard</Link>
                                }
                            </Menu.Item>
                        </Menu.ItemGroup> 

                        <Menu.ItemGroup >
                            <Menu.Item  icon={<LogoutOutlined />} onClick={onLogoutHandler}>Logout</Menu.Item>
                        </Menu.ItemGroup>  
                    </SubMenu>
               
                )
            }

            <span className="float-right">
               <SearchIcon />
            </span>

        </Menu>
    )
}



export default withRouter(Header);

