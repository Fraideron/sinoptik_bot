db.createUser(
    {
        user: 'sinoptik',
        pwd: '1qa2w3',
        roles: [
            {
                role: 'readWrite',
                db: 'sinoptik'
            }
        ]
    }
)