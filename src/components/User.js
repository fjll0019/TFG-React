import React from 'react'


export default function User({ datos,name, email,  }) {
    return (
        <div className="User">
            <div className="User-buttons">
            </div>
                <h4>{name}</h4>
                <h3>{email}</h3>
                <h2>{datos}</h2>
        </div>

    )
}
