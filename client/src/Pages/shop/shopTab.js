import React ,{useState,useEffect}from 'react';
import { getAllProducts, queryFilter ,brandsEnumValue,colorsEnumValue} from '../../functions/product';
import {useSelector,useDispatch}from 'react-redux';
import HomepageProductCard from '../component/product/homepageCard';
import { Menu, Slider,Checkbox,Radio} from 'antd';
import {DollarOutlined,DownSquareOutlined,StarOutlined,CarOutlined} from '@ant-design/icons';
import { getCategories } from '../../functions/category';
import { getSubCategories } from '../../functions/subCategory';
import StarNav from './star';
import { v4 as uuidv4 } from 'uuid';
const { SubMenu } = Menu;






const ShopTabProduct=()=>{
    const [products,setProducts]=useState([]);
    const [categories,setCategories]=useState([]);
    const [categoryIds,setCategoryIds]=useState([]);
    const {search} = useSelector(state => state);
    const [price,setPrice]=useState([0,0]);
    const [ok,setOk]=useState(false);
    const [stars,setStars]=useState(0);
    const [subs,setSubs]=useState([]);
    const [sub,setSub]=useState('');
    const [brands,setBrands]=useState([]);
    const [colors,setcolors]=useState([]);
    const [brand,setBrand]=useState('');
    const [color,setColor]=useState('');
    const [shippings,setShippings]=useState(["No","Yes"]);
    const [shipping,setShipping]=useState('');
    
    const dispatch=useDispatch();

    const {text}=search;
    
    useEffect(()=>{

        //load all product initial time

        loadAllProduct();

        //categories
        getCategories()
        .then(res=>{
            // console.log(res.data);
            setCategories(res.data);
        })
        .catch(err=>{
            console.log(err);
        })

        //sub-categories
        getSubCategories()
        .then(res=>{
            setSubs(res.data);
        })
        .catch(err=>{
            console.log(err);
        })

        //get brands enum
        brandsEnumValue()
        .then(res=>{
            setBrands(res.data);
        })
        .catch(err=>{
            console.log(err);
        })

        //get colors enum

        colorsEnumValue()
        .then(res=>{
            setcolors(res.data);
        })
        .catch(err=>{
            console.log(err);
        })

    },[])



    useEffect(()=>{
        
        let id=setTimeout(()=>{
                loadProductByQuery({query:text});
            },300);
        
        return ()=>{
            if(id){
                clearTimeout(id);
            }

        setSub('');
        setStars(0);
        setCategoryIds([]);
        setColor('');
        setBrand('');
        setShipping('');
        setPrice([0,0]);
            
        }
    },[text])

    useEffect(()=>{

        if(price[0]!==price[1])
        loadProductByQuery({price:price})
        
    },[ok])

    const loadProductByQuery=(arg)=>{
       
        queryFilter(arg)
        .then(res=>{
            // console.log(res.data);
            setProducts(res.data);
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const loadAllProduct=()=>{
        getAllProducts(10)
         .then((res)=>{
            //  console.log('this is shop',res.data);
            setProducts(res.data);
         })
         .catch(error=>{
             console.log(error);
         })
    }

    // console.log(products);

    const onPriceHandler=(v)=>{
        // console.log(v);
        setSub('');
        setStars(0);
        setCategoryIds([]);
        dispatch({
            type:'TEXT_SEARCH',
            payload:{text:''}
        })
        setColor('');
        setBrand('');
        setShipping('');

        setPrice(v);
      setTimeout(()=>{
        setOk(!ok);
      },300)
    }

    const categoryCheckbox=()=>{
        return <div className="d-flex flex-column">
            {categories.map(c=>(
                <Checkbox 
                key={c._id} 
                className="py-2 px-3 m-0"
                value={c._id}
                onChange={onCheckHandler}
                checked={categoryIds.includes(c._id)}
                >
                    {c.name}
                </Checkbox>
            ))}
        </div>
    }

    const onCheckHandler=(e)=>{
        setPrice([0,0]);
        dispatch({
            type:'TEXT_SEARCH',
            payload:{text:''}
        })
        setSub('');
        setStars(0);
        setColor('');
        setBrand('');
        setShipping('');

      const clickedIds=[...categoryIds];
      const index=clickedIds.indexOf(e.target.value);
      if(index===-1){
          clickedIds.push(e.target.value);
      }else{
          clickedIds.splice(index,1);
      }

      setCategoryIds(clickedIds); 
      loadProductByQuery({category:clickedIds});

    }


    const handleRatingChange=(value)=>{
        setCategoryIds([]);
        dispatch({
            type:'TEXT_SEARCH',
            payload:{text:''}
        })
        setPrice([0,0]);
        setSub('');
        setColor('');
        setBrand('');
        setShipping('');
        // console.log(value);
        setStars(value);
        loadProductByQuery({stars:value})
    }

    const starComponent=()=>{

        const starList=()=>{
            let arr=[];
            for(let i=5;i>0;i--){
               arr.push(<StarNav 
                key={uuidv4()}
                numberOfRatings={i} 
                handleRatingChange={handleRatingChange} />)          
            }

            return arr;
        }

        return(
            <div className="d-flex flex-column">
                {starList()}
            </div>
        )
    }

    const subCategoryList=()=> subs.map(sub=>(
        <div
        onClick={()=>onSubcategoryHandler(sub)}
         style={{cursor:'pointer'}} 
         className="p-2 m-2 badge badge-secondary" 
         key={sub._id}>{sub.name.toUpperCase()}</div>
        ))
    
const onSubcategoryHandler=(sub)=>{
    setCategoryIds([]);
    dispatch({
        type:'TEXT_SEARCH',
        payload:{text:''}
    })
    setPrice([0,0]);
    setStars(0);
    setColor('');
    setBrand('');
    setShipping('');
    setSub(sub);

    loadProductByQuery({subs:sub._id})
}   

    const brandsList=()=>{
        return (
            <div className="d-flex flex-column">
               {
                   brands.map(b=>(
                    <Radio 
                    className="pl-4 pb-2"
                    key={b}
                    value={b} 
                    name={b}
                    onChange={onBrandHandler}
                    checked={brand===b}
                    >{b.toUpperCase()}</Radio> ))
               }
            </div>
        )
    }

    const onBrandHandler=(e)=>{
        setCategoryIds([]);
        dispatch({
            type:'TEXT_SEARCH',
            payload:{text:''}
        })
        setPrice([0,0]);
        setStars(0);
        setShipping('');
        setSub('');
        setColor('');

        setBrand(e.target.value);
        loadProductByQuery({brand:e.target.value});
    }

    const colorsList=()=>{
        return (
            <div className="d-flex flex-column">
               {
                   colors.map(c=>(
                    <Radio 
                    className="pl-4 pb-2"
                    key={c}
                    value={c} 
                    name={c}
                    onChange={onColorHandler}
                    checked={color===c}
                    >{c.toUpperCase()}</Radio> ))
               }
            </div>
        )
    }

    const onColorHandler=(e)=>{
        setCategoryIds([]);
        dispatch({
            type:'TEXT_SEARCH',
            payload:{text:''}
        })
        setPrice([0,0]);
        setStars(0);
        setSub('');
        setBrand('');
        setShipping('');

        setColor(e.target.value);
        loadProductByQuery({color:e.target.value});
    }

    const shippingList=()=>{
        return (
            <div className="d-flex flex-column">
               {
                   shippings.map(c=>(
                    <Radio 
                    className="pl-4 pb-2"
                    key={c}
                    value={c} 
                    name={c}
                    onChange={onShippingHandler}
                    checked={shipping===c}
                    >{c.toUpperCase()}</Radio> ))
               }
            </div>
        )
    }

    const onShippingHandler=(e)=>{
        setCategoryIds([]);
        dispatch({
            type:'TEXT_SEARCH',
            payload:{text:''}
        })
        setPrice([0,0]);
        setStars(0);
        setSub('');
        setBrand('');
        setColor('');
        
        setShipping(e.target.value);
        // console.log(e.target.value);
        loadProductByQuery({shipping:e.target.value});
    }

   

    return(
        <div className="container-fluid">
          <div className="row justify-content-between ">
             <div className="col-sm-3  d-flex flex-column">
                <h4 className="border-bottom border-success pt-3 pb-2">search/filters</h4>
                <Menu 
                mode="inline"
                defaultOpenKeys={['1','2','3','4']}
                >
                    <SubMenu title={<span className="h5">
                        <DollarOutlined /> price
                    </span>} key="1">
                       
                             <div className="ml-3">
                                <Slider 
                                range  
                                value={price}
                                max={20000}
                                tipFormatter={(v)=>`$ ${v}`}
                                onChange={onPriceHandler}
                                />
                             </div>
                       
                    </SubMenu>
                    <SubMenu title={<span className="h5">
                        <DownSquareOutlined /> Category
                    </span>} key="2">
                         {categoryCheckbox()}
                    </SubMenu>
                    <SubMenu title={<span className="h5">
                        <StarOutlined /> Stars
                    </span>} key="3">
                         {starComponent()}
                    </SubMenu>
                    <SubMenu title={<span className="h5">
                        <DownSquareOutlined /> sub-category
                    </span>} key="4">
                         {subCategoryList()}
                    </SubMenu>
                    <SubMenu title={<span className="h5">
                        <DownSquareOutlined /> Brands
                    </span>} key="5">
                         {brandsList()}
                    </SubMenu>
                    <SubMenu title={<span className="h5">
                        <DownSquareOutlined /> Colors
                    </span>} key="6">
                         {colorsList()}
                    </SubMenu>
                    <SubMenu title={<span className="h5">
                        <CarOutlined /> Shipping
                    </span>} key="7">
                         {shippingList()}
                    </SubMenu>
                </Menu>
             </div>
             <div className="col-sm-8 mt-2">
             <h5 className="text-danger">Products</h5>
             <hr className="bg-success"/>
             <div className="row ">
                        {products.length >0 ?products.map(product=>(
                            <div key={product._id} className="col-md-4 mt-3" >
                            <HomepageProductCard
                                product={product}
                            />
                            </div>
                        )):
                        <h4 className="text-center mt-3 w-100">No Product Found</h4>
                    }
                    </div>
             </div>
          </div>
        </div>
    )
}

export default ShopTabProduct;