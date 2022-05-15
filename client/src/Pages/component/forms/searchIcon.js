import React,{useState}from 'react';
import {SearchOutlined} from '@ant-design/icons';
import {useHistory}from 'react-router-dom';
import {useDispatch,useSelector}from 'react-redux';


const SearchIcon=()=>{
    // const [text,setText]=useState('');
    const dispatch=useDispatch();
    const history=useHistory();
    const {search} = useSelector(state => state);

    const {text}=search;

    const onInputHandler=(e)=>{
        dispatch({
            type:'TEXT_SEARCH',
            payload:{text:e.target.value}
        })
    }

    const onSubmitHandler=(e)=>{
      e.preventDefault();
      history.push(`/shop/filter?${text}`)
    }

// console.log(text);
    return(
        <form className="form-inline my-2" onSubmit={onSubmitHandler}>

            <input type="search" 
            className="form-control " 
            placeholder="Search" 
            value={text}
            onChange={onInputHandler}
            />

            <SearchOutlined style={{cursor:'pointer'}} onClick={onSubmitHandler} />

        </form>
    )
}

export default SearchIcon;