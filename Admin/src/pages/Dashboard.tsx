import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const Dashboard = () => {
  const [history, setHistory] = useState([])
  useEffect(() => {
    // Load todos from localStorage when the component mounts
    const storedTodos = JSON.parse(localStorage.getItem('history'));
    if (storedTodos) {
      setHistory(storedTodos);
    }
  }, []);

  console.log("history", history)
  return (
    <div className="p-5 flex gap-6 items-start w-full h-full">
      <div className="w-3/5 grid grid-cols-3 gap-6">
        <CardComponent title="Total Products" count={19} />
        <CardComponent title="Total Requests" count={19} />
        <CardComponent title="Total Users" count={19} />
      </div>
      <Card className="w-2/5 flex flex-col gap-2 p-4 ">
        <p className="font-semibold text-lg">Recent History</p>
        {
          history?.map((item) => {
            return <div key={item?.id} className="border relative px-3 py-2 flex flex-col hover:shadow-md rounded-lg">
              <p className="font-semibold">{item?.history?.vehicleNumber}</p>
              <p className="text-base text-gray-600">{item?.history?.vehicleModal}</p>
              <p className="text-green-600 bg-green-100 absolute text-sm  px-2 top-0 right-0 rounded-lg">Product added</p>
            </div>
          })
        }

      </Card>
    </div>
  );
};

const CardComponent = ({ title, count }: { title: string, count: number }) => {
  return (
    <Card className=" text-center">
      <CardHeader className="text-lg font-semibold">{title}</CardHeader>
      <CardContent className="w-full text-xl font-bold">{count}</CardContent>
    </Card>
  );
};

export default Dashboard;
