db.createUser(
  {
    user: 'visiplus',
    pwd: 'visiplus',
    roles: [
      { 
        role: 'readWrite', 
        db: 'myapp'
      }
    ]
  }
)