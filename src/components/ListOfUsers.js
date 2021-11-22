import React from 'react'
import User from './User'

export default function ListOfUsers({ users }) {
    console.log(users)
    return <div>
        {
            users.map(({datos, name, email }) =>
                <User
                    datos={datos}
                    name={name}
                    email={email}
                />
            )
        }
    </div>
}