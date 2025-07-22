import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react";
import "./styles.scss";
import { IoCloseSharp } from "react-icons/io5";
import _ from "lodash-es";
import CommentItemActress from "../comment-item-actress";
import CommentItemChildActress from "../comment-item-child-actress";
import { useState } from "react";
import { getCommentList } from "@/apis/comment";
import { useQuery } from "react-query";

export default function CommentListActress(props) {
    const { content, toggle, action, datas, ...rest } = props;

    const [commentParams, setCommentParams] = useState({
        cinema: 7,
        id: 32060,
        page: 1,
        pagesize: 10,
        type: 1,
        orderBy: 0,
        isav: true,
        uid: 129871368,
        expire: 1757290494.14016,
        gid: 0,
        sign: "e6748fcfd6943a5ea08fd8d21b0a59d5e7191c30faa205cfd321a850f6989c0b_64eaf89b0c429babd675f5d30910b766",
        token: "19f17015a457419aa3e9468cd2170e2c",
        vv: "98847d7a1a628b64d65085cc77586013",
        pub: "CJSrCZ4mCpaoCIuvCJSrDryfewzCc4mP3erDZ0mEZ4tE3esC30mEZanDMCwCZGsOJfXCJGoEZOsPJTVP6DZOJ8qC3OrD6PaD68nCZamDJWsDM4mDcGvOJSsPcLVPZGoPcCuE35bCcGmDJCvCsKuPJ9XPJDaCcKqPJXZDZ6"
    })

    const { data: commentListDatas }
        = useQuery({
            queryKey: ['comment-list', commentParams],
            queryFn: () => {
                return getCommentList(commentParams)
            },
        })

    const { data: commentList } = commentListDatas || {};

    return (
        <div className="comment-list-actress">
            {
                _.map(commentList?.info[0]?.commNormal, (item, index) => {
                    return (
                        <div key={index} className="wrap-group-comment">
                            <CommentItemActress item={item} />
                            <div className="childs-cmt">
                                {
                                    _.map(item.childs, (value, i) => {
                                        return <CommentItemChildActress key={i} item={value} />
                                    })
                                }
                            </div>
                        </div>

                    )
                })
            }

        </div>
    );
}