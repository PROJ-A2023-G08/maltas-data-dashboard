import React from 'react';
import { useRouter } from 'next/router';

const Dashboard: React.FC = () => {
    const router = useRouter();
  return (
    <div >
      <h3 className="p-10 cursor-pointer" onClick={()=>{
        router.push("/");
      }}>Back to Home</h3>
     
       <h1 className='text-center'>Welcome to maltas</h1>
    </div>
  );
};

export default Dashboard;
