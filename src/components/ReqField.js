import React from 'react'
import Req from './Req.js'

const ReqField = ({ req_list }) => {
    return (
        <div className="ReqField">
            {/* {req_list.map((req) =>
                <Req req={req} key={req} />
            )} */}
            <div className="row h-50">
                <div className="col">
                    <Req req="Distribution" key="Distribution" />
                </div>
                <div className="col">
                    <Req req="First-year Seminar" key="First-year Seminar" />
                </div>
                
            </div>
            <div className="row h-50">
                <div className="col">
                    <Req req="Foreign Language" key="Foreign Language" />
                </div>
                <div className="col">
                    <Req req="Major" key="Major" />
                </div>
            </div>
        </div>
    )
}

export default ReqField