import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react";
import "./styles.scss";
import { IoCloseSharp } from "react-icons/io5";
import CommentItem from "../comment-item";
import _ from "lodash-es";
import CommentItemChild from "../comment-item-child";
import { useState } from "react";
import { getCommentList } from "@/apis/comment";
import { useQuery } from "react-query";

export default function CommentList(props) {
    const { content, toggle, action, datas, ...rest } = props;


    const [commentParams, setCommentParams] = useState({
        cinema: 2,
id: 29685,
page: 1,
pagesize: 10,
type: 1,
orderBy: 0,
isav: true,
uid: 129871368,
expire: 1757291796.71619,
gid: 0,
sign: "74d41f790200bc892842eca005bf68e95f67545c603e7671552990f574715193_64eaf89b0c429babd675f5d30910b766",
token: "19f17015a457419aa3e9468cd2170e2c",
vv: "2dfccdbc3e35025af1571654aff17467",
pub: "CJSrCZ4mDpSvDIuoDZCpD5yh9ozCZGmCZeuC30wDZ8mPJfXOp4wDMGoDZeqPZTZEZ9cCMGwEJGvDryncx2P6hCnc9gRCp2Q71cn79mpCniRCPeoCB8PdB6oiIzOMGqC3CvEM8oPJ0pD6OnOZWmCpPXOZ0qEMLaPZLcDM5",
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
        <div className="comment-list">
            {
                _.map(commentList?.info[0]?.commNormal, (item, index) => {
                    return (
                        <div key={index} className="wrap-group-comment">
                            <CommentItem item={item} />
                            <div className="childs-cmt">
                                {
                                    _.map(item.childs, (value, i) => {
                                        return <CommentItemChild key={i} item={value} />
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