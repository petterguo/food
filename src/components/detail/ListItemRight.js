import React from 'react'
import style from './css/item.css';
import plus from '../../assets/plus.png';
import decrease from '../../assets/decrease.png';
import { connect } from 'dva';
import { hasItem } from '../../publicapi';

class ListItemRight extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            num: 0
        }
    }
    handlePlus(){
        const data = this.props.data;
        // console.log(this.props);
        let recentlynum = this.state.num + 1;
        this.setState({
            num: recentlynum
        })
        this.props.dispatch({
            type: 'shoplist/addTolist',
            payload: {
                name: data.name,
                price: data.price,
                num: data.num
            }
        })
    }

    handleDecrease(){
        const data = this.props.data;
        if(this.state.num === 0){
            return
        }
        let recentlynum = this.state.num - 1;
        this.setState({
            num: recentlynum
        })
        this.props.dispatch({
            type: 'shoplist/decreaseFromlist',
            payload: {
                name: data.name,
                price: data.price,
                num: data.num
            }
        })
    }

    componentWillReceiveProps = (nextProps)=>{
        const list = nextProps.list;
        const item1 = this.props.data;
        let judge = hasItem(this.props.list, this.props.data, "name");
        let judge1 = hasItem(nextProps.list, this.props.data, "name");
        if (judge && judge1) {
            for (let index = 0; index < list.length; index++) {
                const element = list[index];
                if(element.name === item1.name){
                    this.setState({
                        num: element.num,
                    })
                    break;
                } 
            }
        }
        if(judge && !judge1){
            this.setState({
                num: 0,
            })
        }
    }

    shouldComponentUpdate = (nextProps, nextState) => {
       if(this.state.num !== nextState.num ){
           return true;
       }
       else{
           return false;
       }
    }

    render(){
        const item1 = this.props.data;
        return(
            <div className={style.detail}>
                <div className={style.title}>{item1.name}</div>
                <div className={style.sale}>月售{item1.sale}份</div>
                <div className={style.price}>
                    <span>¥{item1.price}</span>
                    <span className={style.detailbutton}>
                        <div className={style.decrease} onClick={this.handleDecrease.bind(this)}>
                            <img src={decrease} alt="-"/>
                        </div>
                        <div className={style.num}>
                            <span>{this.state.num}</span>
                        </div>
                        <div className={style.plus} onClick={this.handlePlus.bind(this)}>
                            <img src={plus} alt="+"/>
                        </div>
                    </span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({shoplist}) => {
    return {list: shoplist.list};
}
export default connect(mapStateToProps)(ListItemRight);