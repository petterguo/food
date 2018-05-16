import React, { Component } from "react";
import { List, Flex } from "antd-mobile";
import { connect } from "dva";
import { Link } from "dva/router";
import food from "../../../assets/food5.jpg";
import yay from "../../../assets/yay.jpg";
import styles from "./ListDetail.css";

const Item = List.Item;
class ListDetail extends Component {
    multiply = (a, b) => {
        return a * b;
    }
    refund = () => {     
        this.props.dispatch({ type: 'listdetail/refund'});
    }
    render() {
        const { name, phone, list, footer } = this.props.listdetail;
        console.log(name);
        
        return(
            <div className={styles.main}>
                <img src={yay} alt="交易成功" height="80" width="100%"/>
                <header className={styles.header}>
                    <p>收货人：{name}</p>
                    <p>电话号码：{phone}</p>
                </header>
                <List className={styles.list}>
                    <Link to={`../${list.id}/detail`} className={styles.color}>
                        <Flex className={styles.listheader}>
                            <Flex.Item>{list.store}</Flex.Item>
                            <Flex.Item className={styles.textalign}>{list.result}</Flex.Item>
                        </Flex>
                   
                        <Item thumb={food} multipleLine="true" className={styles.item}>
                            <Flex>
                                <Flex.Item>
                                    <div>{list.title}</div>
                                    <div>{list.sub}</div>
                                </Flex.Item>
                                <Flex.Item className={styles.flexitem}>
                                    <div>￥{list.price}</div>
                                    <div>×{list.num}</div>
                                </Flex.Item>

                            </Flex>
                        </Item>
                    </Link>
                    <Flex className={styles.listheader}>
                        <Flex.Item className={styles.textalign}>共{list.num}件商品 合计: ￥{this.multiply(list.num, list.price)}</Flex.Item>
                    </Flex>
                    <div className={styles.refund}>
                        <span onClick={this.refund}>申请退款</span>
                    </div>
                </List>
                <footer className={styles.footer}>
                    <span>
                        订单编号：{footer.num1}
                    </span>
                    <span>
                        付款时间： { footer.time }
                    </span>
                    <span>
                        成交时间： {footer.endtime}
                    </span>
                </footer>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { listdetail: state.listdetail };
}

const ListDetailState = connect(mapStateToProps)(ListDetail);
export default ListDetailState;