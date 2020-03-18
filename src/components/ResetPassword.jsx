import React from 'react'
import {useParams} from 'react-router-dom'

function ResetPassword() {
    let { token } = useParams()
    return (
        <div>
            <h1>Token: {token}</h1>
        </div>
    )
}

export default ResetPassword
