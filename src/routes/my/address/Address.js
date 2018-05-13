import React, { Component } from 'react';
import { Link } from "dva/router";
import { List, Radio, Modal } from 'antd-mobile';
import { connect } from "dva";
import styles from "./Address.css";

const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;

class Address extends Component {
    change = (e, id) =>{
        const datas = this.props.address.data;
        datas.map(i => {
            i.checked = false;
            if(i.id === id) {
                i.checked = true;
            }
            return null;
        });
        this.props.dispatch({ type: 'address/change', payload: {data: datas}});
    }
    // 删除该地址
    delete = (id) => {
        alert('确定删除吗？', '', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确定', onPress: () => {
                const datas = this.props.address.data;
                let arr = [];
                datas.map(i => {
                    if(i.id !== id) {
                        arr.push(i);
                    };
                    return null;
                });
                this.props.dispatch({ type: 'address/change', payload: { data: arr } });
            } },
        ])
    }
    render() {
        const data = this.props.address.data;
        return (
            <div>
               { 
                   data.map(i => 
                        <List className="my-list" key={i.id}>
                            <Item
                                extra={
                                    <Link to="./write"><i className="fa fa-edit"></i></Link>
                                }
                                multipleLine
                            >
                                {i.name} {i.phone}<Brief>{i.address}</Brief>
                            </Item>
                            <div className={styles.radio}>
                                <Radio className={styles.myradio} onChange={(e, id) => {this.change(e, i.id)}} checked={i.checked}>设为默认地址</Radio>
                                <i className="fa fa-trash" style={{ float: 'right', marginRight: '20px'}} onClick={(id) => this.delete(i.id)}></i>
                            </div>
                        </List>
                   )
               }
               <Link to="./write">
                <footer>
                    新增收货地址
                </footer>
               </Link>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return { address: state.address };
}

const AddressState = connect(mapStateToProps)(Address);

export default AddressState;