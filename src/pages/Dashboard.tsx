import React from 'react'

const Dashboard = () => {
    const name = sessionStorage.getItem('userName');
    return (
        <main className='flex flex-col gap-10 pt-8 px-6 lg:grid lg:grid-cols-2 md:px-16 lg:px-24'>
            Welcome {name}
        </main>
    )
}

export default Dashboard