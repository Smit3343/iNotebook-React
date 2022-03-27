import React from 'react'

export default function Alert(props) {
    return (
        <div>
            {props.alert && <div className={`alert alert-${props.alert.type}`} role="alert">
                {props.alert.message}
            </div>}
        </div>
    )
}
