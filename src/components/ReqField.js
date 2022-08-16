import React from 'react'
import Req from './Req.js'

const ReqField = ({ req_list }) => {
    return (
        <div className="ReqField d-flex">
            {req_list.map((req) =>
                <Req req={req} key={req} />
            )}
        </div>
    )
}

export default ReqField