import React from 'react';
import style from './css/detail.css';
import img_title from '../assets/yay.jpg';
import back from '../assets/back.png';
import { Link } from 'dva/router';
import DetailBar from './detail/DetailBar.js';
import ListFooter from './detail/footer';
import { connect } from 'dva';

class Detail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            index: -500,
            showFooter: true
        }
    }

    
    componentWillReceiveProps(nextProps) {
        let index = this.state.index;
        if( this.props.showlist !== nextProps.showlist ){
            this.setState({
                index: ~index
            })
        }
    }
    
    showFooter = (bol) => {
        this.setState({
            showFooter: bol
        })
    }

    handleClick(){
        this.props.dispatch({
            type: 'shoplist/showOrNotShow'
        })
    }
    render(){
        return(
            <div style={{height: '100%'}}>
                <div className={style.boxshadow} style={{zIndex: this.state.index}} onClick={this.handleClick.bind(this)}></div>
                <div className={style.detail_head}>
                    <div className={style.wrap}>
                        <div className={style.titleimg}>
                            <img src={img_title} alt="shop" />
                        </div>
                        <div className={style.mid}>
                            <div style={{color: '#fff', fontWeight: 'bold' ,fontSize: 16}}>宠物狗饲料</div>
                            <div style={{ color: '#fff', fontSize: 12, marginTop: 10 }}>蜂鸟专送/极速送达</div>
                            <div style={{ color: '#fff', fontSize: 12, marginTop: 10 }}>在线支付满xx减xx</div>
                        </div>
                        <div className={style.backimg}>
                            <div style={{width: 40, height: 40, borderRadius: 20, background: 'rgb(104,108,111)'}}>
                                <Link to="/" ><img src={back} alt='back' /></Link>
                            </div>
                        </div>
                    </div>
                </div>               
                <DetailBar handleChange={this.showFooter.bind(this)}/>
                <ListFooter isShow={this.state.showFooter}/>
            </div>
        )
    }
}

const mapStateToProps = ({shoplist}) => {
    return {
        showlist: shoplist.showlist
    }
}

export default connect(mapStateToProps)(Detail);